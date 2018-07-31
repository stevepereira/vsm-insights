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