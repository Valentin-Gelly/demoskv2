
export const managerUrl = "http://localhost:5000/v2/ComponentSystem/exec/ScenarioManager/";
export const evtUrl = "http://localhost:5000/api/System/Event[[CALL]]Listener/ScenarioManager/";

export const ScenarioManager = {
    events: {},

    get activeScenario() {
        return buildManagerRequest('Get', 'get_currentScenario', 'string');
    },
    set activeScenario(value) {
        //buildManagerRequest('Set', 'set_currentScenario', value);
        buildManagerRequest('Method', 'ChangeCurrentScenario', { "Name": value })
    },
    get scenarioList() {
        return buildManagerRequest('Get', 'get_scenarioList', 'object');
    },
    addEventListener: function (name, callback) {
        if (!this.events.hasOwnProperty(name)) {
            this.events[name] = [callback];
            return buildManagerRequest('Add', name);
        }
        else if (this.events[name].indexOf(callback) < 0) {
            this.events[name].push(callback);
        }
    },
    open: function () {
        return buildManagerRequest('Method', 'Open')
    },
    delete: function (args) {
        return buildManagerRequest('Method', 'Delete', args)
    },
    load: function (args) {
        return buildManagerRequest('Method', 'Load', args, 'object')
    },
    save: function (args) {
        return buildManagerRequest('Method', 'Save', args)
    }
}

window.addEventListener("onKioskEvent", function (e) {
    if (e.detail && e.detail.sender === "ScenarioManager") {
        let eventName = e.detail.eventName;
        if (!!eventName && ScenarioManager.events.hasOwnProperty(eventName)) {
            let detailClone = { ...e.detail };
            try {
                // Echappement du retour à la ligne
                let formatData = detailClone.data.replace(/\r|\t/g, "").replace(/\n/g, "\\n");

                // Désérialisation des données
                detailClone.data = JSON.parse(formatData);
            }
            catch (error) {
                // Données non compatibles JSON, à garder en l'état
            }
            ScenarioManager.events[eventName].forEach(function (callback) {
                callback(detailClone);
            })
        }
    }
})

export function buildManagerRequest(callType, methodName, args, valueType = null) {
  console.log("managerRequest," + methodName);
    let url = (managerUrl + methodName);
    let requestType = "POST";
    if (["Add", "Remove"].indexOf(callType) > -1) {
        url = (evtUrl.replace("[[CALL]]", callType) + methodName);
        requestType = "GET";
    }
    var result = sendManagerRequest(url, requestType, args, callType, valueType);
    return result;
};

function sendManagerRequest(url, type, args = null, callType, valueType) {
  console.log("sendmanagerRequest," + url);
    var httpRequest = new XMLHttpRequest();
    let argsClone = args;
    let valueTypeClone = valueType;

    try {
        httpRequest.onreadystatechange = function () { };

        if (callType === "Get") {
            argsClone = null;
            valueTypeClone = args;
        }

        httpRequest.open(type, url, false);
        var formParam = (argsClone) ? JSON.stringify(argsClone) : null;
        if (callType === "Set") {
            httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            var urlEncodedDataPairs = [];
            urlEncodedDataPairs.push('value=' + formParam);
            var urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');
            httpRequest.send(urlEncodedData);
        }
        else {
            httpRequest.setRequestHeader('Content-type', 'application/json-patch+json');
            httpRequest.send(formParam);
        }
    }
    catch (error) {
        throw error;
    }
    return parseRequestResponse(httpRequest.responseText, valueTypeClone);
}

export function parseRequestResponse(reqResult, type) {
    if (!!type) {
        if (type === "object") {
            if (!reqResult) {
                return null;
            }
            return JSON.parse(reqResult);
        }
        else if (type.indexOf("int") === 0) {
            return (reqResult * 1);
        }
        else if (type === "boolean") {
            return (reqResult === "True");
        }
        else {
            return reqResult;
        }
    }
    else {
        return reqResult;
    }
}

