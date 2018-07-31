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