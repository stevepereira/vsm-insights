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
    var DataTaggingService = /** @class */ (function () {
        function DataTaggingService($q, $resource, $cookies, restCallHandlerService) {
            this.$q = $q;
            this.$resource = $resource;
            this.$cookies = $cookies;
            this.restCallHandlerService = restCallHandlerService;
        }
        DataTaggingService.prototype.addEntityDefination = function (rowId, levelName, entityName) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("ENTITY_DEFINITION_ADD", { "rowId": rowId, "levelName": levelName, "entityName": entityName }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        DataTaggingService.prototype.deleteEntityDefination = function (levelName, entityName) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("ENTITY_DEFINITION_REMOVE", { "levelName": levelName, "entityName": entityName }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        DataTaggingService.prototype.getAllEntityDefination = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("ENTITY_DEFINITION_ALL");
        };
        DataTaggingService.prototype.getEntityDataByLevelName = function (levelName) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("ENTITY_BY_LEVEL", { "levelName": levelName }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        DataTaggingService.prototype.addEntityData = function (rowId, level1, level2, level3, level4, level5, level6, hierarchyName) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("HIERARCHY_DETAILS_ADD", {
                "rowId": rowId, "level1": level1, "level2": level2, "level3": level3, "level4": level4, "level5": level5,
                "level6": level6, "hierarchyName": hierarchyName
            }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        DataTaggingService.prototype.getAllEntityData = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("ENTITY_DATA_ALL");
        };
        DataTaggingService.prototype.deleteEntityDataByHierarchy = function (hierarchyName) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("HIERARCHY_DETAILS_REMOVE", { "hierarchyName": hierarchyName }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        DataTaggingService.prototype.getHierarchyDetails = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("HIERARCHY_DETAILS_GET");
        };
        DataTaggingService.prototype.addHierarchyMapping = function (rowId, hierarchyName, orgName, orgId) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("HIERARCHY_MAPPING_ADD", { "rowId": rowId, "hierarchyName": hierarchyName, "orgName": orgName, "orgId": orgId }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        DataTaggingService.prototype.getAllHierarchyMapping = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("HIERARCHY_DATA_ALL");
        };
        DataTaggingService.prototype.deleteHierarchyMap = function (hierarchyName, orgName) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("HIERARCHY_MAPPING_REMOVE", { "hierarchyName": hierarchyName, "orgName": orgName }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        DataTaggingService.prototype.getHierarchyMappingByName = function (hierarchyName) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("HIERARCHY_MAPPING", { "hierarchyName": hierarchyName }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        DataTaggingService.$inject = ['$q', '$resource', '$cookies', 'restCallHandlerService'];
        return DataTaggingService;
    }());
    ISightApp.DataTaggingService = DataTaggingService;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=dataTaggingService.js.map