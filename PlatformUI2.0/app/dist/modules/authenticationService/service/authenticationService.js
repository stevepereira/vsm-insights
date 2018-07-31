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