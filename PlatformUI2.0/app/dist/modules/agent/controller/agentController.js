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