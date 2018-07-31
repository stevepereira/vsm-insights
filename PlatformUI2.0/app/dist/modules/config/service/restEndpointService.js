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
    var RestEndpointService = /** @class */ (function () {
        function RestEndpointService($location, $http, $cookies, $resource) {
            this.$location = $location;
            this.$http = $http;
            this.$cookies = $cookies;
            this.$resource = $resource;
            this.configDesc = {};
            this.loadUiServiceLocation();
            this.loadAgentConfigDesc();
        }
        RestEndpointService.prototype.loadUiServiceLocation = function () {
            var self = this;
            if (this.serviceHost) {
                this.serviceHost;
            }
            else {
                var self_1 = this;
                var location_1 = this.$location;
                var uiConfigJsonUrl = location_1.absUrl().replace(location_1.path(), "");
                if (uiConfigJsonUrl.length > uiConfigJsonUrl.lastIndexOf('/')) {
                    uiConfigJsonUrl = uiConfigJsonUrl.substr(0, uiConfigJsonUrl.lastIndexOf('/'));
                }
                uiConfigJsonUrl += "/uiConfig.json";
                var configResource = this.$resource(uiConfigJsonUrl);
                var data = configResource.get().$promise.then(function (data) {
                    self_1.serviceHost = data.serviceHost;
                    self_1.elasticSearchServiceHost = data.elasticSearchServiceHost;
                    self_1.neo4jServiceHost = data.neo4jServiceHost;
                    self_1.grafanaHost = data.grafanaHost;
                });
                //self.grafanaHost = self.getGrafanaHost();
            }
        };
        RestEndpointService.prototype.loadAgentConfigDesc = function () {
            var self = this;
            var location = this.$location;
            var agentConfigJsonUrl = location.absUrl().replace(location.path(), "");
            if (agentConfigJsonUrl.length > agentConfigJsonUrl.lastIndexOf('/')) {
                agentConfigJsonUrl = agentConfigJsonUrl.substr(0, agentConfigJsonUrl.lastIndexOf('/'));
            }
            agentConfigJsonUrl += "/configDesc.json";
            var configResource = this.$resource(agentConfigJsonUrl);
            var data = configResource.get().$promise.then(function (data) {
                self.configDesc = data.desriptions;
            });
        };
        RestEndpointService.prototype.getServiceHost = function () {
            if (!this.serviceHost) {
                this.serviceHost = this.$location.protocol() + "://" + this.$location.host() + ":" + this.$location.port();
            }
            return this.serviceHost;
        };
        RestEndpointService.prototype.getConfigDesc = function () {
            return this.configDesc;
        };
        RestEndpointService.prototype.getelasticSearchServiceHost = function () {
            if (!this.elasticSearchServiceHost) {
                this.elasticSearchServiceHost = this.$location.protocol() + "://" + this.$location.host() + ":9200";
            }
            return this.elasticSearchServiceHost;
        };
        RestEndpointService.prototype.getNeo4jServiceHost = function () {
            if (!this.neo4jServiceHost) {
                this.neo4jServiceHost = this.$location.protocol() + "://" + this.$location.host() + ":7474";
            }
            return this.neo4jServiceHost;
        };
        RestEndpointService.prototype.getGrafanaHost = function () {
            if (!this.grafanaHost) {
                this.grafanaHost = this.$location.protocol() + "://" + this.$location.host() + ":3000";
            }
            return this.grafanaHost;
        };
        ;
        RestEndpointService.prototype.getGrafanaHost1 = function () {
            var self = this;
            var authToken = this.$cookies.get('Authorization');
            var defaultHeader = {
                'Authorization': authToken
            };
            var restcallUrl = this.$location.protocol() + "://" + this.$location.host() + ":" + this.$location.port() + "/PlatformService/configure/grafanaEndPoint";
            var resource = self.$resource(restcallUrl, {}, {
                allData: {
                    method: 'GET',
                    headers: defaultHeader
                }
            });
            return resource.allData().$promise;
        };
        RestEndpointService.$inject = ['$location', '$http', '$cookies', '$resource'];
        return RestEndpointService;
    }());
    ISightApp.RestEndpointService = RestEndpointService;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=restEndpointService.js.map