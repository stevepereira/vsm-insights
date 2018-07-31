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
var ISightApp;
(function (ISightApp) {
    var ToolConfigurationPageModel = /** @class */ (function () {
        function ToolConfigurationPageModel() {
            this.toolsConfigRows = [];
        }
        return ToolConfigurationPageModel;
    }());
    ISightApp.ToolConfigurationPageModel = ToolConfigurationPageModel;
    var ToolConfigurationDetail = /** @class */ (function () {
        function ToolConfigurationDetail() {
            this.agentId = 0;
            this.category = '';
            this.toolName = '';
        }
        return ToolConfigurationDetail;
    }());
    ISightApp.ToolConfigurationDetail = ToolConfigurationDetail;
    var ToolConfigurationDataModel = /** @class */ (function () {
        function ToolConfigurationDataModel() {
            this.startFromDate = '';
            this.toolUrl = '';
            this.runSchedule = 5;
            this.selectedAuthMtd = 'Auth Token';
            this.authToken = '';
            this.userId = '';
            this.password = '';
            this.toolsTimeZone = '';
            this.timeStampField = '';
            this.timeStampFormat = '';
            /* responsetemplate: Object = {
     
             };
             useResponseTemplate: boolean = false;
             configs = {
     
             }*/
        }
        return ToolConfigurationDataModel;
    }());
    ISightApp.ToolConfigurationDataModel = ToolConfigurationDataModel;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=singleToolConfigurationModel.js.map