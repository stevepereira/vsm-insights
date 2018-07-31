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