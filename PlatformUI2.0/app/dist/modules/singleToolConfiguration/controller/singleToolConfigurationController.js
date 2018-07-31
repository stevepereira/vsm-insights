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