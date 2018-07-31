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
/// <reference path="_all.ts" />
var ISightApp;
(function (ISightApp) {
    angular.module('iSightApp', ['ngMaterial', 'ngRoute', 'ngResource', 'ngMessages', 'ngCookies', 'ngAnimate', 'ui.bootstrap', 'googlechart', 'ngTable'])
        .service('pipelineService', ISightApp.PipelineService)
        .service('graphService', ISightApp.GraphService)
        .service('elasticSearchService', ISightApp.ElasticSearchService)
        .service('loginService', ISightApp.LoginService)
        .service('roleService', ISightApp.RoleService)
        .service('agentService', ISightApp.AgentService)
        .service('iconService', ISightApp.IconService)
        .service('restEndpointService', ISightApp.RestEndpointService)
        .service('authenticationService', ISightApp.AuthenticationService)
        .service('toolConfigService', ISightApp.ToolConfigService)
        .service('onboardProjectService', ISightApp.OnboardProjectService)
        .service('dashboardService', ISightApp.DashboardService)
        .service('userOnboardingService', ISightApp.UserOnboardingService)
        .service('aboutService', ISightApp.AboutService)
        .service('restAPIUrlService', ISightApp.RestAPIUrlService)
        .service('restCallHandlerService', ISightApp.RestCallHandlerService)
        .service('dataTaggingService', ISightApp.DataTaggingService)
        .service('dataOnBoardingService', ISightApp.DataOnBoardingService)
        .service('dataTaggingDetailsService', ISightApp.DataTaggingDetailsService)
        .service('singleToolConfigService', ISightApp.SingleToolConfigService)
        .service('insightsService', ISightApp.InsightsService)
        .service('platformServiceStatusService', ISightApp.PlatformServiceStatusService)
        .service('appSettingsService', ISightApp.AppSettingsService)
        .controller('pipelineController', ISightApp.PipelineController)
        .controller('homePageController', ISightApp.HomePageController)
        .controller('toolsConfigurationController', ISightApp.ToolsConfigurationController)
        .controller('configuredToolsController', ISightApp.ConfiguredToolsController)
        .controller('dashboardController', ISightApp.DashboardController)
        .controller('applicationManagementController', ISightApp.ApplicationManagementController)
        .controller('userOnboardingController', ISightApp.UserOnboardingController)
        .controller('dataOnBoardingController', ISightApp.DataOnBoardingController)
        .controller('oneToolConfigurationController', ISightApp.OneToolConfigurationController)
        .controller('agentController', ISightApp.AgentController)
        .controller('agentManagementController', ISightApp.AgentManagementController)
        .controller('agentListController', ISightApp.AgentListController)
        .controller('singleToolConfigurationController', ISightApp.SingleToolConfigurationController)
        .controller('dataTaggingController', ISightApp.DataTaggingController)
        .controller('dataTaggingDetailsController', ISightApp.DataTaggingDetailsController)
        .controller('FileUploadController', ISightApp.FileUploadController)
        .controller('appSettingsController', ISightApp.AppSettingsController)
        .controller('insightsController', ISightApp.InsightsController)
        .controller('dataPurgingController', ISightApp.DataPurgingController)
        .controller('uninstallAgentDialogController', ISightApp.UninstallAgentDialogController)
        .component('footer', {
        templateUrl: './dist/components/footer/view/footerView.html',
        controller: ISightApp.FooterController,
        bindings: {}
    })
        .component('header', {
        templateUrl: './dist/components/header/view/headerView.html',
        controller: ISightApp.HeaderController,
        bindings: {
            title: '@',
            nav: '@'
        }
    })
        .component('throbber', {
        templateUrl: "./dist/components/throbber/view/throbberView.html",
        controller: ISightApp.ThrobberController,
        bindings: {}
    })
        .directive('includeReplace', function () {
        return {
            require: 'ngInclude',
            restrict: 'A',
            link: function (scope, tElem, tAttrs) {
                tElem.replaceWith(tElem.children());
            }
        };
    })
        .directive('row', function () {
        return {
            restrict: 'EA',
            scope: { children: "=", myVar: '=', clickHandler: "&", 'test': '=test', 'count': '=count' },
            controller: ISightApp.RecursiveLiController,
            templateUrl: './dist/modules/dataTaggingDetails/view/test.html'
        };
    })
        .directive('demoFileModel', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.demoFileModel), modelSetter = model.assign; //define a setter for demoFileModel
                var maxSize = 1000000;
                scope.showUploadBtn = false;
                element.bind('change', function () {
                    scope.maxSizeErr = false;
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                    var fileSize = element[0].files[0].size;
                    if (fileSize > maxSize) {
                        scope.maxSizeErr = true;
                        scope.imageSrc = "#";
                        scope.showUploadBtn = false;
                    }
                    else {
                        scope.showUploadBtn = true;
                        scope.file = element[0].files[0];
                        scope.getFile();
                    }
                    scope.$apply();
                });
            }
        };
    })
        .config(['$routeProvider', '$compileProvider',
        function ($routeProvider, $compileProvider) {
            $routeProvider.
                when('/InSights/pipeline', {
                templateUrl: './dist/modules/pipeline/view/pipelineView.html',
                controller: ISightApp.PipelineController,
                controllerAs: 'pipelineController'
            }).
                when('/InSights/kibana', {
                templateUrl: './dist/modules/kibana/view/kibanaView.html',
                controller: ISightApp.KibanaDashboardController,
                controllerAs: 'kibanaController'
            }).
                when('/InSights/login', {
                templateUrl: './dist/modules/login/view/loginView.html',
                controller: ISightApp.LoginController,
                controllerAs: 'loginController'
            }).
                when('/InSights/home', {
                templateUrl: './dist/modules/homepage/view/homePageView.html',
                controller: ISightApp.HomePageController,
                controllerAs: 'homePageController'
            }).
                when('/InSights/dashboard/', {
                templateUrl: './dist/modules/dashboards/view/dashboardView.html',
                controller: ISightApp.DashboardController,
                controllerAs: 'dashboardController'
            }).
                when('/InSights/agent', {
                templateUrl: './dist/modules/agent/view/agentView.html',
                controller: ISightApp.AgentController,
                controllerAs: 'agentController'
            }).
                when('/InSights/onboarding', {
                templateUrl: './dist/modules/userOnboarding/view/userOnboardingView.html',
                controller: ISightApp.UserOnboardingController,
                controllerAs: 'userOnboardingController'
            }).
                when('/InSights/home/toolsConfig', {
                templateUrl: './dist/modules/toolsConfiguration/view/toolsConfigurationView.html',
                controller: ISightApp.ToolsConfigurationController,
                controllerAs: 'toolsConfigurationController'
            }).
                when('/InSights/oneTool/:toolCategory/:toolName', {
                templateUrl: './dist/modules/oneToolConfig/view/oneToolConfigurationView.html',
                controller: ISightApp.OneToolConfigurationController,
                controllerAs: 'oneToolConfigurationController'
            }).
                when('/InSights/configuredTools', {
                templateUrl: './dist/modules/configuredTools/view/configuredToolsView.html',
                controller: ISightApp.ConfiguredToolsController,
                controllerAs: 'configuredToolsController'
            }).
                when('/InSights/applicationManagement', {
                templateUrl: './dist/modules/applicationManagement/view/applicationManagementView.html',
                controller: ISightApp.ApplicationManagementController,
                controllerAs: 'applicationManagementController'
            }).
                when('/InSights/userOnboarding', {
                templateUrl: './dist/modules/userOnboarding/view/userOnboardingView.html',
                controller: ISightApp.UserOnboardingController,
                controllerAs: 'userOnboardingController'
            }).
                when('/InSights/dataOnBoarding', {
                templateUrl: './dist/modules/dataOnBoarding/view/dataOnBoardingView.html',
                controller: ISightApp.DataOnBoardingController,
                controllerAs: 'dataOnBoardingController'
            }).
                when('/InSights/dataTagging', {
                templateUrl: './dist/modules/dataTagging/view/dataTaggingView.html',
                controller: ISightApp.DataTaggingController,
                controllerAs: 'dataTaggingController'
            }).
                when('/InSights/insights', {
                templateUrl: './dist/modules/insights/view/insightsView.html',
                controller: ISightApp.InsightsController,
                controllerAs: 'insightsController'
            }).
                when('/InSights/agentManagement', {
                templateUrl: './dist/modules/agent/view/agentManagementView.html',
                controller: ISightApp.AgentManagementController,
                controllerAs: 'agentManagementController'
            }).
                when('/InSights/agentList', {
                templateUrl: './dist/modules/agent/view/agentListView.html',
                controller: ISightApp.AgentListController,
                controllerAs: 'agentListController'
            }).
                otherwise({
                redirectTo: '/InSights/login'
            });
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):|data:image\//);
        }]).run(function (restEndpointService, authenticationService, $cookies) {
        restEndpointService.getServiceHost();
        /*angular.element(document).ready(function() {
            var authToken = $cookies.get('Authorization');
            var msg = '';
            authenticationService.getAuthentication(authToken,msg);


        });*/
    });
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=boot.js.map