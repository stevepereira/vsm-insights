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
//// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var ToolsConfigurationService = /** @class */ (function () {
        function ToolsConfigurationService($q, $resource, $cookies, restCallHandlerService) {
            this.$q = $q;
            this.$resource = $resource;
            this.$cookies = $cookies;
            this.restCallHandlerService = restCallHandlerService;
        }
        ToolsConfigurationService.prototype.readToolsConfigurationGlobal = function () {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("TOOL_DATA_READ");
        };
        ToolsConfigurationService.$inject = ['$q', '$resource', '$cookies', 'restCallHandlerService'];
        return ToolsConfigurationService;
    }());
    ISightApp.ToolsConfigurationService = ToolsConfigurationService;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=toolsConfigurationService.js.map