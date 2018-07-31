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
    var ApplicationManagementController = /** @class */ (function () {
        function ApplicationManagementController($location, $window, $mdDialog, roleService, $mdSidenav, $route, $cookies, onboardProjectService, $log) {
            this.$location = $location;
            this.$window = $window;
            this.$mdDialog = $mdDialog;
            this.roleService = roleService;
            this.$mdSidenav = $mdSidenav;
            this.$route = $route;
            this.$cookies = $cookies;
            this.onboardProjectService = onboardProjectService;
            this.$log = $log;
            this.applicationsDetails = [];
            this.searchOrg = '';
            this.showTable = false;
            this.searchApplicationResult = '';
            this.addNewApplicationName = "";
            this.showAddApplication = false;
            this.showTemplateAfterLoad = false;
            this.showMsgOnNoDataOnboarded = 'No Data Onboarded';
            this.applicationConfigured = true;
            this.appDataArray = [];
            this.paginatedAppDataArray = [];
            this.showPaginationBar = false;
            this.showApplicationAddedMessage = false;
            this.goToDataTaggingDetails = function () {
                this.homeController.templateName = 'dataTaggingDetails';
            };
            this.totalRows = 10; //total items per page
            this.maxSize = 4; // total pages blocks will be displayed
            this.currentPage = 1; //current page selected
            this.begin = 0;
            this.end = 10;
            var grafanaRoleVal = $cookies.get('grafanaRole');
            var self = this;
            var elem = document.querySelector('#homePageTemplateContainer');
            var homePageControllerScope = angular.element(elem).scope();
            var homePageController = homePageControllerScope['homePageController'];
            self.homeController = homePageController;
            self.getOrgs();
        }
        /* start code for buttons bar*/
        ApplicationManagementController.prototype.addApplication = function (params, addedApplicationName) {
            var self = this;
            var statusObject = {
                'status': false
            };
            self.$mdDialog.show({
                controller: ISightApp.ShowTemplateApplicationAddConformDialogController,
                controllerAs: 'showTemplateApplicationAddConformDialogController',
                templateUrl: './dist/modules/applicationManagement/view/conformApplicationAddDialogViewTemplate.tmp.html',
                parent: angular.element(document.body),
                targetEvent: params,
                preserveScope: true,
                clickOutsideToClose: true,
                locals: {
                    statusObject: statusObject,
                    addedApplicationName: addedApplicationName,
                },
                bindToController: true,
                onRemoving: function () { self.addApplicationConfirmation(statusObject.status); }
            });
        };
        ApplicationManagementController.prototype.showAddApplicationBox = function () {
            this.showApplicationAddedMessage = false;
            if (this.showAddApplication === false) {
                this.showAddApplication = true;
            }
            else {
                this.showAddApplication = false;
            }
        };
        ApplicationManagementController.prototype.goToUserOnBoard = function () {
            this.homeController.templateName = 'userOnboarding';
        };
        ApplicationManagementController.prototype.goToDataOnBoard = function () {
            this.homeController.templateName = 'dataOnboarding';
        };
        ApplicationManagementController.prototype.addApplicationConfirmation = function (status) {
            var self = this;
            if (status === true) {
                self.showApplicationAddedMessage = true;
                this.roleService
                    .createOrg(self.addNewApplicationName)
                    .then(function (data) {
                    self.getOrgs();
                });
            }
        };
        /* end code for buttons bar*/
        ApplicationManagementController.prototype.calculateOrgDetails = function (applicationsDetails) {
            var self = this;
            self.applicationsDetails = [];
            self.applicationsDetails = applicationsDetails;
            var _loop_1 = function (i) {
                self.applicationsDetails[i].totalusers = '';
                var orgId = self.applicationsDetails[i].id;
                self.roleService
                    .getOrgUserInfo(orgId)
                    .then(function (data) {
                    if (data.status = "success") {
                        self.applicationsDetails[i].totalusers = data.data.length;
                    }
                });
                self.applicationsDetails[i].dataOnboarded = "";
                self.onboardProjectService
                    .fetchProjectMappingByOrgId(orgId)
                    .then(function (data) {
                    if (data.status = "success") {
                        var toolsDataArray = data.data;
                        if (toolsDataArray.length > 0) {
                            for (var j = 0; j < toolsDataArray.length; j++) {
                                self.applicationsDetails[i].dataOnboarded = self.applicationsDetails[i].dataOnboarded.concat("   ");
                                self.applicationsDetails[i].dataOnboarded = self.applicationsDetails[i].dataOnboarded.concat(toolsDataArray[j].toolName);
                                self.applicationsDetails[i].dataOnboarded = self.applicationsDetails[i].dataOnboarded.concat("   ");
                                if (j !== toolsDataArray.length - 1) {
                                    self.applicationsDetails[i].dataOnboarded = self.applicationsDetails[i].dataOnboarded.concat(",");
                                }
                            }
                        }
                        else {
                            self.applicationsDetails[i].dataOnboarded = self.showMsgOnNoDataOnboarded;
                        }
                        if (self.applicationsDetails[self.applicationsDetails.length - 1].dataOnboarded !== "") {
                            self.showTemplateAfterLoad = true;
                        }
                    }
                });
            };
            for (var i = 0; i < self.applicationsDetails.length; i++) {
                _loop_1(i);
            }
        };
        ApplicationManagementController.prototype.filterSearchValue = function (applicationSearch) {
            var self = this;
            self.searchApplicationResult = applicationSearch;
        };
        ApplicationManagementController.prototype.setPage = function (pageNo) {
            this.currentPage = pageNo;
        };
        ;
        ApplicationManagementController.prototype.pageChanged = function () {
            //this.$log.log('Page changed to: ' + this.currentPage);
        };
        ;
        ApplicationManagementController.prototype.updateResult = function () {
            var self = this;
            self.begin = (self.currentPage - 1) * self.totalRows;
            self.end = self.begin + 10;
            self.updateTable();
        };
        ApplicationManagementController.prototype.updateTable = function () {
            var self = this;
            self.totalItems = self.appDataArray.length;
            self.paginatedAppDataArray = [];
            self.paginatedAppDataArray = self.appDataArray.slice(self.begin, self.end);
            self.calculateOrgDetails(self.paginatedAppDataArray);
        };
        ApplicationManagementController.prototype.getOrgs = function () {
            var self = this;
            self.roleService
                .getAllOrg()
                .then(function (data) {
                if (data.status === 'success') {
                    self.appDataArray = data.data;
                    if (self.appDataArray !== undefined && self.appDataArray.length !== 0) {
                        self.showTable = true;
                        self.updateTable();
                        self.applicationConfigured = true;
                        if (self.appDataArray.length > 10) {
                            self.showPaginationBar = true;
                        }
                    }
                    else if (self.appDataArray.length === 0) {
                        self.applicationConfigured = false;
                    }
                }
            });
        };
        ApplicationManagementController.$inject = ['$location', '$window', '$mdDialog', 'roleService', '$mdSidenav', '$route', '$cookies', 'onboardProjectService', '$log'];
        return ApplicationManagementController;
    }());
    ISightApp.ApplicationManagementController = ApplicationManagementController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=applicationManagementLandingController.js.map