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
    var DataTaggingModel = /** @class */ (function () {
        function DataTaggingModel() {
            this.rowId = 0;
        }
        return DataTaggingModel;
    }());
    ISightApp.DataTaggingModel = DataTaggingModel;
    var LevelModel = /** @class */ (function () {
        function LevelModel() {
        }
        return LevelModel;
    }());
    ISightApp.LevelModel = LevelModel;
    var EntityModel = /** @class */ (function () {
        function EntityModel() {
            this.entityRows = [];
        }
        return EntityModel;
    }());
    ISightApp.EntityModel = EntityModel;
    var Entity = /** @class */ (function () {
        function Entity() {
        }
        return Entity;
    }());
    ISightApp.Entity = Entity;
    var EntityDefinitionModel = /** @class */ (function () {
        function EntityDefinitionModel() {
            this.entityDefinitionRows = [];
        }
        return EntityDefinitionModel;
    }());
    ISightApp.EntityDefinitionModel = EntityDefinitionModel;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=dataTaggingModel.js.map