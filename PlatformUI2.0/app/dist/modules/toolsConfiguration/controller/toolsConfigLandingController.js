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