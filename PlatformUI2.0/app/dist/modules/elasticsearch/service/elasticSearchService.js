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
    var ElasticSearchService = /** @class */ (function () {
        function ElasticSearchService($resource, $q, $cookies, restCallHandlerService, restEndpointService) {
            this.$resource = $resource;
            this.$q = $q;
            this.$cookies = $cookies;
            this.restCallHandlerService = restCallHandlerService;
            this.restEndpointService = restEndpointService;
        }
        ElasticSearchService.prototype.loadKibanaIndex = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("SEARCH_DASHBOARD");
        };
        ElasticSearchService.prototype.queryNeo4jData = function (queryTerm) {
            var elasticSearchResource = this.$resource(this.restEndpointService.getelasticSearchServiceHost() + '/neo4j-index/_search?from=0&size=100&q=*' + queryTerm + '*', {}, {
                get: {
                    method: 'GET',
                }
            });
            return elasticSearchResource.get().$promise;
        };
        ElasticSearchService.$inject = ['$resource', '$q', '$cookies', 'restCallHandlerService', 'restEndpointService'];
        return ElasticSearchService;
    }());
    ISightApp.ElasticSearchService = ElasticSearchService;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=elasticSearchService.js.map