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
    var OnboardProjectDataModel = /** @class */ (function () {
        function OnboardProjectDataModel() {
            this.toolId = 0;
        }
        return OnboardProjectDataModel;
    }());
    ISightApp.OnboardProjectDataModel = OnboardProjectDataModel;
    var ToolRowsModel = /** @class */ (function () {
        function ToolRowsModel() {
            this.toolRows = [];
        }
        return ToolRowsModel;
    }());
    ISightApp.ToolRowsModel = ToolRowsModel;
    var Mapping = /** @class */ (function () {
        function Mapping() {
        }
        return Mapping;
    }());
    ISightApp.Mapping = Mapping;
    var MappingDefinitionModel = /** @class */ (function () {
        function MappingDefinitionModel() {
            this.mappingDefinitionRows = [];
        }
        return MappingDefinitionModel;
    }());
    ISightApp.MappingDefinitionModel = MappingDefinitionModel;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=onboardProjectModel.js.map