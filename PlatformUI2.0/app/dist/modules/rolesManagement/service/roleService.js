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