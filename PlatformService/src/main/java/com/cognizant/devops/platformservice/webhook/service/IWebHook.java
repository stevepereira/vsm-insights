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
package com.cognizant.devops.platformservice.webhook.service;

import java.util.List;

import com.cognizant.devops.platformcommons.exception.InsightsCustomException;

public interface IWebHook {

	public Boolean saveWebHookConfiguration(String webhookname,String toolName,String eventname,String dataformat,String mqchannel,Boolean subscribestatus, String responseTemplate) throws InsightsCustomException;
	public List<WebHookConfigTO> getRegisteredWebHooks() throws InsightsCustomException;
	public String uninstallWebhook(String webhookname) throws InsightsCustomException;
	public Boolean updateWebHook(String webhookname, String toolName, String eventname, String dataformat,
			String mqchannel, Boolean subscribestatus, String responseTemplate) throws InsightsCustomException ;
	
}
