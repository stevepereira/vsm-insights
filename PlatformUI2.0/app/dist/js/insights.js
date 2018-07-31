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
/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="boot.ts" />
/// <reference path="modules/pipeline/controller/pipelineController.ts" />
/// <reference path="modules/pipeline/models/pipelineModels.ts" />
/// <reference path="modules/pipeline/service/pipelineService.ts" />
/// <reference path="modules/graph/service/graphService.ts" />
/// <reference path="modules/elasticsearch/service/elasticSearchService.ts" />
/// <reference path="modules/kibana/controller/kibanaDashboardController.ts" />
/// <reference path="modules/kibana/models/kibanaModels.ts" />
//# sourceMappingURL=_all.js.map
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
    var FooterController = /** @class */ (function () {
        function FooterController() {
        }
        FooterController.$inject = [];
        return FooterController;
    }());
    ISightApp.FooterController = FooterController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=footerController.js.map
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
    var HeaderController = /** @class */ (function () {
        function HeaderController(authenticationService, $location, $window, $cookies, $mdDialog, $mdSidenav) {
            this.authenticationService = authenticationService;
            this.$location = $location;
            this.$window = $window;
            this.$cookies = $cookies;
            this.$mdDialog = $mdDialog;
            this.$mdSidenav = $mdSidenav;
            this.showDashboardIcon = false;
            this.showTooltip = false;
            this.icons = [
                { iconSrc: 'dist/icons/svg/ic_home_24px.svg', name: 'home' },
                { iconSrc: 'dist/icons/svg/ic_settings_24px.svg', name: 'settings' },
                { iconSrc: 'dist/icons/svg/ic_person_24px.svg', name: 'userManagement' },
                { iconSrc: 'dist/icons/svg/ic_web_24px.svg', name: 'health' },
            ];
            var authToken = $cookies.get('Authorization');
            var msg = '';
            authenticationService.getAuthentication(authToken, msg);
            if ('/InSights/dashboard' === $location.path()) {
                this.showDashboardIcon = true;
                this.showTooltip = false;
            }
        }
        ;
        HeaderController.prototype.redirectLoc = function (iconName) {
            if (iconName == 'home') {
                this.$location.path('/InSights/home');
            }
            else if (iconName == 'settings') {
                this.$location.path('/InSights/toolsConfig');
            }
            else if (iconName == 'userManagement') {
                this.$location.path('/InSights/roles');
            }
            else if (iconName == 'health') {
                this.$location.path('/InSights/agent');
            }
        };
        HeaderController.prototype.logout = function () {
            var cookieVal = this.$cookies.getAll();
            for (var key in cookieVal) {
                cookieVal[key] = '';
                this.$cookies.put(key, cookieVal[key]);
            }
            this.$location.path('/iSight/login');
        };
        HeaderController.prototype.toggleSideNav = function (navId, closeSideNav) {
            this.showTooltip = false;
            if (closeSideNav) {
                this.$mdSidenav(navId).close();
            }
            else {
                this.$mdSidenav(navId).toggle();
            }
        };
        HeaderController.$inject = ['authenticationService', '$location', '$window', '$cookies', '$mdDialog', '$mdSidenav'];
        return HeaderController;
    }());
    ISightApp.HeaderController = HeaderController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=headerController.js.map
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
    var ThrobberController = /** @class */ (function () {
        function ThrobberController() {
        }
        ThrobberController.$inject = [];
        return ThrobberController;
    }());
    ISightApp.ThrobberController = ThrobberController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=throbberController.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var AboutService = /** @class */ (function () {
        function AboutService($resource, $q, $cookies, restCallHandlerService) {
            this.$resource = $resource;
            this.$q = $q;
            this.$cookies = $cookies;
            this.restCallHandlerService = restCallHandlerService;
        }
        AboutService.prototype.loadDetails = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("ABOUT_READ");
        };
        AboutService.$inject = ['$resource', '$q', '$cookies', 'restCallHandlerService'];
        return AboutService;
    }());
    ISightApp.AboutService = AboutService;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=AboutInsightsService.js.map
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
    var AgentListController = /** @class */ (function () {
        function AgentListController(agentService, iconService, $sce, NgTableParams, $mdDialog, $cookies, toolConfigService) {
            this.agentService = agentService;
            this.iconService = iconService;
            this.$sce = $sce;
            this.NgTableParams = NgTableParams;
            this.$mdDialog = $mdDialog;
            this.$cookies = $cookies;
            this.toolConfigService = toolConfigService;
            this.validationArr = {};
            this.showList = false;
            this.data = [];
            this.tableParams = [];
            this.buttonDisableStatus = false;
            this.editIconSrc = "dist/icons/svg/actionIcons/Edit_icon_disabled.svg";
            this.startIconSrc = "dist/icons/svg/actionIcons/Start_icon_Disabled.svg";
            this.stopIconSrc = "dist/icons/svg/actionIcons/Stop_icon_Disabled.svg";
            this.successIconSrc = "dist/icons/svg/ic_check_circle_24px.svg";
            this.errorIconSrc = "dist/icons/svg/ic_report_problem_24px.svg";
            this.deleteIconSrc = "dist/icons/svg/actionIcons/Delete_icon_disabled.svg";
            var elem = document.querySelector('#homePageTemplateContainer');
            var homePageControllerScope = angular.element(elem).scope();
            var homePageController = homePageControllerScope['homePageController'];
            this.homeController = homePageController;
            var self = this;
            self.showConfirmMessage = "";
            self.homeController.templateName = 'agentList';
            if (self.homeController.showConfirmMessage) {
                self.showConfirmMessage = self.homeController.showConfirmMessage;
            }
            self.getRegisteredAgents();
        }
        AgentListController.prototype.agentStartStopAction = function (actDetails, actType) {
            var self = this;
            self.agentService.agentStartStop(actDetails.agentid, actType)
                .then(function (data) {
                console.log(data);
                if (actType == "START") {
                    if (data.status == "success") {
                        self.showConfirmMessage = "started";
                    }
                    else {
                        self.showConfirmMessage = "start";
                    }
                }
                else {
                    if (data.status == "success") {
                        self.showConfirmMessage = "stopped";
                    }
                    else {
                        self.showConfirmMessage = "stop";
                    }
                }
                self.getRegisteredAgents();
            })
                .catch(function (data) {
                self.showConfirmMessage = "service_error";
                self.getRegisteredAgents();
            });
        };
        AgentListController.prototype.editAgentConfig = function (params) {
            this.homeController.showTrackingJsonUploadButton = false;
            this.homeController.selectedAgentID = params;
            this.homeController.templateName = 'agentManagement';
        };
        AgentListController.prototype.enableActions = function (agntStatus) {
            this.buttonDisableStatus = true;
            this.runDisableStatus = agntStatus;
            this.editIconSrc = "dist/icons/svg/userOnboarding/Edit_icon_MouseOver.svg";
            this.deleteIconSrc = "dist/icons/svg/actionIcons/Delete_icon_MouseOver.svg";
            if (agntStatus == "STOP") {
                this.startIconSrc = "dist/icons/svg/actionIcons/Start_icon_Active.svg";
            }
            else {
                this.stopIconSrc = "dist/icons/svg/actionIcons/Stop_icon_Active.svg";
            }
        };
        AgentListController.prototype.getRegisteredAgents = function () {
            var self = this;
            self.showList = false;
            self.showThrobber = true;
            self.buttonDisableStatus = false;
            self.runDisableStatus = "";
            self.editIconSrc = "dist/icons/svg/actionIcons/Edit_icon_disabled.svg";
            self.startIconSrc = "dist/icons/svg/actionIcons/Start_icon_Disabled.svg";
            self.stopIconSrc = "dist/icons/svg/actionIcons/Stop_icon_Disabled.svg";
            self.deleteIconSrc = "dist/icons/svg/actionIcons/Delete_icon_disabled.svg";
            self.homeController.showConfirmMessage = "";
            self.agentService.loadAgentServices("DB_AGENTS_LIST")
                .then(function (response) {
                self.showThrobber = false;
                self.data = response.data;
                self.consolidatedArr(self.data);
                if (self.data.length == 0) {
                    self.showMessage = "No Records found";
                }
                else {
                    self.showList = true;
                    self.tableParams = new self.NgTableParams({
                        page: 1,
                        count: 10
                    }, {
                        counts: [],
                        total: 1,
                        dataset: self.data
                    });
                }
            })
                .catch(function (response) {
                self.showThrobber = false;
                self.showList = false;
                self.showMessage = "Something wrong with Service, Please try again.";
            });
            setTimeout(function () {
                self.showConfirmMessage = "";
                document.getElementById('confrmMsg').innerHTML = "";
            }, 5000);
        };
        AgentListController.prototype.consolidatedArr = function (detailArr) {
            var self = this;
            this.validationArr = {};
            for (var i = 0; i < detailArr.length; i++) {
                this.validationArr[i] = { "os": detailArr[i].osVersion, "version": detailArr[i].agentVersion, "tool": detailArr[i].toolName };
            }
        };
        AgentListController.prototype.newAgentRegister = function (dataArr) {
            this.homeController.showTrackingJsonUploadButton = true;
            this.homeController.selectedAgentID = { 'type': 'new', 'detailedArr': dataArr };
            this.homeController.templateName = 'agentManagement';
        };
        AgentListController.prototype.uninstallAgent = function (params) {
            //console.log(params);
            //console.log(this.data);
            var self = this;
            var agentData;
            for (var i in self.data) {
                if (params.agentid === self.data[i].agentKey) {
                    agentData = self.data[i];
                    //console.log(agentData);
                }
            }
            if (agentData.agentStatus === "START") {
                self.showConfirmMessage = "uninstall";
                setTimeout(function () {
                    self.showConfirmMessage = "";
                }, 5000);
            }
            else {
                self.$mdDialog.show({
                    controller: ISightApp.UninstallAgentDialogController,
                    controllerAs: 'UninstallAgentDialogController',
                    templateUrl: './dist/modules/agent/view/uninstallAgentDialogViewTemplate.tmp.html',
                    parent: angular.element(document.body),
                    targetEvent: params,
                    preserveScope: true,
                    clickOutsideToClose: true,
                    locals: {
                        statusObject: false,
                        agentKey: agentData.agentKey,
                        toolName: agentData.toolName,
                        osVersion: agentData.osVersion,
                        toolDetails: params
                    },
                    bindToController: true
                });
            }
        };
        AgentListController.$inject = ['agentService', 'iconService', '$sce', 'NgTableParams', '$mdDialog', '$cookies', 'toolConfigService'];
        return AgentListController;
    }());
    ISightApp.AgentListController = AgentListController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=agenListController.js.map
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
    var AgentController = /** @class */ (function () {
        function AgentController(agentService, iconService, $sce, $mdDialog, $cookies, toolConfigService) {
            this.agentService = agentService;
            this.iconService = iconService;
            this.$sce = $sce;
            this.$mdDialog = $mdDialog;
            this.$cookies = $cookies;
            this.toolConfigService = toolConfigService;
            this.serverStatus = [];
            this.agentNodes = [];
            this.agentToolsIcon = {};
            this.notAuthorizeMsg = "";
            this.toolsData = [];
            this.showTemplateAfterLoad = false;
            var self = this;
            self.toolsData = self.toolConfigService.readToolsDataList();
            this.checkResponseData = true;
            this.agentService.loadGlobalHealthConfigurations()
                .then(function (data) {
                var dataArray = data.data.nodes;
                if (dataArray.length === 0) {
                    this.checkResponseData = false;
                }
                self.agentNodes = dataArray;
                self.showTemplateAfterLoad = true;
                for (var key in dataArray) {
                    var nodesArray = dataArray[key];
                    var toolIconSrc = '';
                    for (var attr in nodesArray) {
                        var attrValue = nodesArray['propertyMap'];
                        if (attrValue.toolName != undefined) {
                            toolIconSrc = self.iconService.getIcon(attrValue.toolName);
                            self.agentToolsIcon[attrValue.toolName] = toolIconSrc;
                            break;
                        }
                    }
                }
            });
            var elem = document.querySelector('#homePageTemplateContainer');
            var homePageControllerScope = angular.element(elem).scope();
            var homePageController = homePageControllerScope['homePageController'];
            this.homeController = homePageController;
            this.homeController.templateName = 'healthCheck';
            this.showThrobber = true;
            this.showcontent = true;
            this.agentService.loadServerHealthConfiguration("INSIGHTS_COMP_STATUS")
                .then(function (data) {
                self.showThrobber = false;
                self.showcontent = !this.showThrobber;
                self.serverStatus = data;
            })
                .catch(function (data) {
                self.showThrobber = false;
                self.showcontent = false;
            });
        }
        AgentController.prototype.showTabDialog = function (params, toolName, toolCategory) {
            var self = this;
            this.selectedTool = toolName;
            this.selectedCategory = toolCategory;
            this.$mdDialog.show({
                controller: ISightApp.AgentDialogController,
                controllerAs: 'dialog',
                templateUrl: './dist/modules/agent/view/agentDialog.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: params,
                clickOutsideToClose: true,
                locals: {
                    toolName: toolName,
                    toolCategory: toolCategory,
                },
                bindToController: true
            });
        };
        AgentController.prototype.hide = function () {
            this.$mdDialog.hide();
        };
        AgentController.prototype.cancel = function () {
            this.$mdDialog.cancel();
        };
        AgentController.prototype.getSelectedFieldLength = function (obj) {
            return Object.keys(obj).length;
        };
        AgentController.prototype.checkFilter = function () {
            return true;
        };
        AgentController.$inject = ['agentService', 'iconService', '$sce', '$mdDialog', '$cookies', 'toolConfigService'];
        return AgentController;
    }());
    ISightApp.AgentController = AgentController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=agentController.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var AgentDialogController = /** @class */ (function () {
        function AgentDialogController(agentService, $mdDialog) {
            this.agentService = agentService;
            this.$mdDialog = $mdDialog;
            this.message = 'Message from cntrl';
            this.headerArray = [];
            this.agentDetailedNode = [];
            this.showFieldVal = ['id', 'type', 'uuid', 'status', 'execId', 'message'];
            this.headerArrayDisplay = [];
            var self = this;
            this.showThrobber = true;
            this.showcontent = !this.showThrobber;
            this.checkResponseData = true;
            this.agentService.loadHealthConfigurations(self["toolName"], self["toolCategory"])
                .then(function (data) {
                self.showThrobber = false;
                self.showcontent = !self.showThrobber;
                var dataArray = data.data.nodes;
                if (dataArray.length === 0) {
                    this.checkResponseData = false;
                }
                for (var key in dataArray) {
                    var dataNodes = dataArray[key];
                    for (var node in dataNodes) {
                        if (node == "propertyMap") {
                            var obj = dataNodes[node];
                            self.agentDetailedNode.push(obj);
                            for (var attr in obj) {
                                if (self.headerArray.indexOf(attr) < 0) {
                                    self.headerArray.push(attr);
                                    self.showSelectedField();
                                }
                            }
                        }
                    }
                }
            });
        }
        AgentDialogController.prototype.showSelectedField = function () {
            for (var key in this.showFieldVal) {
                for (var val in this.headerArray) {
                    if (this.showFieldVal[key] === this.headerArray[val]) {
                        if (this.headerArrayDisplay.indexOf(this.showFieldVal[key]) < 0) {
                            this.headerArrayDisplay.push(this.showFieldVal[key]);
                        }
                    }
                }
            }
        };
        AgentDialogController.prototype.getSelectedFieldLength = function (obj) {
            return Object.keys(obj).length;
        };
        AgentDialogController.prototype.hide = function () {
            this.$mdDialog.hide();
        };
        AgentDialogController.prototype.cancel = function () {
            this.$mdDialog.cancel();
        };
        AgentDialogController.$inject = ['agentService', '$mdDialog'];
        return AgentDialogController;
    }());
    ISightApp.AgentDialogController = AgentDialogController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=agentDialogController.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var UninstallAgentDialogController = /** @class */ (function () {
        function UninstallAgentDialogController(agentService, $mdDialog, $route, $location) {
            this.agentService = agentService;
            this.$mdDialog = $mdDialog;
            this.$route = $route;
            this.$location = $location;
            var self = this;
            self.statusObject = self['locals'].statusObject;
            self.agentKey = self['locals'].agentKey;
            self.toolName = self['locals'].toolName;
            self.osVersion = self['locals'].osVersion;
            var elem = document.querySelector('#agentTemplateContainer');
            var agentListControllerScope = angular.element(elem).scope();
            var agentController = agentListControllerScope['agentListController'];
            this.agentListController = agentController;
        }
        UninstallAgentDialogController.prototype.confirmation = function () {
            var self = this;
            self.agentService.agentUninstall(self.agentKey, self.toolName, self.osVersion).then(function (data) {
                self.agentListController.getRegisteredAgents();
            }).catch(function (data) {
                self.agentListController.showConfirmMessage = "service_error";
                self.agentListController.getRegisteredAgents();
            });
            self.hide();
        };
        UninstallAgentDialogController.prototype.hide = function () {
            this.$mdDialog.hide();
        };
        UninstallAgentDialogController.prototype.cancel = function () {
            this.$mdDialog.cancel();
        };
        UninstallAgentDialogController.$inject = ['agentService', '$mdDialog', '$route', '$location'];
        return UninstallAgentDialogController;
    }());
    ISightApp.UninstallAgentDialogController = UninstallAgentDialogController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=uninstallAgentDialogController.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var AgentService = /** @class */ (function () {
        function AgentService($resource, $q, $cookies, restEndpointService, restCallHandlerService) {
            this.$resource = $resource;
            this.$q = $q;
            this.$cookies = $cookies;
            this.restEndpointService = restEndpointService;
            this.restCallHandlerService = restCallHandlerService;
        }
        AgentService.prototype.loadGlobalHealthConfigurations = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("HEALTH_GLOBAL");
        };
        AgentService.prototype.loadHealthConfigurations = function (toolName, toolCategory) {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("HEALTH_TOOL", { 'tool': toolName, 'category': toolCategory });
        };
        AgentService.prototype.loadServerHealthConfiguration = function (ServerName) {
            var restHandler = this.restCallHandlerService;
            return restHandler.get(ServerName);
        };
        AgentService.prototype.getDocRootAgentVersionTools = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("DOCROOT_AGENT_VERSION_TOOLS");
        };
        AgentService.prototype.getDocrootAgentConfig = function (Version, toolName) {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("DOCROOT_AGENT_TOOL_CONFIG_DETAILS", { 'version': Version, 'tool': toolName });
        };
        AgentService.prototype.getDbAgentConfig = function (agentId) {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("DB_AGENT_CONFIG_DETAILS", { 'agentId': agentId });
        };
        AgentService.prototype.loadAgentServices = function (ServerName) {
            var restHandler = this.restCallHandlerService;
            return restHandler.get(ServerName);
        };
        AgentService.prototype.registerAgent = function (toolName, toolVersion, osName, configData, trackingDetails) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("AGENT_REGISTER", { 'toolName': toolName, 'agentVersion': toolVersion, 'osversion': osName, 'configDetails': configData, 'trackingDetails': trackingDetails }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        AgentService.prototype.updateAgent = function (agentId, configData, toolName, toolVersion, osName) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("AGENT_UPDATE", { 'agentId': agentId, 'configJson': configData, 'toolName': toolName, 'agentVersion': toolVersion, 'osversion': osName }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        AgentService.prototype.agentStartStop = function (agentId, actionType) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("AGENT_START_STOP", { 'agentId': agentId, 'action': actionType }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        AgentService.prototype.agentUninstall = function (agentId, toolName, osversion) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("AGENT_UNINSTALL", { 'agentId': agentId, 'toolName': toolName, 'osversion': osversion }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        AgentService.$inject = ['$resource', '$q', '$cookies', 'restEndpointService', 'restCallHandlerService'];
        return AgentService;
    }());
    ISightApp.AgentService = AgentService;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=agentService.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var AppSettingsController = /** @class */ (function () {
        function AppSettingsController($location, $window, $mdDialog, $scope, $filter, appSettingsService, $resource, $http, $route, $cookies, restAPIUrlService) {
            this.$location = $location;
            this.$window = $window;
            this.$mdDialog = $mdDialog;
            this.$scope = $scope;
            this.$filter = $filter;
            this.appSettingsService = appSettingsService;
            this.$resource = $resource;
            this.$http = $http;
            this.$route = $route;
            this.$cookies = $cookies;
            this.restAPIUrlService = restAPIUrlService;
            this.selectedImage = 'logo';
            this.maxSizeErr = false;
            var self = this;
            var elem = document.querySelector('#homePageTemplateContainer');
            var homePageControllerScope = angular.element(elem).scope();
            var homePageController = homePageControllerScope['homePageController'];
            self.homeController = homePageController;
            self.selectedImageSrc = self.homeController.imageSrc;
            this.init($scope, $filter, appSettingsService, $resource, $http, $route, $window, self.homeController, self.selectedImageSrc, $cookies, restAPIUrlService);
        }
        AppSettingsController.prototype.init = function ($scope, $filter, appSettingsService, $resource, $http, $route, $window, homeController, selectedImageSrc, $cookies, restAPIUrlService) {
            $scope.uploadFile = function () {
                var file = $scope.myFile;
                var fd = new FormData();
                fd.append("file", file);
                $scope.showThrobber = true;
                var authToken = $cookies.get('Authorization');
                var restcallAPIUrl = restAPIUrlService.getRestCallUrl("UPLOAD_IMAGE");
                var self = this;
                $http.post(restcallAPIUrl, fd, {
                    headers: {
                        'Content-Type': undefined,
                        'Authorization': authToken
                    },
                    transformRequest: angular.identity
                }).then(function (data, status, headers, config) {
                    $scope.showSuccess = true;
                    var fileVal = document.getElementById("myFileField");
                    fileVal.value = null;
                    $scope.imageSrc = "#";
                    homeController.showDefaultImg = false;
                    $scope.showThrobber = false;
                    homeController.imageSrc = 'data:image/jpg;base64,' + data.data.data.encodedString;
                    selectedImageSrc = 'data:image/jpg;base64,' + data.data.data.encodedString;
                }, function (data) {
                    $scope.showThrobber = false;
                    $scope.showError = true;
                });
            };
            $scope.getFile = function () {
                $scope.progress = 0;
                var reader = new FileReader();
                reader.onload = function (event) {
                    $scope.imageSrc = event.target.result;
                    $scope.$apply();
                };
                reader.readAsDataURL($scope.file);
            };
            $scope.selectImage = function () {
            };
        };
        AppSettingsController.$inject = ['$location', '$window', '$mdDialog', '$scope',
            '$filter', 'appSettingsService', '$resource', '$http', '$route', '$cookies', 'restAPIUrlService'];
        return AppSettingsController;
    }());
    ISightApp.AppSettingsController = AppSettingsController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=appSettingsController.js.map
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
    var DataPurgingController = /** @class */ (function () {
        function DataPurgingController(appSettingsService, $sce, $cookies) {
            this.appSettingsService = appSettingsService;
            this.$sce = $sce;
            this.$cookies = $cookies;
            this.fileFormat = "JSON";
            this.listView = true;
            this.saveView = false;
            this.datalist = {};
            this.settingData = {};
            this.settingJsonObj = {};
            this.editIconSrc = "dist/icons/svg/userOnboarding/Edit_icon_MouseOver.svg";
            this.showTble = true;
            var self = this;
            var elem = document.querySelector('#homePageTemplateContainer');
            var homePageControllerScope = angular.element(elem).scope();
            var homePageController = homePageControllerScope['homePageController'];
            self.homeController = homePageController;
            self.showThrobber = true;
            self.showConfirmMessage = "";
            self.listData();
        }
        DataPurgingController.prototype.checkData = function (event, myValue, txtName) {
            if (myValue == undefined) {
                return '';
            }
            else {
                while (myValue.charAt(0) === '0') {
                    myValue = myValue.substr(1);
                }
            }
            if (txtName == 'retention') {
                this.retention = myValue;
            }
        };
        DataPurgingController.prototype.addData = function () {
            this.listView = false;
            this.saveView = true;
        };
        DataPurgingController.prototype.saveData = function () {
            var self = this;
            self.listView = true;
            self.saveView = false;
            self.settingsType = "DATAPURGING";
            self.activeFlag = "Y";
            self.lastModifiedByUser = self.homeController.userName;
            /* if( self.backupDatatype.indexOf(',') >= 0){
                self.dataTypelabel = self.backupDatatype.split(",");
            }else {
                self.dataTypelabel = [self.backupDatatype];
            } */
            self.settingJsonObj = {
                "backupRetentionInDays": self.retention,
                "rowLimit": self.rowLimit,
                "backupFileLocation": self.fileLocation,
                "backupFileFormat": self.fileFormat,
                "dataArchivalFrequency": self.dataFreq,
                "lastRunTime": self.lastRunTime,
                "nextRunTime": ''
            };
            self.settingJsonstring = encodeURIComponent(JSON.stringify(self.settingJsonObj));
            self.appSettingsService.saveDatapurging(self.settingsType, self.activeFlag, self.lastModifiedByUser, self.settingJsonstring)
                .then(function (data) {
                if (data.status == "success") {
                    self.showConfirmMessage = "Settings saved successfully";
                }
                else {
                    self.showConfirmMessage = "Failed to save settings";
                }
                self.listData();
            })
                .catch(function (data) {
                self.listView = false;
                self.saveView = true;
                self.showConfirmMessage = "Failed to save settings";
                self.listData();
            });
        };
        DataPurgingController.prototype.listData = function () {
            var self = this;
            self.listView = true;
            self.saveView = false;
            self.appSettingsService.listDatapurgingdata("DATAPURGING")
                .then(function (response) {
                self.showThrobber = false;
                if (response.status == "success") {
                    if (response.hasOwnProperty('data')) {
                        self.showTble = false;
                        self.datalist = response.data;
                        self.settingData = JSON.parse(self.datalist['settingsJson']);
                    }
                    else {
                        self.showTble = true;
                    }
                }
                else {
                    self.showConfirmMessage = "Something wrong with service, please try again";
                }
            })
                .catch(function (response) {
                self.showThrobber = false;
                self.showConfirmMessage = "Something wrong with service, please try again";
            });
            setTimeout(function () {
                self.showConfirmMessage = "";
                document.getElementById('confrmMsg').innerHTML = "";
            }, 3500);
        };
        DataPurgingController.prototype.showData = function () {
            var self = this;
            self.listView = false;
            self.saveView = true;
            self.retention = self.settingData['backupRetentionInDays'];
            self.rowLimit = self.settingData['rowLimit'];
            self.fileLocation = self.settingData['backupFileLocation'];
            self.fileFormat = self.settingData['backupFileFormat'];
            self.dataFreq = self.settingData['dataArchivalFrequency'];
            self.lastRunTime = self.settingData['lastRunTime'];
            self.nextRunTime = self.settingData['nextRunTime'];
        };
        DataPurgingController.$inject = ['appSettingsService', '$sce', '$cookies'];
        return DataPurgingController;
    }());
    ISightApp.DataPurgingController = DataPurgingController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=dataPurgingController.js.map
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
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or impliIAppSettingsServiceed.  See the
 * License for the specific language governing permissions and limitations under
 * the License.
 ******************************************************************************/
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var AppSettingsService = /** @class */ (function () {
        function AppSettingsService($q, $resource, $cookies, restCallHandlerService, $http) {
            this.$q = $q;
            this.$resource = $resource;
            this.$cookies = $cookies;
            this.restCallHandlerService = restCallHandlerService;
            this.$http = $http;
        }
        AppSettingsService.prototype.uploadLogoImage = function (file, uploadUrl) {
            var restHandler = this.restCallHandlerService;
            //FormData, object of key/value pair for form fields and values
            var fileFormData = new FormData();
            fileFormData.append('file', file);
            return null;
        };
        AppSettingsService.prototype.saveDatapurging = function (settingsDataType, activeDataFlag, lastModifiedUser, settingsJsonstr) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("SAVE_DATAPURGING_SETTING", { 'settingsType': settingsDataType, 'activeFlag': activeDataFlag, 'lastModifiedByUser': lastModifiedUser, 'settingsJson': settingsJsonstr }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        AppSettingsService.prototype.listDatapurgingdata = function (label) {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("LIST_DATAPURGING_SETTING", { 'settingsType': label });
        };
        AppSettingsService.$inject = ['$q', '$resource', '$cookies', 'restCallHandlerService', '$http'];
        return AppSettingsService;
    }());
    ISightApp.AppSettingsService = AppSettingsService;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=appSettingsService.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var ApplicationManagementController = /** @class */ (function () {
        function ApplicationManagementController($location, $window, $mdDialog, roleService, $mdSidenav, $route, $cookies, onboardProjectService, $log) {
            this.$location = $location;
            this.$window = $window;
            this.$mdDialog = $mdDialog;
            this.roleService = roleService;
            this.$mdSidenav = $mdSidenav;
            this.$route = $route;
            this.$cookies = $cookies;
            this.onboardProjectService = onboardProjectService;
            this.$log = $log;
            this.applicationsDetails = [];
            this.searchOrg = '';
            this.showTable = false;
            this.searchApplicationResult = '';
            this.addNewApplicationName = "";
            this.showAddApplication = false;
            this.showTemplateAfterLoad = false;
            this.showMsgOnNoDataOnboarded = 'No Data Onboarded';
            this.applicationConfigured = true;
            this.appDataArray = [];
            this.paginatedAppDataArray = [];
            this.showPaginationBar = false;
            this.showApplicationAddedMessage = false;
            this.goToDataTaggingDetails = function () {
                this.homeController.templateName = 'dataTaggingDetails';
            };
            this.totalRows = 10; //total items per page
            this.maxSize = 4; // total pages blocks will be displayed
            this.currentPage = 1; //current page selected
            this.begin = 0;
            this.end = 10;
            var grafanaRoleVal = $cookies.get('grafanaRole');
            var self = this;
            var elem = document.querySelector('#homePageTemplateContainer');
            var homePageControllerScope = angular.element(elem).scope();
            var homePageController = homePageControllerScope['homePageController'];
            self.homeController = homePageController;
            self.getOrgs();
        }
        /* start code for buttons bar*/
        ApplicationManagementController.prototype.addApplication = function (params, addedApplicationName) {
            var self = this;
            var statusObject = {
                'status': false
            };
            self.$mdDialog.show({
                controller: ISightApp.ShowTemplateApplicationAddConformDialogController,
                controllerAs: 'showTemplateApplicationAddConformDialogController',
                templateUrl: './dist/modules/applicationManagement/view/conformApplicationAddDialogViewTemplate.tmp.html',
                parent: angular.element(document.body),
                targetEvent: params,
                preserveScope: true,
                clickOutsideToClose: true,
                locals: {
                    statusObject: statusObject,
                    addedApplicationName: addedApplicationName,
                },
                bindToController: true,
                onRemoving: function () { self.addApplicationConfirmation(statusObject.status); }
            });
        };
        ApplicationManagementController.prototype.showAddApplicationBox = function () {
            this.showApplicationAddedMessage = false;
            if (this.showAddApplication === false) {
                this.showAddApplication = true;
            }
            else {
                this.showAddApplication = false;
            }
        };
        ApplicationManagementController.prototype.goToUserOnBoard = function () {
            this.homeController.templateName = 'userOnboarding';
        };
        ApplicationManagementController.prototype.goToDataOnBoard = function () {
            this.homeController.templateName = 'dataOnboarding';
        };
        ApplicationManagementController.prototype.addApplicationConfirmation = function (status) {
            var self = this;
            if (status === true) {
                self.showApplicationAddedMessage = true;
                this.roleService
                    .createOrg(self.addNewApplicationName)
                    .then(function (data) {
                    self.getOrgs();
                });
            }
        };
        /* end code for buttons bar*/
        ApplicationManagementController.prototype.calculateOrgDetails = function (applicationsDetails) {
            var self = this;
            self.applicationsDetails = [];
            self.applicationsDetails = applicationsDetails;
            var _loop_1 = function (i) {
                self.applicationsDetails[i].totalusers = '';
                var orgId = self.applicationsDetails[i].id;
                self.roleService
                    .getOrgUserInfo(orgId)
                    .then(function (data) {
                    if (data.status = "success") {
                        self.applicationsDetails[i].totalusers = data.data.length;
                    }
                });
                self.applicationsDetails[i].dataOnboarded = "";
                self.onboardProjectService
                    .fetchProjectMappingByOrgId(orgId)
                    .then(function (data) {
                    if (data.status = "success") {
                        var toolsDataArray = data.data;
                        if (toolsDataArray.length > 0) {
                            for (var j = 0; j < toolsDataArray.length; j++) {
                                self.applicationsDetails[i].dataOnboarded = self.applicationsDetails[i].dataOnboarded.concat("   ");
                                self.applicationsDetails[i].dataOnboarded = self.applicationsDetails[i].dataOnboarded.concat(toolsDataArray[j].toolName);
                                self.applicationsDetails[i].dataOnboarded = self.applicationsDetails[i].dataOnboarded.concat("   ");
                                if (j !== toolsDataArray.length - 1) {
                                    self.applicationsDetails[i].dataOnboarded = self.applicationsDetails[i].dataOnboarded.concat(",");
                                }
                            }
                        }
                        else {
                            self.applicationsDetails[i].dataOnboarded = self.showMsgOnNoDataOnboarded;
                        }
                        if (self.applicationsDetails[self.applicationsDetails.length - 1].dataOnboarded !== "") {
                            self.showTemplateAfterLoad = true;
                        }
                    }
                });
            };
            for (var i = 0; i < self.applicationsDetails.length; i++) {
                _loop_1(i);
            }
        };
        ApplicationManagementController.prototype.filterSearchValue = function (applicationSearch) {
            var self = this;
            self.searchApplicationResult = applicationSearch;
        };
        ApplicationManagementController.prototype.setPage = function (pageNo) {
            this.currentPage = pageNo;
        };
        ;
        ApplicationManagementController.prototype.pageChanged = function () {
            //this.$log.log('Page changed to: ' + this.currentPage);
        };
        ;
        ApplicationManagementController.prototype.updateResult = function () {
            var self = this;
            self.begin = (self.currentPage - 1) * self.totalRows;
            self.end = self.begin + 10;
            self.updateTable();
        };
        ApplicationManagementController.prototype.updateTable = function () {
            var self = this;
            self.totalItems = self.appDataArray.length;
            self.paginatedAppDataArray = [];
            self.paginatedAppDataArray = self.appDataArray.slice(self.begin, self.end);
            self.calculateOrgDetails(self.paginatedAppDataArray);
        };
        ApplicationManagementController.prototype.getOrgs = function () {
            var self = this;
            self.roleService
                .getAllOrg()
                .then(function (data) {
                if (data.status === 'success') {
                    self.appDataArray = data.data;
                    if (self.appDataArray !== undefined && self.appDataArray.length !== 0) {
                        self.showTable = true;
                        self.updateTable();
                        self.applicationConfigured = true;
                        if (self.appDataArray.length > 10) {
                            self.showPaginationBar = true;
                        }
                    }
                    else if (self.appDataArray.length === 0) {
                        self.applicationConfigured = false;
                    }
                }
            });
        };
        ApplicationManagementController.$inject = ['$location', '$window', '$mdDialog', 'roleService', '$mdSidenav', '$route', '$cookies', 'onboardProjectService', '$log'];
        return ApplicationManagementController;
    }());
    ISightApp.ApplicationManagementController = ApplicationManagementController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=applicationManagementLandingController.js.map
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
//// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var ShowTemplateApplicationAddConformDialogController = /** @class */ (function () {
        function ShowTemplateApplicationAddConformDialogController($mdDialog, $route, $location) {
            this.$mdDialog = $mdDialog;
            this.$route = $route;
            this.$location = $location;
            this.notification = 'Adding an Access Group cannot be REVERTED. Once the Access Group name is added you will not be able to RENAME or DELETE the Access Group ';
            this.buttonText = 'OK';
            this.statusObject = this['locals'].statusObject;
            this.addedApplicationName = this['locals'].addedApplicationName;
        }
        ShowTemplateApplicationAddConformDialogController.prototype.hide = function () {
            this.$mdDialog.hide();
        };
        ShowTemplateApplicationAddConformDialogController.prototype.cancel = function () {
            this.$mdDialog.cancel();
        };
        ShowTemplateApplicationAddConformDialogController.prototype.finalConfirmation = function () {
            if (this.buttonText === 'Yes') {
                this.statusObject.status = true;
                this.hide();
            }
            else if (this.buttonText === 'OK') {
                this.notification = 'Are you sure you wish to add the New Access Group ';
                this.buttonText = 'Yes';
            }
        };
        ShowTemplateApplicationAddConformDialogController.$inject = ['$mdDialog', '$route', '$location'];
        return ShowTemplateApplicationAddConformDialogController;
    }());
    ISightApp.ShowTemplateApplicationAddConformDialogController = ShowTemplateApplicationAddConformDialogController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=conformApplicationAddDialogController.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var AuthenticationService = /** @class */ (function () {
        function AuthenticationService($location, $cookies, $resource, restEndpointService, restCallHandlerService) {
            this.$location = $location;
            this.$cookies = $cookies;
            this.$resource = $resource;
            this.restEndpointService = restEndpointService;
            this.restCallHandlerService = restCallHandlerService;
        }
        AuthenticationService.prototype.getAuthentication = function (authToken, msg) {
            if (authToken === undefined) {
                this.$location.path('/InSights/login');
            }
            else {
                var msg = "auth token exists";
            }
        };
        AuthenticationService.prototype.validateSession = function () {
            var authToken = this.$cookies.get('Authorization');
            if (authToken === undefined) {
                this.$cookies.remove('Authorization');
                this.$location.path('/InSights/login');
            }
            else {
                var dashboardSessionExpirationTime = this.$cookies.get('DashboardSessionExpiration');
                var date = new Date();
                if (new Date(dashboardSessionExpirationTime) > date) {
                    var minutes = 30;
                    date.setTime(date.getTime() + (minutes * 60 * 1000));
                    this.$cookies.put('Authorization', authToken, { expires: date });
                }
                else {
                    this.$cookies.remove('Authorization');
                    this.$location.path('/InSights/login');
                }
            }
        };
        AuthenticationService.prototype.logout = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("LOGOUT");
        };
        AuthenticationService.prototype.getGrafanaCurrentOrgAndRole = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("GRAPANA_CURRENT_ROLE_ORG");
        };
        AuthenticationService.prototype.getCurrentUserOrgs = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("ACCESS_GROUP_MANAGEMENT_GET_CURRENT_USER_ORGS");
        };
        AuthenticationService.$inject = ['$location', '$cookies', '$resource', 'restEndpointService', 'restCallHandlerService'];
        return AuthenticationService;
    }());
    ISightApp.AuthenticationService = AuthenticationService;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=authenticationService.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var RestEndpointService = /** @class */ (function () {
        function RestEndpointService($location, $http, $cookies, $resource) {
            this.$location = $location;
            this.$http = $http;
            this.$cookies = $cookies;
            this.$resource = $resource;
            this.configDesc = {};
            this.loadUiServiceLocation();
            this.loadAgentConfigDesc();
        }
        RestEndpointService.prototype.loadUiServiceLocation = function () {
            var self = this;
            if (this.serviceHost) {
                this.serviceHost;
            }
            else {
                var self_1 = this;
                var location_1 = this.$location;
                var uiConfigJsonUrl = location_1.absUrl().replace(location_1.path(), "");
                if (uiConfigJsonUrl.length > uiConfigJsonUrl.lastIndexOf('/')) {
                    uiConfigJsonUrl = uiConfigJsonUrl.substr(0, uiConfigJsonUrl.lastIndexOf('/'));
                }
                uiConfigJsonUrl += "/uiConfig.json";
                var configResource = this.$resource(uiConfigJsonUrl);
                var data = configResource.get().$promise.then(function (data) {
                    self_1.serviceHost = data.serviceHost;
                    self_1.elasticSearchServiceHost = data.elasticSearchServiceHost;
                    self_1.neo4jServiceHost = data.neo4jServiceHost;
                    self_1.grafanaHost = data.grafanaHost;
                });
                //self.grafanaHost = self.getGrafanaHost();
            }
        };
        RestEndpointService.prototype.loadAgentConfigDesc = function () {
            var self = this;
            var location = this.$location;
            var agentConfigJsonUrl = location.absUrl().replace(location.path(), "");
            if (agentConfigJsonUrl.length > agentConfigJsonUrl.lastIndexOf('/')) {
                agentConfigJsonUrl = agentConfigJsonUrl.substr(0, agentConfigJsonUrl.lastIndexOf('/'));
            }
            agentConfigJsonUrl += "/configDesc.json";
            var configResource = this.$resource(agentConfigJsonUrl);
            var data = configResource.get().$promise.then(function (data) {
                self.configDesc = data.desriptions;
            });
        };
        RestEndpointService.prototype.getServiceHost = function () {
            if (!this.serviceHost) {
                this.serviceHost = this.$location.protocol() + "://" + this.$location.host() + ":" + this.$location.port();
            }
            return this.serviceHost;
        };
        RestEndpointService.prototype.getConfigDesc = function () {
            return this.configDesc;
        };
        RestEndpointService.prototype.getelasticSearchServiceHost = function () {
            if (!this.elasticSearchServiceHost) {
                this.elasticSearchServiceHost = this.$location.protocol() + "://" + this.$location.host() + ":9200";
            }
            return this.elasticSearchServiceHost;
        };
        RestEndpointService.prototype.getNeo4jServiceHost = function () {
            if (!this.neo4jServiceHost) {
                this.neo4jServiceHost = this.$location.protocol() + "://" + this.$location.host() + ":7474";
            }
            return this.neo4jServiceHost;
        };
        RestEndpointService.prototype.getGrafanaHost = function () {
            if (!this.grafanaHost) {
                this.grafanaHost = this.$location.protocol() + "://" + this.$location.host() + ":3000";
            }
            return this.grafanaHost;
        };
        ;
        RestEndpointService.prototype.getGrafanaHost1 = function () {
            var self = this;
            var authToken = this.$cookies.get('Authorization');
            var defaultHeader = {
                'Authorization': authToken
            };
            var restcallUrl = this.$location.protocol() + "://" + this.$location.host() + ":" + this.$location.port() + "/PlatformService/configure/grafanaEndPoint";
            var resource = self.$resource(restcallUrl, {}, {
                allData: {
                    method: 'GET',
                    headers: defaultHeader
                }
            });
            return resource.allData().$promise;
        };
        RestEndpointService.$inject = ['$location', '$http', '$cookies', '$resource'];
        return RestEndpointService;
    }());
    ISightApp.RestEndpointService = RestEndpointService;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=restEndpointService.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var ConfiguredToolsController = /** @class */ (function () {
        function ConfiguredToolsController($location, $window, toolConfigService) {
            this.$location = $location;
            this.$window = $window;
            this.toolConfigService = toolConfigService;
            /* start for configured tools code*/
            this.configuredToolsList = [];
            this.configuredToolsListName = [];
            this.configuredToolsCount = {};
            this.totalConfiguredTools = 0;
            this.configuredToolsCategoryList = [];
            this.showTemplateAfterLoad = false;
            this.toolsData = [];
            this.toolsInfDataArray = [];
            var self = this;
            self.toolsData = self.toolConfigService.readToolsDataList();
            self.toolConfigService
                .readToolsConfigurationGlobal().then(function (data) {
                var dataArray = data.data;
                if (dataArray !== undefined) {
                    for (var i = 0; i < dataArray.length; i++) {
                        self.configuredToolsList.push(dataArray[i]);
                        self.configuredToolsListName.push(dataArray[i].toolName);
                        if (self.configuredToolsCategoryList.indexOf(dataArray[i].category) == -1) {
                            self.configuredToolsCategoryList.push(dataArray[i].category);
                        }
                    }
                }
                self.calculateConfiguredToolsCount();
                self.totalConfiguredTools = Object.keys(self.configuredToolsCount).length;
                self.showTemplateAfterLoad = true;
            });
            var elem = document.querySelector('#homePageTemplateContainer');
            var homePageControllerScope = angular.element(elem).scope();
            var homePageController = homePageControllerScope['homePageController'];
            this.homeController = homePageController;
        }
        ConfiguredToolsController.prototype.toToolsConfigurationLandingPage = function () {
            var self = this;
            this.homeController.templateName = 'toolsConfiguration';
        };
        ConfiguredToolsController.prototype.calculateConfiguredToolsCount = function () {
            var self = this;
            var toolsList = self.configuredToolsListName;
            for (var i = 0, j = toolsList.length; i < j; i++) {
                if (self.configuredToolsCount[toolsList[i]]) {
                    self.configuredToolsCount[toolsList[i]]++;
                }
                else {
                    self.configuredToolsCount[toolsList[i]] = 1;
                }
            }
        };
        ConfiguredToolsController.prototype.openToolUrl = function (toolCategory, toolName) {
            this.homeController.selectedToolName = toolName;
            this.homeController.selectedToolCategory = toolCategory;
            this.homeController.templateName = 'oneToolConfigured';
        };
        ConfiguredToolsController.prototype.getCategory = function (toolName) {
            var self = this;
            for (var i = 0; i < self.configuredToolsList.length; i++) {
                if (self.configuredToolsList[i].toolName === toolName) {
                    return self.configuredToolsList[i].category;
                }
            }
        };
        ConfiguredToolsController.$inject = ['$location', '$window', 'toolConfigService'];
        return ConfiguredToolsController;
    }());
    ISightApp.ConfiguredToolsController = ConfiguredToolsController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=configuredToolsController.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var DashboardController = /** @class */ (function () {
        function DashboardController(elasticSearchService, dashboardService, $sce, $mdSidenav, $location, $timeout, restEndpointService, $rootScope, $cookies, authenticationService, $resource) {
            this.elasticSearchService = elasticSearchService;
            this.dashboardService = dashboardService;
            this.$sce = $sce;
            this.$mdSidenav = $mdSidenav;
            this.$location = $location;
            this.$timeout = $timeout;
            this.restEndpointService = restEndpointService;
            this.$rootScope = $rootScope;
            this.$cookies = $cookies;
            this.authenticationService = authenticationService;
            this.$resource = $resource;
            //new DashboardModel('Continuous Delivery Measurement Dashboard', 'Pipeline_Dashboard', null, "./dist/modules/pipeline/view/pipelineView.html", 'Pipeline Dashboard', false)
            this.iSightDashboards = [];
            this.icon = {
                iconSrc: 'dist/icons/svg/ic_dashboard_24px.svg'
            };
            //grafanahostUrl: string;
            this.trustedHost = false;
            this.trustedUrl = false;
            this.orgList = [];
            this.dashboards = [];
            this.setSelectedDashboard = function (dashboard) {
                this.selectedDashboard = dashboard;
                this.dashboardTitle = dashboard.title;
                if (dashboard.iframeUrl && !dashboard.trustedUrl) {
                    this.selectedDashboard.iframeUrl = this.$sce.trustAsResourceUrl(dashboard.iframeUrl);
                    this.selectedDashboard.trustedUrl = true;
                }
            };
            var self = this;
            $rootScope.$watch('refreshDashboard', function () {
                self.getDashboards();
            });
            this.loadorganizations();
            self.iframeStyle = 'width:100%; height:1600px;';
            var receiveMessage = function (evt) {
                var height = parseInt(evt.data);
                if (!isNaN(height)) {
                    self.iframeStyle = 'width:100%; height:' + (evt.data + 20) + 'px';
                    $timeout(0);
                }
                else {
                    self.dashboardTitle = evt.data;
                    $timeout(0);
                }
            };
            window.addEventListener('message', receiveMessage, false);
            var elem = document.querySelector('#homePageTemplateContainer');
            var homePageControllerScope = angular.element(elem).scope();
            var homePageController = homePageControllerScope['homePageController'];
            this.homeController = homePageController;
            this.homeController.templateName = 'dashboards';
            this.homeController.imageurl5 = "dist/icons/svg/landingPage/playlist_normal.svg";
        }
        DashboardController.prototype.toggleSideNav = function (navId, closeSideNav) {
            if (closeSideNav) {
                this.$mdSidenav(navId).close();
            }
            else {
                this.$mdSidenav(navId).toggle();
            }
        };
        DashboardController.prototype.loadorganizations = function () {
            var self = this;
            this.dashboardService
                .getCurrentUserOrgs()
                .then(function (orgData) {
                var orgDataArray = orgData.data;
                self.orgList = orgDataArray;
                self.dashboardService
                    .getUsers()
                    .then(function (userData) {
                    var grafanaOrgId = userData.data.orgId;
                    self.defaultOrg = grafanaOrgId;
                    for (var key in self.orgList) {
                        var orgDtl = self.orgList[key];
                        if (orgDtl.id === grafanaOrgId) {
                            self.selectedApp = orgDtl.name;
                        }
                    }
                    self.getDashboards();
                });
            });
        };
        DashboardController.prototype.switchOrganizations = function (orgId) {
            var self = this;
            self.defaultOrg = orgId;
            self.checkStyle(orgId);
            self.dashboardService
                .switchUserOrg(orgId)
                .then(function (selOrgStatus) {
                self.$rootScope.refreshDashboard = new Date();
                if (selOrgStatus.status === 'success') {
                    self.getDashboards();
                }
                self.authenticationService.getGrafanaCurrentOrgAndRole()
                    .then(function (data) {
                    if (data.grafanaCurrentOrgRole === 'Admin') {
                        self.homeController.showAdminTab = true;
                        if (self.homeController.showInsightsTab) {
                            self.homeController.selectedIndex = 2;
                        }
                        else {
                            self.homeController.selectedIndex = 1;
                        }
                    }
                    else {
                        self.homeController.showAdminTab = false;
                        if (self.homeController.showInsightsTab) {
                            self.homeController.selectedIndex = 1;
                        }
                        else {
                            self.homeController.selectedIndex = 0;
                        }
                    }
                    self.$cookies.put('grafanaRole', data.grafanaCurrentOrgRole);
                    self.$cookies.put('grafanaOrg', data.grafanaCurrentOrg);
                    if (data.userName != undefined) {
                        self.homeController.userName = data.userName.replace(/['"]+/g, '');
                    }
                    self.homeController.userRole = data.grafanaCurrentOrgRole;
                    self.homeController.userCurrentOrg = data.grafanaCurrentOrg;
                    self.authenticationService.getCurrentUserOrgs()
                        .then(function (orgdata) {
                        self.homeController.userCurrentOrgName = orgdata.data.filter(function (i) {
                            return i.orgId == self.homeController.userCurrentOrg;
                        });
                    });
                });
            });
        };
        DashboardController.prototype.checkStyle = function (orgId) {
            if (orgId == this.defaultOrg) {
                return "background-color: #f1f1f1";
            }
            else {
                return "";
            }
        };
        DashboardController.prototype.getDashboards = function () {
            var self = this;
            this.elasticSearchService
                .loadKibanaIndex()
                .then(function (dashboardData) {
                var dataArray = dashboardData.dashboards;
                var model = [];
                dataArray.forEach(function (element) {
                    model.push(new ISightApp.DashboardModel(element.title, element.id, element.url, null, element.title, false));
                });
                self.dashboards = model;
                self.setSelectedDashboard(model[0]);
                if (self.homeController.selectedDashboardUrl && self.homeController.selectedDashboardUrl.trim().length != 0) {
                    var dashbmodel = new ISightApp.DashboardModel(null, null, self.homeController.selectedDashboardUrl, null, null, false);
                    self.setSelectedDashboard(dashbmodel);
                }
                if (self.selectedDashboard) {
                    self.dashboardTitle = self.selectedDashboard.title;
                }
            });
            this.homeController.templateName = 'dashboards';
        };
        DashboardController.$inject = ['elasticSearchService', 'dashboardService', '$sce',
            '$mdSidenav', '$location', '$timeout', 'restEndpointService', '$rootScope', '$cookies', 'authenticationService', '$resource'];
        return DashboardController;
    }());
    ISightApp.DashboardController = DashboardController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=dashboardController.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var DashboardModel = /** @class */ (function () {
        function DashboardModel(title, id, iframeUrl, templatePath, buttonLabel, trustedUrl) {
            this.title = title;
            this.id = id;
            this.iframeUrl = iframeUrl;
            this.templatePath = templatePath;
            this.buttonLabel = buttonLabel;
            this.trustedUrl = trustedUrl;
        }
        return DashboardModel;
    }());
    ISightApp.DashboardModel = DashboardModel;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=dashboardModels.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var DashboardService = /** @class */ (function () {
        function DashboardService($resource, $cookies, restCallHandlerService) {
            this.$resource = $resource;
            this.$cookies = $cookies;
            this.restCallHandlerService = restCallHandlerService;
        }
        DashboardService.prototype.loadOrganizations = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("ORGS_GET");
        };
        DashboardService.prototype.switchUserOrg = function (orgId) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("ACCESS_GROUP_MANAGEMENT_SWITCH_ORGS", { "orgId": orgId }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        DashboardService.prototype.loginUserAuthentication = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("USER_AUTHNTICATE");
        };
        DashboardService.prototype.getCurrentUserOrgs = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("ACCESS_GROUP_MANAGEMENT_GET_CURRENT_USER_ORGS");
        };
        DashboardService.prototype.getUsers = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("ACCESS_GROUP_MANAGEMENT_GET_USERS");
        };
        DashboardService.$inject = ['$resource', '$cookies', 'restCallHandlerService'];
        return DashboardService;
    }());
    ISightApp.DashboardService = DashboardService;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=dashboardService.js.map
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var FileUploadController = /** @class */ (function () {
        function FileUploadController($scope, $cookies, $http, dataOnBoardingService, restAPIUrlService, $window) {
            this.$scope = $scope;
            this.$cookies = $cookies;
            this.$http = $http;
            this.dataOnBoardingService = dataOnBoardingService;
            this.restAPIUrlService = restAPIUrlService;
            this.$window = $window;
            var self = this;
            var elem = document.querySelector('#homePageTemplateContainer');
            var homePageControllerScope = angular.element(elem).scope();
            var homePageController = homePageControllerScope['homePageController'];
            this.initApp(this.$scope, this.$cookies, this.$http, this.dataOnBoardingService, homePageController, restAPIUrlService, this.$window);
        }
        FileUploadController.prototype.initApp = function ($scope, $cookies, $http, dataOnBoardingService, homePageController, restAPIUrlService, $window) {
            var dropbox = document.getElementById("dropbox");
            $scope.dropText = 'Drop files here...';
            $scope.tableData = [];
            $scope.lines = [];
            $scope.headers = [];
            $scope.showError = false;
            $scope.showErrorMessage = "";
            $scope.selectedType = "";
            $scope.showTextArea = false;
            // init event handlers
            function dragEnterLeave(evt) {
                evt.stopPropagation();
                evt.preventDefault();
                $scope.$apply(function () {
                    $scope.dropText = 'Drop files here...';
                    $scope.dropClass = '';
                });
            }
            dropbox.addEventListener("dragenter", dragEnterLeave, false);
            dropbox.addEventListener("dragleave", dragEnterLeave, false);
            dropbox.addEventListener("dragover", function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                var clazz = 'not-available';
                var ok = evt.dataTransfer && evt.dataTransfer.types && evt.dataTransfer.types.indexOf('Files') >= 0;
                $scope.$apply(function () {
                    $scope.dropText = ok ? 'Drop files here...' : 'Only files are allowed!';
                    $scope.dropClass = ok ? 'over' : 'not-available';
                });
            }, false);
            dropbox.addEventListener("drop", function (evt) {
                console.log('drop evt:', JSON.parse(JSON.stringify(evt.dataTransfer)));
                evt.stopPropagation();
                evt.preventDefault();
                $scope.$apply(function () {
                    $scope.dropText = 'Drop files here...';
                    $scope.dropClass = '';
                });
                var files = evt.dataTransfer.files;
                if (files.length > 0) {
                    $scope.$apply(function () {
                        $scope.files = [];
                        for (var i = 0; i < files.length; i++) {
                            $scope.files.push(files[i]);
                        }
                    });
                }
            }, false);
            //============== DRAG & DROP =============
            $scope.setFiles = function (element) {
                $scope.showUploadingThrobber = true;
                $scope.isTypeError = false;
                var testFileExt = checkFile(element.files[0], ".csv");
                $scope.showUploadingThrobber = false;
                if (testFileExt) {
                    $scope.$apply(function ($scope) {
                        // Turn the FileList object into an Array
                        $scope.files = [];
                        for (var i = 0; i < element.files.length; i++) {
                            $scope.files.push(element.files[i]);
                        }
                        $scope.progressVisible = false;
                    });
                }
            };
            function csv2Array(fileInput) {
                //read file from input
                var fileReaded = fileInput;
                var reader = new FileReader();
                reader.readAsText(fileReaded);
                reader.onload = function (e) {
                    var csv = reader.result;
                    var allTextLines = csv.split(/\r|\n|\r/);
                    allTextLines[0] = allTextLines[0].replace(/"/g, "");
                    var headers = allTextLines[0].split(',');
                    $scope.headers = headers;
                    $scope.lines = [];
                    for (var i = 1; i < allTextLines.length; i++) {
                        // split content based on comma
                        allTextLines[i] = allTextLines[i].replace(/"/g, "");
                        var data = allTextLines[i].split(',');
                        if (data.length === headers.length) {
                            var tarr = {};
                            for (var j = 0; j < headers.length; j++) {
                                tarr[headers[j]] = data[j];
                            }
                            $scope.lines.push(tarr);
                        }
                    }
                    $scope.$apply();
                };
            }
            $scope.previewData = function () {
                csv2Array($scope.files[0]);
            };
            $scope.changeSelected = function () {
                if ($scope.selectedType && $scope.selectedType.length > 0) {
                    $scope.showTextArea = true;
                }
            };
            $scope.uploadFile = function () {
                var fd = new FormData();
                for (var i in $scope.files) {
                    fd.append("file", $scope.files[i]);
                }
                fd.append("action", $scope.selectedType);
                $scope.showThrobber = true;
                var authToken = $cookies.get('Authorization');
                var restCallUrl = restAPIUrlService.getRestCallUrl("UPLOAD_HIERARCHY_DETAILS");
                $scope.showDisabled = true;
                $http.post(restCallUrl, fd, {
                    headers: {
                        'Content-Type': undefined,
                        'Authorization': authToken
                    },
                    transformRequest: angular.identity
                }).then(function (data, status, headers, config) {
                    $scope.showThrobber = false;
                    $scope.showDisabled = false;
                    if (data.data.status == "failure") {
                        $scope.showError = true;
                        $scope.showErrorMessage = data.data.message;
                        $window.scrollTo(0, 0);
                    }
                    else {
                        homePageController.templateName = 'dataTaggingDetails';
                    }
                }, function (data) {
                    $scope.showThrobber = false;
                    $scope.showDisabled = false;
                    $scope.showError = true;
                });
            };
            $scope.JSONToCSVConvertor = function () {
                dataOnBoardingService.getMetaData().then(function (response) {
                    var JSONData = response.data;
                    var ReportTitle = "Test";
                    var ShowLabel = true;
                    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
                    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
                    var colArr = ["metadata_id", "level_1", "level_2", "level_3", "level_4", "toolName", "toolProperty1", "propertyValue1", "toolProperty2", "propertyValue2", "toolProperty3", "propertyValue3", "toolProperty4", "propertyValue4", "Action"];
                    var CSV = '';
                    //Set Report title in first row or line
                    //CSV += ReportTitle + '\r\n\n';
                    //This condition will generate the Label/Header
                    if (ShowLabel) {
                        var row = "";
                        //This loop will extract the label from 1st index of on array
                        for (var index in colArr) {
                            //Now convert each value to string and comma-seprated
                            row += colArr[index] + ',';
                        }
                        row = row.slice(0, -1);
                        //append Label row with line break
                        CSV += row + '\r\n';
                    }
                    //1st loop is to extract each row
                    for (var i = 0; i < arrData.length; i++) {
                        var row = "";
                        //2nd loop will extract each column and convert it in string comma-seprated
                        for (var j = 0; j < colArr.length; j++) {
                            if (!(j == colArr.length - 1)) {
                                row += arrData[i].propertyMap[colArr[j]];
                            }
                            if (j !== colArr.length - 1) {
                                row += ',';
                            }
                        }
                        row.slice(0, row.length - 1);
                        //add a line break after each row
                        CSV += row + '\r\n';
                    }
                    if (CSV == '') {
                        alert("Invalid data");
                        return;
                    }
                    //Generate a file name
                    var fileName = "BusinessMapping";
                    //this will remove the blank-spaces from the title and replace it with an underscore
                    //fileName += ReportTitle.replace(/ /g,"_");   
                    //Initialize file format you want csv or xls
                    var uri = 'data:text/csv;charset=utf-8,' + encodeURI(CSV);
                    //this trick will generate a temp <a /> tag
                    var link = document.createElement("a");
                    link.href = uri;
                    //set the visibility hidden so it will not effect on your web-layout
                    //link.style = "visibility:hidden";
                    link.download = fileName + ".csv";
                    //this part will append the anchor tag and remove it after automatic click
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                });
            };
            function uploadProgress(evt) {
                $scope.$apply(function () {
                    if (evt.lengthComputable) {
                        $scope.progress = Math.round(evt.loaded * 100 / evt.total);
                    }
                    else {
                        $scope.progress = 'unable to compute';
                    }
                });
            }
            function uploadComplete(evt) {
                /* This event is raised when the server send back a response */
                alert(evt.target.responseText);
            }
            function uploadFailed(evt) {
                alert("There was an error attempting to upload the file.");
            }
            function uploadCanceled(evt) {
                $scope.$apply(function () {
                    $scope.progressVisible = false;
                });
                alert("The upload has been canceled by the user or the browser dropped the connection.");
            }
            function checkFile(sender, validExts) {
                if (sender) {
                    var fileExt = sender.name;
                    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
                    if (validExts.indexOf(fileExt) < 0 && fileExt != "") {
                        $scope.isTypeError = true;
                        document.getElementById("fileInp").value = "";
                        return false;
                    }
                    else
                        return true;
                }
            }
        };
        FileUploadController.$inject = ['$scope', '$cookies', '$http', 'dataOnBoardingService', 'restAPIUrlService', '$window'];
        return FileUploadController;
    }());
    ISightApp.FileUploadController = FileUploadController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=FileUploadController.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var DataMappingController = /** @class */ (function () {
        function DataMappingController($mdDialog, $route, dataTaggingService, restEndpointService) {
            this.$mdDialog = $mdDialog;
            this.$route = $route;
            this.dataTaggingService = dataTaggingService;
            this.restEndpointService = restEndpointService;
            this.hierarchyList = [];
            this.count = 1;
            this.orgList = [];
            this.addButtIcon = "dist/icons/svg/oneToolsConfigIcons/Add_icon_disabled.svg";
            this.deleteButtIcon = "dist/icons/svg/oneToolsConfigIcons/Delete_icon_disabled.svg";
            this.editButtIcon = "dist/icons/svg/userOnboarding/Edit_icon_disabled.svg";
            this.showActions = false;
            this.mapping = new ISightApp.Mapping();
            this.mappingDefModel = new ISightApp.MappingDefinitionModel();
            this.shuldAddEntity = false;
            this.mappingDefinationArray = [];
            this.hierarchyMapping = {};
            this.orgList = this['locals'].orgList;
            this.hierarchyList = this['locals'].hierarchyList;
            this.hierarchyMapping = this['locals'].hierarchyMapping;
            this.addOrgMapping();
            this.fetchHierarchyMapping();
            this.showActions = false;
        }
        DataMappingController.prototype.hide = function () {
            this.$mdDialog.hide();
        };
        DataMappingController.prototype.cancel = function () {
            this.$mdDialog.cancel();
        };
        DataMappingController.prototype.addOrgMapping = function () {
            this.showActions = false;
            var rowLength = this.mappingDefModel.mappingDefinitionRows.length + 1;
            var insertMapping = new ISightApp.Mapping();
            insertMapping.rowId = rowLength;
            this.mappingDefModel.mappingDefinitionRows.push(insertMapping);
            this.addButtIcon = "dist/icons/svg/oneToolsConfigIcons/Add_icon_disabled.svg";
            console.log(this.mappingDefModel.mappingDefinitionRows);
        };
        DataMappingController.prototype.changeButtonstatus = function () {
            this.showActions = true;
            this.addButtIcon = "dist/icons/svg/oneToolsConfigIcons/Add_icon_MouseOver.svg";
            this.deleteButtIcon = "dist/icons/svg/oneToolsConfigIcons/Delete_icon_MouseOver.svg";
            this.editButtIcon = "dist/icons/svg/userOnboarding/Edit_icon_MouseOver.svg";
        };
        DataMappingController.prototype.addEntity = function () {
            this.shuldAddEntity = true;
        };
        DataMappingController.prototype.addOrgHierarchyMapping = function () {
            var self = this;
            var mappingArr = self.mappingDefModel.mappingDefinitionRows;
            for (var mapping in mappingArr) {
                var hierarchyMappRowDetails = mappingArr[mapping];
                if (hierarchyMappRowDetails.hierarchyName != undefined && hierarchyMappRowDetails.orgName != undefined) {
                    self.dataTaggingService
                        .addHierarchyMapping(hierarchyMappRowDetails.rowId, hierarchyMappRowDetails.hierarchyName, hierarchyMappRowDetails.orgName, 1)
                        .then(function (data) {
                        if (data.status === "success") {
                            hierarchyMappRowDetails.isMappingDefSaved = true;
                        }
                        else {
                            hierarchyMappRowDetails.isMappingDefSaved = false;
                        }
                    });
                }
            }
            this.hide();
        };
        DataMappingController.prototype.fetchHierarchyMapping = function () {
            var self = this;
            self.dataTaggingService.getAllHierarchyMapping()
                .then(function (data) {
                var fetchedHierarchyMapData = data.data;
                if (fetchedHierarchyMapData.length != 0) {
                    self.showActions = true;
                    self.addButtIcon = "dist/icons/svg/actionIcons/Add_icon_MouseOver.svg";
                    self.deleteButtIcon = "dist/icons/svg/actionIcons/Delete_icon_MouseOver.svg";
                    self.mappingDefModel.mappingDefinitionRows = [];
                    for (var _i = 0, fetchedHierarchyMapData_1 = fetchedHierarchyMapData; _i < fetchedHierarchyMapData_1.length; _i++) {
                        var jsonObject = fetchedHierarchyMapData_1[_i];
                        var fetchedData = new ISightApp.Mapping();
                        fetchedData.hierarchyName = jsonObject["hierarchyName"];
                        fetchedData.orgName = jsonObject["orgName"];
                        fetchedData.orgId = jsonObject["orgId"];
                        fetchedData.rowId = jsonObject["rowId"];
                        fetchedData.isMappingDefSaved = true;
                        self.mappingDefModel.mappingDefinitionRows.push(fetchedData);
                    }
                }
                else if (fetchedHierarchyMapData.length === 0) {
                    self.addButtIcon = "dist/icons/svg/oneToolsConfigIcons/Add_icon_disabled.svg";
                    self.mappingDefModel.mappingDefinitionRows = [];
                    var rowLength = self.mappingDefModel.mappingDefinitionRows.length + 1;
                    var insertTool = new ISightApp.Mapping();
                    insertTool.rowId = rowLength;
                    insertTool.isMappingDefSaved = false;
                    self.mappingDefModel.mappingDefinitionRows.push(insertTool);
                }
            });
        };
        DataMappingController.prototype.deleteAction = function (hierarchyName, orgName, rowId, isMappingDefSaved) {
            this.showActions = false;
            if (isMappingDefSaved === true) {
                if (hierarchyName != undefined) {
                    var self = this;
                    self.dataTaggingService
                        .deleteHierarchyMap(hierarchyName, orgName)
                        .then(function (data) {
                        if (data.status === "success") {
                            self.fetchHierarchyMapping();
                        }
                    });
                }
            }
            else {
                for (var i = 0; i < this.mappingDefModel.mappingDefinitionRows.length; i++) {
                    var obj = this.mappingDefModel.mappingDefinitionRows[i];
                    if (obj.rowId === rowId && rowId != 1) {
                        this.mappingDefModel.mappingDefinitionRows.splice(i, 1);
                        i--;
                        break;
                    }
                    else {
                        this.mappingDefModel.mappingDefinitionRows = [];
                        var rowLength = this.mappingDefModel.mappingDefinitionRows.length + 1;
                        var insertMapping = new ISightApp.Mapping();
                        insertMapping.rowId = rowLength;
                        this.mappingDefModel.mappingDefinitionRows.push(insertMapping);
                        this.addButtIcon = "dist/icons/svg/oneToolsConfigIcons/Add_icon_disabled.svg";
                    }
                }
                this.changeButtonstatus();
            }
        };
        DataMappingController.$inject = ['$mdDialog', '$route', 'dataTaggingService', 'restEndpointService'];
        return DataMappingController;
    }());
    ISightApp.DataMappingController = DataMappingController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=dataMappingController.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var DataOnBoardingController = /** @class */ (function () {
        function DataOnBoardingController(restEndpointService, onboardProjectService, dataTaggingService, $cookies, $location, $window, $mdDialog, roleService) {
            this.restEndpointService = restEndpointService;
            this.onboardProjectService = onboardProjectService;
            this.dataTaggingService = dataTaggingService;
            this.$cookies = $cookies;
            this.$location = $location;
            this.$window = $window;
            this.$mdDialog = $mdDialog;
            this.roleService = roleService;
            this.showAddApplication = false;
            this.orgList = [];
            this.notAuthorizeMsg = "";
            this.toolsRowModel = new ISightApp.ToolRowsModel();
            this.oboardProjectModel = new ISightApp.OnboardProjectDataModel();
            this.toolsList = [];
            this.fieldList = [];
            this.projectDetails = {};
            this.fieldValList = [];
            this.fetchedToolsData = [];
            this.toolsFieldsArrayJson = {};
            this.toolsFieldsValueArrayJson = {};
            this.saveToolCategory = "";
            this.searchToolData = "";
            this.searchSelectedToolData = "";
            this.toolCategoryArray = [];
            this.showTemplateAfterLoad = false;
            this.disableAddButtonStatus = true;
            this.addButtonIcon = "dist/icons/svg/oneToolsConfigIcons/Add_icon_disabled.svg";
            this.disableSaveButtonStatus = true;
            this.saveButtonIcon = "dist/icons/svg/oneToolsConfigIcons/Save_icon_Disabled.svg";
            this.showApplicationAddedMessage = false;
            this.disableDeleteButtonStatus = true;
            this.deleteButtonIcon = "dist/icons/svg/oneToolsConfigIcons/Delete_icon_disabled.svg";
            this.hierarchyList = [];
            this.heirarchy = new ISightApp.Mapping();
            this.heirarchyDefModel = new ISightApp.MappingDefinitionModel();
            this.totalRows = 10; //total items per page
            this.maxSize = 4; // total pages blocks will be displayed
            this.currentPage = 1; //current page selected
            this.begin = 0;
            this.end = 10;
            this.paginatedDataOnboardedArray = [];
            this.showPaginationBar = false;
            var elem = document.querySelector('#homePageTemplateContainer');
            var homePageControllerScope = angular.element(elem).scope();
            var homePageController = homePageControllerScope['homePageController'];
            this.homeController = homePageController;
            var self = this;
            this.onboardProjectService
                .getAllOrg()
                .then(function (data) {
                var orgDataArray = data.data;
                self.orgList = orgDataArray;
                self.createAction(self.orgList[0].name);
                //self.selectedProj = self.orgList[0].name;
            });
            this.onboardProjectService
                .getAllHierarchyName()
                .then(function (data) {
                var orgDataArray = data.data;
                self.hierarchyList = orgDataArray;
                self.selectedHierarchy = self.hierarchyList[0];
                self.onSelectionOfHierarchy(self.hierarchyList[0]);
            });
            this.toolSelection(1);
        }
        DataOnBoardingController.prototype.addApplication = function (params, addedApplicationName) {
            var self = this;
            var statusObject = {
                'status': false
            };
            self.$mdDialog.show({
                controller: ISightApp.ShowTemplateApplicationAddConformDialogController,
                controllerAs: 'showTemplateApplicationAddConformDialogController',
                templateUrl: './dist/modules/applicationManagement/view/conformApplicationAddDialogViewTemplate.tmp.html',
                parent: angular.element(document.body),
                targetEvent: params,
                preserveScope: true,
                clickOutsideToClose: true,
                locals: {
                    statusObject: statusObject,
                    addedApplicationName: addedApplicationName,
                },
                bindToController: true,
                onRemoving: function () { self.addApplicationConfirmation(statusObject.status); }
            });
        };
        DataOnBoardingController.prototype.addApplicationConfirmation = function (status) {
            var self = this;
            if (status === true) {
                self.showApplicationAddedMessage = true;
                this.roleService
                    .createOrg(self.addNewApplicationName)
                    .then(function (data) {
                    var newAppData = {};
                    newAppData["name"] = self.addNewApplicationName;
                    newAppData["id"] = data.orgId;
                    newAppData["totalusers"] = 1;
                });
            }
        };
        DataOnBoardingController.prototype.goToOnBoard = function () {
            this.homeController.templateName = 'userOnboarding';
        };
        DataOnBoardingController.prototype.goToDataTagging = function () {
            this.homeController.templateName = 'dataTagging';
        };
        DataOnBoardingController.prototype.showAddApplicationBox = function () {
            this.showApplicationAddedMessage = false;
            if (this.showAddApplication === false) {
                this.showAddApplication = true;
            }
            else {
                this.showAddApplication = false;
            }
        };
        DataOnBoardingController.prototype.searchtool = function () {
            var self = this;
            self.searchSelectedToolData = self.searchToolData;
        };
        DataOnBoardingController.prototype.toolSelection = function (rowId) {
            var self = this;
            self.onboardProjectService
                .getToolName()
                .then(function (data) {
                self.toolsList[rowId] = data.data;
                for (var i = 0; i < self.toolsList[rowId].length; i++) {
                    self.toolsFieldsArrayJson[self.toolsList[rowId][i]] = [];
                }
            });
        };
        DataOnBoardingController.prototype.createAction = function (orgName) {
            this.showThrobber = true;
            this.toolsRowModel.toolRows = [];
            this.saveMsg = "";
            for (var key in this.orgList) {
                var orgDtl = this.orgList[key];
                if (orgDtl.name === orgName) {
                    this.orgId = orgDtl.id;
                }
            }
            //this.fetchProjectMapping();
        };
        DataOnBoardingController.prototype.onSelectionOfHierarchy = function (hierarchyName) {
            this.showThrobber = true;
            this.toolsRowModel.toolRows = [];
            this.noHierarchyMsg = '';
            this.saveMsg = "";
            var self = this;
            this.fetchProjectMapping();
        };
        DataOnBoardingController.prototype.fetchAutocompleteArray = function () {
            var self = this;
            self.toolCategoryArray = [];
            for (var i = 0; i < self.toolsRowModel.toolRows.length; i++) {
                if (self.toolCategoryArray.indexOf(self.toolsRowModel.toolRows[i].selectedTool) === -1) {
                    self.toolCategoryArray.push(self.toolsRowModel.toolRows[i].selectedTool);
                }
            }
        };
        DataOnBoardingController.prototype.fetchProjectMapping = function () {
            var self = this;
            self.onboardProjectService
                .fetchProjectMappingByHierarchyName(self.selectedHierarchy)
                .then(function (data) {
                var fetchedToolsData = data.data;
                if (fetchedToolsData.length != 0) {
                    self.showThrobber = false;
                    self.noHierarchyMsg = '';
                    self.disableAddButtonStatus = false;
                    self.addButtonIcon = "dist/icons/svg/oneToolsConfigIcons/Add_icon_MouseOver.svg";
                    for (var _i = 0, fetchedToolsData_1 = fetchedToolsData; _i < fetchedToolsData_1.length; _i++) {
                        var jsonObject = fetchedToolsData_1[_i];
                        var fetchedData = new ISightApp.OnboardProjectDataModel();
                        fetchedData.selectedFieldName = jsonObject["fieldName"];
                        fetchedData.selectedTool = jsonObject["toolName"];
                        fetchedData.toolCategory = jsonObject["category"];
                        fetchedData.selectedFieldValues = jsonObject["fieldValue"];
                        fetchedData.toolId = jsonObject["rowId"];
                        fetchedData.isSaved = true;
                        self.toolsRowModel.toolRows.push(fetchedData);
                    }
                    self.fetchAutocompleteArray();
                }
                else if (self.hierarchyList.length !== 0) {
                    self.showThrobber = false;
                    self.disableAddButtonStatus = true;
                    self.addButtonIcon = "dist/icons/svg/oneToolsConfigIcons/Add_icon_disabled.svg";
                    self.toolsRowModel.toolRows = [];
                    var rowLength = self.toolsRowModel.toolRows.length + 1;
                    var insertTool = new ISightApp.OnboardProjectDataModel();
                    insertTool.toolId = rowLength;
                    insertTool.toolCategory = "";
                    insertTool.isSaved = false;
                    self.toolsRowModel.toolRows.push(insertTool);
                }
                else if (self.hierarchyList.length === 0) {
                    self.showThrobber = false;
                    self.noHierarchyMsg = "No Hierarchy Added. Please add hierarchy using Data Tagging";
                }
                self.checkRecordCount();
                self.updateTable();
                self.showTemplateAfterLoad = true;
                self.showThrobber = false;
            });
        };
        DataOnBoardingController.prototype.fieldSelection = function (selectedTool, toolId) {
            var self = this;
            var _loop_1 = function (i) {
                if (self.toolsRowModel.toolRows[i].toolId === toolId) {
                    self.onboardProjectService
                        .getToolcat(self.toolsRowModel.toolRows[i].selectedTool)
                        .then(function (data) {
                        if (self.toolsRowModel.toolRows[i].toolCategory === undefined) {
                            self.toolsRowModel.toolRows[i].toolCategory = data.data[0];
                        }
                    });
                }
            };
            for (var i = 0; i < self.toolsRowModel.toolRows.length; i++) {
                _loop_1(i);
            }
            if (self.toolsFieldsArrayJson[selectedTool].length !== 0) {
            }
            else {
                self.onboardProjectService
                    .getPrjtMappingFields(selectedTool)
                    .then(function (data) {
                    if (data.data.nodes[0] !== undefined) {
                        var fieldListObject = data.data.nodes[0].propertyMap;
                        var fieldsListArray = Object.keys(fieldListObject);
                        for (var tool in self.toolsFieldsArrayJson) {
                            if (tool === selectedTool) {
                                self.toolsFieldsArrayJson[tool] = fieldsListArray;
                            }
                        }
                    }
                });
            }
        };
        DataOnBoardingController.prototype.fieldValueSelection = function (selectedTool, selectedField, toolId) {
            var self = this;
            self.projectToolMapping(selectedTool, toolId);
            self.onboardProjectService
                .getPrjtMappingFieldVal(selectedTool, selectedField)
                .then(function (data) {
                var fieldValListArry = data.data.nodes;
                var propertyVal = [];
                for (var key in fieldValListArry) {
                    if (fieldValListArry[key] !== undefined) {
                        propertyVal.push(fieldValListArry[key].propertyMap.row);
                    }
                    var rowSpecificToolId = selectedTool + "_" + toolId;
                    self.toolsFieldsValueArrayJson[rowSpecificToolId] = propertyVal;
                }
            });
        };
        DataOnBoardingController.prototype.addAction = function (toolName, rowId) {
            this.disableAddButtonStatus = true;
            this.addButtonIcon = "dist/icons/svg/oneToolsConfigIcons/Add_icon_disabled.svg";
            this.disableSaveButtonStatus = true;
            this.saveButtonIcon = "dist/icons/svg/oneToolsConfigIcons/Save_icon_Disabled.svg";
            this.saveMsg = "";
            var toolsIdArray = [];
            for (var i = 0; i < this.toolsRowModel.toolRows.length; i++) {
                if (this.toolsRowModel.toolRows[i]['toolId'] !== undefined)
                    toolsIdArray.push(this.toolsRowModel.toolRows[i]['toolId']);
            }
            ;
            toolsIdArray.sort(this.agentIdSort);
            var rowLength = parseInt(toolsIdArray[toolsIdArray.length - 1]) + 1;
            var insertTool = new ISightApp.OnboardProjectDataModel();
            insertTool.toolId = rowLength;
            insertTool.toolCategory = "";
            insertTool.isSaved = false;
            this.toolsRowModel.toolRows.push(insertTool);
            this.updateTable();
        };
        DataOnBoardingController.prototype.agentIdSort = function (a, b) {
            var d = a - b;
            return d;
        };
        ;
        DataOnBoardingController.prototype.projectToolMapping = function (toolName, toolId) {
            var self = this;
            self.onboardProjectService
                .getToolcat(toolName)
                .then(function (data) {
                if (data.data[0] !== undefined) {
                    self.saveToolCategory = data.data[0];
                    for (var i = 0; i < self.toolsRowModel.toolRows.length; i++) {
                        if (self.toolsRowModel.toolRows[i].toolId === toolId) {
                            if (self.toolsRowModel.toolRows[i].toolCategory !== undefined)
                                self.toolsRowModel.toolRows[i].toolCategory = self.saveToolCategory;
                        }
                    }
                }
            });
        };
        DataOnBoardingController.prototype.saveAction = function (status) {
            if (status === true) {
                var self = this;
                self.onboardProjectService
                    .fetchProjectMappingByHierarchyName(this.selectedHierarchy)
                    .then(function (data) {
                    var fetchedData = data.data;
                    var toolsRowArray = self.toolsRowModel.toolRows;
                    if (fetchedData.length != 0) {
                        for (var row in toolsRowArray) {
                            var flag = 0;
                            var rowDetails = toolsRowArray[row];
                            var retObj = fetchedData.find(function (element) {
                                return rowDetails.selectedTool === element.toolName &&
                                    rowDetails.selectedFieldName === element.fieldName &&
                                    rowDetails.selectedFieldValues === element.fieldValue;
                            });
                            if (retObj === undefined) {
                                if (rowDetails.selectedFieldName !== undefined && rowDetails.selectedFieldValues !== undefined) {
                                    rowDetails.isSaved = true;
                                    if (self.selectedProj === undefined) {
                                        self.dataTaggingService.getHierarchyMappingByName(self.selectedHierarchy).then(function (data) {
                                            self.selectedProj = data.data[0];
                                        });
                                    }
                                    self.onboardProjectService
                                        .addProjectMapping(self.orgId, rowDetails.toolId, rowDetails.toolCategory, rowDetails.selectedTool, rowDetails.selectedFieldName, rowDetails.selectedFieldValues, self.selectedProj, "1", "BU", self.selectedHierarchy)
                                        .then(function (data) {
                                        var orgDataArray = data;
                                        if (data.status === "success") {
                                            self.checkRecordCount();
                                            self.saveMsg = "Data saved sucessfully !";
                                            self.fetchAutocompleteArray();
                                        }
                                        else {
                                            self.saveMsg = "Failed to save data !";
                                            rowDetails.isSaved = false;
                                        }
                                    });
                                }
                            }
                        }
                    }
                    else if (fetchedData.length === 0) {
                        for (var row in toolsRowArray) {
                            var rowDetails = toolsRowArray[row];
                            rowDetails.isSaved = true;
                            self.onboardProjectService
                                .addProjectMapping(self.orgId, rowDetails.toolId, rowDetails.toolCategory, rowDetails.selectedTool, rowDetails.selectedFieldName, rowDetails.selectedFieldValues, self.selectedProj, "1", "BU", self.selectedHierarchy)
                                .then(function (data) {
                                var orgDataArray = data;
                                if (data.status === "success") {
                                    self.checkRecordCount();
                                    self.saveMsg = "Data saved sucessfully !";
                                    self.fetchAutocompleteArray();
                                }
                                else {
                                    self.saveMsg = "Failed to save data !";
                                    rowDetails.isSaved = false;
                                }
                            });
                        }
                    }
                });
            }
        };
        DataOnBoardingController.prototype.deleteAction = function (status, toolName, category, toolId, isSaved) {
            var self = this;
            if (isSaved === true) {
                if (status === true && toolName !== undefined) {
                    this.toolsRowModel.toolRows = [];
                    this.onboardProjectService
                        .deleteToolMapping(self.orgId, category, toolName, toolId)
                        .then(function (data) {
                        if (data.status === "success") {
                            self.saveMsg = "Data deleted sucessfully !";
                        }
                        else {
                            self.saveMsg = "Failed to delete data !";
                        }
                        self.fetchProjectMapping();
                    });
                }
            }
            else {
                for (var i = 0; i < this.toolsRowModel.toolRows.length; i++) {
                    var obj = this.toolsRowModel.toolRows[i];
                    if (obj.toolId === toolId) {
                        this.toolsRowModel.toolRows.splice(i, 1);
                        i--;
                        break;
                    }
                }
                this.changeButtonstatus();
                self.updateTable();
            }
        };
        DataOnBoardingController.prototype.openDialog = function (params, selectedOperation, toolName, category, toolId, isSaved) {
            var self = this;
            var statusObject = {
                'status': false
            };
            self.$mdDialog.show({
                controller: ISightApp.ShowToolConfirmationDialogController,
                controllerAs: 'showToolConfirmationDialogController',
                templateUrl: './dist/modules/oneToolConfig/view/oneToolConfirmationDialog.tmp.html',
                parent: angular.element(document.body),
                targetEvent: params,
                preserveScope: true,
                clickOutsideToClose: true,
                locals: {
                    statusObject: statusObject,
                    selectedOperation: selectedOperation,
                    operationName: 'Data Mapping'
                },
                bindToController: true,
                onRemoving: function () {
                    if (selectedOperation === 'save') {
                        self.saveAction(statusObject.status);
                    }
                    else if (selectedOperation === 'delete') {
                        self.deleteAction(statusObject.status, toolName, category, toolId, isSaved);
                    }
                }
            });
        };
        DataOnBoardingController.prototype.changeButtonstatus = function () {
            var self = this;
            self.disableAddButtonStatus = false;
            self.addButtonIcon = "dist/icons/svg/oneToolsConfigIcons/Add_icon_MouseOver.svg";
            self.disableSaveButtonStatus = false;
            self.saveButtonIcon = "dist/icons/svg/oneToolsConfigIcons/Save_icon_MouseOver.svg";
        };
        DataOnBoardingController.prototype.setPage = function (pageNo) {
            this.currentPage = pageNo;
        };
        ;
        DataOnBoardingController.prototype.pageChanged = function () {
            //this.$log.log('Page changed to: ' + this.currentPage);
        };
        ;
        DataOnBoardingController.prototype.updateResult = function () {
            var self = this;
            self.begin = (self.currentPage - 1) * self.totalRows;
            self.end = self.begin + 10;
            self.updateTable();
        };
        DataOnBoardingController.prototype.updateTable = function () {
            var self = this;
            self.totalItems = self.toolsRowModel.toolRows.length;
            if (self.totalItems > 10) {
                self.showPaginationBar = true;
            }
            else {
                self.showPaginationBar = false;
            }
            self.paginatedDataOnboardedArray = [];
            self.paginatedDataOnboardedArray = self.toolsRowModel.toolRows.slice(self.begin, self.end);
        };
        DataOnBoardingController.prototype.checkRecordCount = function () {
            var self = this;
            if (self.toolsRowModel.toolRows.length === 1 && self.toolsRowModel.toolRows[0].isSaved === false) {
                self.disableDeleteButtonStatus = true;
                self.deleteButtonIcon = "dist/icons/svg/oneToolsConfigIcons/Delete_icon_disabled.svg";
            }
            else {
                self.disableDeleteButtonStatus = false;
                self.deleteButtonIcon = "dist/icons/svg/oneToolsConfigIcons/Delete_icon_MouseOver.svg";
            }
        };
        DataOnBoardingController.$inject = ['restEndpointService', 'onboardProjectService', 'dataTaggingService', '$cookies', '$location', '$window', '$mdDialog', 'roleService'];
        return DataOnBoardingController;
    }());
    ISightApp.DataOnBoardingController = DataOnBoardingController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=dataOnBoardingController.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var DataOnBoardingService = /** @class */ (function () {
        function DataOnBoardingService($q, $resource, $cookies, restCallHandlerService) {
            this.$q = $q;
            this.$resource = $resource;
            this.$cookies = $cookies;
            this.restCallHandlerService = restCallHandlerService;
        }
        DataOnBoardingService.prototype.getAllHierarchyDetails = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("HIERARCHY_ALL_DETAILS_GET");
        };
        DataOnBoardingService.prototype.getMetaData = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("GET_METADATA");
        };
        DataOnBoardingService.prototype.uploadHierarchyDetails = function (formData) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("UPLOAD_HIERARCHY_DETAILS", { "file": formData }, { 'Content-Type': 'multipart/form-data' });
        };
        DataOnBoardingService.$inject = ['$q', '$resource', '$cookies', 'restCallHandlerService'];
        return DataOnBoardingService;
    }());
    ISightApp.DataOnBoardingService = DataOnBoardingService;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=dataOnBoardingService.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var AddEntityDialogController = /** @class */ (function () {
        function AddEntityDialogController($mdDialog, $route, dataTaggingService) {
            this.$mdDialog = $mdDialog;
            this.$route = $route;
            this.dataTaggingService = dataTaggingService;
            this.entityArray = [];
            this.count = 1;
            this.addButtIcon = "dist/icons/svg/oneToolsConfigIcons/Add_icon_disabled.svg";
            this.deleteButtIcon = "dist/icons/svg/oneToolsConfigIcons/Delete_icon_disabled.svg";
            this.editButtIcon = "dist/icons/svg/userOnboarding/Edit_icon_disabled.svg";
            this.entity = new ISightApp.Entity();
            this.entityDefModel = new ISightApp.EntityDefinitionModel();
            this.shuldAddEntity = false;
            this.showActions = false;
            this.entityDefinationArray = [];
            this.headerData = [];
            this.entityData = [];
            this.entityModel = new ISightApp.EntityModel();
            this.noEntityAddedMsg = {
                'msg': '',
            };
            this.hierarchyRec = [];
            this.headerData = this['locals'].headerData;
            this.entityData = this['locals'].entityData;
            this.noEntityAddedMsg = this['locals'].noEntityAddedMsg;
            this.entityModel = this['locals'].entityModel;
            this.fetchEntityMapping();
            this.showActions = false;
        }
        AddEntityDialogController.prototype.hide = function () {
            this.$mdDialog.hide();
        };
        AddEntityDialogController.prototype.cancel = function () {
            this.$mdDialog.cancel();
        };
        AddEntityDialogController.prototype.addAction = function () {
            this.showActions = false;
            var rowLength = this.entityDefModel.entityDefinitionRows.length + 1;
            var insertEntity = new ISightApp.Entity();
            insertEntity.rowId = rowLength;
            this.entityDefModel.entityDefinitionRows.push(insertEntity);
            insertEntity.levelName = 'Level' + rowLength;
            this.addButtIcon = "dist/icons/svg/oneToolsConfigIcons/Add_icon_disabled.svg";
        };
        AddEntityDialogController.prototype.fetchEntityMapping = function () {
            var self = this;
            self.dataTaggingService.getAllEntityDefination()
                .then(function (data) {
                var fetchedEntityData = data.data;
                if (fetchedEntityData.length != 0) {
                    self.showActions = true;
                    self.addButtIcon = "dist/icons/svg/actionIcons/Add_icon_MouseOver.svg";
                    self.deleteButtIcon = "dist/icons/svg/actionIcons/Delete_icon_MouseOver.svg";
                    self.entityDefModel.entityDefinitionRows = [];
                    for (var _i = 0, fetchedEntityData_1 = fetchedEntityData; _i < fetchedEntityData_1.length; _i++) {
                        var jsonObject = fetchedEntityData_1[_i];
                        var fetchedData = new ISightApp.Entity();
                        fetchedData.levelName = jsonObject["levelName"];
                        fetchedData.entityName = jsonObject["entityName"];
                        fetchedData.rowId = jsonObject["rowId"];
                        fetchedData.isEntityDefSaved = true;
                        self.entityDefModel.entityDefinitionRows.push(fetchedData);
                    }
                }
                else if (fetchedEntityData.length === 0) {
                    self.addButtIcon = "dist/icons/svg/oneToolsConfigIcons/Add_icon_disabled.svg";
                    self.entityDefModel.entityDefinitionRows = [];
                    var rowLength = self.entityDefModel.entityDefinitionRows.length + 1;
                    var insertTool = new ISightApp.Entity();
                    insertTool.rowId = rowLength;
                    insertTool.levelName = 'Level' + rowLength;
                    insertTool.isEntityDefSaved = false;
                    self.entityDefModel.entityDefinitionRows.push(insertTool);
                }
            });
        };
        AddEntityDialogController.prototype.fetchHierarchyData = function (fetchedHierarchyData) {
            this.noEntityAddedMsg['msg'] = '';
            if (fetchedHierarchyData.length != 0) {
                this.addButtIcon = "dist/icons/svg/actionIcons/Add_icon_MouseOver.svg";
                this.deleteButtIcon = "dist/icons/svg/actionIcons/Delete_icon_MouseOver.svg";
                //this.entityData = [];
                while (this.entityData.length > 0) {
                    this.entityData.pop();
                }
                ;
                this.entityModel.entityRows['entityInfo'] = [];
                for (var _i = 0, fetchedHierarchyData_1 = fetchedHierarchyData; _i < fetchedHierarchyData_1.length; _i++) {
                    var hierarchyData = fetchedHierarchyData_1[_i];
                    var fetchedHierarchyDetails = new ISightApp.DataTaggingModel();
                    //this.hierarchyRec = [];
                    this.hierarchyRec = hierarchyData;
                    fetchedHierarchyDetails.levels = hierarchyData.record;
                    if (hierarchyData["rowId"] != undefined) {
                        fetchedHierarchyDetails.rowId = hierarchyData["rowId"];
                        fetchedHierarchyDetails.isEntitySaved = true;
                    }
                    else {
                        var rowLength = this.entityModel.entityRows.length + 1;
                        fetchedHierarchyDetails.rowId = rowLength;
                        fetchedHierarchyDetails.isEntitySaved = false;
                    }
                    var hierarchyDataRow = [];
                    hierarchyDataRow.push(fetchedHierarchyDetails);
                }
                this.entityModel.entityRows['entityInfo'] = hierarchyDataRow;
                this.entityData.push(this.hierarchyRec);
                console.log(this.entityData);
                //this.entityData.push({record: ["1", "2"]})
            }
        };
        AddEntityDialogController.prototype.changeButtonstatus = function () {
            this.showActions = true;
            this.addButtIcon = "dist/icons/svg/oneToolsConfigIcons/Add_icon_MouseOver.svg";
            this.deleteButtIcon = "dist/icons/svg/oneToolsConfigIcons/Delete_icon_MouseOver.svg";
            this.editButtIcon = "dist/icons/svg/userOnboarding/Edit_icon_MouseOver.svg";
        };
        AddEntityDialogController.prototype.addEntity = function () {
            this.shuldAddEntity = true;
        };
        AddEntityDialogController.prototype.addEntityDefinition = function () {
            var self = this;
            var entityDefArray = self.entityDefModel.entityDefinitionRows;
            for (var entityRow in entityDefArray) {
                var entityDefRowDetails = entityDefArray[entityRow];
                if (entityDefRowDetails.levelName != undefined && entityDefRowDetails.entityName != undefined) {
                    self.dataTaggingService
                        .addEntityDefination(entityDefRowDetails.rowId, entityDefRowDetails.levelName, entityDefRowDetails.entityName)
                        .then(function (data) {
                        if (data.status === "success") {
                            entityDefRowDetails.isEntityDefSaved = true;
                            self.dataTaggingService.getHierarchyDetails()
                                .then(function (data) {
                                self.headerData['headers'] = data.headers;
                                self.noEntityAddedMsg['msg'] = '';
                                var hierarchyRecords = data.records;
                                if (hierarchyRecords.length != 0) {
                                    self.showActions = true;
                                    self.fetchHierarchyData(data.records);
                                }
                            });
                        }
                        else {
                            entityDefRowDetails.isEntityDefSaved = false;
                        }
                    });
                }
            }
            this.hide();
        };
        AddEntityDialogController.prototype.deleteAction = function (levelName, entityName, rowId, isEntityDefSaved) {
            this.showActions = false;
            if (isEntityDefSaved === true) {
                if (entityName != undefined) {
                    var self = this;
                    self.dataTaggingService
                        .deleteEntityDefination(levelName, entityName)
                        .then(function (data) {
                        if (data.status === "success") {
                            self.fetchEntityMapping();
                        }
                    });
                }
            }
            else {
                for (var i = 0; i < this.entityDefModel.entityDefinitionRows.length; i++) {
                    var obj = this.entityDefModel.entityDefinitionRows[i];
                    if (obj.rowId === rowId && rowId != 1) {
                        this.entityDefModel.entityDefinitionRows.splice(i, 1);
                        i--;
                        break;
                    }
                }
                this.changeButtonstatus();
            }
        };
        AddEntityDialogController.$inject = ['$mdDialog', '$route', 'dataTaggingService'];
        return AddEntityDialogController;
    }());
    ISightApp.AddEntityDialogController = AddEntityDialogController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=addEntityDialogController.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var DataTaggingController = /** @class */ (function () {
        function DataTaggingController($location, $window, $mdDialog, dataTaggingService, roleService) {
            this.$location = $location;
            this.$window = $window;
            this.$mdDialog = $mdDialog;
            this.dataTaggingService = dataTaggingService;
            this.roleService = roleService;
            this.showAddApplication = false;
            this.showApplicationAddedMessage = false;
            this.dataTaggingModel = new ISightApp.DataTaggingModel();
            this.entityModel = new ISightApp.EntityModel();
            this.addButtIcon = "dist/icons/svg/actionIcons/Add_icon_disabled.svg";
            this.deleteButtIcon = "dist/icons/svg/actionIcons/Delete_icon_disabled.svg";
            this.editButtIcon = "dist/icons/svg/actionIcons/Edit_icon_disabled.svg";
            this.saveButtonIcon = "dist/icons/svg/actionIcons/Save_icon_Disabled.svg";
            this.showAddEntity = false;
            this.headerData = [];
            this.entityData = [];
            this.showActions = false;
            this.entity = new ISightApp.Entity();
            this.entityDefModel = new ISightApp.EntityDefinitionModel();
            this.noEntityAddedMsg = {
                'msg': '',
            };
            this.saveMsg = '';
            this.levelList = [];
            this.hierarchyRec = [];
            var elem = document.querySelector('#homePageTemplateContainer');
            var homePageControllerScope = angular.element(elem).scope();
            var homePageController = homePageControllerScope['homePageController'];
            this.homeController = homePageController;
            var self = this;
            this.showThrobber = true;
            self.dataTaggingService.getHierarchyDetails()
                .then(function (data) {
                if (data.headers.length === 0) {
                    self.showThrobber = false;
                    self.noEntityAddedMsg['msg'] = "No Hierarchy Added";
                }
                else {
                    self.showThrobber = false;
                    self.headerData['headers'] = data.headers;
                    var hierarchyRecords = data.records;
                    if (hierarchyRecords.length != 0) {
                        self.showActions = true;
                        self.fetchHierarchyData(data.records);
                    }
                }
            });
        }
        DataTaggingController.prototype.getToolDataLength = function (obj) {
            return Object.keys(obj).length;
        };
        DataTaggingController.prototype.goToDataOnBoard = function () {
            this.homeController.templateName = 'dataOnboarding';
        };
        DataTaggingController.prototype.goToUserOnBoard = function () {
            this.homeController.templateName = 'userOnboarding';
        };
        DataTaggingController.prototype.addApplication = function (params, addedApplicationName) {
            var self = this;
            var statusObject = {
                'status': false
            };
            self.$mdDialog.show({
                controller: ISightApp.ShowTemplateApplicationAddConformDialogController,
                controllerAs: 'showTemplateApplicationAddConformDialogController',
                templateUrl: './dist/modules/applicationManagement/view/conformApplicationAddDialogViewTemplate.tmp.html',
                parent: angular.element(document.body),
                targetEvent: params,
                preserveScope: true,
                clickOutsideToClose: true,
                locals: {
                    statusObject: statusObject,
                    addedApplicationName: addedApplicationName,
                },
                bindToController: true,
                onRemoving: function () { self.addApplicationConfirmation(statusObject.status); }
            });
        };
        DataTaggingController.prototype.addApplicationConfirmation = function (status) {
            var self = this;
            if (status === true) {
                self.showApplicationAddedMessage = true;
                this.roleService
                    .createOrg(self.addNewApplicationName)
                    .then(function (data) {
                    var newAppData = {};
                    newAppData["name"] = self.addNewApplicationName;
                    newAppData["id"] = data.orgId;
                    newAppData["totalusers"] = 1;
                });
            }
        };
        DataTaggingController.prototype.showAddApplicationBox = function () {
            this.showApplicationAddedMessage = false;
            if (this.showAddApplication === false) {
                this.showAddApplication = true;
            }
            else {
                this.showAddApplication = false;
            }
        };
        DataTaggingController.prototype.changeButtonstatus = function () {
            this.showActions = true;
            this.saveMsg = '';
            this.addButtIcon = "dist/icons/svg/actionIcons/Add_icon_MouseOver.svg";
            this.deleteButtIcon = "dist/icons/svg/actionIcons/Delete_icon_MouseOver.svg";
            this.editButtIcon = "dist/icons/svg/actionIcons/Edit_icon_MouseOver.svg";
            this.saveButtonIcon = "dist/icons/svg/actionIcons/Save_icon_MouseOver.svg";
        };
        DataTaggingController.prototype.idSort = function (a, b) {
            var d = a - b;
            return d;
        };
        ;
        DataTaggingController.prototype.addAction = function () {
            var self = this;
            self.levelList = [];
            for (var key in self.headerData['headers']) {
                self.levelList.push("");
            }
            var rowIdArray = [];
            for (var i = 0; i < self.entityModel.entityRows['entityInfo'].length; i++) {
                if (self.entityModel.entityRows['entityInfo'][i]['rowId'] !== undefined)
                    rowIdArray.push(self.entityModel.entityRows['entityInfo'][i]['rowId']);
            }
            ;
            rowIdArray.sort(self.idSort);
            var rowLength = parseInt(rowIdArray[rowIdArray.length - 1]) + 1;
            var insertEntity = new ISightApp.DataTaggingModel();
            insertEntity.rowId = rowLength;
            insertEntity.levels = self.levelList;
            insertEntity.isEntitySaved = false;
            self.entityModel.entityRows['entityInfo'].push(insertEntity);
            self.addButtIcon = "dist/icons/svg/actionIcons/Add_icon_disabled.svg";
            self.showActions = false;
        };
        DataTaggingController.prototype.showAddEntityBox = function () {
            this.showAddApplication = false;
            if (this.showAddEntity === false) {
                this.showAddEntity = true;
            }
            else {
                this.showAddEntity = false;
            }
        };
        DataTaggingController.prototype.openDialog = function (params, selectedOperation, rowId, levels, isEntitySaved) {
            var self = this;
            var statusObject = {
                'status': false
            };
            self.$mdDialog.show({
                controller: ISightApp.ShowToolConfirmationDialogController,
                controllerAs: 'showToolConfirmationDialogController',
                templateUrl: './dist/modules/oneToolConfig/view/oneToolConfirmationDialog.tmp.html',
                parent: angular.element(document.body),
                targetEvent: params,
                preserveScope: true,
                clickOutsideToClose: true,
                locals: {
                    statusObject: statusObject,
                    selectedOperation: selectedOperation,
                    operationName: 'Data Tagging'
                },
                bindToController: true,
                onRemoving: function () {
                    if (selectedOperation === 'save') {
                        self.dataTaggingSaveAction();
                    }
                    else if (selectedOperation === 'delete') {
                        self.deleteAction(rowId, levels, isEntitySaved);
                    }
                }
            });
        };
        DataTaggingController.prototype.addEntity = function (params, entityName) {
            var self = this;
            self.$mdDialog.show({
                controller: ISightApp.AddEntityDialogController,
                controllerAs: 'addEntityDialogController',
                templateUrl: './dist/modules/dataTagging/view/addEntityDialog.tmp.html',
                parent: angular.element(document.body),
                targetEvent: params,
                preserveScope: true,
                clickOutsideToClose: true,
                locals: {
                    headerData: self.headerData,
                    entityData: self.entityData,
                    noEntityAddedMsg: self.noEntityAddedMsg,
                    entityModel: self.entityModel
                },
                bindToController: true,
            });
        };
        DataTaggingController.prototype.dataTaggingSaveAction = function () {
            var self = this;
            self.dataTaggingService
                .getAllEntityData()
                .then(function (data) {
                var fetchedData = data.data;
                var entityArray = self.entityModel.entityRows['entityInfo'];
                if (fetchedData.length != 0) {
                    for (var entityRow in entityArray) {
                        var count = 0;
                        var entityRowDetails = entityArray[entityRow];
                        var hierarchyName = self.buildHierarchyName(entityRowDetails.levels);
                        for (var _i = 0, fetchedData_1 = fetchedData; _i < fetchedData_1.length; _i++) {
                            var jsonObject = fetchedData_1[_i];
                            if (hierarchyName === jsonObject["hierarchyName"]) {
                                count++;
                                break;
                            }
                        }
                        if (count === 0) {
                            var hierarchyName = self.buildHierarchyName(entityRowDetails.levels);
                            self.dataTaggingService
                                .addEntityData(entityRowDetails.rowId, entityRowDetails.levels[0], entityRowDetails.levels[1], entityRowDetails.levels[2], entityRowDetails.levels[3], entityRowDetails.levels[4], entityRowDetails.levels[5], hierarchyName)
                                .then(function (data) {
                                if (data.status === "success") {
                                    self.saveMsg = "Data saved sucessfully !";
                                    entityRowDetails.isEntitySaved = true;
                                }
                                else {
                                    self.saveMsg = "Data saved sucessfully !";
                                    entityRowDetails.isEntitySaved = false;
                                }
                            });
                        }
                    }
                }
                else if (fetchedData.length === 0) {
                    for (var entityRow in entityArray) {
                        var entityRowDetailsData = entityArray[entityRow];
                        entityRowDetailsData.isEntitySaved = true;
                        var hierarchyNameData = self.buildHierarchyName(entityRowDetailsData.levels);
                        self.dataTaggingService
                            .addEntityData(entityRowDetailsData.rowId, entityRowDetailsData.levels[0], entityRowDetailsData.levels[1], entityRowDetailsData.levels[2], entityRowDetailsData.levels[3], entityRowDetailsData.levels[4], entityRowDetailsData.levels[5], hierarchyNameData)
                            .then(function (addData) {
                            if (addData.status === "success") {
                                self.saveMsg = "Data saved sucessfully !";
                            }
                            else {
                                self.saveMsg = "Data saved sucessfully !";
                                entityRowDetailsData.isEntitySaved = false;
                            }
                        });
                    }
                }
            });
        };
        DataTaggingController.prototype.fetchHierarchyData = function (fetchedHierarchyData) {
            if (fetchedHierarchyData.length != 0) {
                //this.addButtIcon = "dist/icons/svg/actionIcons/Add_icon_MouseOver.svg";
                //this.deleteButtIcon = "dist/icons/svg/actionIcons/Delete_icon_MouseOver.svg";
                // this.entityData = [];
                this.entityModel.entityRows['entityInfo'] = [];
                var hierarchyDataRow = [];
                for (var _i = 0, fetchedHierarchyData_1 = fetchedHierarchyData; _i < fetchedHierarchyData_1.length; _i++) {
                    var hierarchyData = fetchedHierarchyData_1[_i];
                    var fetchedHierarchyDetails = new ISightApp.DataTaggingModel();
                    this.hierarchyRec = hierarchyData.record;
                    fetchedHierarchyDetails.levels = hierarchyData.record;
                    if (hierarchyData["rowId"] != undefined) {
                        fetchedHierarchyDetails.rowId = hierarchyData["rowId"];
                        fetchedHierarchyDetails.isEntitySaved = true;
                    }
                    else {
                        var rowLength = this.entityModel.entityRows['entityInfo'].length + 1;
                        fetchedHierarchyDetails.rowId = rowLength;
                        fetchedHierarchyDetails.isEntitySaved = false;
                    }
                    hierarchyDataRow.push(fetchedHierarchyDetails);
                }
                this.entityModel.entityRows['entityInfo'] = hierarchyDataRow;
                this.entityData = this.hierarchyRec;
            }
        };
        DataTaggingController.prototype.buildHierarchyName = function (levels) {
            var hierarchyName = '';
            var underscore = '.';
            var levelLength = Object.keys(levels).length;
            var count = 1;
            for (var key in levels) {
                if (levels[key] != 'undefined') {
                    hierarchyName += levels[key];
                    if (count !== levelLength) {
                        hierarchyName = hierarchyName + ".";
                        count++;
                    }
                    else {
                        hierarchyName = hierarchyName;
                    }
                }
                else {
                    hierarchyName = hierarchyName.replace(/.\s*$/, "");
                    ;
                }
            }
            return hierarchyName;
        };
        DataTaggingController.prototype.deleteAction = function (rowId, levels, isEntitySaved) {
            var hierarchyName = this.buildHierarchyName(levels);
            var self = this;
            if (isEntitySaved === true) {
                self.dataTaggingService.deleteEntityDataByHierarchy(hierarchyName)
                    .then(function (data) {
                    if (data.status === "success") {
                        self.saveMsg = "Data deleted sucessfully !";
                    }
                    else {
                        self.saveMsg = "Failed to delete data !";
                    }
                    self.dataTaggingService.getHierarchyDetails()
                        .then(function (data) {
                        var hierarchyRecords = data.records;
                        self.fetchHierarchyData(hierarchyRecords);
                    });
                });
            }
            else {
                for (var i = 0; i < this.entityModel.entityRows['entityInfo'].length; i++) {
                    var obj = this.entityModel.entityRows['entityInfo'][i];
                    if (obj.rowId === rowId) {
                        this.entityModel.entityRows['entityInfo'].splice(i, 1);
                        if (rowId === 1) {
                            self.entityModel.entityRows['entityInfo'] = [];
                            self.levelList = [];
                            for (var key in self.headerData['headers']) {
                                self.levelList.push("");
                            }
                            var rowLength = self.entityModel.entityRows['entityInfo'].length + 1;
                            var insertTool = new ISightApp.DataTaggingModel();
                            insertTool.rowId = rowLength;
                            insertTool.levels = self.levelList;
                            insertTool.isEntitySaved = false;
                            self.entityModel.entityRows['entityInfo'].push(insertTool);
                        }
                        i--;
                        break;
                    }
                }
                this.changeButtonstatus();
            }
        };
        DataTaggingController.$inject = ['$location', '$window', '$mdDialog', 'dataTaggingService', 'roleService'];
        return DataTaggingController;
    }());
    ISightApp.DataTaggingController = DataTaggingController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=dataTaggingController.js.map
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
//// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var DataTaggingModel = /** @class */ (function () {
        function DataTaggingModel() {
            this.rowId = 0;
        }
        return DataTaggingModel;
    }());
    ISightApp.DataTaggingModel = DataTaggingModel;
    var LevelModel = /** @class */ (function () {
        function LevelModel() {
        }
        return LevelModel;
    }());
    ISightApp.LevelModel = LevelModel;
    var EntityModel = /** @class */ (function () {
        function EntityModel() {
            this.entityRows = [];
        }
        return EntityModel;
    }());
    ISightApp.EntityModel = EntityModel;
    var Entity = /** @class */ (function () {
        function Entity() {
        }
        return Entity;
    }());
    ISightApp.Entity = Entity;
    var EntityDefinitionModel = /** @class */ (function () {
        function EntityDefinitionModel() {
            this.entityDefinitionRows = [];
        }
        return EntityDefinitionModel;
    }());
    ISightApp.EntityDefinitionModel = EntityDefinitionModel;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=dataTaggingModel.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var DataTaggingService = /** @class */ (function () {
        function DataTaggingService($q, $resource, $cookies, restCallHandlerService) {
            this.$q = $q;
            this.$resource = $resource;
            this.$cookies = $cookies;
            this.restCallHandlerService = restCallHandlerService;
        }
        DataTaggingService.prototype.addEntityDefination = function (rowId, levelName, entityName) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("ENTITY_DEFINITION_ADD", { "rowId": rowId, "levelName": levelName, "entityName": entityName }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        DataTaggingService.prototype.deleteEntityDefination = function (levelName, entityName) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("ENTITY_DEFINITION_REMOVE", { "levelName": levelName, "entityName": entityName }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        DataTaggingService.prototype.getAllEntityDefination = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("ENTITY_DEFINITION_ALL");
        };
        DataTaggingService.prototype.getEntityDataByLevelName = function (levelName) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("ENTITY_BY_LEVEL", { "levelName": levelName }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        DataTaggingService.prototype.addEntityData = function (rowId, level1, level2, level3, level4, level5, level6, hierarchyName) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("HIERARCHY_DETAILS_ADD", {
                "rowId": rowId, "level1": level1, "level2": level2, "level3": level3, "level4": level4, "level5": level5,
                "level6": level6, "hierarchyName": hierarchyName
            }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        DataTaggingService.prototype.getAllEntityData = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("ENTITY_DATA_ALL");
        };
        DataTaggingService.prototype.deleteEntityDataByHierarchy = function (hierarchyName) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("HIERARCHY_DETAILS_REMOVE", { "hierarchyName": hierarchyName }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        DataTaggingService.prototype.getHierarchyDetails = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("HIERARCHY_DETAILS_GET");
        };
        DataTaggingService.prototype.addHierarchyMapping = function (rowId, hierarchyName, orgName, orgId) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("HIERARCHY_MAPPING_ADD", { "rowId": rowId, "hierarchyName": hierarchyName, "orgName": orgName, "orgId": orgId }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        DataTaggingService.prototype.getAllHierarchyMapping = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("HIERARCHY_DATA_ALL");
        };
        DataTaggingService.prototype.deleteHierarchyMap = function (hierarchyName, orgName) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("HIERARCHY_MAPPING_REMOVE", { "hierarchyName": hierarchyName, "orgName": orgName }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        DataTaggingService.prototype.getHierarchyMappingByName = function (hierarchyName) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("HIERARCHY_MAPPING", { "hierarchyName": hierarchyName }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        DataTaggingService.$inject = ['$q', '$resource', '$cookies', 'restCallHandlerService'];
        return DataTaggingService;
    }());
    ISightApp.DataTaggingService = DataTaggingService;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=dataTaggingService.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var DataTaggingDetailsController = /** @class */ (function () {
        function DataTaggingDetailsController($location, $window, $mdDialog, $scope, $filter, dataTaggingDetailsService) {
            this.$location = $location;
            this.$window = $window;
            this.$mdDialog = $mdDialog;
            this.$scope = $scope;
            this.$filter = $filter;
            this.dataTaggingDetailsService = dataTaggingDetailsService;
            this.showThrobber = true;
            var self = this;
            var elem = document.querySelector('#homePageTemplateContainer');
            var homePageControllerScope = angular.element(elem).scope();
            var homePageController = homePageControllerScope['homePageController'];
            self.homeController = homePageController;
            self.dataTaggingDetailsService.getHierarchyMapping()
                .then(function (data) {
                self.showThrobber = false;
                //$scope.list = data.data;
                $scope.list = data.data[0].children;
                var level1 = $scope.list[0].name || '';
                var level2 = $scope.list[0].children[0].name || '';
                var level3 = $scope.list[0].children[0].children[0].name || '';
                var level4 = $scope.list[0].children[0].children[0].children[0].name || '';
                self.showThrobber = false;
                /* self.dataTaggingDetailsService.getHierarchyProperties(level1,'','','')
                      .then(function (data) {
                       console.log(data);
                       $scope.hierarchyProperties = data.data;
                    }); */
            });
            this.init($scope, $filter, dataTaggingDetailsService);
        }
        DataTaggingDetailsController.prototype.goToDataOnBoard = function () {
            this.homeController.templateName = 'dataOnboarding';
        };
        DataTaggingDetailsController.prototype.init = function ($scope, $filter, dataTaggingDetailsService) {
            $scope.test = {};
            $scope.myVar = {};
            $scope.initCheckbox = function (item, parentItem) {
                return item.selected = parentItem && parentItem.selected || item.selected || false;
            };
            $scope.showHideProps = function (elementId) {
                var listElem = document.getElementById(elementId);
                if (listElem.style.display == 'none') {
                    listElem.style.display = 'block';
                }
                else {
                    listElem.style.display = 'none';
                }
            };
            $scope.test = function (value) {
                var a = document.getElementById(value);
                document.getElementById(value).style.backgroundColor = "#eee";
                var els = [];
                while (a.parentElement) {
                    if (a.parentElement.tagName == "LI") {
                        console.log(a.parentElement.dataset.val);
                        els.unshift(a.parentElement.dataset.val);
                    }
                    a = a.parentElement;
                }
                console.log(els);
                var level1 = els[0] || '';
                var level2 = els[1] || '';
                var level3 = els[2] || '';
                var level4 = els[3] || '';
                dataTaggingDetailsService.getHierarchyProperties(level1, level2, level3, level4)
                    .then(function (data) {
                    console.log(data);
                    $scope.hierarchyProperties = data.data;
                });
            };
            $scope.toggleCheckbox = function (item, parentScope) {
                if (item.children != null) {
                    $scope.$broadcast('changeChildren', item);
                }
                if (parentScope.item != null) {
                    return $scope.$emit('changeParent', parentScope);
                }
            };
            $scope.clickHandler1 = function (name) {
                console.log("in click handler");
                console.log(name);
                var child1 = document.getElementById("project1");
                var parent = child1.parentElement.parentElement.parentElement;
                var contents = parent.innerHTML;
                console.log(contents);
            };
            $scope.$on('changeChildren', function (event, parentItem) {
                var child, i, len, ref, results;
                ref = parentItem.children;
                results = [];
                for (i = 0, len = ref.length; i < len; i++) {
                    child = ref[i];
                    child.selected = parentItem.selected;
                    if (child.children != null) {
                        results.push($scope.$broadcast('changeChildren', child));
                    }
                    else {
                        results.push(void 0);
                    }
                }
                return results;
            });
            return $scope.$on('changeParent', function (event, parentScope) {
                var children;
                children = parentScope.item.children;
                parentScope.item.selected = $filter('selected')(children).length === children.length;
                parentScope = parentScope.$parent.$parent;
                if (parentScope.item != null) {
                    return $scope.$broadcast('changeParent', parentScope);
                }
            });
        };
        DataTaggingDetailsController.prototype.showDetails = function (itemName) {
            console.log("clicked");
        };
        DataTaggingDetailsController.$inject = ['$location', '$window', '$mdDialog', '$scope',
            '$filter', 'dataTaggingDetailsService'];
        return DataTaggingDetailsController;
    }());
    ISightApp.DataTaggingDetailsController = DataTaggingDetailsController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=dataTaggingDetailsController.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var RecursiveLiController = /** @class */ (function () {
        function RecursiveLiController($location, $window, $mdDialog, $scope, $filter, dataTaggingDetailsService, $rootScope) {
            this.$location = $location;
            this.$window = $window;
            this.$mdDialog = $mdDialog;
            this.$scope = $scope;
            this.$filter = $filter;
            this.dataTaggingDetailsService = dataTaggingDetailsService;
            this.showThrobber = true;
            this.init($scope, $filter, dataTaggingDetailsService, $rootScope);
        }
        RecursiveLiController.prototype.init = function ($scope, $filter, dataTaggingDetailsService, $rootScope) {
            $scope.clickHandler = function (e) {
                var a = document.getElementById(e.target.id);
                var els = [];
                while (a.parentElement) {
                    if (a.parentElement.tagName == "LI") {
                        console.log(a.parentElement.dataset.val);
                        els.unshift(a.parentElement.dataset.val);
                    }
                    a = a.parentElement;
                }
                console.log(els);
                var level1 = els[0];
                var level2 = els[1];
                var level3 = els[2];
                var level4 = els[3];
                //dataTaggingDetailsService.getHierarchyProperties(level1,level2,level3,level4)
                //.then(function (data) {
                //    console.log(data);
                //});
                $scope.test = { "toolProperty3": "",
                    "uuid": "ecae50b0-033f-11e8-855b-005056b1008e",
                    "toolProperty4": "",
                    "toolProperty1": "GIT description1",
                    "toolProperty2": "GIT description2",
                    "level_3": "Dep1",
                    "level_4": "project1",
                    "propertyValue1": "NextGenBilling1",
                    "propertyValue4\"": "\"",
                    "propertyValue3": "",
                    "propertyValue2": "value2",
                    "\"id": "\"1",
                    "level_1": "Billing1",
                    "level_2": "Invoicebill",
                    "toolName": "GIT" };
                $scope.$parent.test = $scope.test;
                $scope.myVar = { "toolProperty3": "",
                    "uuid": "ecae50b0-033f-11e8-855b-005056b1008e",
                    "toolProperty4": "",
                    "toolProperty1": "GIT description1",
                    "toolProperty2": "GIT description2",
                    "level_3": "Dep1",
                    "level_4": "project1",
                    "propertyValue1": "NextGenBilling1",
                    "propertyValue4\"": "\"",
                    "propertyValue3": "",
                    "propertyValue2": "value2",
                    "\"id": "\"1",
                    "level_1": "Billing1",
                    "level_2": "Invoicebill",
                    "toolName": "GIT" };
                $scope.$parent.myVar = $scope.myVar;
                $scope.$parent.myVar = { "toolProperty3": "",
                    "uuid": "ecae50b0-033f-11e8-855b-005056b1008e",
                    "toolProperty4": "",
                    "toolProperty1": "GIT description1",
                    "toolProperty2": "GIT description2",
                    "level_3": "Dep1",
                    "level_4": "project1",
                    "propertyValue1": "NextGenBilling1",
                    "propertyValue4\"": "\"",
                    "propertyValue3": "",
                    "propertyValue2": "value2",
                    "\"id": "\"1",
                    "level_1": "Billing1",
                    "level_2": "Invoicebill",
                    "toolName": "GIT" };
                $scope.$apply();
                $scope.$parent.$apply();
            };
        };
        RecursiveLiController.$inject = ['$location', '$window', '$mdDialog', '$scope',
            '$filter', 'dataTaggingDetailsService', '$rootScope'];
        return RecursiveLiController;
    }());
    ISightApp.RecursiveLiController = RecursiveLiController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=recursiveLiController.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var DataTaggingDetailsService = /** @class */ (function () {
        function DataTaggingDetailsService($q, $resource, $cookies, restCallHandlerService) {
            this.$q = $q;
            this.$resource = $resource;
            this.$cookies = $cookies;
            this.restCallHandlerService = restCallHandlerService;
        }
        DataTaggingDetailsService.prototype.getHierarchyMapping = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("HIERARCHY_ALL_DETAILS_GET", { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        DataTaggingDetailsService.prototype.getHierarchyProperties = function (level1, level2, level3, level4) {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("GET_HIERARCHY_PROPERTIES", { "level1": level1, "level2": level2, "level3": level3, "level4": level4 }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        DataTaggingDetailsService.$inject = ['$q', '$resource', '$cookies', 'restCallHandlerService'];
        return DataTaggingDetailsService;
    }());
    ISightApp.DataTaggingDetailsService = DataTaggingDetailsService;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=dataTaggingDetailsService.js.map
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
    var devopsMaturityController = /** @class */ (function () {
        function devopsMaturityController($location, $window, $mdDialog, $scope, $filter, devopsMaturityService, $resource, $http, $route, $cookies, restAPIUrlService) {
            this.$location = $location;
            this.$window = $window;
            this.$mdDialog = $mdDialog;
            this.$scope = $scope;
            this.$filter = $filter;
            this.devopsMaturityService = devopsMaturityService;
            this.$resource = $resource;
            this.$http = $http;
            this.$route = $route;
            this.$cookies = $cookies;
            this.restAPIUrlService = restAPIUrlService;
            this.fileFormat = "JSON";
            this.listView = true;
            this.saveView = false;
            this.datalist = {};
            this.settingData = {};
            this.settingJsonObj = {};
            this.editIconSrc = "dist/icons/svg/userOnboarding/Edit_icon_MouseOver.svg";
            this.showTble = true;
            this.selectedType = "";
            this.showTextArea = true;
            this.files = [];
            this.headers = [];
            this.lines = [];
            this.linesToShow = [];
            this.isTypeError = "";
            this.placeholderStr = "";
            this.showFiledownloadError = false;
            this.filename = "";
            this.fileUploadSuccessMessage = false;
            this.selectedImage = 'logo';
            this.lastModifiedDate = '';
            this.arr = [];
            this.maxSizeErr = false;
            var self = this;
            var elem = document.querySelector('#homePageTemplateContainer');
            var homePageControllerScope = angular.element(elem).scope();
            var homePageController = homePageControllerScope['homePageController'];
            self.homeController = homePageController;
            this.init($scope, $filter, devopsMaturityService, $resource, $http, $route, $window, homePageController, self.homeController, $cookies, restAPIUrlService);
        }
        devopsMaturityController.prototype.init = function ($scope, $filter, devopsMaturityService, $resource, $http, $route, $window, homePageController, homeController, $cookies, restAPIUrlService) {
            $scope.placeholderStr = "Select Frequency";
            addData();
            //listData();
            console.log($scope);
            function addData() {
                //$scope.placeholderStr = "Select Frequency";
                $scope.listView = false;
                $scope.saveView = true;
                console.log("This is from devops maturity controller " + $scope.saveView);
            }
            ;
            $scope.changeSelected = function () {
                if ($scope.selectedType && $scope.selectedType.length > 0) {
                    $scope.showTextArea = true;
                }
            };
            $scope.saveData = function () {
                //console.log($scope.homeController);
                var self = this;
                $scope.listView = true;
                $scope.saveView = true;
                $scope.settingsType = "DEVOPSMATURITY";
                $scope.activeFlag = "Y";
                //$scope.lastModifiedByUser = $scope.homeController.userName;
                $scope.lastModifiedByUser = "Admin";
                $scope.settingJsonObj = {
                    "dataArchivalFrequency": $scope.dataFreq,
                    "lastRunTime": $scope.lastRunTime,
                    "nextRunTime": ''
                };
                console.log($scope.settingJsonObj);
                $scope.settingJsonstring = encodeURIComponent(JSON.stringify($scope.settingJsonObj));
                devopsMaturityService.saveDevopsMaturity($scope.settingsType, $scope.activeFlag, $scope.lastModifiedByUser, $scope.settingJsonstring)
                    .then(function (data) {
                    if (data.status == "success") {
                        $scope.showConfirmMessage = "Saved successfully";
                        $scope.fileUploadSuccessMessage = true;
                        homePageController.templateName = 'devopsMaturitySettings';
                    }
                    else {
                        $scope.showConfirmMessage = "Failed to save settings";
                    }
                    $scope.listData();
                })
                    .catch(function (data) {
                    $scope.listView = false;
                    $scope.saveView = true;
                    $scope.showConfirmMessage = "Failed to save settings";
                    $scope.listData();
                });
            };
            $scope.listData = function () {
                console.log("This is coming from list data DEVOPSMATURITY model.=");
                $scope.listView = true;
                $scope.saveView = true;
                devopsMaturityService.listDevopsMaturity("DEVOPSMATURITY")
                    .then(function (response) {
                    $scope.showThrobber = false;
                    if (response.status == "success") {
                        if (response.hasOwnProperty('data')) {
                            $scope.showTble = false;
                            $scope.datalist = response.data;
                            console.log(response.data);
                            $scope.settingData = JSON.parse($scope.datalist['settingsJson']);
                            $scope.lastModifiedDate = $scope.datalist['lastModifiedDate'];
                            /*
                            if ($scope.settingData.dataFreq == undefined)
                            {
                                console.log("----------");
                                console.log($scope.lastModifiedDate);
                                $scope.placeholderStr = "Select Frequency";
                            }
                            else
                            {
                                $scope.placeholderStr = $scope.dataFreq;
                                console.log("********");
                                
                            }
                            */
                            $scope.$apply();
                            //console.log($scope.datalist);
                            console.log($scope);
                        }
                        else {
                            $scope.showTble = true;
                        }
                    }
                    else {
                        $scope.showConfirmMessage = "Something wrong with service, please try again";
                    }
                })
                    .catch(function (response) {
                    $scope.showThrobber = false;
                    $scope.showConfirmMessage = "Something wrong with service, please try again";
                });
                setTimeout(function () {
                    $scope.showConfirmMessage = "";
                    document.getElementById('confrmMsg').innerHTML = "";
                }, 3500);
            };
            /*function listData() {
                console.log("This is coming from list data DEVOPSMATURITY model.");
                //var $scope = this;
    
                $scope.listView = true;
                $scope.saveView = true;
    
                devopsMaturityService.listDevopsMaturity("DEVOPSMATURITY")
                    .then(function (response) {
    
                        $scope.showThrobber = false;
                        if (response.status == "success") {
    
                            if (response.hasOwnProperty('data')) {
                                $scope.showTble = false;
                                $scope.datalist = response.data;
                                $scope.settingData = JSON.parse($scope.datalist['settingsJson']);
    
                                if ($scope.settingData.dataFreq == undefined)
                                {
                                    console.log("----------");
    
                                    $scope.placeholderStr = "Select Frequency----";
                                }
                                else
                                {
                                    $scope.placeholderStr = $scope.dataFreq;
                                    console.log("********");
                                    
                                }
                                $scope.$apply();
                                //console.log($scope);
                                
                            } else {
                                $scope.showTble = true;
                            }
                        }
                        else {
                            $scope.showConfirmMessage = "Something wrong with service, please try again";
                        }
    
                    })
                    .catch(function (response) {
                        $scope.showThrobber = false;
                        $scope.showConfirmMessage = "Something wrong with service, please try again";
                    });
    
                setTimeout(function () {
                    $scope.showConfirmMessage = "";
                    document.getElementById('confrmMsg').innerHTML = "";
                }, 3500);
            };*/
            $scope.previewData = function () {
                console.log("coming here");
                var self = this;
                var inputFileById = document.getElementById("fileInput");
                var uploadedFile = inputFileById.files[0];
                var reader = new FileReader();
                console.log(uploadedFile);
                reader.readAsText(uploadedFile);
                reader.onload = function (e) {
                    var csv = reader.result;
                    var allTextLines = csv.split(/\r|\n|\r/);
                    allTextLines[0] = allTextLines[0].replace(/"/g, "");
                    var headers = allTextLines[0].split(',');
                    $scope.headers = headers;
                    $scope.lines = [];
                    for (var i = 1; i < allTextLines.length; i++) {
                        // split content based on comma
                        allTextLines[i] = allTextLines[i].replace(/"/g, "");
                        var data = allTextLines[i].split(',');
                        if (data.length === headers.length) {
                            var tarr = {};
                            for (var j = 0; j < headers.length; j++) {
                                tarr[headers[j]] = data[j];
                            }
                            console.log(tarr);
                            $scope.lines.push(tarr);
                        }
                    }
                };
            };
            $scope.uploadFile = function () {
                console.log($scope.dataFreq);
                var inputFileById = document.getElementById("fileInput");
                var uploadedFile = inputFileById.files[0];
                var fd = new FormData();
                fd.append("file", inputFileById.files[0]);
                fd.append("action", "upload");
                $scope.showThrobber = true;
                var authToken = $cookies.get('Authorization');
                var restCallUrl = restAPIUrlService.getRestCallUrl("DEVOPS_MATURITY_MODEL");
                console.log(restCallUrl);
                console.log(fd);
                $scope.showDisabled = true;
                $http.post(restCallUrl, fd, {
                    headers: {
                        'Content-Type': undefined,
                        'Authorization': authToken
                    },
                    transformRequest: angular.identity
                }).then(function (data, status, headers, config) {
                    $scope.showThrobber = false;
                    $scope.showDisabled = false;
                    if (data.data.status == "failure") {
                        $scope.showError = true;
                        $scope.showErrorMessage = data.data.message;
                        $window.scrollTo(0, 0);
                    }
                    else {
                        console.log(data);
                        $scope.fileUploadSuccessMessage = true;
                        $scope.showConfirmMessage = "Saved successfully";
                        homePageController.templateName = 'devopsMaturitySettings';
                    }
                }, function (data) {
                    $scope.showThrobber = false;
                    $scope.showDisabled = false;
                    $scope.showError = true;
                });
            };
            $scope.downloadFile = function () {
                devopsMaturityService.maturityFileDonwload()
                    .then(function (response) {
                    console.log("----------------------");
                    console.log(response);
                    console.log(response.Resource);
                    var uri = 'data:text/xls;charset=utf-8,' + encodeURI(response);
                    var link = document.createElement("a");
                    link.href = uri;
                    link.download = "my_file.xls";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    /*
                    let arr: any[] = [];
                    console.log("----------------------");
                    console.log(response);
                    for (let i = 1; i < response.data['settingFile'].length; i++) {
                        arr[i] = response.data['settingFile'][i];
                        
                    }
                    console.log(arr.length);
                    let headers: HttpHeaders = new HttpHeaders();
*/
                    /*

                    $scope.showThrobber = false;
                    if (response.status == "success") {

                        if (response.hasOwnProperty('data')) {
                            $scope.showTble = false;
                            $scope.datalist = response.data;
                            console.log($scope.datalist['settingFile']);
                            var uri = 'data:text/xlsx;charset=utf-8,' + encodeURI($scope.datalist['settingFile']);
                            //var uri = 'data:application/vnd.ms-excel;base64,'+ encodeURI($scope.datalist['settingFile']);
                            var uri = 'data:application/vnd.ms-excel,'+ encodeURI($scope.datalist['settingFile']);
                                var link = <HTMLAnchorElement>document.createElement("a");
                                link.href = uri;
                                link.download = "Maturity.xlsx";
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            
                        } else {
                            
                        }
                    }
                    else {
                        
                    }
*/
                })
                    .catch(function (response) {
                    console.log("**********");
                    //console.log(response);
                });
                /*
                var ctx = "";
                var worksheetsXML = "";
                var fileName = "Maturity";
                console.log("entered here");
                        devopsMaturityService.maturityFileDonwload()
                .then(function (data) {
                    
                    if (data.status == "success") {
                        
                                console.log("entered here success");
                                console.log((data.fileData));
                                var uri = 'data:text/xlsx;charset=utf-8,' + encodeURI(data.fileData);
                                var link = <HTMLAnchorElement>document.createElement("a");
                                link.href = uri;
                                link.download = fileName + ".xlsx";
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                                
                                
                    } else {
                            $scope.showFiledownloadError = true;
                            console.log("entered here failure");
                    }
                    
                })
                .catch(function (data) {
                            console.log("entered here function mismatch");
                });*/
                /*
                //$scope.filename="C:\\Users\\Administrator\\Desktop\\sample.py";
                var fileName = "Maturity";
                var uri = 'data:text/xlsx;charset=utf-8,' + encodeURI("abc");
                    var link = <HTMLAnchorElement>document.createElement("a");
                    link.href = uri;

                    //set the visibility hidden so it will not effect on your web-layout
                    //link.style = "visibility:hidden";
                    link.download = fileName + ".txt";

                    //this part will append the anchor tag and remove it after automatic click
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
*/
            };
        };
        devopsMaturityController.$inject = ['$location', '$window', '$mdDialog', '$scope',
            '$filter', 'devopsMaturityService', '$resource', '$http', '$route', '$cookies', 'restAPIUrlService'];
        return devopsMaturityController;
    }());
    ISightApp.devopsMaturityController = devopsMaturityController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=devopsMaturityController.js.map
//# sourceMappingURL=devopsMaturityFileUpload.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var DevopsMaturityService = /** @class */ (function () {
        function DevopsMaturityService($q, $resource, $cookies, restCallHandlerService) {
            this.$q = $q;
            this.$resource = $resource;
            this.$cookies = $cookies;
            this.restCallHandlerService = restCallHandlerService;
        }
        DevopsMaturityService.prototype.saveDevopsMaturity = function (settingsDataType, activeDataFlag, lastModifiedUser, settingsJsonstr) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("SAVE_DEVOPS_MATURITY_SETTING", { 'settingsType': settingsDataType, 'activeFlag': activeDataFlag, 'lastModifiedByUser': lastModifiedUser, 'settingsJson': settingsJsonstr }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        DevopsMaturityService.prototype.maturityFileDonwload = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("DOWNLOAD_MATURITY_FILE");
        };
        DevopsMaturityService.prototype.listDevopsMaturity = function (label) {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("LIST_DEVOPS_MATURITY_SETTING", { 'settingsType': label });
        };
        DevopsMaturityService.$inject = ['$q', '$resource', '$cookies', 'restCallHandlerService'];
        return DevopsMaturityService;
    }());
    ISightApp.DevopsMaturityService = DevopsMaturityService;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=devopsMaturityService.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var ElasticSearchService = /** @class */ (function () {
        function ElasticSearchService($resource, $q, $cookies, restCallHandlerService, restEndpointService) {
            this.$resource = $resource;
            this.$q = $q;
            this.$cookies = $cookies;
            this.restCallHandlerService = restCallHandlerService;
            this.restEndpointService = restEndpointService;
        }
        ElasticSearchService.prototype.loadKibanaIndex = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("SEARCH_DASHBOARD");
        };
        ElasticSearchService.prototype.queryNeo4jData = function (queryTerm) {
            var elasticSearchResource = this.$resource(this.restEndpointService.getelasticSearchServiceHost() + '/neo4j-index/_search?from=0&size=100&q=*' + queryTerm + '*', {}, {
                get: {
                    method: 'GET',
                }
            });
            return elasticSearchResource.get().$promise;
        };
        ElasticSearchService.$inject = ['$resource', '$q', '$cookies', 'restCallHandlerService', 'restEndpointService'];
        return ElasticSearchService;
    }());
    ISightApp.ElasticSearchService = ElasticSearchService;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=elasticSearchService.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var GraphService = /** @class */ (function () {
        function GraphService($resource, $cookies, restEndpointService, restCallHandlerService) {
            this.$resource = $resource;
            this.$cookies = $cookies;
            this.restEndpointService = restEndpointService;
            this.restCallHandlerService = restCallHandlerService;
            this.graphQueryExecutor = this.createQueryExecutor();
        }
        GraphService.prototype.createQueryExecutor = function () {
            var authToken = this.$cookies.get('Authorization');
            //$resource(url, [paramDefaults], [actions], options);
            //Refer to https://github.com/angular/angular.js/issues/3852
            return this.$resource(this.restEndpointService.getServiceHost() + '/PlatformService/db/data', {}, {
                executeCypher: {
                    method: 'POST',
                    headers: {
                        'Authorization': authToken,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    transformRequest: function (data) {
                        if (data && data.cypher) {
                            return 'cypher=' + encodeURIComponent(JSON.stringify(data.cypher));
                        }
                        return;
                    }
                }
            });
        };
        GraphService.prototype.executeQuery = function (query) {
            var restHandler = this.restCallHandlerService;
            var encodedCypher = encodeURIComponent(JSON.stringify(query));
            return restHandler.post("DB_DATA", { "cypher": encodedCypher }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        GraphService.$inject = ['$resource', '$cookies', 'restEndpointService', 'restCallHandlerService'];
        return GraphService;
    }());
    ISightApp.GraphService = GraphService;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=graphService.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var AboutDialogeController = /** @class */ (function () {
        function AboutDialogeController(userOnboardingService, $mdDialog, $route) {
            this.userOnboardingService = userOnboardingService;
            this.$mdDialog = $mdDialog;
            this.$route = $route;
            this.data = [];
            this.data = this['locals'].data;
            console.log(this.data);
        }
        AboutDialogeController.prototype.closeDialog = function () {
            this.$mdDialog.cancel();
            this.$mdDialog.hide();
        };
        return AboutDialogeController;
    }());
    ISightApp.AboutDialogeController = AboutDialogeController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=aboutDialogeController.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var HomePageController = /** @class */ (function () {
        function HomePageController($location, $window, $cookies, $rootScope, authenticationService, restEndpointService, $sce, $timeout, $mdDialog, aboutService, $resource, restAPIUrlService) {
            this.$location = $location;
            this.$window = $window;
            this.$cookies = $cookies;
            this.$rootScope = $rootScope;
            this.authenticationService = authenticationService;
            this.restEndpointService = restEndpointService;
            this.$sce = $sce;
            this.$timeout = $timeout;
            this.$mdDialog = $mdDialog;
            this.aboutService = aboutService;
            this.$resource = $resource;
            this.restAPIUrlService = restAPIUrlService;
            this.isValidUser = false;
            /*start for common code */
            this.isTabSeleted = false;
            this.imageurl1 = "dist/icons/svg/landingPage/Admin_icon_selected.svg";
            this.imageurl2 = "dist/icons/svg/landingPage/Dashboard_icon_normal.svg";
            this.imageurl3 = "dist/icons/svg/landingPage/Healthcheck_icon_normal.svg";
            this.imageurl4 = "dist/icons/svg/landingPage/Help_icon_normal.svg";
            this.imageurl5 = "dist/icons/svg/landingPage/playlist_normal.svg";
            this.imageurl6 = "dist/icons/svg/landingPage/logout_normal.svg";
            this.imageurl7 = "dist/icons/svg/landingPage/magnifying_glass.svg";
            this.aboutImg = "dist/icons/svg/landingPage/about_normal.svg";
            this.playListUrl = '';
            this.templateName = 'insights';
            this.footerMinHeight = 'min-height:' + (window.innerHeight - 146) + 'px;';
            this.footerHeight = '';
            this.mainContentMinHeight = 'min-height:' + (window.innerHeight - 146 - 96) + 'px';
            this.mainContentMinHeightWoSbTab = 'min-height:' + (window.innerHeight - 146 - 48) + 'px';
            this.iframeStyle = 'width:100%; height:1600px;border:0';
            this.iframeWidth = window.innerWidth - 20;
            this.iframeHeight = window.innerHeight;
            this.aboutMeContent = {};
            this.showAdminTab = false;
            this.showBusinessMapping = false;
            this.agentsOsList = {};
            this.selectedAgentID = {};
            this.selectDashboard = false;
            this.selectedDashboardUrl = '';
            this.userName = '';
            this.userRole = '';
            this.userCurrentOrg = '';
            this.userCurrentOrgName = '';
            this.imageSrc = "dist/icons/svg/landingPage/Cognizant_Insights.svg";
            this.showDefaultImg = false;
            this.showTrackingJsonUploadButton = false;
            var self = this;
            this.authenticationService.validateSession();
            this.isValidUser = true;
            self.iframeStyle = 'width:100%; height:1600px;';
            var receiveMessage = function (evt) {
                var height = parseInt(evt.data);
                if (!isNaN(height)) {
                    self.iframeStyle = 'width:100%; height:' + (evt.data + 20) + 'px';
                    $timeout(0);
                }
            };
            window.addEventListener('message', receiveMessage, false);
            self.authenticationService.getGrafanaCurrentOrgAndRole()
                .then(function (data) {
                if (data.grafanaCurrentOrgRole === 'Admin') {
                    self.showAdminTab = true;
                }
                else {
                    self.showAdminTab = false;
                }
                self.$cookies.put('grafanaRole', data.grafanaCurrentOrgRole);
                self.$cookies.put('grafanaOrg', data.grafanaCurrentOrg);
                if (data.userName != undefined) {
                    self.userName = data.userName.replace(/['"]+/g, '');
                }
                self.userRole = data.grafanaCurrentOrgRole;
                self.userCurrentOrg = data.grafanaCurrentOrg;
                self.authenticationService.getCurrentUserOrgs()
                    .then(function (orgdata) {
                    self.userCurrentOrgName = orgdata.data.filter(function (i) {
                        return i.orgId == self.userCurrentOrg;
                    });
                });
                var location = self.$location;
                var uiConfigJsonUrl = location.absUrl().replace(location.path(), "");
                if (uiConfigJsonUrl.length > uiConfigJsonUrl.lastIndexOf('/')) {
                    uiConfigJsonUrl = uiConfigJsonUrl.substr(0, uiConfigJsonUrl.lastIndexOf('/'));
                }
                uiConfigJsonUrl += "/uiConfig.json";
                var configResource = self.$resource(uiConfigJsonUrl);
                var data = configResource.get().$promise.then(function (data) {
                    self.showInsightsTab = data.showInsightsTab;
                    if (self.showAdminTab) {
                        if (self.showInsightsTab) {
                            self.selectedIndex = 1;
                            self.templateName = 'insights';
                        }
                        else {
                            self.selectedIndex = 1;
                            self.templateName = 'dashboards';
                        }
                    }
                    else {
                        if (self.showInsightsTab) {
                            self.selectedIndex = 0;
                            self.templateName = 'insights';
                        }
                        else {
                            self.selectedIndex = 0;
                            self.templateName = 'dashboards';
                        }
                    }
                });
            });
            //self.selectedIndex = 2;
            //self.templateName = 'dashboards';
            var location = this.$location;
            var uiConfigJsonUrl = location.absUrl().replace(location.path(), "");
            if (uiConfigJsonUrl.length > uiConfigJsonUrl.lastIndexOf('/')) {
                uiConfigJsonUrl = uiConfigJsonUrl.substr(0, uiConfigJsonUrl.lastIndexOf('/'));
            }
            uiConfigJsonUrl += "/uiConfig.json";
            var configResource = this.$resource(uiConfigJsonUrl);
            var data = configResource.get().$promise.then(function (data) {
                self.showInsightsTab = data.showInsightsTab;
                self.showBusinessMapping = data.showBusinessMapping;
                self.agentsOsList = data.agentsOsList;
                if (self.showInsightsTab) {
                    self.selectedIndex = 1;
                    self.templateName = 'insights';
                }
                else {
                    self.selectedIndex = 2;
                    self.templateName = 'dashboards';
                }
            });
            var restCallUrl = restAPIUrlService.getRestCallUrl("GET_LOGO_IMAGE");
            var resource = this.$resource(restCallUrl, {}, {
                allData: {
                    method: 'GET'
                }
            });
            resource.allData().$promise.then(function (data) {
                if (data.data.encodedString && data.data.encodedString.length > 0) {
                    self.imageSrc = 'data:image/jpg;base64,' + data.data.encodedString;
                }
                else {
                    self.showDefaultImg = true;
                }
            });
        }
        HomePageController.prototype.redirect = function (iconId) {
            if (iconId == 'dashboard') {
                this.$location.path('/InSights/dashboard/');
            }
            else if (iconId == 'settings') {
                this.$location.path('/InSights/toolsConfig');
            }
            else if (iconId == 'graphview') {
                this.$location.path('/InSights/explore');
            }
            else if (iconId == 'userview') {
                this.$location.path('/InSights/roles');
            }
            else if (iconId == 'prjtmapping') {
                this.$location.path('/InSights/onboardProject');
            }
            else if (iconId == 'healthcheck') {
                this.$location.path('/InSights/agent');
            }
        };
        HomePageController.prototype.showAboutInsights = function () {
            var self = this;
            this.aboutService.loadDetails().then(function (data) {
                console.log(data);
                self.aboutMeContent['data'] = data;
                self.$mdDialog.show({
                    controller: ISightApp.AboutDialogeController,
                    controllerAs: 'aboutDialogeController',
                    templateUrl: './dist/modules/homepage/view/aboutInsights.tmpl.html',
                    parent: angular.element(document.body),
                    preserveScope: true,
                    clickOutsideToClose: true,
                    bindToController: true,
                    locals: {
                        data: data
                    }
                });
            });
        };
        HomePageController.prototype.closeDialog = function () {
            this.$mdDialog.cancel();
            this.$mdDialog.hide();
        };
        HomePageController.prototype.selectAct = function (tabName) {
            this.authenticationService.validateSession();
            this.templateName = tabName;
            if ('playlist' === tabName) {
                var self = this;
                self.restEndpointService.getGrafanaHost1().then(function (response) {
                    var grafanaEndPoint = response.grafanaEndPoint;
                    self.playListUrl = self.$sce.trustAsResourceUrl(grafanaEndPoint + '/dashboard/script/iSight.js?url=' + grafanaEndPoint + '/playlists');
                });
                // this.playListUrl = this.$sce.trustAsResourceUrl(self.restEndpointService.getGrafanaHost()  + '/dashboard/script/iSight.js?url=' + self.restEndpointService.getGrafanaHost() + '/playlists');
                //this.playListUrl = self.restEndpointService.getGrafanaHost() + '/dashboard/script/iSight.js?url=' + self.restEndpointService.getGrafanaHost() + '/playlists';
            }
            else {
                this.playListUrl = '';
            }
        };
        HomePageController.prototype.addSelectedImage = function (selectedTab) {
            var self = this;
            if (selectedTab == 'Admin') {
                self.imageurl1 = "dist/icons/svg/landingPage/Admin_icon_selected.svg";
            }
            else if (selectedTab == 'Dashboards') {
                self.imageurl2 = "dist/icons/svg/landingPage/Dashboard_icon_selected.svg";
            }
            else if (selectedTab == 'HealthCheck') {
                self.imageurl3 = "dist/icons/svg/landingPage/Healthcheck_icon_selected.svg";
            }
            else if (selectedTab == 'Help') {
                self.imageurl4 = "dist/icons/svg/landingPage/Help_icon_selected.svg";
            }
            else if (selectedTab == 'Playlists') {
                self.imageurl5 = "dist/icons/svg/landingPage/playlist_selected.svg";
            }
        };
        HomePageController.prototype.removeSelectedImage = function (selectedTab) {
            var self = this;
            if (selectedTab == 'Admin') {
                self.imageurl1 = "dist/icons/svg/landingPage/Admin_icon_normal.svg";
            }
            else if (selectedTab == 'Dashboards') {
                self.imageurl2 = "dist/icons/svg/landingPage/Dashboard_icon_normal.svg";
            }
            else if (selectedTab == 'HealthCheck') {
                self.imageurl3 = "dist/icons/svg/landingPage/Healthcheck_icon_normal.svg";
            }
            else if (selectedTab == 'Help') {
                self.imageurl4 = "dist/icons/svg/landingPage/Help_icon_normal.svg";
            }
            else if (selectedTab == 'Playlists') {
                self.imageurl5 = "dist/icons/svg/landingPage/playlist_normal.svg";
            }
        };
        HomePageController.prototype.addHoverImage = function (hoverTab) {
            if (hoverTab === "about") {
                this.aboutImg = "dist/icons/svg/landingPage/about_selected.svg";
            }
            else if (hoverTab === 'Help') {
                this.imageurl4 = "dist/icons/svg/landingPage/Help_icon_selected.svg";
            }
            else if (hoverTab === 'Logout') {
                this.imageurl6 = "dist/icons/svg/landingPage/logout_selected.svg";
            }
        };
        HomePageController.prototype.removeHoverImage = function (hoverTab) {
            var hover = this;
            if (hoverTab === 'about') {
                this.aboutImg = "dist/icons/svg/landingPage/about_normal.svg";
            }
            else if (hoverTab === 'Help') {
                this.imageurl4 = "dist/icons/svg/landingPage/Help_icon_normal.svg";
            }
            else if (hoverTab === 'Logout') {
                this.imageurl6 = "dist/icons/svg/landingPage/logout_normal.svg";
            }
        };
        HomePageController.prototype.logout = function () {
            //this.$cookies.remove('Authorization');
            //this.$cookies.remove('grafanaOrg');
            var self = this;
            var uniqueString = "grfanaLoginIframe";
            var iframe = document.createElement("iframe");
            iframe.id = uniqueString;
            document.body.appendChild(iframe);
            iframe.style.display = "none";
            iframe.contentWindow.name = uniqueString;
            // construct a form with hidden inputs, targeting the iframe
            var form = document.createElement("form");
            form.target = uniqueString;
            this.restEndpointService.getGrafanaHost1().then(function (response) {
                form.action = response.grafanaEndPoint + "/logout";
                // console.log("form action "+form.action);
                form.method = "GET";
                document.body.appendChild(form);
                form.submit();
            });
            this.authenticationService.logout()
                .then(function (data) {
                //console.log(data);
            });
            var cookieVal = this.$cookies.getAll();
            for (var key in cookieVal) {
                cookieVal[key] = '';
                this.$cookies.put(key, cookieVal[key]);
                this.$cookies.remove(key);
            }
            this.$location.path('/iSight/login');
        };
        HomePageController.$inject = ['$location', '$window', '$cookies', '$rootScope', 'authenticationService', 'restEndpointService', '$sce', '$timeout', '$mdDialog', 'aboutService', '$resource', 'restAPIUrlService'];
        return HomePageController;
    }());
    ISightApp.HomePageController = HomePageController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=homePageController.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var IconService = /** @class */ (function () {
        function IconService() {
            this.toolsIconData = {
                'ALM': 'dist/icons/svg/ALM-new.svg',
                'SCM': 'dist/icons/svg/SCM-new.svg',
                'CI': 'dist/icons/svg/CI-new.svg',
                'Artifact_Management': 'dist/icons/svg/artifact-mangement-new.svg',
                'Code_Quality': 'dist/icons/svg/code-quality-new.svg',
                'Continuous Testing': 'dist/icons/svg/continuous-testing-new.svg',
                'Deployment': 'dist/icons/svg/deployment-new.svg',
                'Cloud': 'dist/icons/svg/cloud-new.svg',
                'JIRA': 'dist/icons/svg/toolsIcon/ALM/JIRA.svg',
                'Rally': 'dist/icons/svg/toolsIcon/ALM/Rally.svg',
                'GIT': 'dist/icons/svg/toolsIcon/SCM/GIT.svg',
                'BitBucket': 'dist/icons/svg/toolsIcon/SCM/BitBucket.svg',
                'CVS': 'dist/icons/svg/toolsIcon/SCM/CVS.svg',
                'TFS': 'dist/icons/svg/toolsIcon/SCM/TFS.svg',
                'Perforce': 'dist/icons/svg/toolsIcon/SCM/Perforce.svg',
                'Subversion': 'dist/icons/svg/toolsIcon/SCM/Subversion.svg',
                'Stash': 'dist/icons/svg/toolsIcon/SCM/stash.svg',
                'JENKINS': 'dist/icons/svg/toolsIcon/CI/Jenkins.svg',
                'Bamboo': 'dist/icons/svg/toolsIcon/CI/Bamboo.svg',
                'Teamcity': 'dist/icons/svg/toolsIcon/CI/Teamcity.svg',
                'Nexus': 'dist/icons/svg/toolsIcon/artifactManagement/Nexus.svg',
                'Artifactory': 'dist/icons/svg/toolsIcon/artifactManagement/Artifactory.svg',
                'SONAR': 'dist/icons/svg/toolsIcon/codeQuality/SONAR.svg',
                'FishEye': 'dist/icons/svg/toolsIcon/codeQuality/FishEye.svg',
                'Crucible': 'dist/icons/svg/toolsIcon/codeQuality/Crucible.svg',
                'Coverity': 'dist/icons/svg/toolsIcon/codeQuality/Coverity.svg',
                'QTP': 'dist/icons/svg/toolsIcon/testing/QTP.svg',
                'Selenium': 'dist/icons/svg/toolsIcon/testing/Selenium.svg',
                'Rundeck': 'dist/icons/svg/toolsIcon/deployment/Rundeck.svg',
                'Docker': 'dist/icons/svg/toolsIcon/deployment/Docker.svg',
                'Amazon': 'dist/icons/svg/toolsIcon/cloud/Amazon.svg',
                'Azure': 'dist/icons/svg/toolsIcon/cloud/Azure.svg',
                'Cloudstack': 'dist/icons/svg/toolsIcon/cloud/Cloudstack.svg',
                'Openstack': 'dist/icons/svg/toolsIcon/cloud/Openstack.svg',
                'Vmware': 'dist/icons/svg/toolsIcon/cloud/Vmware.svg',
            };
        }
        IconService.prototype.getIcon = function (toolName) {
            for (var tool in this.toolsIconData) {
                if (tool === toolName) {
                    this.iconSrc = this.toolsIconData[tool];
                }
            }
            return this.iconSrc;
        };
        return IconService;
    }());
    ISightApp.IconService = IconService;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=isightIconService.js.map
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
    var InsightsController = /** @class */ (function () {
        function InsightsController(iconService, $mdDialog, $routeParam, $cookies, $timeout, restEndpointService, insightsService, $sce, $resource, $location) {
            this.iconService = iconService;
            this.$mdDialog = $mdDialog;
            this.$routeParam = $routeParam;
            this.$cookies = $cookies;
            this.$timeout = $timeout;
            this.restEndpointService = restEndpointService;
            this.insightsService = insightsService;
            this.$sce = $sce;
            this.$resource = $resource;
            this.$location = $location;
            this.agentNodes = [];
            this.selectedType = ['POSITIVE', 'NEGATIVE', 'NEUTRAL'];
            this.selectedKpi = ['BUILD', 'CODEQUALITY', 'DEPLOYMENT', 'DEFECTS', 'DEVELOPMENT'];
            this.selectedSchedule = "DAILY";
            this.selectedNumberOfkpis = 0;
            this.allSelectedValues = [];
            this.agentToolsIcon = {};
            this.notAuthorizeMsg = "";
            this.toolsData = [];
            this.chartType = "BarChart";
            this.showTemplateAfterLoad = false;
            this.accordianData = [];
            this.imageurl1 = "dist/icons/svg/CI-new.svg";
            this.imageurl2 = "dist/icons/svg/code-quality-new.svg";
            this.imageurl3 = "dist/icons/svg/deployment-new.svg";
            this.grafanaHost = this.restEndpointService.getGrafanaHost();
            this.mouseentered = false;
            this.data1 = '50';
            this.data2 = '60';
            this.graphcolor = "#90b4ed";
            this.populateChartObj = [];
            this.numberofkpi = 0;
            this.selectedChartType = 'BarChart';
            this.typeList = [{ "name": "POSITIVE", "checked": false }, { "name": "NEGATIVE", "checked": false }, { "name": "NEUTRAL", "checked": false }];
            this.vectorList = [{ "name": "BUILD", "checked": false }, { "name": "CODEQUALITY", "checked": false }, { "name": "DEPLOYMENT", "checked": false }, { "name": "DEFECTS", "checked": false }, { "name": "DEVELOPMENT", "checked": false }];
            this.collapse = function (data) {
                var self = this;
                for (var i in self.accordianData) {
                    if (self.accordianData[i] != data) {
                        self.accordianData[i].expanded = false;
                    }
                }
                data.expanded = !data.expanded;
            };
            this.expandAll = function () {
                var self = this;
                for (var i in self.accordianData) {
                    if (self.accordianData[i]) {
                        self.accordianData[i].expanded = true;
                    }
                }
                self.expandedAll = true;
            };
            this.showHide = function (eleId) {
                var x = document.getElementById(eleId);
                if (x.style.display === "none" || x.style.display === "") {
                    x.style.display = "block";
                }
                else {
                    x.style.display = "none";
                }
            };
            this.highlight = function (text, search) {
                var re = new RegExp(search, 'gi');
                if (!search || !re.test(text)) {
                    return this.$sce.trustAsHtml('<span class="highlightedText">' + text + '</span>');
                }
                return this.$sce.trustAsHtml(text.replace(new RegExp(search, 'gi'), '<span class="highlightedText">$&</span>'));
            };
            this.collapseAll = function () {
                var self = this;
                for (var i in self.accordianData) {
                    if (self.accordianData[i]) {
                        self.accordianData[i].expanded = false;
                    }
                }
                self.expandedAll = false;
            };
            this.onChangeRadio = function () {
                var self = this;
                self.allSelectedValues = [];
                self.allSelectedValues.push(self.selectedChartType);
                // self.allSelectedValues.push(self.numberofkpi);
                self.allSelectedValues.push(self.selectedSchedule);
                for (var i = 0; i < self.typeList.length; i++) {
                    if (self.typeList[i].checked) {
                        self.allSelectedValues.push(self.typeList[i].name);
                    }
                }
                for (var i = 0; i < self.vectorList.length; i++) {
                    if (self.vectorList[i].checked) {
                        self.allSelectedValues.push(self.vectorList[i].name);
                    }
                }
            };
            var self = this;
            var elem = document.querySelector('#homePageTemplateContainer');
            var homePageControllerScope = angular.element(elem).scope();
            var homePageController = homePageControllerScope['homePageController'];
            this.homeController = homePageController;
            this.homeController.templateName = 'insights';
            //this.$timeout = $timeout;
            this.showThrobber = true;
            self.insightsService.getInsightsDetails("DAILY").then(function (response) {
                self.showThrobber = false;
                self.accordianData = response.data;
                var accordianLength = self.accordianData.length;
                if (typeof self.accordianData[0] != 'undefined') {
                    self.accordianData[0].expanded = true;
                }
                if (typeof self.accordianData != 'undefined' && self.accordianData.length) {
                    for (var i = 0; i < accordianLength; i++) {
                        var objSentiment = self.accordianData[i].inferenceDetails[0].sentiment;
                        var graphColor = self.getGraphColor(objSentiment);
                        self.accordianData[i].noOfPositives = self.accordianData[i].inferenceDetails.filter(function (element) {
                            return element.sentiment === 'POSITIVE';
                        }).length;
                        self.accordianData[i].noOfNegatives = self.accordianData[i].inferenceDetails.filter(function (element) {
                            return element.sentiment === 'NEGATIVE';
                        }).length;
                        self.accordianData[i].noOfNeutral = self.accordianData[i].inferenceDetails.filter(function (element) {
                            return element.sentiment === 'NEUTRAL';
                        }).length;
                        var obj = new ISightApp.ChartObjModel(self.accordianData[i].inferenceDetails[0].lastResult, self.accordianData[i].inferenceDetails[0].currentResult, self.accordianData[i].inferenceDetails[0].inference, self.accordianData[i].inferenceDetails[0].sentiment, graphColor, self.processArray(self.accordianData[i].inferenceDetails[0].resultSet, graphColor), "BarChart");
                        self.populateChartObj[i] = obj;
                    }
                }
            });
            var location = this.$location;
            var uiConfigJsonUrl = location.absUrl().replace(location.path(), "");
            if (uiConfigJsonUrl.length > uiConfigJsonUrl.lastIndexOf('/')) {
                uiConfigJsonUrl = uiConfigJsonUrl.substr(0, uiConfigJsonUrl.lastIndexOf('/'));
            }
            uiConfigJsonUrl += "/uiConfig.json";
            var configResource = this.$resource(uiConfigJsonUrl);
            var data = configResource.get().$promise.then(function (data) {
                self.showOptionsPanel = data.showOptionsPanel;
            });
        }
        InsightsController.prototype.getChartObjJson = function (index) {
            var obj = this.populateChartObj[index];
            var objSentiment = obj.sentiment;
            if (objSentiment === "POSITIVE") {
                obj.graphcolor = "#7dc65b";
            }
            else if (objSentiment === "NEGATIVE") {
                obj.graphcolor = "red";
            }
            else if (objSentiment === "NEUTRAL") {
                obj.graphcolor = "#90b4ed";
            }
            return {
                "type": obj.chartType,
                "data": {
                    "cols": [{
                            "id": "t",
                            "label": "week",
                            "type": "string"
                        },
                        {
                            "id": "s",
                            "label": "value",
                            "type": "number"
                        },
                        {
                            role: "style",
                            type: "string"
                        }
                    ],
                    "rows": obj.resultSet
                },
                "options": {
                    "title": obj.inference,
                    legend: {
                        position: 'none'
                    }
                }
            };
        };
        ;
        InsightsController.prototype.getGraphColor = function (sentiment) {
            var graphColor = '';
            if (sentiment === "POSITIVE") {
                graphColor = "#7dc65b";
            }
            else if (sentiment === "NEGATIVE") {
                graphColor = "red";
            }
            else if (sentiment === "NEUTRAL") {
                graphColor = "#90b4ed";
            }
            return graphColor;
        };
        InsightsController.prototype.processArray = function (json, graphColor) {
            var chartData = [];
            for (var i = 0, l = json.length; i < l; i++) {
                chartData.push({ c: [{ "v": json[i].resultDate }, { "v": json[i].value }, { "v": graphColor }] });
            }
            return chartData;
        };
        InsightsController.prototype.showAboutInsights = function (params) {
            var self = this;
            self.$mdDialog.show({
                controller: ISightApp.QuickViewDialogController,
                controllerAs: 'quickViewDialogController',
                templateUrl: './dist/modules/insights/view/quickViewDialogViewTemplate.tmp.html',
                parent: angular.element(document.body),
                targetEvent: params,
                preserveScope: true,
                clickOutsideToClose: true,
                locals: {
                    chartType: self.chartType,
                    selectedKpi: self.selectedKpi,
                    selectedNumberOfkpis: self.selectedNumberOfkpis,
                    selectedType: self.selectedType,
                    selectedSchedule: self.selectedSchedule
                },
                bindToController: true
            }).then(function (responseObj) {
                self.submit(false);
            }, function (selectedType) {
                console.log('You cancelled the dialog.' + selectedType);
            });
        };
        InsightsController.prototype.openNav = function () {
            document.getElementById("mySidenav").style.width = "250px";
            document.getElementById("accrdion").style.width = "80%";
            document.getElementById("accrdion").style.marginLeft = "200px";
            document.getElementById("accrdion").style.transition = "0.5s";
            document.getElementById("settingsbtn").style.visibility = "hidden";
        };
        /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
        InsightsController.prototype.closeNav = function () {
            document.getElementById("mySidenav").style.width = "0";
            document.getElementById("accrdion").style.marginLeft = "0";
            document.getElementById("accrdion").style.width = "100%";
            document.getElementById("accrdion").style.transition = "0.5s";
            document.getElementById("settingsbtn").style.visibility = "visible";
        };
        InsightsController.prototype.viewData = function (params, lastestData, lastData, sentiment, inference, index, resultSet, charttype) {
            var self = this;
            var statusObject = {
                'status': false
            };
            this.mouseentered = true;
            var graphColor = self.getGraphColor(sentiment);
            var obj = new ISightApp.ChartObjModel(lastData, lastestData, inference, sentiment, graphColor, self.processArray(resultSet, graphColor), charttype);
            self.populateChartObj[index] = obj;
        };
        InsightsController.prototype.submit = function (clrAll) {
            var self = this;
            if (clrAll) {
                for (var i = 0; i < this.typeList.length; i++) {
                    if (this.typeList[i].checked) {
                        this.typeList[i].checked = false;
                    }
                }
                for (var i = 0; i < this.vectorList.length; i++) {
                    if (this.vectorList[i].checked) {
                        this.vectorList[i].checked = false;
                    }
                }
                this.selectedType = [];
                this.selectedKpi = [];
                this.numberofkpi = 0;
                this.selectedChartType = "BarChart";
                this.selectedSchedule = "DAILY";
                this.chartType = "BarChart";
                this.selectedNumberOfkpis = 0;
                self.onChangeRadio();
            }
            else {
                var selectedTypes = [];
                var selectedKpis = [];
                //this.selectedType = obj.selectedTypes;
                //this.selectedKpi = obj.selectedKpis;
                for (var i = 0; i < this.typeList.length; i++) {
                    if (this.typeList[i].checked) {
                        selectedTypes.push(this.typeList[i].name);
                    }
                }
                for (var i = 0; i < this.vectorList.length; i++) {
                    if (this.vectorList[i].checked) {
                        selectedKpis.push(this.vectorList[i].name);
                    }
                }
                self.selectedType = selectedTypes;
                self.selectedKpi = selectedKpis;
                var selectedNumberOfkpis = this.numberofkpi;
                //selectedNumberOfkpis = parseInt(selectedNumberOfkpis);
                this.selectedNumberOfkpis = selectedNumberOfkpis;
                var selectedChartType = this.selectedChartType;
                var chartTypes = "BarChart";
                if (selectedChartType) {
                    chartTypes = selectedChartType;
                }
                this.chartType = chartTypes;
                var schedule = this.selectedSchedule;
                this.selectedSchedule = schedule;
            }
            self.showThrobber = true;
            self.insightsService.getInsightsDetails(this.selectedSchedule).then(function (response) {
                self.showThrobber = false;
                self.accordianData = response.data;
                if (typeof self.selectedKpi != 'undefined' && self.accordianData.length && self.selectedKpi.length > 0) {
                    self.accordianData = self.accordianData.filter(function (element) {
                        return self.selectedKpi.indexOf(element.heading) > -1;
                    });
                }
                var accordianLength = self.accordianData.length;
                if (typeof self.accordianData[0] != 'undefined') {
                    self.accordianData[0].expanded = true;
                }
                if (typeof self.accordianData != 'undefined' && self.accordianData.length) {
                    for (var i = 0; i < accordianLength; i++) {
                        var objSentiment = self.accordianData[i].inferenceDetails[0].sentiment;
                        self.accordianData[i].noOfPositives = self.accordianData[i].inferenceDetails.filter(function (element) {
                            return element.sentiment === 'POSITIVE';
                        }).length;
                        self.accordianData[i].noOfNegatives = self.accordianData[i].inferenceDetails.filter(function (element) {
                            return element.sentiment === 'NEGATIVE';
                        }).length;
                        self.accordianData[i].noOfNeutral = self.accordianData[i].inferenceDetails.filter(function (element) {
                            return element.sentiment === 'NEUTRAL';
                        }).length;
                        if (self.selectedType.length > 0) {
                            self.accordianData[i].inferenceDetails = self.accordianData[i].inferenceDetails.filter(function (element) {
                                return self.selectedType.indexOf(element.sentiment) > -1;
                            });
                        }
                        if (selectedNumberOfkpis > 0) {
                            self.accordianData[i].inferenceDetails = self.accordianData[i].inferenceDetails.slice(0, self.selectedNumberOfkpis);
                        }
                        var graphColor = self.getGraphColor(objSentiment);
                        if (self.accordianData[i].inferenceDetails[0]) {
                            var obj = new ISightApp.ChartObjModel(self.accordianData[i].inferenceDetails[0].lastResult, self.accordianData[i].inferenceDetails[0].currentResult, self.accordianData[i].inferenceDetails[0].inference, self.accordianData[i].inferenceDetails[0].sentiment, graphColor, self.processArray(self.accordianData[i].inferenceDetails[0].resultSet, graphColor), self.chartType);
                            self.populateChartObj[i] = obj;
                        }
                    }
                }
            });
            return true;
        };
        InsightsController.prototype.getIconUrl = function (text, expanded) {
            var url = '';
            if (expanded) {
                if (text.toLowerCase().indexOf('build') !== -1) {
                    url = "dist/icons/svg/insightsPage/Build-active.svg";
                }
                else if (text.toLowerCase().indexOf('code') !== -1) {
                    url = "dist/icons/svg/insightsPage/Code-Quality-active.svg";
                }
                else if (text.toLowerCase().indexOf('deploy') !== -1) {
                    url = "dist/icons/svg/insightsPage/Deployment-active.svg";
                }
                else if (text.toLowerCase().indexOf('productivity') !== -1 || text.toLowerCase().indexOf('development') !== -1) {
                    url = "dist/icons/svg/insightsPage/Developer-productivity.svg";
                }
                else if (text.toLowerCase().indexOf('environment') !== -1) {
                    url = "dist/icons/svg/insightsPage/Environment-active.svg";
                }
                else if (text.toLowerCase().indexOf('performance') !== -1) {
                    url = "dist/icons/svg/insightsPage/Performance-active.svg";
                }
                else if (text.toLowerCase().indexOf('release') !== -1) {
                    url = "dist/icons/svg/insightsPage/release-active.svg";
                }
                else if (text.toLowerCase().indexOf('defects') !== -1) {
                    url = "dist/icons/svg/insightsPage/Developer-productivity.svg";
                }
            }
            else {
                if (text.toLowerCase().indexOf('build') !== -1) {
                    url = "dist/icons/svg/insightsPage/Build-inactive.svg";
                }
                else if (text.toLowerCase().indexOf('code') !== -1) {
                    url = "dist/icons/svg/insightsPage/Code-Quality-inactive.svg";
                }
                else if (text.toLowerCase().indexOf('deploy') !== -1) {
                    url = "dist/icons/svg/insightsPage/Deployment-inactive.svg";
                }
                else if (text.toLowerCase().indexOf('productivity') !== -1 || text.toLowerCase().indexOf('development') !== -1) {
                    url = "dist/icons/svg/insightsPage/Developer-productivity-inactive.svg";
                }
                else if (text.toLowerCase().indexOf('environment') !== -1) {
                    url = "dist/icons/svg/insightsPage/Environment-inactive.svg";
                }
                else if (text.toLowerCase().indexOf('performance') !== -1) {
                    url = "dist/icons/svg/insightsPage/Performance-inactive.svg";
                }
                else if (text.toLowerCase().indexOf('release') !== -1) {
                    url = "dist/icons/svg/insightsPage/release-inactive.svg";
                }
                else if (text.toLowerCase().indexOf('defects') !== -1) {
                    url = "dist/icons/svg/insightsPage/Developer-productivity-inactive.svg";
                }
            }
            return url;
        };
        InsightsController.prototype.gotoDashboard = function (dashboardType) {
            this.homeController.selectedIndex = 2;
            if (dashboardType.toLowerCase().indexOf('build') !== -1) {
                this.homeController.selectedDashboardUrl = this.grafanaHost + "/dashboard/db/ci-dashboard";
            }
            else if (dashboardType.toLowerCase().indexOf('code') !== -1) {
                this.homeController.selectedDashboardUrl = this.grafanaHost + "/dashboard/db/code-quality-dashboard";
            }
            else if (dashboardType.toLowerCase().indexOf('deploy') !== -1) {
                this.homeController.selectedDashboardUrl = this.grafanaHost + "/dashboard/db/deployment-dashboard";
            }
            setTimeout(function () {
                document.getElementById('dashboardTab').click();
            }, 0);
            this.homeController.templateName = 'dashboards';
            this.homeController.selectAct('dashboards');
            this.homeController.redirect('dashboards');
            console.log(this.homeController);
        };
        InsightsController.$inject = ['iconService', '$mdDialog', '$routeParams', '$cookies', '$timeout', 'restEndpointService', 'insightsService', '$sce', '$resource', '$location'];
        return InsightsController;
    }());
    ISightApp.InsightsController = InsightsController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=insightsController.js.map
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
//// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var QuickViewDialogController = /** @class */ (function () {
        function QuickViewDialogController($mdDialog, $route, $location) {
            this.$mdDialog = $mdDialog;
            this.$route = $route;
            this.$location = $location;
            this.myChartObject = {
                "type": "BarChart",
                "data": {
                    "cols": [
                        {
                            "id": "t",
                            "label": "week",
                            "type": "string"
                        },
                        {
                            "id": "s",
                            "label": "avgbuildtime",
                            "type": "number"
                        }
                    ],
                    "rows": [
                        {
                            "c": [
                                {
                                    "v": "week1"
                                },
                                {
                                    "v": 60
                                }
                            ]
                        },
                        {
                            "c": [
                                {
                                    "v": "week2"
                                },
                                {
                                    "v": 50
                                }
                            ]
                        }
                    ]
                },
                "options": {
                    "title": "Average build over 2 weeks"
                }
            };
            this.buttonText = 'OK';
            this.statusObject = this['locals'].statusObject;
        }
        QuickViewDialogController.prototype.hide = function () {
            this.$mdDialog.hide();
        };
        QuickViewDialogController.prototype.cancel = function () {
            this.$mdDialog.cancel();
        };
        QuickViewDialogController.prototype.finalConfirmation = function () {
            if (this.buttonText === 'Yes') {
                this.statusObject.status = true;
                this.hide();
            }
            else if (this.buttonText === 'OK') {
                this.notification = 'Are you sure you wish to add the New Access Group ';
                this.buttonText = 'Yes';
            }
        };
        QuickViewDialogController.$inject = ['$mdDialog', '$route', '$location'];
        return QuickViewDialogController;
    }());
    ISightApp.QuickViewDialogController = QuickViewDialogController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=quickViewDialogController.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var ChartObjModel = /** @class */ (function () {
        function ChartObjModel(lastResult, currentResult, inference, sentiment, graphColor, resultSet, chartType) {
            this.lastResult = lastResult;
            this.currentResult = currentResult;
            this.inference = inference;
            this.sentiment = sentiment;
            this.graphColor = graphColor;
            this.resultSet = resultSet;
            this.chartType = chartType;
        }
        return ChartObjModel;
    }());
    ISightApp.ChartObjModel = ChartObjModel;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=chartObjModel.js.map
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var ChkboxModel = /** @class */ (function () {
        function ChkboxModel(name, checked) {
            this.name = name;
            this.checked = checked;
        }
        return ChkboxModel;
    }());
    ISightApp.ChkboxModel = ChkboxModel;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=chkboxModel.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var InsightsService = /** @class */ (function () {
        function InsightsService($resource, $q, $cookies, restCallHandlerService) {
            this.$resource = $resource;
            this.$q = $q;
            this.$cookies = $cookies;
            this.restCallHandlerService = restCallHandlerService;
        }
        InsightsService.prototype.getInsightsDetails = function (schedule) {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("INSIGHTS_GET", { 'schedule': schedule });
        };
        InsightsService.$inject = ['$resource', '$q', '$cookies', 'restCallHandlerService'];
        return InsightsService;
    }());
    ISightApp.InsightsService = InsightsService;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=InsightsService.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var KibanaDashboardController = /** @class */ (function () {
        function KibanaDashboardController(elasticSearchService, $sce) {
            this.elasticSearchService = elasticSearchService;
            this.$sce = $sce;
            this.icon = {
                iconSrc: 'dist/icons/svg/ic_dashboard_24px.svg', name: 'SCM'
            };
            var self = this;
            this.elasticSearchService
                .loadKibanaIndex()
                .then(function (data) {
                var model = [];
                var dataArray = data.dashboards;
                dataArray.forEach(function (element) {
                    model.push(new ISightApp.KibanaDashboardModel(element.title, element.id, element.url));
                });
                self.kibanaDashboards = model;
                self.setSelectedDashboard(model[0]);
            });
        }
        KibanaDashboardController.prototype.openMenu = function ($mdOpenMenu, ev) {
            //this.originatorEv = ev;
            $mdOpenMenu(ev);
        };
        KibanaDashboardController.prototype.setSelectedDashboard = function (dashboard) {
            this.selectedDashboard = dashboard;
            dashboard.url = this.$sce.trustAsResourceUrl(dashboard.url);
        };
        KibanaDashboardController.prototype.loadDashboard = function (dashboard) {
            this.setSelectedDashboard(dashboard);
        };
        KibanaDashboardController.$inject = ['elasticSearchService', '$sce'];
        return KibanaDashboardController;
    }());
    ISightApp.KibanaDashboardController = KibanaDashboardController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=kibanaDashboardController.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var KibanaDashboardModel = /** @class */ (function () {
        function KibanaDashboardModel(title, id, url) {
            this.title = title;
            this.id = id;
            this.url = url;
        }
        return KibanaDashboardModel;
    }());
    ISightApp.KibanaDashboardModel = KibanaDashboardModel;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=kibanaModels.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var LoginController = /** @class */ (function () {
        function LoginController(loginService, restEndpointService, $location, $document, $cookies, $http, $resource, restAPIUrlService) {
            this.loginService = loginService;
            this.restEndpointService = restEndpointService;
            this.$location = $location;
            this.$document = $document;
            this.$cookies = $cookies;
            this.$http = $http;
            this.$resource = $resource;
            this.restAPIUrlService = restAPIUrlService;
            this.showThrobber = false;
            this.imageSrc = "";
            this.showDefaultImg = false;
            var self = this;
            var restCallUrl = restAPIUrlService.getRestCallUrl("GET_LOGO_IMAGE");
            var resource = this.$resource(restCallUrl, {}, {
                allData: {
                    method: 'GET'
                }
            });
            resource.allData().$promise.then(function (data) {
                if (data.data.encodedString && data.data.encodedString.length > 0) {
                    self.imageSrc = 'data:image/jpg;base64,' + data.data.encodedString;
                }
                else {
                    self.showDefaultImg = true;
                }
            });
        }
        LoginController.prototype.userAuthentication = function (username, password) {
            if (username === '' || username === undefined || password === '' || password === undefined) {
                this.logMsg = '';
            }
            else {
                var self = this;
                this.isDisabled = true;
                this.showThrobber = true;
                var token = 'Basic ' + btoa(username + ":" + password);
                this.loginService.loginUserAuthentication(username, password)
                    .then(function (data) {
                    var grafcookies = data.data;
                    if (data.status === 'SUCCESS') {
                        self.showThrobber = false;
                        var date = new Date();
                        var minutes = 30;
                        date.setTime(date.getTime() + (minutes * 60 * 1000));
                        self.$cookies.put('Authorization', token, { expires: date });
                        self.$cookies.put('DashboardSessionExpiration', new Date(new Date().getTime() + 86400 * 1000));
                        this.cookies = "";
                        for (var key in grafcookies) {
                            //this.cookies += key+ '=' +grafcookies[key];
                            self.$cookies.put(key, grafcookies[key], { expires: date });
                        }
                        //self.$cookies.put('grafanaCookies',{'grafanaOrg':grafcookies.grafanaOrg,'grafanaRole':grafcookies.grafanaRole,'grafana_remember':grafcookies.grafana_remember, 'grafana_sess':grafcookies.grafana_sess, 'grafana_user':grafcookies.grafana_user});
                        //self.$cookies.put('cookies', this.cookies);
                        self.$location.path('/InSights/home');
                        var uniqueString = "grfanaLoginIframe";
                        var iframe = document.createElement("iframe");
                        iframe.id = uniqueString;
                        document.body.appendChild(iframe);
                        iframe.style.display = "none";
                        iframe.contentWindow.name = uniqueString;
                        // construct a form with hidden inputs, targeting the iframe
                        var form = document.createElement("form");
                        form.target = uniqueString;
                        //form.action = "http://localhost:3000/login";
                        form.action = self.restEndpointService.getGrafanaHost() + '/login';
                        //console.log(form.action);
                        form.method = "POST";
                        // repeat for each parameter
                        var input = document.createElement("input");
                        input.type = "hidden";
                        input.name = "user";
                        input.value = username;
                        form.appendChild(input);
                        var input1 = document.createElement("input");
                        input1.type = "hidden";
                        input1.name = "password";
                        input1.value = password;
                        form.appendChild(input1);
                        var input2 = document.createElement("input");
                        input2.type = "hidden";
                        input2.name = "email";
                        input2.value = '';
                        form.appendChild(input2);
                        document.body.appendChild(form);
                        form.submit();
                    }
                    else if (data.error.message) {
                        self.showThrobber = false;
                        self.isLoginError = true;
                        self.logMsg = data.error.message;
                        self.isDisabled = false;
                    }
                });
            }
        };
        LoginController.$inject = ['loginService', 'restEndpointService', '$location', '$document', '$cookies', '$http', '$resource', 'restAPIUrlService'];
        return LoginController;
    }());
    ISightApp.LoginController = LoginController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=loginController.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var LoginService = /** @class */ (function () {
        function LoginService($resource, restCallHandlerService) {
            this.$resource = $resource;
            this.restCallHandlerService = restCallHandlerService;
        }
        LoginService.prototype.loginUserAuthentication = function (username, password) {
            var token = 'Basic ' + btoa(username + ":" + password);
            var restHandler = this.restCallHandlerService;
            return restHandler.post("USER_AUTHNTICATE", {}, { 'Authorization': token });
        };
        LoginService.$inject = ['$resource', 'restCallHandlerService'];
        return LoginService;
    }());
    ISightApp.LoginService = LoginService;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=loginService.js.map
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
//// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var OnboardProjectDataModel = /** @class */ (function () {
        function OnboardProjectDataModel() {
            this.toolId = 0;
        }
        return OnboardProjectDataModel;
    }());
    ISightApp.OnboardProjectDataModel = OnboardProjectDataModel;
    var ToolRowsModel = /** @class */ (function () {
        function ToolRowsModel() {
            this.toolRows = [];
        }
        return ToolRowsModel;
    }());
    ISightApp.ToolRowsModel = ToolRowsModel;
    var Mapping = /** @class */ (function () {
        function Mapping() {
        }
        return Mapping;
    }());
    ISightApp.Mapping = Mapping;
    var MappingDefinitionModel = /** @class */ (function () {
        function MappingDefinitionModel() {
            this.mappingDefinitionRows = [];
        }
        return MappingDefinitionModel;
    }());
    ISightApp.MappingDefinitionModel = MappingDefinitionModel;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=onboardProjectModel.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var OnboardProjectService = /** @class */ (function () {
        function OnboardProjectService($q, $resource, $cookies, restEndpointService, restCallHandlerService) {
            this.$q = $q;
            this.$resource = $resource;
            this.$cookies = $cookies;
            this.restEndpointService = restEndpointService;
            this.restCallHandlerService = restCallHandlerService;
        }
        OnboardProjectService.prototype.getAllOrg = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("ORGS_GET");
        };
        OnboardProjectService.prototype.addProjectMapping = function (orgId, rowId, category, toolName, fieldName, fieldValue, projectName, projectId, businessUnit, hierarchyName) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("PROJECT_MAPPING_ADD", { "orgId": orgId, "rowId": rowId, "category": category, "toolName": toolName, "fieldName": fieldName, "fieldValue": fieldValue, "projectName": projectName, "projectId": projectId, "businessUnit": businessUnit, "hierarchyName": hierarchyName
            }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        OnboardProjectService.prototype.removeProjectMapping = function (orgId) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("PROJECT_MAPPING_REMOVE", { "orgId": orgId }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        OnboardProjectService.prototype.fetchProjectMappingByHierarchyName = function (hierarchyName) {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("PROJECT_MAPPING_BY_HIERARCHY", { 'hierarchyName': hierarchyName });
        };
        OnboardProjectService.prototype.fetchProjectMappingByOrgId = function (orgId) {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("PROJECT_MAPPING_BY_ORGID", { 'orgId': orgId });
        };
        OnboardProjectService.prototype.deleteToolMapping = function (orgId, category, toolName, toolId) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("TOOL_MAPPING_DELETE", { "orgId": orgId, "category": category, "toolName": toolName, "rowId": toolId }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        OnboardProjectService.prototype.getToolName = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("TOOL_NAME_GET");
        };
        OnboardProjectService.prototype.getPrjtMappingFields = function (toolName) {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("MAPPING_DATA", { 'toolName': toolName });
        };
        OnboardProjectService.prototype.getPrjtMappingFieldVal = function (toolName, fieldName) {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("MAPPING_FIELD_VAL", { 'toolName': toolName, 'fieldName': fieldName });
        };
        OnboardProjectService.prototype.getToolcat = function (toolName) {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("TOOL_CATEGORY", { 'toolName': toolName });
        };
        OnboardProjectService.prototype.fetchAllProjectMapping = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("PROJECT_MAPPING");
        };
        OnboardProjectService.prototype.getAllHierarchyName = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("DISTINCT_HIERARCHY");
        };
        OnboardProjectService.$inject = ['$q', '$resource', '$cookies', 'restEndpointService', 'restCallHandlerService'];
        return OnboardProjectService;
    }());
    ISightApp.OnboardProjectService = OnboardProjectService;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=onboardProjectService.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var EditToolConfigurationController = /** @class */ (function () {
        function EditToolConfigurationController($mdDialog, $route) {
            this.$mdDialog = $mdDialog;
            this.$route = $route;
            this.ToolConfigurationDataModel = this['locals'].toolConfigurationData.ToolConfigurationDataModel;
            this.toolData = JSON.stringify(this.ToolConfigurationDataModel, null, "    ");
        }
        EditToolConfigurationController.prototype.hide = function () {
            this.$mdDialog.hide();
        };
        EditToolConfigurationController.prototype.cancel = function () {
            this.$mdDialog.cancel();
        };
        EditToolConfigurationController.prototype.save = function () {
            this['locals'].toolConfigurationData.ToolConfigurationDataModel = JSON.parse(this.toolData);
            this.cancel();
        };
        EditToolConfigurationController.$inject = ['$mdDialog', '$route'];
        return EditToolConfigurationController;
    }());
    ISightApp.EditToolConfigurationController = EditToolConfigurationController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=editToolConfigurationController.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var OneToolConfigurationController = /** @class */ (function () {
        function OneToolConfigurationController($location, $window, toolConfigService, $mdDialog, $routeParams, $sce, $timeout) {
            this.$location = $location;
            this.$window = $window;
            this.toolConfigService = toolConfigService;
            this.$mdDialog = $mdDialog;
            this.$routeParams = $routeParams;
            this.$sce = $sce;
            this.$timeout = $timeout;
            this.configuredToolsList = [];
            this.selectedrows = 0;
            this.ToolRows = new ISightApp.ToolRows();
            this.toolName = '';
            this.toolCategory = '';
            this.isOpen = false;
            this.selectedMode = 'md-fling';
            this.selectedDirection = 'left';
            this.authModData = '';
            this.dataArray = [];
            this.toolsLayout = {
                jsonLayout: {}
            };
            this.buttonDisableStatus = true;
            this.saveButtonUrl = "dist/icons/svg/oneToolsConfigIcons/Save_icon_Disabled.svg";
            this.removeButtonUrl = "dist/icons/svg/oneToolsConfigIcons/Delete_icon_disabled.svg";
            this.downloadButtonUrl = "dist/icons/svg/oneToolsConfigIcons/Download_icon_Disabled.svg";
            this.addRowButtonUrl = "dist/icons/svg/oneToolsConfigIcons/Add_icon_MouseOver.svg";
            this.showTemplate = true;
            this.saveMsg = "";
            this.showTemplateAfterLoad = false;
            var elem = document.querySelector('#homePageTemplateContainer');
            var homePageControllerScope = angular.element(elem).scope();
            var homePageController = homePageControllerScope['homePageController'];
            this.homeController = homePageController;
            var self = this;
            self.selectTool();
            self.toolConfigService
                .readToolsConfigurationGlobal().then(function (data) {
                var dataArray = data.data;
                if (dataArray !== undefined) {
                    for (var i = 0; i < dataArray.length; i++) {
                        self.configuredToolsList.push(dataArray[i].toolName);
                    }
                }
            });
            self.toolsInfo();
        }
        OneToolConfigurationController.prototype.selectTool = function () {
            this.toolCategory = this.homeController.selectedToolCategory;
            this.toolName = this.homeController.selectedToolName;
            var self = this;
            self.toolConfigService
                .readToolsLayoutJson(self.toolName, self.toolCategory).then(function (data) {
                if (data.data !== undefined) {
                    self.toolsLayout.jsonLayout = data.data.layoutSettings;
                    self.showTemplate = true;
                }
                else {
                    self.showTemplate = false;
                }
            });
        };
        OneToolConfigurationController.prototype.onAuthenticationChange = function (selectedMode) {
            this.authModData = selectedMode;
        };
        OneToolConfigurationController.prototype.toToolsConfigurationLandingPage = function () {
            this.homeController.templateName = 'toolsConfiguration';
        };
        OneToolConfigurationController.prototype.toToolsConfiguredpage = function () {
            this.homeController.templateName = 'configuredTools';
            //this.$location.path('/InSights/configuredTools');
        };
        OneToolConfigurationController.prototype.addResponseTemplate = function (params, agentId) {
            var self = this;
            var agentData = null;
            for (var i = 0; i < self.ToolRows.toolsConfigRows.length; i++) {
                if (self.ToolRows.toolsConfigRows[i]['agentId'] === agentId) {
                    agentData = self.ToolRows.toolsConfigRows[i];
                }
            }
            self.$mdDialog.show({
                controller: ISightApp.ShowTemplateResponseDialogController,
                controllerAs: 'showTemplateDialogController',
                templateUrl: './dist/modules/oneToolConfig/view/oneToolshowTemplate.tmp.html',
                parent: angular.element(document.body),
                targetEvent: params,
                clickOutsideToClose: true,
                locals: {
                    agentData: agentData
                },
                bindToController: true
            });
        };
        OneToolConfigurationController.prototype.disableActionButtons = function () {
            var self = this;
            self.buttonDisableStatus = false;
            self.saveButtonUrl = "dist/icons/svg/oneToolsConfigIcons/Save_icon_MouseOver.svg";
            self.removeButtonUrl = "dist/icons/svg/oneToolsConfigIcons/Delete_icon_MouseOver.svg";
            self.downloadButtonUrl = "dist/icons/svg/oneToolsConfigIcons/Download_icon_MouseOver.svg";
        };
        OneToolConfigurationController.prototype.toolsInfo = function () {
            var self = this;
            self.timezoneList = self.toolConfigService.readTimeZonelist();
            self.toolConfigService
                .readToolsConfiguration(self.toolName, self.toolCategory).then(function (data) {
                self.dataArray = data.data;
                if (self.dataArray.length != 0) {
                    for (var _i = 0, _a = self.dataArray; _i < _a.length; _i++) {
                        var jsonObject = _a[_i];
                        if (jsonObject['category'] === 'ALM') {
                            jsonObject['dataUpdateSupported'] = false;
                        }
                        self.ToolRows.toolsConfigRows.push(jsonObject);
                    }
                    self.showTemplateAfterLoad = true;
                }
                else {
                    var rowLength = 1;
                    var insertObject = new ISightApp.DataModel();
                    insertObject['category'] = self.toolCategory;
                    insertObject['toolName'] = self.toolName;
                    insertObject['agentId'] = rowLength;
                    insertObject['selectedAuthMtd'] = 'Access Token';
                    insertObject['useResponseTemplate'] = false;
                    if (self.toolCategory === 'ALM') {
                        insertObject['dataUpdateSupported'] = false;
                    }
                    self.ToolRows.toolsConfigRows.push(insertObject);
                    self.showTemplateAfterLoad = true;
                }
            });
        };
        OneToolConfigurationController.prototype.toggleSelectRow = function (agentId) {
            var self = this;
            self.saveMsg = "";
            self.selectedrows = agentId;
            self.disableActionButtons();
            self.downloadConfig();
        };
        OneToolConfigurationController.prototype.addAction = function () {
            this.saveMsg = "";
            var agentIdArray = [];
            var self = this;
            for (var i = 0; i < self.ToolRows.toolsConfigRows.length; i++) {
                if (self.ToolRows.toolsConfigRows[i]['agentId'] !== undefined)
                    agentIdArray.push(self.ToolRows.toolsConfigRows[i]['agentId']);
            }
            ;
            agentIdArray.sort(self.agentIdSort);
            var rowLength = parseInt(agentIdArray[agentIdArray.length - 1]) + 1;
            var insertObject = new ISightApp.DataModel();
            insertObject['category'] = self.toolCategory;
            insertObject['toolName'] = self.toolName;
            insertObject['agentId'] = rowLength;
            insertObject['selectedAuthMtd'] = 'Access Token';
            insertObject['useResponseTemplate'] = false;
            if (self.toolCategory === 'ALM') {
                insertObject['dataUpdateSupported'] = false;
            }
            self.ToolRows.toolsConfigRows.push(insertObject);
        };
        OneToolConfigurationController.prototype.agentIdSort = function (a, b) {
            var d = a - b;
            return d;
        };
        ;
        OneToolConfigurationController.prototype.downloadConfig = function () {
            var self = this;
            var agentIdArray = [];
            for (var i = 0; i < self.dataArray.length; i++) {
                agentIdArray.push(self.dataArray[i].agentId);
            }
            ;
            if (agentIdArray.indexOf(self.selectedrows) > -1) {
                self.toolConfigService
                    .downloadAgentConfig(self.toolName, self.toolCategory, self.selectedrows).then(function (data) {
                    var content = data;
                    var blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json;charset=utf-8;" });
                    var URL = window.URL.createObjectURL(blob);
                    self.downloadURL = self.$sce.trustAsResourceUrl(URL);
                });
            }
        };
        OneToolConfigurationController.prototype.removeAction = function (status) {
            if (status === true) {
                var self = this;
                var ToolRows = self.ToolRows;
                for (var j = 0; j < ToolRows.toolsConfigRows.length; j++) {
                    if (ToolRows.toolsConfigRows[j]['agentId'] === self.selectedrows) {
                        self.toolConfigService
                            .deleteToolsConfig(ToolRows.toolsConfigRows[j]['toolName'], ToolRows.toolsConfigRows[j]['category'], ToolRows.toolsConfigRows[j]['agentId'])
                            .then(function (data) {
                            if (data.status === 'success') {
                                self.saveMsg = "Data deleted sucessfully!";
                                ToolRows.toolsConfigRows = [];
                                self.toolConfigService
                                    .readToolsConfiguration(self.toolName, self.toolCategory).then(function (data) {
                                    self.dataArray = [];
                                    self.selectedrows = 0;
                                    self.dataArray = data.data;
                                    if (self.dataArray.length != 0) {
                                        for (var _i = 0, _a = self.dataArray; _i < _a.length; _i++) {
                                            var jsonObject = _a[_i];
                                            if (jsonObject['category'] === 'ALM') {
                                                jsonObject['dataUpdateSupported'] = false;
                                            }
                                            ToolRows.toolsConfigRows.push(jsonObject);
                                        }
                                    }
                                    else if (ToolRows.toolsConfigRows.length === 0) {
                                        var rowLength = 1;
                                        var insertObject = new ISightApp.DataModel();
                                        insertObject['category'] = self.toolCategory;
                                        insertObject['toolName'] = self.toolName;
                                        insertObject['agentId'] = rowLength;
                                        insertObject['selectedAuthMtd'] = 'Access Token';
                                        insertObject['useResponseTemplate'] = false;
                                        if (self.toolCategory === 'ALM') {
                                            insertObject['dataUpdateSupported'] = false;
                                        }
                                        self.ToolRows.toolsConfigRows.push(insertObject);
                                    }
                                });
                            }
                            else {
                                self.saveMsg = "Failed to delete data!";
                            }
                        });
                        break;
                    }
                }
            }
        };
        OneToolConfigurationController.prototype.formSubmit = function (status) {
            if (status === true) {
                var self = this;
                for (var i = 0; i < self.ToolRows.toolsConfigRows.length; i++) {
                    if (self.ToolRows.toolsConfigRows[i]['agentId'] === self.selectedrows) {
                        if (self.ToolRows.toolsConfigRows[i]['responseTemplate'] !== undefined) {
                            self.ToolRows.toolsConfigRows[i]['useResponseTemplate'] = true;
                        }
                        else {
                            self.ToolRows.toolsConfigRows[i]['useResponseTemplate'] = false;
                        }
                        if (self.toolCategory === 'ALM') {
                            if (self.ToolRows.toolsConfigRows[i]['uniqueKey'] !== undefined) {
                                self.ToolRows.toolsConfigRows[i]['dataUpdateSupported'] = true;
                            }
                            else {
                                self.ToolRows.toolsConfigRows[i]['dataUpdateSupported'] = false;
                            }
                        }
                        self.toolConfigService
                            .saveToolsConfiguration(JSON.stringify(self.ToolRows.toolsConfigRows[i], null, 2));
                        self.saveMsg = "Data saved sucessfully!";
                        break;
                    }
                }
            }
        };
        OneToolConfigurationController.prototype.openDialog = function (params, selectedOperation) {
            var self = this;
            if (selectedOperation === 'delete' && Object.keys(self.ToolRows.toolsConfigRows[0]).length === 5) {
                self.saveMsg = "please save data first!";
            }
            else {
                var statusObject = {
                    'status': false
                };
                self.$mdDialog.show({
                    controller: ISightApp.ShowToolConfirmationDialogController,
                    controllerAs: 'showToolConfirmationDialogController',
                    templateUrl: './dist/modules/oneToolConfig/view/oneToolConfirmationDialog.tmp.html',
                    parent: angular.element(document.body),
                    targetEvent: params,
                    preserveScope: true,
                    clickOutsideToClose: true,
                    locals: {
                        statusObject: statusObject,
                        selectedOperation: selectedOperation,
                        operationName: 'configuration'
                    },
                    bindToController: true,
                    onRemoving: function () {
                        if (selectedOperation === 'save') {
                            self.formSubmit(statusObject.status);
                        }
                        else if (selectedOperation === 'delete') {
                            self.removeAction(statusObject.status);
                        }
                    }
                });
            }
        };
        OneToolConfigurationController.$inject = ['$location', '$window', 'toolConfigService', '$mdDialog', '$routeParams', '$sce', '$timeout'];
        return OneToolConfigurationController;
    }());
    ISightApp.OneToolConfigurationController = OneToolConfigurationController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=oneToolConfigurationController.js.map
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
//// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var ShowTemplateResponseDialogController = /** @class */ (function () {
        function ShowTemplateResponseDialogController($mdDialog, $route) {
            this.$mdDialog = $mdDialog;
            this.$route = $route;
            this.agentData = '';
            this.agentData = this['locals'].agentData;
        }
        ShowTemplateResponseDialogController.prototype.hide = function () {
            this.$mdDialog.hide();
        };
        ShowTemplateResponseDialogController.prototype.cancel = function () {
            this.$mdDialog.cancel();
        };
        ShowTemplateResponseDialogController.$inject = ['$mdDialog', '$route'];
        return ShowTemplateResponseDialogController;
    }());
    ISightApp.ShowTemplateResponseDialogController = ShowTemplateResponseDialogController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=oneToolDialogController.js.map
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
//// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var ShowToolConfirmationDialogController = /** @class */ (function () {
        function ShowToolConfirmationDialogController($mdDialog, $route, $location) {
            this.$mdDialog = $mdDialog;
            this.$route = $route;
            this.$location = $location;
            this.statusObject = this['locals'].statusObject;
            this.selectedOperation = this['locals'].selectedOperation;
            this.operationName = this['locals'].operationName;
            this.notification = 'Are you sure you want to ' + this.selectedOperation + ' this ' + this.operationName + '?';
        }
        ShowToolConfirmationDialogController.prototype.hide = function () {
            this.$mdDialog.hide();
        };
        ShowToolConfirmationDialogController.prototype.cancel = function () {
            this.$mdDialog.cancel();
        };
        ShowToolConfirmationDialogController.prototype.finalConfirmation = function () {
            this.statusObject.status = true;
            this.hide();
        };
        ShowToolConfirmationDialogController.$inject = ['$mdDialog', '$route', '$location'];
        return ShowToolConfirmationDialogController;
    }());
    ISightApp.ShowToolConfirmationDialogController = ShowToolConfirmationDialogController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=showConfirmationDialogController.js.map
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
//// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var ToolRows = /** @class */ (function () {
        function ToolRows() {
            this.toolsConfigRows = [];
        }
        return ToolRows;
    }());
    ISightApp.ToolRows = ToolRows;
    var DataModel = /** @class */ (function () {
        function DataModel() {
        }
        return DataModel;
    }());
    ISightApp.DataModel = DataModel;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=oneToolConfigModel.js.map
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
//// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var ToolConfigService = /** @class */ (function () {
        function ToolConfigService($q, $resource, $cookies, restEndpointService, restCallHandlerService) {
            this.$q = $q;
            this.$resource = $resource;
            this.$cookies = $cookies;
            this.restEndpointService = restEndpointService;
            this.restCallHandlerService = restCallHandlerService;
        }
        ToolConfigService.prototype.saveToolsConfiguration = function (toolsJSON) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("TOOL_CONFIG_SAVE", toolsJSON, { 'Content-Type': 'application/json', 'Accept': 'application/json; charset=UTF-8' });
        };
        ToolConfigService.prototype.readToolsConfiguration = function (toolName, toolCategory) {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("TOOL_CONFIG_READ", { 'category': toolCategory, 'toolName': toolName });
        };
        ToolConfigService.prototype.downloadAgentConfig = function (toolName, toolCategory, toolAgentId) {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("AGENT_CONFIG_DOWNLOAD", { 'category': toolCategory, 'toolName': toolName, 'agentId': toolAgentId });
        };
        ToolConfigService.prototype.deleteToolsConfig = function (toolName, toolCategory, agentId) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("TOOL_CONFIG_DELETE", { "category": toolCategory, "toolName": toolName, "agentId": agentId }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        ToolConfigService.prototype.readToolsLayoutJson = function (toolName, toolCategory) {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("TOOL_LAYOUT_READ", { 'category': toolCategory, 'toolName': toolName });
        };
        ToolConfigService.prototype.readToolsConfigurationGlobal = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("ALL_TOOLS_CONFIGURATION_READ");
        };
        ToolConfigService.prototype.getCategoryName = function (category) {
            var self = this;
            var toolsData = self.readToolsDataList();
            var categoryName = category;
            var toolsCategoryName = category;
            for (var tool in toolsData) {
                if (toolsData[tool].category === categoryName) {
                    toolsCategoryName = toolsData[tool].categoryDisplayName;
                    break;
                }
            }
            return toolsCategoryName;
        };
        ToolConfigService.prototype.getCategoryAbbreviatedName = function (category) {
            var self = this;
            var toolsData = self.readToolsDataList();
            var categoryName = category;
            var toolsCategoryName = category;
            for (var tool in toolsData) {
                if (toolsData[tool].category === categoryName) {
                    toolsCategoryName = toolsData[tool]['toolTipName'];
                    break;
                }
            }
            return toolsCategoryName;
        };
        ToolConfigService.prototype.getToolName = function (category, tool) {
            var self = this;
            var toolsData = self.readToolsDataList();
            var categoryName = category;
            var toolActualName = tool;
            for (var tool_1 in toolsData) {
                if (toolsData[tool_1].category === categoryName) {
                    var toolsValueArray = toolsData[tool_1].tools;
                    for (var toolValue in toolsValueArray) {
                        if (toolsValueArray[toolValue].toolName === toolActualName) {
                            return toolsValueArray[toolValue].toolDisplayName;
                        }
                    }
                }
            }
        };
        ToolConfigService.prototype.readToolsDataList = function () {
            var toolsData = [
                {
                    category: 'ALM',
                    categoryDisplayName: 'ALM',
                    toolTipName: 'Application Lifecycle Management',
                    tools: [
                        { toolName: 'JIRA', toolDisplayName: 'JIRA' },
                        { toolName: 'RALLY', toolDisplayName: 'Rally' },
                        { toolName: 'HP', toolDisplayName: 'HP' },
                    ]
                },
                {
                    category: 'SCM',
                    categoryDisplayName: 'SCM',
                    toolTipName: 'Source Code Management',
                    tools: [
                        { toolName: 'GIT', toolDisplayName: 'GIT' },
                        { toolName: 'BITBUCKET', toolDisplayName: 'BitBucket' },
                        { toolName: 'CVS', toolDisplayName: 'CVS' },
                        { toolName: 'TFS', toolDisplayName: 'TFS' },
                        { toolName: 'PERFORCE', toolDisplayName: 'Perforce' },
                        { toolName: 'SUBVERSION', toolDisplayName: 'Subversion' }
                    ]
                },
                {
                    category: 'CI',
                    categoryDisplayName: 'CI',
                    toolTipName: 'Continuous Integration',
                    tools: [
                        { toolName: 'JENKINS', toolDisplayName: 'JENKINS' },
                        { toolName: 'BAMBOO', toolDisplayName: 'Bamboo' },
                        { toolName: 'TEAMCITY', toolDisplayName: 'Teamcity' },
                    ]
                },
                {
                    category: 'ARTIFACTMANAGEMENT',
                    categoryDisplayName: 'Artifact Management',
                    tools: [
                        { toolName: 'NEXUS', toolDisplayName: 'Nexus' },
                        { toolName: 'ARTIFACTORY', toolDisplayName: 'Artifactory' },
                    ]
                },
                {
                    category: 'CODEQUALITY',
                    categoryDisplayName: 'Code Quality',
                    tools: [
                        { toolName: 'SONAR', toolDisplayName: 'SONAR' },
                        { toolName: 'FISHEYE', toolDisplayName: 'FishEye' },
                        { toolName: 'CRUCIBLE', toolDisplayName: 'Crucible' },
                        { toolName: 'COVERITY', toolDisplayName: 'Coverity' },
                    ]
                },
                {
                    category: 'CONTINUOUSTESTING',
                    categoryDisplayName: 'Continuous Testing',
                    tools: [
                        { toolName: 'QTP', toolDisplayName: 'QTP' },
                        { toolName: 'SELENIUM', toolDisplayName: 'Selenium' },
                    ]
                },
                {
                    category: 'DEPLOYMENT',
                    categoryDisplayName: 'Deployment',
                    tools: [
                        { toolName: 'RUNDECK', toolDisplayName: 'Rundeck' },
                        { toolName: 'DOCKER', toolDisplayName: 'Docker' },
                        { toolName: 'XLDEPLOY', toolDisplayName: 'XL Deploy' },
                    ]
                },
                {
                    category: 'CLOUD',
                    categoryDisplayName: 'Cloud',
                    tools: [
                        { toolName: 'AMAZON', toolDisplayName: 'Amazon' },
                        { toolName: 'AZURE', toolDisplayName: 'Azure' },
                        { toolName: 'CLOUDSTACK', toolDisplayName: 'Cloudstack' },
                        { toolName: 'OPENSTACK', toolDisplayName: 'Openstack' },
                        { toolName: 'VMWARE', toolDisplayName: 'Vmware' },
                    ]
                }
            ];
            return toolsData;
        };
        ToolConfigService.prototype.readTimeZonelist = function () {
            var timeZonejson = {
                "timeZone": [
                    'Africa/Abidjan',
                    'Africa/Accra',
                    'Africa/Addis_Ababa',
                    'Africa/Algiers',
                    'Africa/Asmara',
                    'Africa/Asmera',
                    'Africa/Bamako',
                    'Africa/Bangui',
                    'Africa/Banjul',
                    'Africa/Bissau',
                    'Africa/Blantyre',
                    'Africa/Brazzaville',
                    'Africa/Bujumbura',
                    'Africa/Cairo',
                    'Africa/Casablanca',
                    'Africa/Ceuta',
                    'Africa/Conakry',
                    'Africa/Dakar',
                    'Africa/Dar_es_Salaam',
                    'Africa/Djibouti',
                    'Africa/Douala',
                    'Africa/El_Aaiun',
                    'Africa/Freetown',
                    'Africa/Gaborone',
                    'Africa/Harare',
                    'Africa/Johannesburg',
                    'Africa/Juba',
                    'Africa/Kampala',
                    'Africa/Khartoum',
                    'Africa/Kigali',
                    'Africa/Kinshasa',
                    'Africa/Lagos',
                    'Africa/Libreville',
                    'Africa/Lome',
                    'Africa/Luanda',
                    'Africa/Lubumbashi',
                    'Africa/Lusaka',
                    'Africa/Malabo',
                    'Africa/Maputo',
                    'Africa/Maseru',
                    'Africa/Mbabane',
                    'Africa/Mogadishu',
                    'Africa/Monrovia',
                    'Africa/Nairobi',
                    'Africa/Ndjamena',
                    'Africa/Niamey',
                    'Africa/Nouakchott',
                    'Africa/Ouagadougou',
                    'Africa/Porto-Novo',
                    'Africa/Sao_Tome',
                    'Africa/Timbuktu',
                    'Africa/Tripoli',
                    'Africa/Tunis',
                    'Africa/Windhoek',
                    'America/Adak',
                    'America/Anchorage',
                    'America/Anguilla',
                    'America/Antigua',
                    'America/Araguaina',
                    'America/Argentina/Buenos_Aires',
                    'America/Argentina/Catamarca',
                    'America/Argentina/ComodRivadavia',
                    'America/Argentina/Cordoba',
                    'America/Argentina/Jujuy',
                    'America/Argentina/La_Rioja',
                    'America/Argentina/Mendoza',
                    'America/Argentina/Rio_Gallegos',
                    'America/Argentina/Salta',
                    'America/Argentina/San_Juan',
                    'America/Argentina/San_Luis',
                    'America/Argentina/Tucuman',
                    'America/Argentina/Ushuaia',
                    'America/Aruba',
                    'America/Asuncion',
                    'America/Atikokan',
                    'America/Atka',
                    'America/Bahia',
                    'America/Bahia_Banderas',
                    'America/Barbados',
                    'America/Belem',
                    'America/Belize',
                    'America/Blanc-Sablon',
                    'America/Boa_Vista',
                    'America/Bogota',
                    'America/Boise',
                    'America/Buenos_Aires',
                    'America/Cambridge_Bay',
                    'America/Campo_Grande',
                    'America/Cancun',
                    'America/Caracas',
                    'America/Catamarca',
                    'America/Cayenne',
                    'America/Cayman',
                    'America/Chicago',
                    'America/Chihuahua',
                    'America/Coral_Harbour',
                    'America/Cordoba',
                    'America/Costa_Rica',
                    'America/Creston',
                    'America/Cuiaba',
                    'America/Curacao',
                    'America/Danmarkshavn',
                    'America/Dawson',
                    'America/Dawson_Creek',
                    'America/Denver',
                    'America/Detroit',
                    'America/Dominica',
                    'America/Edmonton',
                    'America/Eirunepe',
                    'America/El_Salvador',
                    'America/Ensenada',
                    'America/Fort_Nelson',
                    'America/Fort_Wayne',
                    'America/Fortaleza',
                    'America/Glace_Bay',
                    'America/Godthab',
                    'America/Goose_Bay',
                    'America/Grand_Turk',
                    'America/Grenada',
                    'America/Guadeloupe',
                    'America/Guatemala',
                    'America/Guayaquil',
                    'America/Guyana',
                    'America/Halifax',
                    'America/Havana',
                    'America/Hermosillo',
                    'America/Indiana/Indianapolis',
                    'America/Indiana/Knox',
                    'America/Indiana/Marengo',
                    'America/Indiana/Petersburg',
                    'America/Indiana/Tell_City',
                    'America/Indiana/Vevay',
                    'America/Indiana/Vincennes',
                    'America/Indiana/Winamac',
                    'America/Indianapolis',
                    'America/Inuvik',
                    'America/Iqaluit',
                    'America/Jamaica',
                    'America/Jujuy',
                    'America/Juneau',
                    'America/Kentucky/Louisville',
                    'America/Kentucky/Monticello',
                    'America/Knox_IN',
                    'America/Kralendijk',
                    'America/La_Paz',
                    'America/Lima',
                    'America/Los_Angeles',
                    'America/Louisville',
                    'America/Lower_Princes',
                    'America/Maceio',
                    'America/Managua',
                    'America/Manaus',
                    'America/Marigot',
                    'America/Martinique',
                    'America/Matamoros',
                    'America/Mazatlan',
                    'America/Mendoza',
                    'America/Menominee',
                    'America/Merida',
                    'America/Metlakatla',
                    'America/Mexico_City',
                    'America/Miquelon',
                    'America/Moncton',
                    'America/Monterrey',
                    'America/Montevideo',
                    'America/Montreal',
                    'America/Montserrat',
                    'America/Nassau',
                    'America/New_York',
                    'America/Nipigon',
                    'America/Nome',
                    'America/Noronha',
                    'America/North_Dakota/Beulah',
                    'America/North_Dakota/Center',
                    'America/North_Dakota/New_Salem',
                    'America/Ojinaga',
                    'America/Panama',
                    'America/Pangnirtung',
                    'America/Paramaribo',
                    'America/Phoenix',
                    'America/Port-au-Prince',
                    'America/Port_of_Spain',
                    'America/Porto_Acre',
                    'America/Porto_Velho',
                    'America/Puerto_Rico',
                    'America/Rainy_River',
                    'America/Rankin_Inlet',
                    'America/Recife',
                    'America/Regina',
                    'America/Resolute',
                    'America/Rio_Branco',
                    'America/Rosario',
                    'America/Santa_Isabel',
                    'America/Santarem',
                    'America/Santiago',
                    'America/Santo_Domingo',
                    'America/Sao_Paulo',
                    'America/Scoresbysund',
                    'America/Shiprock',
                    'America/Sitka',
                    'America/St_Barthelemy',
                    'America/St_Johns',
                    'America/St_Kitts',
                    'America/St_Lucia',
                    'America/St_Thomas',
                    'America/St_Vincent',
                    'America/Swift_Current',
                    'America/Tegucigalpa',
                    'America/Thule',
                    'America/Thunder_Bay',
                    'America/Tijuana',
                    'America/Toronto',
                    'America/Tortola',
                    'America/Vancouver',
                    'America/Virgin',
                    'America/Whitehorse',
                    'America/Winnipeg',
                    'America/Yakutat',
                    'America/Yellowknife',
                    'Antarctica/Casey',
                    'Antarctica/Davis',
                    'Antarctica/DumontDUrville',
                    'Antarctica/Macquarie',
                    'Antarctica/Mawson',
                    'Antarctica/McMurdo',
                    'Antarctica/Palmer',
                    'Antarctica/Rothera',
                    'Antarctica/South_Pole',
                    'Antarctica/Syowa',
                    'Antarctica/Troll',
                    'Antarctica/Vostok',
                    'Arctic/Longyearbyen',
                    'Asia/Aden',
                    'Asia/Almaty',
                    'Asia/Amman',
                    'Asia/Anadyr',
                    'Asia/Aqtau',
                    'Asia/Aqtobe',
                    'Asia/Ashgabat',
                    'Asia/Ashkhabad',
                    'Asia/Baghdad',
                    'Asia/Bahrain',
                    'Asia/Baku',
                    'Asia/Bangkok',
                    'Asia/Barnaul',
                    'Asia/Beirut',
                    'Asia/Bishkek',
                    'Asia/Brunei',
                    'Asia/Calcutta',
                    'Asia/Chita',
                    'Asia/Choibalsan',
                    'Asia/Chongqing',
                    'Asia/Chungking',
                    'Asia/Colombo',
                    'Asia/Dacca',
                    'Asia/Damascus',
                    'Asia/Dhaka',
                    'Asia/Dili',
                    'Asia/Dubai',
                    'Asia/Dushanbe',
                    'Asia/Gaza',
                    'Asia/Harbin',
                    'Asia/Hebron',
                    'Asia/Ho_Chi_Minh',
                    'Asia/Hong_Kong',
                    'Asia/Hovd',
                    'Asia/Irkutsk',
                    'Asia/Istanbul',
                    'Asia/Jakarta',
                    'Asia/Jayapura',
                    'Asia/Jerusalem',
                    'Asia/Kabul',
                    'Asia/Kamchatka',
                    'Asia/Karachi',
                    'Asia/Kashgar',
                    'Asia/Kathmandu',
                    'Asia/Katmandu',
                    'Asia/Khandyga',
                    'Asia/Kolkata',
                    'Asia/Krasnoyarsk',
                    'Asia/Kuala_Lumpur',
                    'Asia/Kuching',
                    'Asia/Kuwait',
                    'Asia/Macao',
                    'Asia/Macau',
                    'Asia/Magadan',
                    'Asia/Makassar',
                    'Asia/Manila',
                    'Asia/Muscat',
                    'Asia/Nicosia',
                    'Asia/Novokuznetsk',
                    'Asia/Novosibirsk',
                    'Asia/Omsk',
                    'Asia/Oral',
                    'Asia/Phnom_Penh',
                    'Asia/Pontianak',
                    'Asia/Pyongyang',
                    'Asia/Qatar',
                    'Asia/Qyzylorda',
                    'Asia/Rangoon',
                    'Asia/Riyadh',
                    'Asia/Saigon',
                    'Asia/Sakhalin',
                    'Asia/Samarkand',
                    'Asia/Seoul',
                    'Asia/Shanghai',
                    'Asia/Singapore',
                    'Asia/Srednekolymsk',
                    'Asia/Taipei',
                    'Asia/Tashkent',
                    'Asia/Tbilisi',
                    'Asia/Tehran',
                    'Asia/Tel_Aviv',
                    'Asia/Thimbu',
                    'Asia/Thimphu',
                    'Asia/Tokyo',
                    'Asia/Tomsk',
                    'Asia/Ujung_Pandang',
                    'Asia/Ulaanbaatar',
                    'Asia/Ulan_Bator',
                    'Asia/Urumqi',
                    'Asia/Ust-Nera',
                    'Asia/Vientiane',
                    'Asia/Vladivostok',
                    'Asia/Yakutsk',
                    'Asia/Yekaterinburg',
                    'Asia/Yerevan',
                    'Atlantic/Azores',
                    'Atlantic/Bermuda',
                    'Atlantic/Canary',
                    'Atlantic/Cape_Verde',
                    'Atlantic/Faeroe',
                    'Atlantic/Faroe',
                    'Atlantic/Jan_Mayen',
                    'Atlantic/Madeira',
                    'Atlantic/Reykjavik',
                    'Atlantic/South_Georgia',
                    'Atlantic/St_Helena',
                    'Atlantic/Stanley',
                    'Australia/ACT',
                    'Australia/Adelaide',
                    'Australia/Brisbane',
                    'Australia/Broken_Hill',
                    'Australia/Canberra',
                    'Australia/Currie',
                    'Australia/Darwin',
                    'Australia/Eucla',
                    'Australia/Hobart',
                    'Australia/LHI',
                    'Australia/Lindeman',
                    'Australia/Lord_Howe',
                    'Australia/Melbourne',
                    'Australia/NSW',
                    'Australia/North',
                    'Australia/Perth',
                    'Australia/Queensland',
                    'Australia/South',
                    'Australia/Sydney',
                    'Australia/Tasmania',
                    'Australia/Victoria',
                    'Australia/West',
                    'Australia/Yancowinna',
                    'Brazil/Acre',
                    'Brazil/DeNoronha',
                    'Brazil/East',
                    'Brazil/West',
                    'CET',
                    'CST6CDT',
                    'Canada/Atlantic',
                    'Canada/Central',
                    'Canada/East-Saskatchewan',
                    'Canada/Eastern',
                    'Canada/Mountain',
                    'Canada/Newfoundland',
                    'Canada/Pacific',
                    'Canada/Saskatchewan',
                    'Canada/Yukon',
                    'Chile/Continental',
                    'Chile/EasterIsland',
                    'Cuba',
                    'EET',
                    'EST',
                    'EST5EDT',
                    'Egypt',
                    'Eire',
                    'Etc/GMT',
                    'Etc/GMT+0',
                    'Etc/GMT+1',
                    'Etc/GMT+10',
                    'Etc/GMT+11',
                    'Etc/GMT+12',
                    'Etc/GMT+2',
                    'Etc/GMT+3',
                    'Etc/GMT+4',
                    'Etc/GMT+5',
                    'Etc/GMT+6',
                    'Etc/GMT+7',
                    'Etc/GMT+8',
                    'Etc/GMT+9',
                    'Etc/GMT-0',
                    'Etc/GMT-1',
                    'Etc/GMT-10',
                    'Etc/GMT-11',
                    'Etc/GMT-12',
                    'Etc/GMT-13',
                    'Etc/GMT-14',
                    'Etc/GMT-2',
                    'Etc/GMT-3',
                    'Etc/GMT-4',
                    'Etc/GMT-5',
                    'Etc/GMT-6',
                    'Etc/GMT-7',
                    'Etc/GMT-8',
                    'Etc/GMT-9',
                    'Etc/GMT0',
                    'Etc/Greenwich',
                    'Etc/UCT',
                    'Etc/UTC',
                    'Etc/Universal',
                    'Etc/Zulu',
                    'Europe/Amsterdam',
                    'Europe/Andorra',
                    'Europe/Astrakhan',
                    'Europe/Athens',
                    'Europe/Belfast',
                    'Europe/Belgrade',
                    'Europe/Berlin',
                    'Europe/Bratislava',
                    'Europe/Brussels',
                    'Europe/Bucharest',
                    'Europe/Budapest',
                    'Europe/Busingen',
                    'Europe/Chisinau',
                    'Europe/Copenhagen',
                    'Europe/Dublin',
                    'Europe/Gibraltar',
                    'Europe/Guernsey',
                    'Europe/Helsinki',
                    'Europe/Isle_of_Man',
                    'Europe/Istanbul',
                    'Europe/Jersey',
                    'Europe/Kaliningrad',
                    'Europe/Kiev',
                    'Europe/Kirov',
                    'Europe/Lisbon',
                    'Europe/Ljubljana',
                    'Europe/London',
                    'Europe/Luxembourg',
                    'Europe/Madrid',
                    'Europe/Malta',
                    'Europe/Mariehamn',
                    'Europe/Minsk',
                    'Europe/Monaco',
                    'Europe/Moscow',
                    'Europe/Nicosia',
                    'Europe/Oslo',
                    'Europe/Paris',
                    'Europe/Podgorica',
                    'Europe/Prague',
                    'Europe/Riga',
                    'Europe/Rome',
                    'Europe/Samara',
                    'Europe/San_Marino',
                    'Europe/Sarajevo',
                    'Europe/Simferopol',
                    'Europe/Skopje',
                    'Europe/Sofia',
                    'Europe/Stockholm',
                    'Europe/Tallinn',
                    'Europe/Tirane',
                    'Europe/Tiraspol',
                    'Europe/Ulyanovsk',
                    'Europe/Uzhgorod',
                    'Europe/Vaduz',
                    'Europe/Vatican',
                    'Europe/Vienna',
                    'Europe/Vilnius',
                    'Europe/Volgograd',
                    'Europe/Warsaw',
                    'Europe/Zagreb',
                    'Europe/Zaporozhye',
                    'Europe/Zurich',
                    'GB',
                    'GB-Eire',
                    'GMT',
                    'GMT+0',
                    'GMT-0',
                    'GMT0',
                    'Greenwich',
                    'HST',
                    'Hongkong',
                    'Iceland',
                    'Indian/Antananarivo',
                    'Indian/Chagos',
                    'Indian/Christmas',
                    'Indian/Cocos',
                    'Indian/Comoro',
                    'Indian/Kerguelen',
                    'Indian/Mahe',
                    'Indian/Maldives',
                    'Indian/Mauritius',
                    'Indian/Mayotte',
                    'Indian/Reunion',
                    'Iran',
                    'Israel',
                    'Jamaica',
                    'Japan',
                    'Kwajalein',
                    'Libya',
                    'MET',
                    'MST',
                    'MST7MDT',
                    'Mexico/BajaNorte',
                    'Mexico/BajaSur',
                    'Mexico/General',
                    'NZ',
                    'NZ-CHAT',
                    'Navajo',
                    'PRC',
                    'PST8PDT',
                    'Pacific/Apia',
                    'Pacific/Auckland',
                    'Pacific/Bougainville',
                    'Pacific/Chatham',
                    'Pacific/Chuuk',
                    'Pacific/Easter',
                    'Pacific/Efate',
                    'Pacific/Enderbury',
                    'Pacific/Fakaofo',
                    'Pacific/Fiji',
                    'Pacific/Funafuti',
                    'Pacific/Galapagos',
                    'Pacific/Gambier',
                    'Pacific/Guadalcanal',
                    'Pacific/Guam',
                    'Pacific/Honolulu',
                    'Pacific/Johnston',
                    'Pacific/Kiritimati',
                    'Pacific/Kosrae',
                    'Pacific/Kwajalein',
                    'Pacific/Majuro',
                    'Pacific/Marquesas',
                    'Pacific/Midway',
                    'Pacific/Nauru',
                    'Pacific/Niue',
                    'Pacific/Norfolk',
                    'Pacific/Noumea',
                    'Pacific/Pago_Pago',
                    'Pacific/Palau',
                    'Pacific/Pitcairn',
                    'Pacific/Pohnpei',
                    'Pacific/Ponape',
                    'Pacific/Port_Moresby',
                    'Pacific/Rarotonga',
                    'Pacific/Saipan',
                    'Pacific/Samoa',
                    'Pacific/Tahiti',
                    'Pacific/Tarawa',
                    'Pacific/Tongatapu',
                    'Pacific/Truk',
                    'Pacific/Wake',
                    'Pacific/Wallis',
                    'Pacific/Yap',
                    'Poland',
                    'Portugal',
                    'ROC',
                    'ROK',
                    'Singapore',
                    'Turkey',
                    'UCT',
                    'US/Alaska',
                    'US/Aleutian',
                    'US/Arizona',
                    'US/Central',
                    'US/East-Indiana',
                    'US/Eastern',
                    'US/Hawaii',
                    'US/Indiana-Starke',
                    'US/Michigan',
                    'US/Mountain',
                    'US/Pacific',
                    'US/Pacific-New',
                    'US/Samoa',
                    'UTC',
                    'Universal',
                    'W-SU',
                    'WET',
                    'Zulu'
                ]
            };
            return timeZonejson;
        };
        ToolConfigService.$inject = ['$q', '$resource', '$cookies', 'restEndpointService', 'restCallHandlerService'];
        return ToolConfigService;
    }());
    ISightApp.ToolConfigService = ToolConfigService;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=oneToolConfigService.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var PipelineController = /** @class */ (function () {
        function PipelineController(pipelineService, $mdDialog) {
            this.pipelineService = pipelineService;
            this.$mdDialog = $mdDialog;
            this.message = 'This is test';
            this.fonts = [
                { iconSrc: 'dist/icons/svg/SCM-new.svg', name: 'SCM' },
                { iconSrc: 'dist/icons/svg/CI-new.svg', name: 'CI' },
                { iconSrc: 'dist/icons/svg/code-quality-new.svg', name: 'Code Quality' },
                { iconSrc: 'dist/icons/svg/deployment-new.svg', name: 'Deployment' },
            ];
            var self = this;
            this.pipelineService
                .loadPipelineData()
                .then(function (data) {
                self.pipelineDataArray = data;
            });
        }
        PipelineController.prototype.showTabDialog = function (params, userData, appData) {
            var self = this;
            this.$mdDialog.show({
                controller: ISightApp.DialogController,
                controllerAs: 'dialog',
                templateUrl: './dist/modules/pipeline/view/tabDialog.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: params,
                clickOutsideToClose: true,
                locals: {
                    userData: userData,
                    appData: appData
                },
                bindToController: true
            });
        };
        PipelineController.prototype.hide = function () {
            this.$mdDialog.hide();
        };
        PipelineController.prototype.cancel = function () {
            this.$mdDialog.cancel();
        };
        PipelineController.prototype.getToolDataLength = function (obj) {
            return Object.keys(obj).length;
        };
        PipelineController.$inject = ['pipelineService', '$mdDialog'];
        return PipelineController;
    }());
    ISightApp.PipelineController = PipelineController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=pipelineController.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var DialogController = /** @class */ (function () {
        function DialogController($mdDialog, msg) {
            this.$mdDialog = $mdDialog;
            this.msg = msg;
            this.message = 'Message from cntrl';
            console.log(msg);
        }
        DialogController.prototype.hide = function () {
            this.$mdDialog.hide();
        };
        DialogController.prototype.cancel = function () {
            this.$mdDialog.cancel();
        };
        DialogController.$inject = ['$mdDialog'];
        return DialogController;
    }());
    ISightApp.DialogController = DialogController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=tabDialogController.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var PipelineData = /** @class */ (function () {
        function PipelineData(pipelineName, tools, applicationViewData, userViewData, pipelineRecords) {
            this.pipelineName = pipelineName;
            this.tools = tools;
            this.applicationViewData = applicationViewData;
            this.userViewData = userViewData;
            this.pipelineRecords = pipelineRecords;
        }
        return PipelineData;
    }());
    ISightApp.PipelineData = PipelineData;
    var ToolData = /** @class */ (function () {
        function ToolData(name, data //Dont have maps.
        ) {
            this.name = name;
            this.data = data;
        }
        return ToolData;
    }());
    ISightApp.ToolData = ToolData;
    var PipelineRecord = /** @class */ (function () {
        function PipelineRecord(rowData) {
            this.rowData = rowData;
        }
        return PipelineRecord;
    }());
    ISightApp.PipelineRecord = PipelineRecord;
    var TabDialogData = /** @class */ (function () {
        function TabDialogData(header, dataRows) {
            this.header = header;
            this.dataRows = dataRows;
        }
        return TabDialogData;
    }());
    ISightApp.TabDialogData = TabDialogData;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=pipelineModels.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var PipelineService = /** @class */ (function () {
        function PipelineService($q, $resource, graphService) {
            this.$q = $q;
            this.$resource = $resource;
            this.graphService = graphService;
            this.userPerspectiveMetaInfo = {
                'Total Commits': { 'type': 'uniqueCount', 'property': 'git_ScmRevisionNumber' },
                'Contributing to Projects': { 'type': 'uniqueCount', 'property': 'git_RepoName' },
                'Total Builds': { 'type': 'uniqueCount', 'property': 'jen_BuildNumber' },
                'Passed Builds': { 'type': 'uniqueCount', 'property': 'jen_BuildNumber', 'criteria_property': 'jen_Result', 'criteria': 'SUCCESS' },
                'Failed Builds': { 'type': 'uniqueCount', 'property': 'jen_BuildNumber', 'criteria_property': 'jen_Result', 'criteria': 'FAILURE' },
                'Total Deployments': { 'type': 'uniqueCount', 'property': 'run_ExecutionId' },
                'Successful Deployments': { 'type': 'uniqueCount', 'property': 'run_ExecutionId', 'criteria_property': 'run_Status', 'criteria': 'succeeded' },
                'Failed Deployments': { 'type': 'uniqueCount', 'property': 'run_ExecutionId', 'criteria_property': 'run_Status', 'criteria': 'failed' },
                'Aborted Deployments': { 'type': 'uniqueCount', 'property': 'run_ExecutionId', 'criteria_property': 'run_Status', 'criteria': 'aborted' },
            };
            this.applicationPerspectiveMetaInfo = {
                'Developers Contributing': { 'type': 'uniqueCount', 'property': 'git_ScmAuthor' },
                'Total Commits': { 'type': 'uniqueCount', 'property': 'git_ScmRevisionNumber' },
                'Total Builds': { 'type': 'uniqueCount', 'property': 'jen_BuildNumber' },
                'Green Builds': { 'type': 'uniqueCount', 'property': 'jen_BuildNumber', 'criteria_property': 'jen_Result', 'criteria': 'SUCCESS' },
                'Red Builds': { 'type': 'uniqueCount', 'property': 'jen_BuildNumber', 'criteria_property': 'jen_Result', 'criteria': 'FAILURE' },
                'Total Deployments': { 'type': 'uniqueCount', 'property': 'run_ExecutionId' },
                'Sucessfull Deployments': { 'type': 'uniqueCount', 'property': 'run_ExecutionId', 'criteria_property': 'run_Status', 'criteria': 'succeeded' },
                'Failed Deployments': { 'type': 'uniqueCount', 'property': 'run_ExecutionId', 'criteria_property': 'run_Status', 'criteria': 'failed' },
                'Aborted Deployments': { 'type': 'uniqueCount', 'property': 'run_ExecutionId', 'criteria_property': 'run_Status', 'criteria': 'aborted' }
            };
            this.labelDataSet = {
                'GIT': {
                    'Total Commits': { 'type': 'uniqueCount', 'property': 'git_ScmRevisionNumber' },
                    'Unique Authors': { 'type': 'uniqueCount', 'property': 'git_ScmAuthor' },
                    'Unique Repositories': { 'type': 'uniqueCount', 'property': 'git_RepoName' }
                },
                'JENKINS': {
                    'Total Jobs': { 'type': 'uniqueCount', 'property': 'jen_JobName' }
                },
                'SONAR': {
                    'Unique Projects': { 'type': 'uniqueCount', 'property': 'son_Resourcekey' },
                    'Unique Timestamps': { 'type': 'uniqueCount', 'property': 'son_Timestamp' }
                },
                'RUNDECK': {
                    'Unique Projects': { 'type': 'uniqueCount', 'property': 'run_ProjectName' },
                    'Unique Jobnames': { 'type': 'uniqueCount', 'property': 'run_JobName' },
                    'Unique Execution Ids': { 'type': 'uniqueCount', 'property': 'run_ExecutionId' }
                }
            };
        }
        PipelineService.prototype.loadPipelineData = function () {
            var self = this;
            var orphanGitQuery = { "statements": [{ "statement": "match (GIT:GIT) OPTIONAL MATCH (GIT)-[:JENKINS_TRG_BY_GIT]->(JENKINS) with GIT, JENKINS where JENKINS is null AND exists(GIT.git_RepoName) return GIT", "includeStats": true, "resultDataContents": ["row", "graph"] }] };
            var gitToJenkinsQuery = { "statements": [{ "statement": "MATCH (GIT)-[r:JENKINS_TRG_BY_GIT]->(JENKINS) return GIT,JENKINS", "includeStats": true, "resultDataContents": ["row", "graph"] }] };
            var gitToSonarQuery = { "statements": [{ "statement": "MATCH (GIT)-[r1:JENKINS_TRG_BY_GIT]->(JENKINS), (JENKINS)-[r2:SONAR_TRG_BY_JENKINS]->(SONAR) RETURN GIT, JENKINS, SONAR", "includeStats": true, "resultDataContents": ["row", "graph"] }] };
            var gitToRundeckMissingSonarQuery = { "statements": [{ "statement": "MATCH (JENKINS)-[r3:RUNDECK_TRG_BY_JENKINS]->(RUNDECK), (GIT)-[r1:JENKINS_TRG_BY_GIT]->(JENKINS) OPTIONAL MATCH (JENKINS)-[:SONAR_TRG_BY_JENKINS]->(SONAR) with GIT, JENKINS, SONAR, RUNDECK where SONAR is null RETURN  DISTINCT GIT, JENKINS, SONAR, RUNDECK", "includeStats": true, "resultDataContents": ["row", "graph"] }] };
            var gitToRundeck = { "statements": [{ "statement": "MATCH (GIT)-[r1:JENKINS_TRG_BY_GIT]->(JENKINS), (JENKINS)-[r2:SONAR_TRG_BY_JENKINS]->(SONAR), (JENKINS)-[r3:RUNDECK_TRG_BY_JENKINS]->(RUNDECK) RETURN GIT, JENKINS, SONAR, RUNDECK", "includeStats": true, "resultDataContents": ["row", "graph"] }] };
            return this.$q.all([
                this.graphService.executeQuery(orphanGitQuery).then(function (data) {
                    data = self.buildPipelineData('Orphan Commits', data);
                    return data;
                }),
                this.graphService.executeQuery(gitToJenkinsQuery).then(function (data) {
                    data = self.buildPipelineData('Continuous Build', data);
                    return data;
                }),
                this.graphService.executeQuery(gitToSonarQuery).then(function (data) {
                    data = self.buildPipelineData('Cont. Build with Code Quality', data);
                    return data;
                }),
                this.graphService.executeQuery(gitToRundeckMissingSonarQuery).then(function (data) {
                    data = self.buildPipelineData('Deployments without Code Quality', data);
                    return data;
                }),
                this.graphService.executeQuery(gitToRundeck).then(function (data) {
                    data = self.buildPipelineData('Continuous Deployment', data);
                    return data;
                })
            ]);
        };
        PipelineService.prototype.performAggregation = function (template, pipelineRecords, groupByProperty) {
            var result = {};
            var workObj = null;
            pipelineRecords.forEach(function (pipelineRecord) {
                if (groupByProperty) {
                    var groupByData = result[pipelineRecord.rowData[groupByProperty]];
                    if (groupByData == undefined) {
                        groupByData = {};
                        result[pipelineRecord.rowData[groupByProperty]] = groupByData;
                    }
                    workObj = groupByData;
                }
                else {
                    workObj = result;
                }
                for (var i in template) {
                    var data = workObj[i];
                    if (data === undefined) {
                        data = {};
                        workObj[i] = data;
                    }
                    //'Green Builds': {'type' : 'uniqueCount', 'property' :'JENKINS.jen_BuildNumber', 'criteria_property' : 'JENKINS.jen_Result', 'criteria': 'SUCCESS' },
                    if (pipelineRecord.rowData[template[i].property]) {
                        if (template[i].criteria_property && pipelineRecord.rowData[template[i].criteria_property]) {
                            if (pipelineRecord.rowData[template[i].criteria_property] === template[i].criteria) {
                                data[pipelineRecord.rowData[template[i].property]] = pipelineRecord;
                            }
                        }
                        else {
                            data[pipelineRecord.rowData[template[i].property]] = pipelineRecord;
                        }
                    }
                    else {
                        delete workObj[i];
                    }
                }
            });
            for (var i in result) {
                if (groupByProperty) {
                    var groupByData = result[i];
                    for (var j in groupByData) {
                        groupByData[j] = Object.keys(groupByData[j]).length;
                    }
                }
                else {
                    result[i] = Object.keys(result[i]).length;
                }
            }
            return result;
        };
        PipelineService.prototype.buildDataArray = function (metainfo, pipelineRecords, groupBy, columnName) {
            var data = this.performAggregation(angular.merge({}, metainfo), pipelineRecords, groupBy);
            var headers = [columnName];
            for (var i in metainfo) {
                headers.push(i);
            }
            var dataRows = [];
            for (var i in data) {
                var dataRow = [];
                dataRow.push('' + i);
                var groupedData = data[i];
                for (var j in metainfo) {
                    dataRow.push(groupedData[j] === undefined ? '' : groupedData[j]);
                }
                dataRows.push(dataRow);
            }
            return new ISightApp.TabDialogData(headers, dataRows);
        };
        PipelineService.prototype.buildPipelineData = function (pipelineName, data) {
            if (data) {
                var results = data.results;
                try {
                    var pipelineRecords = [];
                    var data = results[0].data;
                    data.forEach(function (rowWrapper) {
                        var row = rowWrapper.row;
                        var compositeObj = {};
                        row.forEach(function (rowData) {
                            angular.merge(compositeObj, rowData);
                        });
                        pipelineRecords.push(new ISightApp.PipelineRecord(compositeObj));
                    });
                    var tools = [];
                    for (var tool in this.labelDataSet) {
                        tools.push(new ISightApp.ToolData(tool, this.performAggregation(angular.merge({}, this.labelDataSet[tool]), pipelineRecords, null)));
                    }
                    return new ISightApp.PipelineData(pipelineName, tools, this.buildDataArray(this.applicationPerspectiveMetaInfo, pipelineRecords, 'git_RepoName', 'Application'), this.buildDataArray(this.userPerspectiveMetaInfo, pipelineRecords, 'git_ScmAuthor', 'User'), pipelineRecords);
                }
                catch (error) {
                    console.log(error);
                }
            }
            return;
        };
        PipelineService.$inject = ['$q', '$resource', 'graphService'];
        return PipelineService;
    }());
    ISightApp.PipelineService = PipelineService;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=pipelineService.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var PlatformServiceStatusService = /** @class */ (function () {
        function PlatformServiceStatusService($resource, $q, $cookies, restCallHandlerService) {
            this.$resource = $resource;
            this.$q = $q;
            this.$cookies = $cookies;
            this.restCallHandlerService = restCallHandlerService;
        }
        PlatformServiceStatusService.prototype.loadDetails = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("PLATFORM_SERVICE_STATUS");
        };
        PlatformServiceStatusService.$inject = ['$resource', '$q', '$cookies', 'restCallHandlerService'];
        return PlatformServiceStatusService;
    }());
    ISightApp.PlatformServiceStatusService = PlatformServiceStatusService;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=platformServiceStatusService.js.map
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
/// <reference path='../../../_all.ts' />
var ISightApp;
(function (ISightApp) {
    var RestClient = /** @class */ (function () {
        function RestClient($q, $resource, $cookies, restEndpointService) {
            this.$q = $q;
            this.$resource = $resource;
            this.$cookies = $cookies;
            this.restEndpointService = restEndpointService;
        }
        RestClient.prototype.doPost = function (headers) {
        };
        RestClient.$inject = ['$q', '$resource', '$cookies', 'restEndpointService'];
        return RestClient;
    }());
    ISightApp.RestClient = RestClient;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=restClient.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var RestAPIUrlModel = /** @class */ (function () {
        function RestAPIUrlModel(urlKey, url) {
            this.urlKey = urlKey;
            this.url = url;
        }
        return RestAPIUrlModel;
    }());
    ISightApp.RestAPIUrlModel = RestAPIUrlModel;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=restAPIUrlModel.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var RestAPIUrlService = /** @class */ (function () {
        function RestAPIUrlService($cookies, $resource, restEndpointService) {
            this.$cookies = $cookies;
            this.$resource = $resource;
            this.restEndpointService = restEndpointService;
            this.urlMapping = {};
            this.initializeEndpoints();
        }
        RestAPIUrlService.prototype.initializeEndpoints = function () {
            this.addEndPoint("ABOUT_READ", '/PlatformService/about/read');
            this.addEndPoint("HEALTH_GLOBAL", '/PlatformService/admin/agent/globalHealth');
            this.addEndPoint("HEALTH_TOOL", '/PlatformService/admin/agent/health');
            this.addEndPoint("LOGOUT", '/PlatformService/user/logout');
            this.addEndPoint("GRAPANA_CURRENT_ROLE_ORG", '/PlatformService/user/getCurrentOrgAndRole');
            this.addEndPoint("ORGS_GET", '/PlatformService/admin/userMgmt/getOrgs');
            this.addEndPoint("USER_AUTHNTICATE", '/PlatformService/user/authenticate');
            this.addEndPoint("USER_GET", '/PlatformService/admin/userMgmt/getUser');
            this.addEndPoint("CURRENT_USER_ORG", '/PlatformService/admin/userMgmt/getCurrentUserOrgs');
            this.addEndPoint("SWITCH_USER_ORG", '/PlatformService/admin/userMgmt/switchUserOrg');
            this.addEndPoint("USER_SEARCH", '/PlatformService/user/search');
            this.addEndPoint("ENTITY_DEFINITION_ADD", '/PlatformService/admin/dataTagging/addEntityDefinition');
            this.addEndPoint("ENTITY_DEFINITION_REMOVE", '/PlatformService/admin/dataTagging/removeEntityDefinition');
            this.addEndPoint("ENTITY_DEFINITION_ALL", '/PlatformService/admin/dataTagging/fetchAllEntityDefinition');
            this.addEndPoint("ENTITY_BY_LEVEL", '/ALL_latformService/admin/dataTagging/fetchEntityDataByLevel');
            this.addEndPoint("ENTITY_DATA_ALL", '/PlatformService/admin/hierarchyDetails/fetchAllHierarchyDetails');
            this.addEndPoint("HIERARCHY_DETAILS_ADD", '/PlatformService/admin/hierarchyDetails/addHierarchyDetails');
            this.addEndPoint("HIERARCHY_DETAILS_REMOVE", '/PlatformService/admin/hierarchyDetails/removeHierarchyDetails');
            this.addEndPoint("HIERARCHY_DETAILS_GET", '/PlatformService/admin/hierarchyDetails/getHierarchyDetails');
            this.addEndPoint("HIERARCHY_DATA_ALL", '/PlatformService/admin/dataTagging/fetchAllHierarchyMapping');
            this.addEndPoint("HIERARCHY_MAPPING_ADD", '/PlatformService/admin/dataTagging/addHierarchyMapping');
            this.addEndPoint("HIERARCHY_MAPPING", '/PlatformService/admin/dataTagging/fetchHierarchyMapping');
            this.addEndPoint("HIERARCHY_MAPPING_REMOVE", '/PlatformService/admin/dataTagging/removeHierarchyMapping');
            this.addEndPoint("SEARCH_DASHBOARD", '/PlatformService/search/dashboards');
            this.addEndPoint("DB_DATA", '/PlatformService/db/data');
            this.addEndPoint("PROJECT_MAPPING_REMOVE", '/PlatformService/admin/data/removeProjectMapping');
            this.addEndPoint("PROJECT_MAPPING_ADD", '/PlatformService/admin/data/addProjectMapping');
            this.addEndPoint("PROJECT_MAPPING_BY_HIERARCHY", '/PlatformService/admin/data/fetchProjectMappingByHierarchy');
            this.addEndPoint("PROJECT_MAPPING_BY_ORGID", '/PlatformService/admin/data/fetchProjectMappingByOrgId');
            this.addEndPoint("TOOL_MAPPING_DELETE", '/PlatformService/admin/data/deleteToolMapping');
            this.addEndPoint("TOOL_NAME_GET", '/PlatformService/admin/mappingdata/tools');
            this.addEndPoint("MAPPING_DATA", '/PlatformService/admin/mappingdata/toolsField');
            this.addEndPoint("MAPPING_FIELD_VAL", '/PlatformService/admin/mappingdata/toolsFieldValue');
            this.addEndPoint("TOOL_CATEGORY", '/PlatformService/admin/mappingdata/toolsCategory');
            this.addEndPoint("PROJECT_MAPPING", '/PlatformService/admin/data/fetchAllProjectMapping');
            this.addEndPoint("DISTINCT_HIERARCHY", '/PlatformService/admin/hierarchyDetails/fetchDistinctHierarchyName');
            this.addEndPoint("TOOL_DATA_READ", '/PlatformService/admin/tools/read');
            this.addEndPoint("TOOL_CONFIG_SAVE", '/PlatformService/admin/toolsConfig/update');
            this.addEndPoint("TOOL_CONFIG_READ", '/PlatformService/admin/toolsConfig/read');
            this.addEndPoint("AGENT_CONFIG_DOWNLOAD", '/PlatformService/admin/toolsConfig/download');
            this.addEndPoint("TOOL_CONFIG_DELETE", '/PlatformService/admin/toolsConfig/delete');
            this.addEndPoint("TOOL_LAYOUT_READ", '/PlatformService/admin/toollayout/read');
            this.addEndPoint("ALL_TOOLS_CONFIGURATION_READ", '/PlatformService/admin/toolsConfig/readAll');
            this.addEndPoint("ORG_USERS_GET", '/PlatformService/admin/userMgmt/getOrgUsers');
            this.addEndPoint("USER_ADD", '/PlatformService/admin/userMgmt/addUser');
            this.addEndPoint("ALL_USERS", '/PlatformService/admin/userMgmt/getAllUsers');
            this.addEndPoint("USER_TO_ORG_ADD", '/PlatformService/admin/userMgmt/addUserToOrg');
            this.addEndPoint("ORG_CREATE", '/PlatformService/admin/userMgmt/createOrg');
            this.addEndPoint("USER_ORG_DELETE", '/PlatformService/admin/userMgmt/removeUserFromOrg');
            this.addEndPoint("USER_ROLE_INORG_UPDATE", '/PlatformService/admin/userMgmt/updateUserRoleInOrg');
            this.addEndPoint("ACCESS_GROUP_MANAGEMENT_GET_ORGS", '/PlatformService/accessGrpMgmt/getOrgs');
            this.addEndPoint("ACCESS_GROUP_MANAGEMENT_GET_CURRENT_USER_ORGS", '/PlatformService/accessGrpMgmt/getCurrentUserOrgs');
            this.addEndPoint("ACCESS_GROUP_MANAGEMENT_SWITCH_ORGS", '/PlatformService/accessGrpMgmt/switchUserOrg');
            this.addEndPoint("ACCESS_GROUP_MANAGEMENT_GET_USERS", '/PlatformService/accessGrpMgmt/getUser');
            this.addEndPoint("HIERARCHY_ALL_DETAILS_GET", '/PlatformService/admin/hierarchyDetails/getAllHierarchyDetails');
            this.addEndPoint("UPLOAD_HIERARCHY_DETAILS", '/PlatformService/admin/hierarchyDetails/uploadHierarchyDetails');
            this.addEndPoint("GET_METADATA", '/PlatformService/admin/hierarchyDetails/getMetaData');
            this.addEndPoint("GET_HIERARCHY_PROPERTIES", '/PlatformService/admin/hierarchyDetails/getHierarchyProperties');
            //---------------------------------------------------------------------------------------------------------------------------
            this.addEndPoint("DEVOPS_MATURITY_MODEL", '/PlatformService/admin/settings/uploadDevopsMaturityModule');
            this.addEndPoint("SAVE_DEVOPS_MATURITY_SETTING", '/PlatformService/admin/settings/saveSettingsConfiguration');
            this.addEndPoint("LIST_DEVOPS_MATURITY_SETTING", '/PlatformService/admin/settings/loadSettingsConfiguration');
            this.addEndPoint("DOWNLOAD_MATURITY_FILE", '/PlatformService/admin/settings/downloadMaturityFile');
            //---------------------------------------------------------------------------------------------------------------------------
            this.addEndPoint("INSIGHTS_GET", '/PlatformService/insights/inferences');
            this.addEndPoint("INSIGHTS_COMP_STATUS", '/PlatformService/ServicesHealthStatus/getStatus');
            this.addEndPoint("UPLOAD_IMAGE", '/PlatformService/admin/settings/uploadCustomLogo');
            this.addEndPoint("GET_LOGO_IMAGE", '/PlatformService/settings/getLogoImage');
            this.addEndPoint("SAVE_DATAPURGING_SETTING", '/PlatformService/admin/settings/saveSettingsConfiguration');
            this.addEndPoint("LIST_DATAPURGING_SETTING", '/PlatformService/admin/settings/loadSettingsConfiguration');
            this.addEndPoint("AGENT_REGISTER", '/PlatformService/admin/agentConfiguration/registerAgent');
            this.addEndPoint("AGENT_UPDATE", '/PlatformService/admin/agentConfiguration/updateAgent');
            this.addEndPoint("AGENT_START_STOP", '/PlatformService/admin/agentConfiguration/startStopAgent');
            this.addEndPoint("DOCROOT_AGENT_VERSION_TOOLS", '/PlatformService/admin/agentConfiguration/getSystemAvailableAgentList');
            this.addEndPoint("DOCROOT_AGENT_TOOL_CONFIG_DETAILS", '/PlatformService/admin/agentConfiguration/getToolRawConfigFile');
            this.addEndPoint("DB_AGENTS_LIST", '/PlatformService/admin/agentConfiguration/getRegisteredAgents');
            this.addEndPoint("DB_AGENT_CONFIG_DETAILS", '/PlatformService/admin/agentConfiguration/getRegisteredAgentDetail');
            this.addEndPoint("AGENT_UNINSTALL", '/PlatformService/admin/agentConfiguration/uninstallAgent');
        };
        RestAPIUrlService.prototype.addEndPoint = function (name, url) {
            if (this.urlMapping[name] === undefined) {
                this.urlMapping[name] = url;
            }
            else {
                throw new Error('Url with same name already exists');
            }
        };
        RestAPIUrlService.prototype.getRestCallUrl = function (moduleUrlKey) {
            if (!this.urlMapping[moduleUrlKey]) {
                throw new Error("Url Mapping doesnt exist");
            }
            return this.restEndpointService.getServiceHost() + this.urlMapping[moduleUrlKey];
        };
        RestAPIUrlService.$inject = ['$cookies', '$resource', 'restEndpointService'];
        return RestAPIUrlService;
    }());
    ISightApp.RestAPIUrlService = RestAPIUrlService;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=resAPIUrlService.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var RestCallHandlerService = /** @class */ (function () {
        function RestCallHandlerService($cookies, $resource, restEndpointService, restAPIUrlService) {
            this.$cookies = $cookies;
            this.$resource = $resource;
            this.restEndpointService = restEndpointService;
            this.restAPIUrlService = restAPIUrlService;
        }
        RestCallHandlerService.prototype.get = function (url, requestParams, additionalheaders) {
            var headers;
            var authToken;
            authToken = this.$cookies.get('Authorization');
            var defaultHeader = {
                'Authorization': authToken
            };
            if (this.checkValidObject(additionalheaders)) {
                headers = this.extend(defaultHeader, additionalheaders);
            }
            else {
                headers = defaultHeader;
            }
            var restcallUrl = this.constructGetUrl(url, requestParams);
            var resource = this.$resource(restcallUrl, {}, {
                allData: {
                    method: 'GET',
                    headers: headers
                }
            });
            return resource.allData().$promise;
        };
        RestCallHandlerService.prototype.post = function (url, requestParams, additionalheaders) {
            var restCallUrl = this.restAPIUrlService.getRestCallUrl(url);
            var headers;
            var authToken = this.$cookies.get('Authorization');
            var defaultHeader = {
                'Authorization': authToken
            };
            if (this.checkValidObject(additionalheaders)) {
                headers = this.extend(defaultHeader, additionalheaders);
            }
            else {
                headers = defaultHeader;
            }
            var resource = this.$resource(restCallUrl, {}, {
                allData: {
                    method: 'POST',
                    headers: headers,
                    transformRequest: function (data) {
                        if (data && Object.keys(data).length !== 0 && data.constructor == Object) {
                            var postParameter = '';
                            for (var key in data) {
                                if (data.hasOwnProperty(key)) {
                                    postParameter = postParameter.concat(key + '=' + requestParams[key] + '&');
                                }
                            }
                            postParameter = postParameter.slice(0, -1);
                            return postParameter;
                        }
                        return;
                    }
                }
            });
            return resource.allData(requestParams).$promise;
        };
        RestCallHandlerService.prototype.extend = function (obj, src) {
            for (var key in src) {
                if (src.hasOwnProperty(key))
                    obj[key] = src[key];
            }
            return obj;
        };
        RestCallHandlerService.prototype.checkValidObject = function (obj) {
            if (typeof (obj) != 'undefined' && obj != null && obj.constructor == Object && Object.keys(obj).length !== 0) {
                return true;
            }
            return false;
        };
        RestCallHandlerService.prototype.constructGetUrl = function (url, requestParams) {
            var selectedUrl = this.restAPIUrlService.getRestCallUrl(url);
            if (this.checkValidObject(requestParams)) {
                selectedUrl = selectedUrl.concat('?');
                for (var key in requestParams) {
                    if (requestParams.hasOwnProperty(key)) {
                        selectedUrl = selectedUrl.concat(key + '=' + requestParams[key] + '&');
                    }
                }
                selectedUrl = selectedUrl.slice(0, -1);
            }
            return selectedUrl;
        };
        RestCallHandlerService.$inject = ['$cookies', '$resource', 'restEndpointService', 'restAPIUrlService'];
        return RestCallHandlerService;
    }());
    ISightApp.RestCallHandlerService = RestCallHandlerService;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=restCallHandlerService.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var RoleService = /** @class */ (function () {
        function RoleService($q, $resource, $cookies, restCallHandlerService, restEndpointService) {
            this.$q = $q;
            this.$resource = $resource;
            this.$cookies = $cookies;
            this.restCallHandlerService = restCallHandlerService;
            this.restEndpointService = restEndpointService;
        }
        RoleService.prototype.getAllOrg = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("ORGS_GET");
        };
        RoleService.prototype.getOrgUserInfo = function (orgId) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("ORG_USERS_GET", { "orgId": orgId }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        RoleService.prototype.userSearch = function (input) {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("USER_SEARCH", { 'query': input });
        };
        RoleService.prototype.createUser = function (userName, userEmail, userLogin) {
            var authToken = this.$cookies.get('Authorization');
            var orgUserData = this.$resource(this.restEndpointService.getServiceHost() + 'PlatformService/userMgmt/addUser', {}, {
                allOrgUserData: {
                    method: 'POST',
                    headers: {
                        'Authorization': authToken,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    transformRequest: function (data) {
                        if (data && data.userName) {
                            return 'orgId=' + data.orgId;
                        }
                        return;
                    }
                }
            });
            return orgUserData.allOrgUserData({ "orgId": 1 }).$promise;
        };
        RoleService.prototype.getAllUsers = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("ALL_USERS");
        };
        RoleService.prototype.addUserToOrg = function (orgId, userLogin, role) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("USER_TO_ORG_ADD", { "orgId": orgId, "userLogin": userLogin, "role": role }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        RoleService.prototype.createOrg = function (orgName) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("ORG_CREATE", { "orgName": orgName }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        RoleService.prototype.deleteUserFromOrg = function (userId, orgId) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("USER_ORG_DELETE", { "userId": userId, "orgId": orgId }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        RoleService.prototype.addUser = function (userName, email, login) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("USER_ADD", { "userName": userName, "email": email, "login": login }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        RoleService.prototype.updateUserRoleOrg = function (orgId, userId, role) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("USER_ROLE_INORG_UPDATE", { "orgId": orgId, "userId": userId, "role": role }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        RoleService.$inject = ['$q', '$resource', '$cookies', 'restCallHandlerService', 'restEndpointService'];
        return RoleService;
    }());
    ISightApp.RoleService = RoleService;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=roleService.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var EditSingleToolConfigurationController = /** @class */ (function () {
        function EditSingleToolConfigurationController($mdDialog, $route) {
            this.$mdDialog = $mdDialog;
            this.$route = $route;
            this.ToolConfigurationDataModel = this['locals'].toolConfigurationData.ToolConfigurationDataModel;
            this.toolData = JSON.stringify(this.ToolConfigurationDataModel, null, "    ");
        }
        EditSingleToolConfigurationController.prototype.hide = function () {
            this.$mdDialog.hide();
        };
        EditSingleToolConfigurationController.prototype.cancel = function () {
            this.$mdDialog.cancel();
        };
        EditSingleToolConfigurationController.prototype.save = function () {
            this['locals'].toolConfigurationData.ToolConfigurationDataModel = JSON.parse(this.toolData);
            this.cancel();
        };
        EditSingleToolConfigurationController.$inject = ['$mdDialog', '$route'];
        return EditSingleToolConfigurationController;
    }());
    ISightApp.EditSingleToolConfigurationController = EditSingleToolConfigurationController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=editSingleToolConfigurationController.js.map
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
//// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var ShowSingleToolConfirmationDialogController = /** @class */ (function () {
        function ShowSingleToolConfirmationDialogController($mdDialog, $route, $location) {
            this.$mdDialog = $mdDialog;
            this.$route = $route;
            this.$location = $location;
            this.statusObject = this['locals'].statusObject;
            this.selectedOperation = this['locals'].selectedOperation;
            this.operationName = this['locals'].operationName;
            this.notification = 'Are you sure you want to ' + this.selectedOperation + ' this ' + this.operationName + '?';
        }
        ShowSingleToolConfirmationDialogController.prototype.hide = function () {
            this.$mdDialog.hide();
        };
        ShowSingleToolConfirmationDialogController.prototype.cancel = function () {
            this.$mdDialog.cancel();
        };
        ShowSingleToolConfirmationDialogController.prototype.finalConfirmation = function () {
            this.statusObject.status = true;
            this.hide();
        };
        ShowSingleToolConfirmationDialogController.$inject = ['$mdDialog', '$route', '$location'];
        return ShowSingleToolConfirmationDialogController;
    }());
    ISightApp.ShowSingleToolConfirmationDialogController = ShowSingleToolConfirmationDialogController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=showSingleConfirmationDialogController.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var SingleToolConfigurationController = /** @class */ (function () {
        function SingleToolConfigurationController($location, $window, singleToolConfigService, $mdDialog, $routeParams, $sce, $timeout) {
            this.$location = $location;
            this.$window = $window;
            this.singleToolConfigService = singleToolConfigService;
            this.$mdDialog = $mdDialog;
            this.$routeParams = $routeParams;
            this.$sce = $sce;
            this.$timeout = $timeout;
            this.configuredToolsList = [];
            this.selectedrows = 0;
            this.ToolConfigurationPageModel = new ISightApp.ToolConfigurationPageModel();
            this.toolName = '';
            this.toolCategory = '';
            this.isOpen = false;
            this.selectedMode = 'md-fling';
            this.selectedDirection = 'left';
            this.authModData = '';
            this.dataArray = [];
            this.toolsLayout = {
                jsonLayout: {}
            };
            this.buttonDisableStatus = true;
            this.saveButtonUrl = "dist/icons/svg/oneToolsConfigIcons/Save_icon_Disabled.svg";
            this.removeButtonUrl = "dist/icons/svg/oneToolsConfigIcons/Delete_icon_disabled.svg";
            this.downloadButtonUrl = "dist/icons/svg/oneToolsConfigIcons/Download_icon_Disabled.svg";
            this.addRowButtonUrl = "dist/icons/svg/oneToolsConfigIcons/Add_icon_MouseOver.svg";
            this.editIconSrc = "dist/icons/svg/userOnboarding/Edit_icon_disabled.svg";
            this.showTemplate = true;
            this.saveMsg = "";
            this.showTemplateAfterLoad = false;
            this.authMethod = ['Access Token', 'UserId/Password'];
            this.editAgentId = 0;
            var elem = document.querySelector('#homePageTemplateContainer');
            var homePageControllerScope = angular.element(elem).scope();
            var homePageController = homePageControllerScope['homePageController'];
            this.homeController = homePageController;
            var self = this;
            self.selectTool();
            self.singleToolConfigService
                .readToolsConfigurationGlobal().then(function (data) {
                var dataArray = data.data;
                if (dataArray !== undefined) {
                    for (var i = 0; i < dataArray.length; i++) {
                        self.configuredToolsList.push(dataArray[i].toolName);
                    }
                }
            });
            self.toolsInfo();
        }
        SingleToolConfigurationController.prototype.selectTool = function () {
            this.toolCategory = this.homeController.selectedToolCategory;
            this.toolName = this.homeController.selectedToolName;
        };
        SingleToolConfigurationController.prototype.onAuthenticationChange = function (selectedMode) {
            this.authModData = selectedMode;
        };
        SingleToolConfigurationController.prototype.toToolsConfigurationLandingPage = function () {
            this.homeController.templateName = 'toolsConfiguration';
        };
        SingleToolConfigurationController.prototype.toToolsConfiguredpage = function () {
            this.homeController.templateName = 'configuredTools';
            //this.$location.path('/InSights/configuredTools');
        };
        SingleToolConfigurationController.prototype.disableActionButtons = function () {
            var self = this;
            self.buttonDisableStatus = false;
            self.saveButtonUrl = "dist/icons/svg/oneToolsConfigIcons/Save_icon_MouseOver.svg";
            self.removeButtonUrl = "dist/icons/svg/oneToolsConfigIcons/Delete_icon_MouseOver.svg";
            self.downloadButtonUrl = "dist/icons/svg/oneToolsConfigIcons/Download_icon_MouseOver.svg";
            self.editIconSrc = "dist/icons/svg/userOnboarding/Edit_icon_MouseOver.svg";
        };
        SingleToolConfigurationController.prototype.toolsInfo = function () {
            var self = this;
            self.timezoneList = self.singleToolConfigService.readTimeZonelist();
            self.singleToolConfigService
                .readToolsConfiguration(self.toolName, self.toolCategory).then(function (data) {
                self.dataArray = data.data;
                if (self.dataArray.length != 0) {
                    for (var _i = 0, _a = self.dataArray; _i < _a.length; _i++) {
                        var jsonObject = _a[_i];
                        var insertObject = new ISightApp.ToolConfigurationDetail();
                        insertObject.agentId = jsonObject.agentId;
                        insertObject.category = jsonObject.toolCategory;
                        insertObject.toolName = jsonObject.toolName;
                        insertObject.ToolConfigurationDataModel = jsonObject;
                        delete insertObject.ToolConfigurationDataModel['agentId'];
                        delete insertObject.ToolConfigurationDataModel['category'];
                        delete insertObject.ToolConfigurationDataModel['toolName'];
                        self.ToolConfigurationPageModel.toolsConfigRows.push(insertObject);
                    }
                    self.showTemplateAfterLoad = true;
                }
                else {
                    var rowLength = 1;
                    var insertObject = new ISightApp.ToolConfigurationDetail();
                    insertObject.agentId = rowLength;
                    insertObject.category = self.toolCategory;
                    insertObject.toolName = self.toolName;
                    insertObject.ToolConfigurationDataModel = new ISightApp.ToolConfigurationDataModel();
                    self.ToolConfigurationPageModel.toolsConfigRows.push(insertObject);
                    self.showTemplateAfterLoad = true;
                }
            });
        };
        SingleToolConfigurationController.prototype.toggleSelectRow = function (agentId) {
            var self = this;
            self.saveMsg = "";
            self.selectedrows = agentId;
            self.disableActionButtons();
            self.downloadConfig();
            self.editAgentId = agentId;
        };
        SingleToolConfigurationController.prototype.addAction = function () {
            this.saveMsg = "";
            var agentIdArray = [];
            var self = this;
            for (var i = 0; i < self.ToolConfigurationPageModel.toolsConfigRows.length; i++) {
                if (self.ToolConfigurationPageModel.toolsConfigRows[i]['agentId'] !== undefined)
                    agentIdArray.push(self.ToolConfigurationPageModel.toolsConfigRows[i]['agentId']);
            }
            ;
            agentIdArray.sort(self.agentIdSort);
            var rowLength = parseInt(agentIdArray[agentIdArray.length - 1]) + 1;
            var insertObject = new ISightApp.ToolConfigurationDetail();
            insertObject.agentId = rowLength;
            insertObject.category = self.toolCategory;
            insertObject.toolName = self.toolName;
            insertObject.ToolConfigurationDataModel = new ISightApp.ToolConfigurationDataModel();
            self.ToolConfigurationPageModel.toolsConfigRows.push(insertObject);
        };
        SingleToolConfigurationController.prototype.agentIdSort = function (a, b) {
            var d = a - b;
            return d;
        };
        ;
        SingleToolConfigurationController.prototype.downloadConfig = function () {
            var self = this;
            var agentIdArray = [];
            for (var i = 0; i < self.ToolConfigurationPageModel.toolsConfigRows.length; i++) {
                agentIdArray.push(self.ToolConfigurationPageModel.toolsConfigRows[i].agentId);
            }
            if (agentIdArray.indexOf(self.selectedrows) > -1) {
                self.singleToolConfigService
                    .downloadAgentConfig(self.toolName, self.toolCategory, self.selectedrows).then(function (data) {
                    var content = data;
                    var blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json;charset=utf-8;" });
                    var URL = window.URL.createObjectURL(blob);
                    self.downloadURL = self.$sce.trustAsResourceUrl(URL);
                });
            }
        };
        SingleToolConfigurationController.prototype.removeAction = function (status) {
            if (status === true) {
                var self = this;
                var ToolConfigurationPageModel = self.ToolConfigurationPageModel;
                for (var j = 0; j < ToolConfigurationPageModel.toolsConfigRows.length; j++) {
                    if (ToolConfigurationPageModel.toolsConfigRows[j]['agentId'] === self.selectedrows) {
                        self.singleToolConfigService
                            .deleteToolsConfig(self.toolName, self.toolCategory, ToolConfigurationPageModel.toolsConfigRows[j]['agentId'])
                            .then(function (data) {
                            if (data.status === 'success') {
                                self.saveMsg = "Data deleted sucessfully!";
                                ToolConfigurationPageModel.toolsConfigRows = [];
                                self.singleToolConfigService
                                    .readToolsConfiguration(self.toolName, self.toolCategory).then(function (data) {
                                    self.dataArray = [];
                                    self.selectedrows = 0;
                                    self.dataArray = data.data;
                                    if (self.dataArray.length != 0) {
                                        for (var _i = 0, _a = self.dataArray; _i < _a.length; _i++) {
                                            var jsonObject = _a[_i];
                                            var insertObject = new ISightApp.ToolConfigurationDetail();
                                            insertObject.agentId = jsonObject.agentId;
                                            insertObject.category = jsonObject.toolCategory;
                                            insertObject.toolName = jsonObject.toolName;
                                            insertObject.ToolConfigurationDataModel = jsonObject;
                                            delete insertObject.ToolConfigurationDataModel['agentId'];
                                            delete insertObject.ToolConfigurationDataModel['category'];
                                            delete insertObject.ToolConfigurationDataModel['toolName'];
                                            self.ToolConfigurationPageModel.toolsConfigRows.push(insertObject);
                                        }
                                    }
                                    else if (ToolConfigurationPageModel.toolsConfigRows.length === 0) {
                                        var rowLength = 1;
                                        var insertObject = new ISightApp.ToolConfigurationDetail();
                                        insertObject.agentId = rowLength;
                                        insertObject.category = self.toolCategory;
                                        insertObject.toolName = self.toolName;
                                        insertObject.ToolConfigurationDataModel = new ISightApp.ToolConfigurationDataModel();
                                        self.ToolConfigurationPageModel.toolsConfigRows.push(insertObject);
                                    }
                                });
                            }
                            else {
                                self.saveMsg = "Failed to delete data!";
                            }
                        });
                        break;
                    }
                }
            }
        };
        SingleToolConfigurationController.prototype.formSubmit = function (status) {
            if (status === true) {
                var self = this;
                for (var i = 0; i < self.ToolConfigurationPageModel.toolsConfigRows.length; i++) {
                    if (self.ToolConfigurationPageModel.toolsConfigRows[i]['agentId'] === self.selectedrows) {
                        var obj = self.ToolConfigurationPageModel.toolsConfigRows[i].ToolConfigurationDataModel;
                        obj['agentId'] = self.ToolConfigurationPageModel.toolsConfigRows[i]['agentId'];
                        obj['category'] = self.toolCategory;
                        obj['toolName'] = self.toolName;
                        self.singleToolConfigService
                            .saveToolsConfiguration(JSON.stringify(obj, null, 2));
                        self.saveMsg = "Data saved sucessfully!";
                        break;
                    }
                }
            }
        };
        SingleToolConfigurationController.prototype.openDialog = function (params, selectedOperation) {
            var self = this;
            if (selectedOperation === 'delete' && Object.keys(self.ToolConfigurationPageModel.toolsConfigRows[0]).length === 5) {
                self.saveMsg = "please save data first!";
            }
            else {
                var statusObject = {
                    'status': false
                };
                self.$mdDialog.show({
                    controller: ISightApp.ShowSingleToolConfirmationDialogController,
                    controllerAs: 'showSingleToolConfirmationDialogController',
                    templateUrl: './dist/modules/singleToolConfiguration/view/oneToolConfirmationDialog.tmp.html',
                    parent: angular.element(document.body),
                    targetEvent: params,
                    preserveScope: true,
                    clickOutsideToClose: true,
                    locals: {
                        statusObject: statusObject,
                        selectedOperation: selectedOperation,
                        operationName: 'configuration'
                    },
                    bindToController: true,
                    onRemoving: function () {
                        if (selectedOperation === 'save') {
                            self.formSubmit(statusObject.status);
                        }
                        else if (selectedOperation === 'delete') {
                            self.removeAction(statusObject.status);
                        }
                    }
                });
            }
        };
        SingleToolConfigurationController.prototype.editConfigurations = function (params) {
            var self = this;
            var toolConfigurationData;
            for (var i = 0; i < self.ToolConfigurationPageModel.toolsConfigRows.length; i++) {
                if (self.ToolConfigurationPageModel.toolsConfigRows[i]['agentId'] === self.editAgentId) {
                    toolConfigurationData = self.ToolConfigurationPageModel.toolsConfigRows[i];
                }
            }
            self.$mdDialog.show({
                controller: ISightApp.EditSingleToolConfigurationController,
                controllerAs: 'editSingleToolConfigurationController',
                templateUrl: './dist/modules/singleToolConfiguration/view/editSingleToolConfigurationHtml.tmp.html',
                parent: angular.element(document.body),
                targetEvent: params,
                preserveScope: true,
                clickOutsideToClose: true,
                locals: {
                    toolConfigurationData: toolConfigurationData
                },
                bindToController: true,
            });
        };
        SingleToolConfigurationController.$inject = ['$location', '$window', 'singleToolConfigService', '$mdDialog', '$routeParams', '$sce', '$timeout'];
        return SingleToolConfigurationController;
    }());
    ISightApp.SingleToolConfigurationController = SingleToolConfigurationController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=singleToolConfigurationController.js.map
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
    var ToolConfigurationPageModel = /** @class */ (function () {
        function ToolConfigurationPageModel() {
            this.toolsConfigRows = [];
        }
        return ToolConfigurationPageModel;
    }());
    ISightApp.ToolConfigurationPageModel = ToolConfigurationPageModel;
    var ToolConfigurationDetail = /** @class */ (function () {
        function ToolConfigurationDetail() {
            this.agentId = 0;
            this.category = '';
            this.toolName = '';
        }
        return ToolConfigurationDetail;
    }());
    ISightApp.ToolConfigurationDetail = ToolConfigurationDetail;
    var ToolConfigurationDataModel = /** @class */ (function () {
        function ToolConfigurationDataModel() {
            this.startFromDate = '';
            this.toolUrl = '';
            this.runSchedule = 5;
            this.selectedAuthMtd = 'Auth Token';
            this.authToken = '';
            this.userId = '';
            this.password = '';
            this.toolsTimeZone = '';
            this.timeStampField = '';
            this.timeStampFormat = '';
            /* responsetemplate: Object = {
     
             };
             useResponseTemplate: boolean = false;
             configs = {
     
             }*/
        }
        return ToolConfigurationDataModel;
    }());
    ISightApp.ToolConfigurationDataModel = ToolConfigurationDataModel;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=singleToolConfigurationModel.js.map
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
    var SingleToolConfigService = /** @class */ (function () {
        function SingleToolConfigService($q, $resource, $cookies, restEndpointService) {
            this.$q = $q;
            this.$resource = $resource;
            this.$cookies = $cookies;
            this.restEndpointService = restEndpointService;
        }
        SingleToolConfigService.prototype.saveToolsConfiguration = function (toolsJSON) {
            var authToken = this.$cookies.get('Authorization');
            var toolsConfigurationUpdate = this.$resource(this.restEndpointService.getServiceHost() + '/PlatformService/admin/toolsConfig/update', {}, {
                toolsConfigurations: {
                    method: 'POST',
                    headers: {
                        'Authorization': authToken,
                        'Accept': 'application/json; charset=UTF-8',
                        'Content-Type': 'application/json'
                    }
                }
            });
            return toolsConfigurationUpdate.toolsConfigurations(toolsJSON);
        };
        SingleToolConfigService.prototype.readToolsConfiguration = function (toolName, toolCategory) {
            var authToken = this.$cookies.get('Authorization');
            var readToolsData = this.$resource(this.restEndpointService.getServiceHost() + '/PlatformService/admin/toolsConfig/read?category=' + toolCategory + '&toolName=' + toolName, {}, {
                readData: {
                    method: 'GET',
                    headers: {
                        'Authorization': authToken,
                    },
                }
            });
            return readToolsData.readData().$promise;
        };
        SingleToolConfigService.prototype.downloadAgentConfig = function (toolName, toolCategory, toolAgentId) {
            var authToken = this.$cookies.get('Authorization');
            var downloadConfig = this.$resource(this.restEndpointService.getServiceHost() + '/PlatformService/admin/toolsConfig/download?category=' + toolCategory + '&toolName=' + toolName + '&agentId=' + toolAgentId, {}, {
                downloadAgent: {
                    method: 'GET',
                    headers: {
                        'Authorization': authToken,
                    },
                }
            });
            return downloadConfig.downloadAgent().$promise;
        };
        SingleToolConfigService.prototype.deleteToolsConfig = function (toolName, toolCategory, agentId) {
            var authToken = this.$cookies.get('Authorization');
            var deleteConfig = this.$resource(this.restEndpointService.getServiceHost() + '/PlatformService/admin/toolsConfig/delete', {}, {
                deleteAgent: {
                    method: 'POST',
                    headers: {
                        'Authorization': authToken,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    transformRequest: function (data) {
                        if (data && data.agentId) {
                            return 'category=' + toolCategory + '&toolName=' + toolName + '&agentId=' + agentId;
                        }
                        return;
                    }
                }
            });
            return deleteConfig.deleteAgent({ "category": toolCategory, "toolName": toolName, "agentId": agentId }).$promise;
        };
        SingleToolConfigService.prototype.readToolsLayoutJson = function (toolName, toolCategory) {
            var authToken = this.$cookies.get('Authorization');
            var readToolsData = this.$resource(this.restEndpointService.getServiceHost() + '/PlatformService/admin/toollayout/read?category=' + toolCategory + '&toolName=' + toolName, {}, {
                readData: {
                    method: 'GET',
                    headers: {
                        'Authorization': authToken,
                    },
                }
            });
            return readToolsData.readData().$promise;
        };
        SingleToolConfigService.prototype.readToolsConfigurationGlobal = function () {
            var authToken = this.$cookies.get('Authorization');
            var readToolsData = this.$resource(this.restEndpointService.getServiceHost() + '/PlatformService/admin/toolsConfig/readAll', {}, {
                readData: {
                    method: 'GET',
                    headers: {
                        'Authorization': authToken,
                    },
                }
            });
            return readToolsData.readData().$promise;
        };
        SingleToolConfigService.prototype.getCategoryName = function (category) {
            var self = this;
            var toolsData = self.readToolsDataList();
            var categoryName = category;
            for (var tool in toolsData) {
                if (toolsData[tool].category === categoryName) {
                    return toolsData[tool].categoryDisplayName;
                }
            }
        };
        SingleToolConfigService.prototype.getCategoryAbbreviatedName = function (category) {
            var self = this;
            var toolsData = self.readToolsDataList();
            var categoryName = category;
            for (var tool in toolsData) {
                if (toolsData[tool].category === categoryName) {
                    return toolsData[tool]['toolTipName'];
                }
            }
        };
        SingleToolConfigService.prototype.getToolName = function (category, tool) {
            var self = this;
            var toolsData = self.readToolsDataList();
            var categoryName = category;
            var toolActualName = tool;
            for (var tool_1 in toolsData) {
                if (toolsData[tool_1].category === categoryName) {
                    var toolsValueArray = toolsData[tool_1].tools;
                    for (var toolValue in toolsValueArray) {
                        if (toolsValueArray[toolValue].toolName === toolActualName) {
                            return toolsValueArray[toolValue].toolDisplayName;
                        }
                    }
                }
            }
        };
        SingleToolConfigService.prototype.readToolsDataList = function () {
            var toolsData = [
                {
                    category: 'ALM',
                    categoryDisplayName: 'ALM',
                    toolTipName: 'Application Lifecycle Management',
                    tools: [
                        { toolName: 'JIRA', toolDisplayName: 'JIRA' },
                        { toolName: 'RALLY', toolDisplayName: 'Rally' },
                        { toolName: 'HP', toolDisplayName: 'HP' },
                    ]
                },
                {
                    category: 'SCM',
                    categoryDisplayName: 'SCM',
                    toolTipName: 'Source Code Management',
                    tools: [
                        { toolName: 'GIT', toolDisplayName: 'GIT' },
                        { toolName: 'BITBUCKET', toolDisplayName: 'BitBucket' },
                        { toolName: 'CVS', toolDisplayName: 'CVS' },
                        { toolName: 'TFS', toolDisplayName: 'TFS' },
                        { toolName: 'PERFORCE', toolDisplayName: 'Perforce' },
                        { toolName: 'SUBVERSION', toolDisplayName: 'Subversion' }
                    ]
                },
                {
                    category: 'CI',
                    categoryDisplayName: 'CI',
                    toolTipName: 'Continuous Integration',
                    tools: [
                        { toolName: 'JENKINS', toolDisplayName: 'JENKINS' },
                        { toolName: 'BAMBOO', toolDisplayName: 'Bamboo' },
                        { toolName: 'TEAMCITY', toolDisplayName: 'Teamcity' },
                    ]
                },
                {
                    category: 'ARTIFACTMANAGEMENT',
                    categoryDisplayName: 'Artifact Management',
                    tools: [
                        { toolName: 'NEXUS', toolDisplayName: 'Nexus' },
                        { toolName: 'ARTIFACTORY', toolDisplayName: 'Artifactory' },
                    ]
                },
                {
                    category: 'CODEQUALITY',
                    categoryDisplayName: 'Code Quality',
                    tools: [
                        { toolName: 'SONAR', toolDisplayName: 'SONAR' },
                        { toolName: 'FISHEYE', toolDisplayName: 'FishEye' },
                        { toolName: 'CRUCIBLE', toolDisplayName: 'Crucible' },
                        { toolName: 'COVERITY', toolDisplayName: 'Coverity' },
                    ]
                },
                {
                    category: 'CONTINUOUSTESTING',
                    categoryDisplayName: 'Continuous Testing',
                    tools: [
                        { toolName: 'QTP', toolDisplayName: 'QTP' },
                        { toolName: 'SELENIUM', toolDisplayName: 'Selenium' },
                    ]
                },
                {
                    category: 'DEPLOYMENT',
                    categoryDisplayName: 'Deployment',
                    tools: [
                        { toolName: 'RUNDECK', toolDisplayName: 'Rundeck' },
                        { toolName: 'DOCKER', toolDisplayName: 'Docker' },
                        { toolName: 'XLDEPLOY', toolDisplayName: 'XL Deploy' },
                    ]
                },
                {
                    category: 'CLOUD',
                    categoryDisplayName: 'Cloud',
                    tools: [
                        { toolName: 'AMAZON', toolDisplayName: 'Amazon' },
                        { toolName: 'AZURE', toolDisplayName: 'Azure' },
                        { toolName: 'CLOUDSTACK', toolDisplayName: 'Cloudstack' },
                        { toolName: 'OPENSTACK', toolDisplayName: 'Openstack' },
                        { toolName: 'VMWARE', toolDisplayName: 'Vmware' },
                    ]
                }
            ];
            return toolsData;
        };
        SingleToolConfigService.prototype.readTimeZonelist = function () {
            var timeZonejson = {
                "timeZone": [
                    'Africa/Abidjan',
                    'Africa/Accra',
                    'Africa/Addis_Ababa',
                    'Africa/Algiers',
                    'Africa/Asmara',
                    'Africa/Asmera',
                    'Africa/Bamako',
                    'Africa/Bangui',
                    'Africa/Banjul',
                    'Africa/Bissau',
                    'Africa/Blantyre',
                    'Africa/Brazzaville',
                    'Africa/Bujumbura',
                    'Africa/Cairo',
                    'Africa/Casablanca',
                    'Africa/Ceuta',
                    'Africa/Conakry',
                    'Africa/Dakar',
                    'Africa/Dar_es_Salaam',
                    'Africa/Djibouti',
                    'Africa/Douala',
                    'Africa/El_Aaiun',
                    'Africa/Freetown',
                    'Africa/Gaborone',
                    'Africa/Harare',
                    'Africa/Johannesburg',
                    'Africa/Juba',
                    'Africa/Kampala',
                    'Africa/Khartoum',
                    'Africa/Kigali',
                    'Africa/Kinshasa',
                    'Africa/Lagos',
                    'Africa/Libreville',
                    'Africa/Lome',
                    'Africa/Luanda',
                    'Africa/Lubumbashi',
                    'Africa/Lusaka',
                    'Africa/Malabo',
                    'Africa/Maputo',
                    'Africa/Maseru',
                    'Africa/Mbabane',
                    'Africa/Mogadishu',
                    'Africa/Monrovia',
                    'Africa/Nairobi',
                    'Africa/Ndjamena',
                    'Africa/Niamey',
                    'Africa/Nouakchott',
                    'Africa/Ouagadougou',
                    'Africa/Porto-Novo',
                    'Africa/Sao_Tome',
                    'Africa/Timbuktu',
                    'Africa/Tripoli',
                    'Africa/Tunis',
                    'Africa/Windhoek',
                    'America/Adak',
                    'America/Anchorage',
                    'America/Anguilla',
                    'America/Antigua',
                    'America/Araguaina',
                    'America/Argentina/Buenos_Aires',
                    'America/Argentina/Catamarca',
                    'America/Argentina/ComodRivadavia',
                    'America/Argentina/Cordoba',
                    'America/Argentina/Jujuy',
                    'America/Argentina/La_Rioja',
                    'America/Argentina/Mendoza',
                    'America/Argentina/Rio_Gallegos',
                    'America/Argentina/Salta',
                    'America/Argentina/San_Juan',
                    'America/Argentina/San_Luis',
                    'America/Argentina/Tucuman',
                    'America/Argentina/Ushuaia',
                    'America/Aruba',
                    'America/Asuncion',
                    'America/Atikokan',
                    'America/Atka',
                    'America/Bahia',
                    'America/Bahia_Banderas',
                    'America/Barbados',
                    'America/Belem',
                    'America/Belize',
                    'America/Blanc-Sablon',
                    'America/Boa_Vista',
                    'America/Bogota',
                    'America/Boise',
                    'America/Buenos_Aires',
                    'America/Cambridge_Bay',
                    'America/Campo_Grande',
                    'America/Cancun',
                    'America/Caracas',
                    'America/Catamarca',
                    'America/Cayenne',
                    'America/Cayman',
                    'America/Chicago',
                    'America/Chihuahua',
                    'America/Coral_Harbour',
                    'America/Cordoba',
                    'America/Costa_Rica',
                    'America/Creston',
                    'America/Cuiaba',
                    'America/Curacao',
                    'America/Danmarkshavn',
                    'America/Dawson',
                    'America/Dawson_Creek',
                    'America/Denver',
                    'America/Detroit',
                    'America/Dominica',
                    'America/Edmonton',
                    'America/Eirunepe',
                    'America/El_Salvador',
                    'America/Ensenada',
                    'America/Fort_Nelson',
                    'America/Fort_Wayne',
                    'America/Fortaleza',
                    'America/Glace_Bay',
                    'America/Godthab',
                    'America/Goose_Bay',
                    'America/Grand_Turk',
                    'America/Grenada',
                    'America/Guadeloupe',
                    'America/Guatemala',
                    'America/Guayaquil',
                    'America/Guyana',
                    'America/Halifax',
                    'America/Havana',
                    'America/Hermosillo',
                    'America/Indiana/Indianapolis',
                    'America/Indiana/Knox',
                    'America/Indiana/Marengo',
                    'America/Indiana/Petersburg',
                    'America/Indiana/Tell_City',
                    'America/Indiana/Vevay',
                    'America/Indiana/Vincennes',
                    'America/Indiana/Winamac',
                    'America/Indianapolis',
                    'America/Inuvik',
                    'America/Iqaluit',
                    'America/Jamaica',
                    'America/Jujuy',
                    'America/Juneau',
                    'America/Kentucky/Louisville',
                    'America/Kentucky/Monticello',
                    'America/Knox_IN',
                    'America/Kralendijk',
                    'America/La_Paz',
                    'America/Lima',
                    'America/Los_Angeles',
                    'America/Louisville',
                    'America/Lower_Princes',
                    'America/Maceio',
                    'America/Managua',
                    'America/Manaus',
                    'America/Marigot',
                    'America/Martinique',
                    'America/Matamoros',
                    'America/Mazatlan',
                    'America/Mendoza',
                    'America/Menominee',
                    'America/Merida',
                    'America/Metlakatla',
                    'America/Mexico_City',
                    'America/Miquelon',
                    'America/Moncton',
                    'America/Monterrey',
                    'America/Montevideo',
                    'America/Montreal',
                    'America/Montserrat',
                    'America/Nassau',
                    'America/New_York',
                    'America/Nipigon',
                    'America/Nome',
                    'America/Noronha',
                    'America/North_Dakota/Beulah',
                    'America/North_Dakota/Center',
                    'America/North_Dakota/New_Salem',
                    'America/Ojinaga',
                    'America/Panama',
                    'America/Pangnirtung',
                    'America/Paramaribo',
                    'America/Phoenix',
                    'America/Port-au-Prince',
                    'America/Port_of_Spain',
                    'America/Porto_Acre',
                    'America/Porto_Velho',
                    'America/Puerto_Rico',
                    'America/Rainy_River',
                    'America/Rankin_Inlet',
                    'America/Recife',
                    'America/Regina',
                    'America/Resolute',
                    'America/Rio_Branco',
                    'America/Rosario',
                    'America/Santa_Isabel',
                    'America/Santarem',
                    'America/Santiago',
                    'America/Santo_Domingo',
                    'America/Sao_Paulo',
                    'America/Scoresbysund',
                    'America/Shiprock',
                    'America/Sitka',
                    'America/St_Barthelemy',
                    'America/St_Johns',
                    'America/St_Kitts',
                    'America/St_Lucia',
                    'America/St_Thomas',
                    'America/St_Vincent',
                    'America/Swift_Current',
                    'America/Tegucigalpa',
                    'America/Thule',
                    'America/Thunder_Bay',
                    'America/Tijuana',
                    'America/Toronto',
                    'America/Tortola',
                    'America/Vancouver',
                    'America/Virgin',
                    'America/Whitehorse',
                    'America/Winnipeg',
                    'America/Yakutat',
                    'America/Yellowknife',
                    'Antarctica/Casey',
                    'Antarctica/Davis',
                    'Antarctica/DumontDUrville',
                    'Antarctica/Macquarie',
                    'Antarctica/Mawson',
                    'Antarctica/McMurdo',
                    'Antarctica/Palmer',
                    'Antarctica/Rothera',
                    'Antarctica/South_Pole',
                    'Antarctica/Syowa',
                    'Antarctica/Troll',
                    'Antarctica/Vostok',
                    'Arctic/Longyearbyen',
                    'Asia/Aden',
                    'Asia/Almaty',
                    'Asia/Amman',
                    'Asia/Anadyr',
                    'Asia/Aqtau',
                    'Asia/Aqtobe',
                    'Asia/Ashgabat',
                    'Asia/Ashkhabad',
                    'Asia/Baghdad',
                    'Asia/Bahrain',
                    'Asia/Baku',
                    'Asia/Bangkok',
                    'Asia/Barnaul',
                    'Asia/Beirut',
                    'Asia/Bishkek',
                    'Asia/Brunei',
                    'Asia/Calcutta',
                    'Asia/Chita',
                    'Asia/Choibalsan',
                    'Asia/Chongqing',
                    'Asia/Chungking',
                    'Asia/Colombo',
                    'Asia/Dacca',
                    'Asia/Damascus',
                    'Asia/Dhaka',
                    'Asia/Dili',
                    'Asia/Dubai',
                    'Asia/Dushanbe',
                    'Asia/Gaza',
                    'Asia/Harbin',
                    'Asia/Hebron',
                    'Asia/Ho_Chi_Minh',
                    'Asia/Hong_Kong',
                    'Asia/Hovd',
                    'Asia/Irkutsk',
                    'Asia/Istanbul',
                    'Asia/Jakarta',
                    'Asia/Jayapura',
                    'Asia/Jerusalem',
                    'Asia/Kabul',
                    'Asia/Kamchatka',
                    'Asia/Karachi',
                    'Asia/Kashgar',
                    'Asia/Kathmandu',
                    'Asia/Katmandu',
                    'Asia/Khandyga',
                    'Asia/Kolkata',
                    'Asia/Krasnoyarsk',
                    'Asia/Kuala_Lumpur',
                    'Asia/Kuching',
                    'Asia/Kuwait',
                    'Asia/Macao',
                    'Asia/Macau',
                    'Asia/Magadan',
                    'Asia/Makassar',
                    'Asia/Manila',
                    'Asia/Muscat',
                    'Asia/Nicosia',
                    'Asia/Novokuznetsk',
                    'Asia/Novosibirsk',
                    'Asia/Omsk',
                    'Asia/Oral',
                    'Asia/Phnom_Penh',
                    'Asia/Pontianak',
                    'Asia/Pyongyang',
                    'Asia/Qatar',
                    'Asia/Qyzylorda',
                    'Asia/Rangoon',
                    'Asia/Riyadh',
                    'Asia/Saigon',
                    'Asia/Sakhalin',
                    'Asia/Samarkand',
                    'Asia/Seoul',
                    'Asia/Shanghai',
                    'Asia/Singapore',
                    'Asia/Srednekolymsk',
                    'Asia/Taipei',
                    'Asia/Tashkent',
                    'Asia/Tbilisi',
                    'Asia/Tehran',
                    'Asia/Tel_Aviv',
                    'Asia/Thimbu',
                    'Asia/Thimphu',
                    'Asia/Tokyo',
                    'Asia/Tomsk',
                    'Asia/Ujung_Pandang',
                    'Asia/Ulaanbaatar',
                    'Asia/Ulan_Bator',
                    'Asia/Urumqi',
                    'Asia/Ust-Nera',
                    'Asia/Vientiane',
                    'Asia/Vladivostok',
                    'Asia/Yakutsk',
                    'Asia/Yekaterinburg',
                    'Asia/Yerevan',
                    'Atlantic/Azores',
                    'Atlantic/Bermuda',
                    'Atlantic/Canary',
                    'Atlantic/Cape_Verde',
                    'Atlantic/Faeroe',
                    'Atlantic/Faroe',
                    'Atlantic/Jan_Mayen',
                    'Atlantic/Madeira',
                    'Atlantic/Reykjavik',
                    'Atlantic/South_Georgia',
                    'Atlantic/St_Helena',
                    'Atlantic/Stanley',
                    'Australia/ACT',
                    'Australia/Adelaide',
                    'Australia/Brisbane',
                    'Australia/Broken_Hill',
                    'Australia/Canberra',
                    'Australia/Currie',
                    'Australia/Darwin',
                    'Australia/Eucla',
                    'Australia/Hobart',
                    'Australia/LHI',
                    'Australia/Lindeman',
                    'Australia/Lord_Howe',
                    'Australia/Melbourne',
                    'Australia/NSW',
                    'Australia/North',
                    'Australia/Perth',
                    'Australia/Queensland',
                    'Australia/South',
                    'Australia/Sydney',
                    'Australia/Tasmania',
                    'Australia/Victoria',
                    'Australia/West',
                    'Australia/Yancowinna',
                    'Brazil/Acre',
                    'Brazil/DeNoronha',
                    'Brazil/East',
                    'Brazil/West',
                    'CET',
                    'CST6CDT',
                    'Canada/Atlantic',
                    'Canada/Central',
                    'Canada/East-Saskatchewan',
                    'Canada/Eastern',
                    'Canada/Mountain',
                    'Canada/Newfoundland',
                    'Canada/Pacific',
                    'Canada/Saskatchewan',
                    'Canada/Yukon',
                    'Chile/Continental',
                    'Chile/EasterIsland',
                    'Cuba',
                    'EET',
                    'EST',
                    'EST5EDT',
                    'Egypt',
                    'Eire',
                    'Etc/GMT',
                    'Etc/GMT+0',
                    'Etc/GMT+1',
                    'Etc/GMT+10',
                    'Etc/GMT+11',
                    'Etc/GMT+12',
                    'Etc/GMT+2',
                    'Etc/GMT+3',
                    'Etc/GMT+4',
                    'Etc/GMT+5',
                    'Etc/GMT+6',
                    'Etc/GMT+7',
                    'Etc/GMT+8',
                    'Etc/GMT+9',
                    'Etc/GMT-0',
                    'Etc/GMT-1',
                    'Etc/GMT-10',
                    'Etc/GMT-11',
                    'Etc/GMT-12',
                    'Etc/GMT-13',
                    'Etc/GMT-14',
                    'Etc/GMT-2',
                    'Etc/GMT-3',
                    'Etc/GMT-4',
                    'Etc/GMT-5',
                    'Etc/GMT-6',
                    'Etc/GMT-7',
                    'Etc/GMT-8',
                    'Etc/GMT-9',
                    'Etc/GMT0',
                    'Etc/Greenwich',
                    'Etc/UCT',
                    'Etc/UTC',
                    'Etc/Universal',
                    'Etc/Zulu',
                    'Europe/Amsterdam',
                    'Europe/Andorra',
                    'Europe/Astrakhan',
                    'Europe/Athens',
                    'Europe/Belfast',
                    'Europe/Belgrade',
                    'Europe/Berlin',
                    'Europe/Bratislava',
                    'Europe/Brussels',
                    'Europe/Bucharest',
                    'Europe/Budapest',
                    'Europe/Busingen',
                    'Europe/Chisinau',
                    'Europe/Copenhagen',
                    'Europe/Dublin',
                    'Europe/Gibraltar',
                    'Europe/Guernsey',
                    'Europe/Helsinki',
                    'Europe/Isle_of_Man',
                    'Europe/Istanbul',
                    'Europe/Jersey',
                    'Europe/Kaliningrad',
                    'Europe/Kiev',
                    'Europe/Kirov',
                    'Europe/Lisbon',
                    'Europe/Ljubljana',
                    'Europe/London',
                    'Europe/Luxembourg',
                    'Europe/Madrid',
                    'Europe/Malta',
                    'Europe/Mariehamn',
                    'Europe/Minsk',
                    'Europe/Monaco',
                    'Europe/Moscow',
                    'Europe/Nicosia',
                    'Europe/Oslo',
                    'Europe/Paris',
                    'Europe/Podgorica',
                    'Europe/Prague',
                    'Europe/Riga',
                    'Europe/Rome',
                    'Europe/Samara',
                    'Europe/San_Marino',
                    'Europe/Sarajevo',
                    'Europe/Simferopol',
                    'Europe/Skopje',
                    'Europe/Sofia',
                    'Europe/Stockholm',
                    'Europe/Tallinn',
                    'Europe/Tirane',
                    'Europe/Tiraspol',
                    'Europe/Ulyanovsk',
                    'Europe/Uzhgorod',
                    'Europe/Vaduz',
                    'Europe/Vatican',
                    'Europe/Vienna',
                    'Europe/Vilnius',
                    'Europe/Volgograd',
                    'Europe/Warsaw',
                    'Europe/Zagreb',
                    'Europe/Zaporozhye',
                    'Europe/Zurich',
                    'GB',
                    'GB-Eire',
                    'GMT',
                    'GMT+0',
                    'GMT-0',
                    'GMT0',
                    'Greenwich',
                    'HST',
                    'Hongkong',
                    'Iceland',
                    'Indian/Antananarivo',
                    'Indian/Chagos',
                    'Indian/Christmas',
                    'Indian/Cocos',
                    'Indian/Comoro',
                    'Indian/Kerguelen',
                    'Indian/Mahe',
                    'Indian/Maldives',
                    'Indian/Mauritius',
                    'Indian/Mayotte',
                    'Indian/Reunion',
                    'Iran',
                    'Israel',
                    'Jamaica',
                    'Japan',
                    'Kwajalein',
                    'Libya',
                    'MET',
                    'MST',
                    'MST7MDT',
                    'Mexico/BajaNorte',
                    'Mexico/BajaSur',
                    'Mexico/General',
                    'NZ',
                    'NZ-CHAT',
                    'Navajo',
                    'PRC',
                    'PST8PDT',
                    'Pacific/Apia',
                    'Pacific/Auckland',
                    'Pacific/Bougainville',
                    'Pacific/Chatham',
                    'Pacific/Chuuk',
                    'Pacific/Easter',
                    'Pacific/Efate',
                    'Pacific/Enderbury',
                    'Pacific/Fakaofo',
                    'Pacific/Fiji',
                    'Pacific/Funafuti',
                    'Pacific/Galapagos',
                    'Pacific/Gambier',
                    'Pacific/Guadalcanal',
                    'Pacific/Guam',
                    'Pacific/Honolulu',
                    'Pacific/Johnston',
                    'Pacific/Kiritimati',
                    'Pacific/Kosrae',
                    'Pacific/Kwajalein',
                    'Pacific/Majuro',
                    'Pacific/Marquesas',
                    'Pacific/Midway',
                    'Pacific/Nauru',
                    'Pacific/Niue',
                    'Pacific/Norfolk',
                    'Pacific/Noumea',
                    'Pacific/Pago_Pago',
                    'Pacific/Palau',
                    'Pacific/Pitcairn',
                    'Pacific/Pohnpei',
                    'Pacific/Ponape',
                    'Pacific/Port_Moresby',
                    'Pacific/Rarotonga',
                    'Pacific/Saipan',
                    'Pacific/Samoa',
                    'Pacific/Tahiti',
                    'Pacific/Tarawa',
                    'Pacific/Tongatapu',
                    'Pacific/Truk',
                    'Pacific/Wake',
                    'Pacific/Wallis',
                    'Pacific/Yap',
                    'Poland',
                    'Portugal',
                    'ROC',
                    'ROK',
                    'Singapore',
                    'Turkey',
                    'UCT',
                    'US/Alaska',
                    'US/Aleutian',
                    'US/Arizona',
                    'US/Central',
                    'US/East-Indiana',
                    'US/Eastern',
                    'US/Hawaii',
                    'US/Indiana-Starke',
                    'US/Michigan',
                    'US/Mountain',
                    'US/Pacific',
                    'US/Pacific-New',
                    'US/Samoa',
                    'UTC',
                    'Universal',
                    'W-SU',
                    'WET',
                    'Zulu'
                ]
            };
            return timeZonejson;
        };
        SingleToolConfigService.$inject = ['$q', '$resource', '$cookies', 'restEndpointService'];
        return SingleToolConfigService;
    }());
    ISightApp.SingleToolConfigService = SingleToolConfigService;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=singleToolConfigurationService.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var ToolsConfigurationController = /** @class */ (function () {
        function ToolsConfigurationController($location, $window, toolConfigService) {
            this.$location = $location;
            this.$window = $window;
            this.toolConfigService = toolConfigService;
            /*start for common code */
            this.isTabSeleted = false;
            this.imageurl1 = "dist/icons/svg/landingPage/Admin_icon_selected.svg";
            this.imageurl2 = "dist/icons/svg/landingPage/Dashboard_icon_normal.svg";
            this.imageurl3 = "dist/icons/svg/landingPage/Healthcheck_icon_normal.svg";
            this.showTemplateAfterLoad = false;
            /*end for common code */
            /* code for tools configuration landing page*/
            this.configuredToolsList = [];
            this.toolsData = [];
            var self = this;
            self.toolsData = self.toolConfigService.readToolsDataList();
            self.toolConfigService
                .readToolsConfigurationGlobal().then(function (data) {
                var dataArray = data.data;
                if (dataArray !== undefined) {
                    for (var i = 0; i < dataArray.length; i++) {
                        self.configuredToolsList.push(dataArray[i].toolName);
                    }
                }
                self.showTemplateAfterLoad = true;
            });
            var elem = document.querySelector('#homePageTemplateContainer');
            var homePageControllerScope = angular.element(elem).scope();
            var homePageController = homePageControllerScope['homePageController'];
            this.homeController = homePageController;
        }
        ToolsConfigurationController.prototype.redirect = function (iconId) {
            if (iconId == 'dashboard') {
                this.$location.path('/InSights/dashboard');
            }
            else if (iconId == 'settings') {
                this.$location.path('/InSights/toolsConfig');
            }
            else if (iconId == 'graphview') {
                this.$location.path('/InSights/explore');
            }
            else if (iconId == 'userview') {
                this.$location.path('/InSights/roles');
            }
            else if (iconId == 'prjtmapping') {
                this.$location.path('/InSights/onboardProject');
            }
            else if (iconId == 'healthcheck') {
                this.$location.path('/InSights/agent');
            }
        };
        ToolsConfigurationController.prototype.selectAct = function (selVal) {
            this.isTabSeleted = false;
            this.isTabSeleted = selVal;
        };
        ToolsConfigurationController.prototype.addSelectedImage = function (selectedTab) {
            var self = this;
            if (selectedTab == 'Admin') {
                self.imageurl1 = "dist/icons/svg/landingPage/Admin_icon_selected.svg";
            }
            else if (selectedTab == 'Dashboards') {
                self.imageurl2 = "dist/icons/svg/landingPage/Dashboard_icon_selected.svg";
            }
            else if (selectedTab == 'HealthCheck') {
                self.imageurl3 = "dist/icons/svg/landingPage/Healthcheck_icon_selected.svg";
            }
        };
        ToolsConfigurationController.prototype.removeSelectedImage = function (selectedTab) {
            var self = this;
            if (selectedTab == 'Admin') {
                self.imageurl1 = "dist/icons/svg/landingPage/Admin_icon_normal.svg";
            }
            else if (selectedTab == 'Dashboards') {
                self.imageurl2 = "dist/icons/svg/landingPage/Dashboard_icon_normal.svg";
            }
            else if (selectedTab == 'HealthCheck') {
                self.imageurl3 = "dist/icons/svg/landingPage/Healthcheck_icon_normal.svg";
            }
        };
        ToolsConfigurationController.prototype.openToolUrl = function (toolCategory, toolName) {
            this.homeController.selectedToolName = toolName;
            this.homeController.selectedToolCategory = toolCategory;
            this.homeController.templateName = 'oneToolConfigured';
        };
        ToolsConfigurationController.prototype.toToolsConfiguredpage = function () {
            this.homeController.templateName = 'configuredTools';
        };
        ToolsConfigurationController.$inject = ['$location', '$window', 'toolConfigService'];
        return ToolsConfigurationController;
    }());
    ISightApp.ToolsConfigurationController = ToolsConfigurationController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=toolsConfigLandingController.js.map
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
//// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var ToolsConfigurationService = /** @class */ (function () {
        function ToolsConfigurationService($q, $resource, $cookies, restCallHandlerService) {
            this.$q = $q;
            this.$resource = $resource;
            this.$cookies = $cookies;
            this.restCallHandlerService = restCallHandlerService;
        }
        ToolsConfigurationService.prototype.readToolsConfigurationGlobal = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("TOOL_DATA_READ");
        };
        ToolsConfigurationService.$inject = ['$q', '$resource', '$cookies', 'restCallHandlerService'];
        return ToolsConfigurationService;
    }());
    ISightApp.ToolsConfigurationService = ToolsConfigurationService;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=toolsConfigurationService.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var UserOnboardingController = /** @class */ (function () {
        function UserOnboardingController($route, $location, $window, $mdDialog, userOnboardingService, roleService, restEndpointService, $sce, $timeout, $rootScope, authenticationService, $cookies) {
            this.$route = $route;
            this.$location = $location;
            this.$window = $window;
            this.$mdDialog = $mdDialog;
            this.userOnboardingService = userOnboardingService;
            this.roleService = roleService;
            this.restEndpointService = restEndpointService;
            this.$sce = $sce;
            this.$timeout = $timeout;
            this.$rootScope = $rootScope;
            this.authenticationService = authenticationService;
            this.$cookies = $cookies;
            this.userListUrl = '';
            this.iframeWidth = window.innerWidth;
            this.iframeHeight = window.innerHeight;
            this.iframeStyle = '';
            this.allOrgDataArray = [];
            this.adminOrgDataArray = [];
            this.userCurrentOrgName = '';
            this.showSwitchOptions = false;
            this.showAddApplication = false;
            this.addNewApplicationName = "";
            this.showAccessGroupAddedMessage = false;
            this.accessGroupMessageStatus = "";
            var elem = document.querySelector('#homePageTemplateContainer');
            var homePageControllerScope = angular.element(elem).scope();
            var homePageController = homePageControllerScope['homePageController'];
            this.homeController = homePageController;
            var self = this;
            self.getHost();
            self.getApplicationDetail();
            self.userIframeStyle = 'width:100%; height:1600px;';
            var receiveMessage = function (evt) {
                var height = parseInt(evt.data);
                if (!isNaN(height)) {
                    self.userIframeStyle = 'width:100%; height:' + (evt.data + 20) + 'px !important';
                    $timeout(0);
                }
            };
            window.addEventListener('message', receiveMessage, false);
        }
        UserOnboardingController.prototype.getApplicationDetail = function () {
            var self = this;
            self.adminOrgDataArray = [];
            self.userOnboardingService.getCurrentUserOrgs().
                then(function (orgData) {
                var orgDataArray = orgData.data;
                self.getUserAdminOrgs(orgDataArray);
                self.authenticationService.getGrafanaCurrentOrgAndRole()
                    .then(function (data) {
                    self.getCurrentOrgName(data, orgDataArray);
                });
            });
        };
        UserOnboardingController.prototype.getUserAdminOrgs = function (orgDataArray) {
            var self = this;
            self.allOrgDataArray = orgDataArray;
            //console.log(self.allOrgDataArray);
            for (var org in self.allOrgDataArray) {
                if ((self.allOrgDataArray[org].role) === 'Admin') {
                    self.adminOrgDataArray.push(self.allOrgDataArray[org]);
                }
                //console.log(self.adminOrgDataArray);
            }
        };
        UserOnboardingController.prototype.getCurrentOrgName = function (currentOrgData, orgDataArray) {
            var self = this;
            var userCurrentOrgData = currentOrgData;
            var allOrgData = orgDataArray;
            var currentOrgId = currentOrgData.grafanaCurrentOrg;
            for (var i in allOrgData) {
                if (allOrgData[i].orgId == currentOrgId) {
                    self.userCurrentOrgName = allOrgData[i].name;
                }
            }
            //console.log(self.userCurrentOrgName);
        };
        UserOnboardingController.prototype.switchAccessGroup = function (orgId) {
            var self = this;
            self.userOnboardingService.switchUserOrg(orgId)
                .then(function (selOrgStatus) {
            });
            self.authenticationService.getGrafanaCurrentOrgAndRole()
                .then(function (data) {
                self.$cookies.put('grafanaRole', data.grafanaCurrentOrgRole);
                self.$cookies.put('grafanaOrg', data.grafanaCurrentOrg);
            });
            self.refreshIframe();
        };
        UserOnboardingController.prototype.refreshIframe = function () {
            var myIframe = document.getElementById('iSightIframe');
            setTimeout(function () {
                myIframe.src = myIframe.src;
            }, 500);
        };
        /*showAccessGroupOptions() {
            var self = this;
            self.showSwitchOptions = true;
        }*/
        UserOnboardingController.prototype.getHost = function () {
            var self = this;
            /*self.userListUrl = self.$sce.trustAsResourceUrl('http://localhost:3000/dashboard/script/CustomiSight.js?url=http://localhost:3000/org/users');*/
            self.restEndpointService.getGrafanaHost1().then(function (response) {
                var grafanaEndPoint = response.grafanaEndPoint;
                //console.log(grafanaEndPoint);
                self.userListUrl = self.$sce.trustAsResourceUrl(grafanaEndPoint + '/dashboard/script/CustomiSight.js?url=' + grafanaEndPoint + '/org/users');
            });
            //console.log(this.userListUrl);
        };
        UserOnboardingController.prototype.showAddApplicationBox = function () {
            //this.showAccessGroupAddedMessage = false;
            if (this.showAddApplication === false) {
                this.showAddApplication = true;
            }
            else {
                this.showAddApplication = false;
            }
        };
        UserOnboardingController.prototype.addApplication = function (params, addedApplicationName) {
            var self = this;
            var statusObject = {
                'status': false
            };
            if (addedApplicationName !== "") {
                self.$mdDialog.show({
                    controller: ISightApp.ShowTemplateApplicationAddConformDialogController,
                    controllerAs: 'showTemplateApplicationAddConformDialogController',
                    templateUrl: './dist/modules/applicationManagement/view/conformApplicationAddDialogViewTemplate.tmp.html',
                    parent: angular.element(document.body),
                    targetEvent: params,
                    preserveScope: true,
                    clickOutsideToClose: true,
                    locals: {
                        statusObject: statusObject,
                        addedApplicationName: addedApplicationName,
                    },
                    bindToController: true,
                    onRemoving: function () { self.addApplicationConfirmation(statusObject.status); }
                });
            }
            else if (addedApplicationName === "") {
                self.accessGroupMessageStatus = "Error in adding access group";
                self.showAccessGroupAddedMessage = true;
                setTimeout(function () {
                    self.showAccessGroupAddedMessage = false;
                    self.accessGroupMessageStatus = "";
                }, 1000);
            }
        };
        UserOnboardingController.prototype.addApplicationConfirmation = function (status) {
            var self = this;
            if (status === true) {
                this.roleService
                    .createOrg(self.addNewApplicationName)
                    .then(function (data) {
                    self.showAddApplication = false;
                    self.getApplicationDetail();
                    self.accessGroupMessageStatus = "New access group added successfully";
                    self.showAccessGroupAddedMessage = true;
                    self.addNewApplicationName = "";
                    setTimeout(function () {
                        self.showAccessGroupAddedMessage = false;
                        self.accessGroupMessageStatus = "";
                    }, 1000);
                });
            }
        };
        UserOnboardingController.$inject = ['$route', '$location', '$window', '$mdDialog', 'userOnboardingService', 'roleService',
            'restEndpointService', '$sce', '$timeout', '$rootScope', 'authenticationService', '$cookies'];
        return UserOnboardingController;
    }());
    ISightApp.UserOnboardingController = UserOnboardingController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=userOnboardingController.js.map
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
//// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var UserOnboardingModel = /** @class */ (function () {
        function UserOnboardingModel() {
            this.editRole = false;
        }
        return UserOnboardingModel;
    }());
    ISightApp.UserOnboardingModel = UserOnboardingModel;
    var SelectedUserRowsModel = /** @class */ (function () {
        function SelectedUserRowsModel() {
            this.selectedUserRow = [];
        }
        return SelectedUserRowsModel;
    }());
    ISightApp.SelectedUserRowsModel = SelectedUserRowsModel;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=userOnboardingModel.js.map
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
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var UserOnboardingService = /** @class */ (function () {
        function UserOnboardingService($q, $resource, $cookies, restCallHandlerService) {
            this.$q = $q;
            this.$resource = $resource;
            this.$cookies = $cookies;
            this.restCallHandlerService = restCallHandlerService;
        }
        UserOnboardingService.prototype.getCurrentUserOrgs = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("ACCESS_GROUP_MANAGEMENT_GET_CURRENT_USER_ORGS");
        };
        UserOnboardingService.prototype.switchUserOrg = function (orgId) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("ACCESS_GROUP_MANAGEMENT_SWITCH_ORGS", { "orgId": orgId }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        UserOnboardingService.prototype.getGrafanaCurrentOrgAndRole = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("GRAPANA_CURRENT_ROLE_ORG");
        };
        UserOnboardingService.$inject = ['$q', '$resource', '$cookies', 'restCallHandlerService'];
        return UserOnboardingService;
    }());
    ISightApp.UserOnboardingService = UserOnboardingService;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=userOnboardingService.js.map