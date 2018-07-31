/*******************************************************************************
 * Copyright 2017 Cognizant Technology Solutions
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License.  You may obtain a copy
 * of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the
 * License for the specific language governing permissions and limitations under
 * the License.
 ******************************************************************************/
var ISightApp;
(function (ISightApp) {
    var AgentManagementController = /** @class */ (function () {
        function AgentManagementController(agentService, restAPIUrlService, iconService, $sce, $mdDialog, $cookies, toolConfigService, restEndpointService) {
            this.agentService = agentService;
            this.restAPIUrlService = restAPIUrlService;
            this.iconService = iconService;
            this.$sce = $sce;
            this.$mdDialog = $mdDialog;
            this.$cookies = $cookies;
            this.toolConfigService = toolConfigService;
            this.restEndpointService = restEndpointService;
            this.validationArr = {};
            this.osLists = {};
            this.configDesc = {};
            this.configAbbr = [];
            this.buttonDisableStatus = true;
            this.isRegisteredTool = false;
            this.showConfig = false;
            this.versionList = [];
            this.toolsArr = [];
            this.response = {};
            this.editAgentDetails = {};
            this.headerData = [];
            this.updatedConfigdata = {};
            this.item = {};
            this.defaultConfigdata = {};
            this.versionChangeddata = {};
            this.addButtIcon = "dist/icons/svg/actionIcons/Add_icon_disabled.svg";
            this.deleteButtIcon = "dist/icons/svg/actionIcons/Delete_icon_disabled.svg";
            this.editButtIcon = "dist/icons/svg/actionIcons/Edit_icon_disabled.svg";
            this.saveButtonIcon = "dist/icons/svg/actionIcons/Save_icon_Disabled.svg";
            this.isTypeError = "";
            this.files = [];
            this.fileUploadSuccessMessage = false;
            this.trackingUploadedFileContentStr = "";
            var elem = document.querySelector('#homePageTemplateContainer');
            var homePageControllerScope = angular.element(elem).scope();
            var homePageController = homePageControllerScope['homePageController'];
            this.homeController = homePageController;
            var self = this;
            self.showMessage = "Please select version & tools";
            self.getOsVersionTools("");
            self.getSelectedAgentDetails();
            self.showConfig = false;
            self.showTrackingJsonUploadButton = self.homeController.showTrackingJsonUploadButton;
            if (self.editAgentDetails['type'] == "update") {
                self.getDbAgentConfig(self.editAgentDetails['agentid']);
                self.btnValue = "Update";
                self.buttonDisableStatus = false;
            }
            else {
                self.btnValue = "Register";
                self.validationArr = self.editAgentDetails['detailedArr'];
            }
            self.osLists = {
                "windows": "Windows",
                "linux": "Linux",
                "ubuntu": "Ubuntu",
            };
            self.getOsList();
        }
        AgentManagementController.prototype.getOsList = function () {
            var self = this;
            var agentsListFromUiConfig = self.homeController.agentsOsList;
            if (agentsListFromUiConfig !== undefined)
                self.osLists = agentsListFromUiConfig;
        };
        AgentManagementController.prototype.getOsVersionTools = function (Selversion) {
            var self = this;
            self.toolsArr = [];
            self.agentService.getDocRootAgentVersionTools()
                .then(function (data) {
                if (data.status == "success") {
                    self.response = data.data;
                    if (Selversion) {
                        self.toolsArr = self.response[Selversion];
                    }
                    else {
                        var versionListLength = 1;
                        for (var key in self.response) {
                            if (versionListLength <= 5) {
                                self.versionList.push(key);
                            }
                            else
                                break;
                            versionListLength++;
                        }
                    }
                }
                else {
                    self.showMessage = "Problem with Docroot URL (or) Platform service. Please try again";
                }
            })
                .catch(function (data) {
                self.showMessage = "Something wrong with service, Please try again";
            });
        };
        AgentManagementController.prototype.findDataType = function (key, arr) {
            return typeof (arr[key]);
        };
        AgentManagementController.prototype.getSelectedAgentDetails = function () {
            this.editAgentDetails = this.homeController.selectedAgentID;
        };
        AgentManagementController.prototype.versionOnChange = function (key, type) {
            var self = this;
            if (type == "validate") {
                if (self.selectedVersion === undefined || self.selectedTool === undefined || self.selectedOS === undefined) {
                    self.buttonDisableStatus = true;
                }
                else {
                    self.buttonDisableStatus = false;
                }
            }
            else if (type == "Update") {
                self.showConfig = false;
                self.showThrobber = true;
                self.showMessage = "";
                self.defaultConfigdata = JSON.parse(self.tempConfigdata);
                self.agentService.getDocrootAgentConfig(key, self.selectedTool)
                    .then(function (vdata) {
                    self.showConfig = true;
                    self.showThrobber = false;
                    self.versionChangeddata = JSON.parse(vdata.data);
                    self.concatConfigelement(self.versionChangeddata);
                    self.removeConfigelement(self.versionChangeddata);
                    self.configLabelMerge();
                })
                    .catch(function (vdata) {
                    self.showThrobber = false;
                    self.showMessage = "Something wrong with service, Please try again";
                });
            }
            else {
                self.buttonDisableStatus = true;
                self.selectedTool = "";
                self.toolsArr = [];
                self.toolsArr = self.response[key];
            }
        };
        AgentManagementController.prototype.concatConfigelement = function (addObj) {
            var self = this;
            for (var vkeys in addObj) {
                if (self.findDataType(vkeys, addObj) == 'object' && vkeys != "dynamicTemplate") {
                    if (!self.defaultConfigdata.hasOwnProperty(vkeys)) {
                        self.defaultConfigdata[vkeys] = addObj[vkeys];
                    }
                    for (var vkeys1 in addObj[vkeys]) {
                        if (!self.defaultConfigdata[vkeys].hasOwnProperty(vkeys1)) {
                            self.defaultConfigdata[vkeys][vkeys1] = addObj[vkeys][vkeys1];
                        }
                    }
                }
                else {
                    if (!self.defaultConfigdata.hasOwnProperty(vkeys)) {
                        self.defaultConfigdata[vkeys] = addObj[vkeys];
                    }
                }
            }
        };
        AgentManagementController.prototype.removeConfigelement = function (remObj) {
            var self = this;
            for (var dkeys in self.defaultConfigdata) {
                if (self.findDataType(dkeys, self.defaultConfigdata) == 'object' && dkeys != "dynamicTemplate") {
                    if (!remObj.hasOwnProperty(dkeys)) {
                        delete self.defaultConfigdata[dkeys];
                    }
                    for (var dkeys1 in self.defaultConfigdata[dkeys]) {
                        if (!remObj[dkeys].hasOwnProperty(dkeys1)) {
                            delete self.defaultConfigdata[dkeys][dkeys1];
                        }
                    }
                }
                else {
                    if (!remObj.hasOwnProperty(dkeys)) {
                        delete self.defaultConfigdata[dkeys];
                    }
                }
            }
        };
        AgentManagementController.prototype.getDocRootAgentConfig = function (version, toolName) {
            var self = this;
            self.isRegisteredTool = false;
            self.checkValidation();
            if (!self.isRegisteredTool) {
                self.showConfig = false;
                self.showThrobber = true;
                self.showMessage = "";
                self.agentService.getDocrootAgentConfig(version, toolName)
                    .then(function (data) {
                    self.showThrobber = false;
                    if (data.status == "success") {
                        self.showConfig = true;
                        self.defaultConfigdata = JSON.parse(data.data);
                        self.dynamicData = JSON.stringify(self.defaultConfigdata['dynamicTemplate'], undefined, 4);
                        self.configLabelMerge();
                        if (self.selectedOS === undefined || self.dynamicData == '') {
                            self.buttonDisableStatus = true;
                        }
                        else {
                            self.buttonDisableStatus = false;
                        }
                    }
                    else {
                        self.buttonDisableStatus = true;
                        self.showMessage = "Something wrong with service, Please try again";
                    }
                })
                    .catch(function (data) {
                    self.showThrobber = false;
                    self.showMessage = "Something wrong with service, Please try again";
                });
            }
            else {
                self.buttonDisableStatus = true;
                self.showConfig = false;
                self.showMessage = toolName.charAt(0).toUpperCase() + toolName.slice(1) + " agent is already registered, Please select other tool.";
            }
        };
        AgentManagementController.prototype.getDbAgentConfig = function (agentId) {
            var self = this;
            self.showConfig = false;
            self.showThrobber = true;
            self.showMessage = "";
            self.agentService.getDbAgentConfig(agentId)
                .then(function (data) {
                self.showConfig = true;
                self.showThrobber = false;
                self.tempConfigdata = data.data.agentJson;
                self.defaultConfigdata = JSON.parse(self.tempConfigdata);
                self.selectedVersion = data.data.agentVersion;
                self.selectedOS = data.data.osVersion;
                self.getOsVersionTools(self.selectedVersion);
                self.selectedTool = data.data.toolName;
                self.dynamicData = JSON.stringify(self.defaultConfigdata['dynamicTemplate'], undefined, 4);
                self.configLabelMerge();
            })
                .catch(function (data) {
                self.showThrobber = false;
                self.showMessage = "Something wrong with service, Please try again";
            });
            if (self.dynamicData == '') {
                self.buttonDisableStatus = true;
            }
        };
        AgentManagementController.prototype.configLabelMerge = function () {
            var self = this;
            self.configDesc = self.restEndpointService.getConfigDesc();
            for (var key in self.defaultConfigdata) {
                if (self.configDesc.hasOwnProperty(key)) {
                    self.configAbbr[key] = self.configDesc[key];
                }
                else {
                    self.configAbbr[key] = key;
                }
            }
        };
        AgentManagementController.prototype.sendStatusMsg = function (Msg) {
            this.homeController.showConfirmMessage = Msg;
            this.homeController.templateName = 'agentList';
        };
        AgentManagementController.prototype.checkDatatype = function (dataVal) {
            if (typeof (dataVal) == "boolean") {
                return dataVal;
            }
            else if (isNaN(dataVal)) {
                if (dataVal == "true") {
                    this.datatypeVal = true;
                    return this.datatypeVal;
                }
                else if (dataVal == "false") {
                    this.datatypeVal = false;
                    return this.datatypeVal;
                }
                else {
                    return dataVal;
                }
            }
            else {
                return parseInt(dataVal);
            }
        };
        AgentManagementController.prototype.getUpdatedConfigData = function ($scope, actionType) {
            var self = this;
            self.updatedConfigdata = {};
            for (var key in self.defaultConfigdata) {
                if (key != "dynamicTemplate" && self.findDataType(key, self.defaultConfigdata) == "object") {
                    self.item = {};
                    for (var value in self.defaultConfigdata[key]) {
                        self.item[value] = self.checkDatatype(self.defaultConfigdata[key][value]);
                    }
                    self.updatedConfigdata[key] = self.item;
                    if (key == "communication" && self.dynamicData != "") {
                        self.updatedConfigdata["dynamicTemplate"] = JSON.parse(self.dynamicData);
                    }
                }
                else if (key != "dynamicTemplate") {
                    self.updatedConfigdata[key] = self.checkDatatype(self.defaultConfigdata[key]);
                }
            }
            if (self.updatedConfigdata) {
                self.configData = "";
                self.configData = encodeURIComponent(JSON.stringify(self.updatedConfigdata));
                if (actionType == "Update") {
                    self.agentService.updateAgent(self.editAgentDetails['agentid'], self.configData, self.selectedTool, self.selectedVersion, self.selectedOS)
                        .then(function (data) {
                        if (data.status == "success") {
                            self.sendStatusMsg("updated");
                        }
                        else {
                            self.sendStatusMsg("update");
                        }
                    })
                        .catch(function (data) {
                        self.sendStatusMsg("service_error");
                    });
                }
                else {
                    self.agentService.registerAgent(self.selectedTool, self.selectedVersion, self.selectedOS, self.configData, self.trackingUploadedFileContentStr)
                        .then(function (data) {
                        console.log(data);
                        if (data.status == "success") {
                            self.sendStatusMsg("registered");
                        }
                        else {
                            self.sendStatusMsg("register");
                        }
                    })
                        .catch(function (data) {
                        self.sendStatusMsg("service_error");
                    });
                }
            }
        };
        AgentManagementController.prototype.checkValidation = function () {
            var self = this;
            for (var key in self.validationArr) {
                if (self.validationArr[key]['tool'] == self.selectedTool) {
                    self.isRegisteredTool = true;
                    self.selectedTool = "";
                }
            }
        };
        AgentManagementController.prototype.uploadFile = function () {
            var self = this;
            var inputFileById = document.getElementById("fileInp");
            var uploadedFile = inputFileById.files[0];
            var testFileExt = self.checkFile(uploadedFile, ".json");
            if (!testFileExt) {
                self.isTypeError = "showError";
                setTimeout(function () {
                    self.isTypeError = "";
                }, 500);
            }
            if (testFileExt) {
                // Turn the FileList object into an Array
                self.files = [];
                for (var i = 0; i < inputFileById.files.length; i++) {
                    self.files.push(inputFileById.files[i]);
                }
                self.getTrackingFileContentToString(self.files[0]);
                self.fileUploadSuccessMessage = true;
            }
        };
        AgentManagementController.prototype.checkFile = function (sender, validExts) {
            if (sender) {
                var fileExt = sender.name;
                fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
                if (validExts.indexOf(fileExt) < 0 && fileExt != "") {
                    document.getElementById("fileInp").value = "";
                    return false;
                }
                else
                    return true;
            }
        };
        AgentManagementController.prototype.getTrackingFileContentToString = function (trackingJsonFileArray) {
            var _this = this;
            var reader = new FileReader();
            reader.readAsText(trackingJsonFileArray);
            reader.onload = function (e) {
                var json = reader.result;
                _this.trackingUploadedFileContentStr = json;
            };
        };
        AgentManagementController.prototype.cancelFileUpload = function () {
            this.trackingUploadedFileContentStr = "";
            this.files = [];
            this.isTypeError = "";
            this.fileUploadSuccessMessage = false;
        };
        AgentManagementController.$inject = ['agentService', 'restAPIUrlService', 'iconService', '$sce', '$mdDialog', '$cookies', 'toolConfigService', 'restEndpointService'];
        return AgentManagementController;
    }());
    ISightApp.AgentManagementController = AgentManagementController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=agentManagementController.js.map