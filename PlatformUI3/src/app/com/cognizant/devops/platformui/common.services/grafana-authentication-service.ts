/*******************************************************************************
 * Copyright 2019 Cognizant Technology Solutions
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

import { Injectable } from '@angular/core';
import { RestCallHandlerService } from '@insights/common/rest-call-handler.service';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { DataSharedService } from '@insights/common/data-shared-service';

export interface IAuthenticationService {
    getAuthentication(authToken: string, msg: string): void;
    logout(): Promise<any>;
    // getGrafanaCurrentOrgAndRole(): Promise<any>;
    getCurrentUserOrgs(): Promise<any>;
    getUsers(): Promise<any>;
}


@Injectable()
export class GrafanaAuthenticationService implements IAuthenticationService {
    response: any;
    location: Location;
    constructor(location: Location, private router: Router,
        private dataShare: DataSharedService, private restCallHandlerService: RestCallHandlerService
    ) {


    }

    public getAuthentication(authToken: string, msg: string): void {
        if (authToken === undefined) {
            this.router.navigate(['/login']);
        } else {
            var msg = "auth token exists";
        }
    }


    public logout(): Promise<any> {
        var restHandler = this.restCallHandlerService;
        return restHandler.get("LOGOUT");
    }

    /* public getGrafanaCurrentOrgAndRole(): Promise<any> {
        var restHandler = this.restCallHandlerService;
        return restHandler.get("GRAPANA_CURRENT_ROLE_ORG");
    } */

    public getCurrentUserOrgs(): Promise<any> {
        var restHandler = this.restCallHandlerService;
        return restHandler.get("ACCESS_GROUP_MANAGEMENT_GET_CURRENT_USER_ORGS");
    }

    public switchUserOrg(orgId: number): Promise<any> {
        var restHandler = this.restCallHandlerService;
        return restHandler.postWithParameter("ACCESS_GROUP_MANAGEMENT_SWITCH_ORGS", { "orgId": orgId }, { 'Content-Type': 'application/x-www-form-urlencoded' }).toPromise();
    }

    public getUsers(): Promise<any> {
        var restHandler = this.restCallHandlerService;
        return restHandler.get("ACCESS_GROUP_MANAGEMENT_GET_USERS");
    }
}
