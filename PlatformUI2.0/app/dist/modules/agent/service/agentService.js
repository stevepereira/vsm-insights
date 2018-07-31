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
    var AgentService = /** @class */ (function () {
        function AgentService($resource, $q, $cookies, restEndpointService, restCallHandlerService) {
            this.$resource = $resource;
            this.$q = $q;
            this.$cookies = $cookies;
            this.restEndpointService = restEndpointService;
            this.restCallHandlerService = restCallHandlerService;
        }
        AgentService.prototype.loadGlobalHealthConfigurations = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("HEALTH_GLOBAL");
        };
        AgentService.prototype.loadHealthConfigurations = function (toolName, toolCategory) {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("HEALTH_TOOL", { 'tool': toolName, 'category': toolCategory });
        };
        AgentService.prototype.loadServerHealthConfiguration = function (ServerName) {
            var restHandler = this.restCallHandlerService;
            return restHandler.get(ServerName);
        };
        AgentService.prototype.getDocRootAgentVersionTools = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("DOCROOT_AGENT_VERSION_TOOLS");
        };
        AgentService.prototype.getDocrootAgentConfig = function (Version, toolName) {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("DOCROOT_AGENT_TOOL_CONFIG_DETAILS", { 'version': Version, 'tool': toolName });
        };
        AgentService.prototype.getDbAgentConfig = function (agentId) {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("DB_AGENT_CONFIG_DETAILS", { 'agentId': agentId });
        };
        AgentService.prototype.loadAgentServices = function (ServerName) {
            var restHandler = this.restCallHandlerService;
            return restHandler.get(ServerName);
        };
        AgentService.prototype.registerAgent = function (toolName, toolVersion, osName, configData, trackingDetails) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("AGENT_REGISTER", { 'toolName': toolName, 'agentVersion': toolVersion, 'osversion': osName, 'configDetails': configData, 'trackingDetails': trackingDetails }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        AgentService.prototype.updateAgent = function (agentId, configData, toolName, toolVersion, osName) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("AGENT_UPDATE", { 'agentId': agentId, 'configJson': configData, 'toolName': toolName, 'agentVersion': toolVersion, 'osversion': osName }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        AgentService.prototype.agentStartStop = function (agentId, actionType) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("AGENT_START_STOP", { 'agentId': agentId, 'action': actionType }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        AgentService.prototype.agentUninstall = function (agentId, toolName, osversion) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("AGENT_UNINSTALL", { 'agentId': agentId, 'toolName': toolName, 'osversion': osversion }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        AgentService.$inject = ['$resource', '$q', '$cookies', 'restEndpointService', 'restCallHandlerService'];
        return AgentService;
    }());
    ISightApp.AgentService = AgentService;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=agentService.js.map