export function docRequest() {
    let request = new XMLHttpRequest();

    try {
        request.open("GET", "http://localhost:5000/api/Maintenance/DocumentAll/", false);
        //request.setRequestHeader('Content-type', 'text/plain');
        request.send();
    }
    catch (error) {
        throw error;
    }

    let data = (request.status === 404) ? null : request.responseText;

    if (data) {
        let parsedData = loadPackage(JSON.parse(data));
        console.debug(parsedData);
        return parsedData;
    }
}

function loadPackage(doc, index = 0) {
    let docResult = {};
    if (excludedComps.indexOf(doc.ClassName) < 0) {
        let compName = doc.Name;
        console.debug("Chargement de la documentation pour " + compName + "...");

        let { Childrens: docChildren, ...compObj } = doc;

        compObj.methods = {};
        compObj.events = {};

        let compChildren = [];

        docChildren.forEach(function(currentChild) {
            if (!isDevJs || !currentChild.isAdmin) {
                switch(currentChild.Category) {
                    case "MethodNode":
                        // Séparation de la documentation de la méthode et celle de ses nodes enfants
                        let { Childrens: mtdChildren, ...mtdInfo } = currentChild;

                        mtdInfo.Params = [];

                        if (!!mtdChildren) {
                            // Parcours des nodes enfants (cette variable retournera uniquement les événements associés, les paramètres sont stockés ailleurs dans ce même traitement)
                            mtdChildren.forEach(function (currentMtdChild) {
                                // Traitement suivant la catégorie du node enfant
                                switch (currentMtdChild.Category) {
                                    // Cas d'un node d'événement associé à la méthode
                                    case "MethodEventNode":
                                        // Création du champ correspondant au nom de l'événement s'il n'existe pas (plusieurs dataType peuvent exister pour un même nom d'événement)
                                        let evtName = currentMtdChild.EventName;
                                        if (!compObj.events[evtName]) {
                                            compObj.events[evtName] = {};
                                        }
                                        if (currentMtdChild.hasOwnProperty("DataType")) {
                                            // Stockage de la documentation de l'événement/dataType dans la variable en cours de construction
                                            compObj.events[evtName][currentMtdChild.DataType] = currentMtdChild;
                                        }
                                        break;
                                    // Cas d'un node de paramètres
                                    case "ParameterNode":
                                        // Stockage de la documentation du paramètre directement dans la variable finale
                                        mtdInfo.Params.push(currentMtdChild);
                                        break;
                                    default:
                                        break;
                                }
                            });
                        }

                        compObj.methods[mtdInfo.JsName] = { ...mtdInfo }
                        break;
                    case "ClassEventDataNode":
                        let classEvtName = currentChild.EventName;
                        if (!compObj.events[classEvtName]) {
                            compObj.events[classEvtName] = {};
                        }

                        if (currentChild.hasOwnProperty("DataType")) {
                            compObj.events[classEvtName][currentChild.DataType] = currentChild;
                        }
                        break;
                    case "DocumentationComponent":
                        compChildren.push(currentChild);
                        break;
                    default:
                        break;
                }
            }
        })

        /* compObj.properties = {}; */
        /* Ajout des propriétés en tant que méthodes get_prop */
        /* doc.Childrens.filter(function (child) { return (child.Category === "PropertyNode") }).forEach(function (prop) {
            let methodName = "get_" + prop.JsName;
            let returnNode = (prop.IsDocType)? prop.Childrens[0] : {"Category": "PrimitiveTypeNode", "DataType": prop.DataType};
            compObj.methods[methodName] = {
                "Description": prop.Description,
                "JsName": methodName,
                "ReturnType": returnNode,
                "IsDocType": prop.IsDocType
            };
        }); */

        docResult[compName] = compObj;

        if (!isDevJs || index < 1) {
            compChildren.forEach(function (child) {
                docResult = { ...docResult, ...loadPackage(child, index + 1) };
            });
        }
    }

    return docResult;
}
