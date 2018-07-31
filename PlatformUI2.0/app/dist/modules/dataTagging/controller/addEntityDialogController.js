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
    var AddEntityDialogController = /** @class */ (function () {
        function AddEntityDialogController($mdDialog, $route, dataTaggingService) {
            this.$mdDialog = $mdDialog;
            this.$route = $route;
            this.dataTaggingService = dataTaggingService;
            this.entityArray = [];
            this.count = 1;
            this.addButtIcon = "dist/icons/svg/oneToolsConfigIcons/Add_icon_disabled.svg";
            this.deleteButtIcon = "dist/icons/svg/oneToolsConfigIcons/Delete_icon_disabled.svg";
            this.editButtIcon = "dist/icons/svg/userOnboarding/Edit_icon_disabled.svg";
            this.entity = new ISightApp.Entity();
            this.entityDefModel = new ISightApp.EntityDefinitionModel();
            this.shuldAddEntity = false;
            this.showActions = false;
            this.entityDefinationArray = [];
            this.headerData = [];
            this.entityData = [];
            this.entityModel = new ISightApp.EntityModel();
            this.noEntityAddedMsg = {
                'msg': '',
            };
            this.hierarchyRec = [];
            this.headerData = this['locals'].headerData;
            this.entityData = this['locals'].entityData;
            this.noEntityAddedMsg = this['locals'].noEntityAddedMsg;
            this.entityModel = this['locals'].entityModel;
            this.fetchEntityMapping();
            this.showActions = false;
        }
        AddEntityDialogController.prototype.hide = function () {
            this.$mdDialog.hide();
        };
        AddEntityDialogController.prototype.cancel = function () {
            this.$mdDialog.cancel();
        };
        AddEntityDialogController.prototype.addAction = function () {
            this.showActions = false;
            var rowLength = this.entityDefModel.entityDefinitionRows.length + 1;
            var insertEntity = new ISightApp.Entity();
            insertEntity.rowId = rowLength;
            this.entityDefModel.entityDefinitionRows.push(insertEntity);
            insertEntity.levelName = 'Level' + rowLength;
            this.addButtIcon = "dist/icons/svg/oneToolsConfigIcons/Add_icon_disabled.svg";
        };
        AddEntityDialogController.prototype.fetchEntityMapping = function () {
            var self = this;
            self.dataTaggingService.getAllEntityDefination()
                .then(function (data) {
                var fetchedEntityData = data.data;
                if (fetchedEntityData.length != 0) {
                    self.showActions = true;
                    self.addButtIcon = "dist/icons/svg/actionIcons/Add_icon_MouseOver.svg";
                    self.deleteButtIcon = "dist/icons/svg/actionIcons/Delete_icon_MouseOver.svg";
                    self.entityDefModel.entityDefinitionRows = [];
                    for (var _i = 0, fetchedEntityData_1 = fetchedEntityData; _i < fetchedEntityData_1.length; _i++) {
                        var jsonObject = fetchedEntityData_1[_i];
                        var fetchedData = new ISightApp.Entity();
                        fetchedData.levelName = jsonObject["levelName"];
                        fetchedData.entityName = jsonObject["entityName"];
                        fetchedData.rowId = jsonObject["rowId"];
                        fetchedData.isEntityDefSaved = true;
                        self.entityDefModel.entityDefinitionRows.push(fetchedData);
                    }
                }
                else if (fetchedEntityData.length === 0) {
                    self.addButtIcon = "dist/icons/svg/oneToolsConfigIcons/Add_icon_disabled.svg";
                    self.entityDefModel.entityDefinitionRows = [];
                    var rowLength = self.entityDefModel.entityDefinitionRows.length + 1;
                    var insertTool = new ISightApp.Entity();
                    insertTool.rowId = rowLength;
                    insertTool.levelName = 'Level' + rowLength;
                    insertTool.isEntityDefSaved = false;
                    self.entityDefModel.entityDefinitionRows.push(insertTool);
                }
            });
        };
        AddEntityDialogController.prototype.fetchHierarchyData = function (fetchedHierarchyData) {
            this.noEntityAddedMsg['msg'] = '';
            if (fetchedHierarchyData.length != 0) {
                this.addButtIcon = "dist/icons/svg/actionIcons/Add_icon_MouseOver.svg";
                this.deleteButtIcon = "dist/icons/svg/actionIcons/Delete_icon_MouseOver.svg";
                //this.entityData = [];
                while (this.entityData.length > 0) {
                    this.entityData.pop();
                }
                ;
                this.entityModel.entityRows['entityInfo'] = [];
                for (var _i = 0, fetchedHierarchyData_1 = fetchedHierarchyData; _i < fetchedHierarchyData_1.length; _i++) {
                    var hierarchyData = fetchedHierarchyData_1[_i];
                    var fetchedHierarchyDetails = new ISightApp.DataTaggingModel();
                    //this.hierarchyRec = [];
                    this.hierarchyRec = hierarchyData;
                    fetchedHierarchyDetails.levels = hierarchyData.record;
                    if (hierarchyData["rowId"] != undefined) {
                        fetchedHierarchyDetails.rowId = hierarchyData["rowId"];
                        fetchedHierarchyDetails.isEntitySaved = true;
                    }
                    else {
                        var rowLength = this.entityModel.entityRows.length + 1;
                        fetchedHierarchyDetails.rowId = rowLength;
                        fetchedHierarchyDetails.isEntitySaved = false;
                    }
                    var hierarchyDataRow = [];
                    hierarchyDataRow.push(fetchedHierarchyDetails);
                }
                this.entityModel.entityRows['entityInfo'] = hierarchyDataRow;
                this.entityData.push(this.hierarchyRec);
                console.log(this.entityData);
                //this.entityData.push({record: ["1", "2"]})
            }
        };
        AddEntityDialogController.prototype.changeButtonstatus = function () {
            this.showActions = true;
            this.addButtIcon = "dist/icons/svg/oneToolsConfigIcons/Add_icon_MouseOver.svg";
            this.deleteButtIcon = "dist/icons/svg/oneToolsConfigIcons/Delete_icon_MouseOver.svg";
            this.editButtIcon = "dist/icons/svg/userOnboarding/Edit_icon_MouseOver.svg";
        };
        AddEntityDialogController.prototype.addEntity = function () {
            this.shuldAddEntity = true;
        };
        AddEntityDialogController.prototype.addEntityDefinition = function () {
            var self = this;
            var entityDefArray = self.entityDefModel.entityDefinitionRows;
            for (var entityRow in entityDefArray) {
                var entityDefRowDetails = entityDefArray[entityRow];
                if (entityDefRowDetails.levelName != undefined && entityDefRowDetails.entityName != undefined) {
                    self.dataTaggingService
                        .addEntityDefination(entityDefRowDetails.rowId, entityDefRowDetails.levelName, entityDefRowDetails.entityName)
                        .then(function (data) {
                        if (data.status === "success") {
                            entityDefRowDetails.isEntityDefSaved = true;
                            self.dataTaggingService.getHierarchyDetails()
                                .then(function (data) {
                                self.headerData['headers'] = data.headers;
                                self.noEntityAddedMsg['msg'] = '';
                                var hierarchyRecords = data.records;
                                if (hierarchyRecords.length != 0) {
                                    self.showActions = true;
                                    self.fetchHierarchyData(data.records);
                                }
                            });
                        }
                        else {
                            entityDefRowDetails.isEntityDefSaved = false;
                        }
                    });
                }
            }
            this.hide();
        };
        AddEntityDialogController.prototype.deleteAction = function (levelName, entityName, rowId, isEntityDefSaved) {
            this.showActions = false;
            if (isEntityDefSaved === true) {
                if (entityName != undefined) {
                    var self = this;
                    self.dataTaggingService
                        .deleteEntityDefination(levelName, entityName)
                        .then(function (data) {
                        if (data.status === "success") {
                            self.fetchEntityMapping();
                        }
                    });
                }
            }
            else {
                for (var i = 0; i < this.entityDefModel.entityDefinitionRows.length; i++) {
                    var obj = this.entityDefModel.entityDefinitionRows[i];
                    if (obj.rowId === rowId && rowId != 1) {
                        this.entityDefModel.entityDefinitionRows.splice(i, 1);
                        i--;
                        break;
                    }
                }
                this.changeButtonstatus();
            }
        };
        AddEntityDialogController.$inject = ['$mdDialog', '$route', 'dataTaggingService'];
        return AddEntityDialogController;
    }());
    ISightApp.AddEntityDialogController = AddEntityDialogController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=addEntityDialogController.js.map