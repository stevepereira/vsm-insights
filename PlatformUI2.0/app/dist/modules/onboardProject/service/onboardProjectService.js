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
    var OnboardProjectService = /** @class */ (function () {
        function OnboardProjectService($q, $resource, $cookies, restEndpointService, restCallHandlerService) {
            this.$q = $q;
            this.$resource = $resource;
            this.$cookies = $cookies;
            this.restEndpointService = restEndpointService;
            this.restCallHandlerService = restCallHandlerService;
        }
        OnboardProjectService.prototype.getAllOrg = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("ORGS_GET");
        };
        OnboardProjectService.prototype.addProjectMapping = function (orgId, rowId, category, toolName, fieldName, fieldValue, projectName, projectId, businessUnit, hierarchyName) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("PROJECT_MAPPING_ADD", { "orgId": orgId, "rowId": rowId, "category": category, "toolName": toolName, "fieldName": fieldName, "fieldValue": fieldValue, "projectName": projectName, "projectId": projectId, "businessUnit": businessUnit, "hierarchyName": hierarchyName
            }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        OnboardProjectService.prototype.removeProjectMapping = function (orgId) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("PROJECT_MAPPING_REMOVE", { "orgId": orgId }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        OnboardProjectService.prototype.fetchProjectMappingByHierarchyName = function (hierarchyName) {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("PROJECT_MAPPING_BY_HIERARCHY", { 'hierarchyName': hierarchyName });
        };
        OnboardProjectService.prototype.fetchProjectMappingByOrgId = function (orgId) {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("PROJECT_MAPPING_BY_ORGID", { 'orgId': orgId });
        };
        OnboardProjectService.prototype.deleteToolMapping = function (orgId, category, toolName, toolId) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("TOOL_MAPPING_DELETE", { "orgId": orgId, "category": category, "toolName": toolName, "rowId": toolId }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        OnboardProjectService.prototype.getToolName = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("TOOL_NAME_GET");
        };
        OnboardProjectService.prototype.getPrjtMappingFields = function (toolName) {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("MAPPING_DATA", { 'toolName': toolName });
        };
        OnboardProjectService.prototype.getPrjtMappingFieldVal = function (toolName, fieldName) {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("MAPPING_FIELD_VAL", { 'toolName': toolName, 'fieldName': fieldName });
        };
        OnboardProjectService.prototype.getToolcat = function (toolName) {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("TOOL_CATEGORY", { 'toolName': toolName });
        };
        OnboardProjectService.prototype.fetchAllProjectMapping = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("PROJECT_MAPPING");
        };
        OnboardProjectService.prototype.getAllHierarchyName = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("DISTINCT_HIERARCHY");
        };
        OnboardProjectService.$inject = ['$q', '$resource', '$cookies', 'restEndpointService', 'restCallHandlerService'];
        return OnboardProjectService;
    }());
    ISightApp.OnboardProjectService = OnboardProjectService;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=onboardProjectService.js.map