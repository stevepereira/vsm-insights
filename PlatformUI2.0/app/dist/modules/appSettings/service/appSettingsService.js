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
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or impliIAppSettingsServiceed.  See the
 * License for the specific language governing permissions and limitations under
 * the License.
 ******************************************************************************/
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var AppSettingsService = /** @class */ (function () {
        function AppSettingsService($q, $resource, $cookies, restCallHandlerService, $http) {
            this.$q = $q;
            this.$resource = $resource;
            this.$cookies = $cookies;
            this.restCallHandlerService = restCallHandlerService;
            this.$http = $http;
        }
        AppSettingsService.prototype.uploadLogoImage = function (file, uploadUrl) {
            var restHandler = this.restCallHandlerService;
            //FormData, object of key/value pair for form fields and values
            var fileFormData = new FormData();
            fileFormData.append('file', file);
            return null;
        };
        AppSettingsService.prototype.saveDatapurging = function (settingsDataType, activeDataFlag, lastModifiedUser, settingsJsonstr) {
            var restHandler = this.restCallHandlerService;
            return restHandler.post("SAVE_DATAPURGING_SETTING", { 'settingsType': settingsDataType, 'activeFlag': activeDataFlag, 'lastModifiedByUser': lastModifiedUser, 'settingsJson': settingsJsonstr }, { 'Content-Type': 'application/x-www-form-urlencoded' });
        };
        AppSettingsService.prototype.listDatapurgingdata = function (label) {
            var restHandler = this.restCallHandlerService;
            return restHandler.get("LIST_DATAPURGING_SETTING", { 'settingsType': label });
        };
        AppSettingsService.$inject = ['$q', '$resource', '$cookies', 'restCallHandlerService', '$http'];
        return AppSettingsService;
    }());
    ISightApp.AppSettingsService = AppSettingsService;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=appSettingsService.js.map