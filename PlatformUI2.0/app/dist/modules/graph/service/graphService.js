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
    var GraphService = /** @class */ (function () {
        function GraphService($resource, $cookies, restEndpointService, restCallHandlerService) {
            this.$resource = $resource;
            this.$cookies = $cookies;
            this.restEndpointService = restEndpointService;
            this.restCallHandlerService = restCallHandlerService;
            this.graphQueryExecutor = this.createQueryExecutor();
        }
        GraphService.prototype.createQueryExecutor = function () {
            var authToken = this.$cookies.get('Authorization');
            //$resource(url, [paramDefaults], [actions], options);
            //Refer to https://github.com/angular/angular.js/issues/3852
            return this.$resource(this.restEndpointService.getServiceHost() + '/PlatformService/db/data', {}, {
                executeCypher: {
                    method: 'POST',
                    headers: {
                        'Authorization': authToken,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    transformRequest: function (data) {
                        if (data && data.cypher) {
                            return 'cypher=' + encodeURIComponent(JSON.stringify(data.cypher));
                        }
                        return;
                    }
                }
            });
        };
        GraphService.prototype.executeQuery = function (query) {
            var restHandler = this.restCallHandlerService;
            var encodedCypher = encodeURIComponent(JSON.stringify(query));
            return restHandler.post("DB_DATA", { "cypher": encodedCypher }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        GraphService.$inject = ['$resource', '$cookies', 'restEndpointService', 'restCallHandlerService'];
        return GraphService;
    }());
    ISightApp.GraphService = GraphService;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=graphService.js.map