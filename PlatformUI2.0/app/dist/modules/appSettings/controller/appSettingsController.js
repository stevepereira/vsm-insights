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