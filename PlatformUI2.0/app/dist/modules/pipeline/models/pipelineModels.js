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
    var PipelineData = /** @class */ (function () {
        function PipelineData(pipelineName, tools, applicationViewData, userViewData, pipelineRecords) {
            this.pipelineName = pipelineName;
            this.tools = tools;
            this.applicationViewData = applicationViewData;
            this.userViewData = userViewData;
            this.pipelineRecords = pipelineRecords;
        }
        return PipelineData;
    }());
    ISightApp.PipelineData = PipelineData;
    var ToolData = /** @class */ (function () {
        function ToolData(name, data //Dont have maps.
        ) {
            this.name = name;
            this.data = data;
        }
        return ToolData;
    }());
    ISightApp.ToolData = ToolData;
    var PipelineRecord = /** @class */ (function () {
        function PipelineRecord(rowData) {
            this.rowData = rowData;
        }
        return PipelineRecord;
    }());
    ISightApp.PipelineRecord = PipelineRecord;
    var TabDialogData = /** @class */ (function () {
        function TabDialogData(header, dataRows) {
            this.header = header;
            this.dataRows = dataRows;
        }
        return TabDialogData;
    }());
    ISightApp.TabDialogData = TabDialogData;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=pipelineModels.js.map