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
    var HeaderController = /** @class */ (function () {
        function HeaderController(authenticationService, $location, $window, $cookies, $mdDialog, $mdSidenav) {
            this.authenticationService = authenticationService;
            this.$location = $location;
            this.$window = $window;
            this.$cookies = $cookies;
            this.$mdDialog = $mdDialog;
            this.$mdSidenav = $mdSidenav;
            this.showDashboardIcon = false;
            this.showTooltip = false;
            this.icons = [
                { iconSrc: 'dist/icons/svg/ic_home_24px.svg', name: 'home' },
                { iconSrc: 'dist/icons/svg/ic_settings_24px.svg', name: 'settings' },
                { iconSrc: 'dist/icons/svg/ic_person_24px.svg', name: 'userManagement' },
                { iconSrc: 'dist/icons/svg/ic_web_24px.svg', name: 'health' },
            ];
            var authToken = $cookies.get('Authorization');
            var msg = '';
            authenticationService.getAuthentication(authToken, msg);
            if ('/InSights/dashboard' === $location.path()) {
                this.showDashboardIcon = true;
                this.showTooltip = false;
            }
        }
        ;
        HeaderController.prototype.redirectLoc = function (iconName) {
            if (iconName == 'home') {
                this.$location.path('/InSights/home');
            }
            else if (iconName == 'settings') {
                this.$location.path('/InSights/toolsConfig');
            }
            else if (iconName == 'userManagement') {
                this.$location.path('/InSights/roles');
            }
            else if (iconName == 'health') {
                this.$location.path('/InSights/agent');
            }
        };
        HeaderController.prototype.logout = function () {
            var cookieVal = this.$cookies.getAll();
            for (var key in cookieVal) {
                cookieVal[key] = '';
                this.$cookies.put(key, cookieVal[key]);
            }
            this.$location.path('/iSight/login');
        };
        HeaderController.prototype.toggleSideNav = function (navId, closeSideNav) {
            this.showTooltip = false;
            if (closeSideNav) {
                this.$mdSidenav(navId).close();
            }
            else {
                this.$mdSidenav(navId).toggle();
            }
        };
        HeaderController.$inject = ['authenticationService', '$location', '$window', '$cookies', '$mdDialog', '$mdSidenav'];
        return HeaderController;
    }());
    ISightApp.HeaderController = HeaderController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=headerController.js.map