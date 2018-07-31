/*******************************************************************************
 *  * Copyright 2017 Cognizant Technology Solutions
 *  * 
 *  * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 *  * use this file except in compliance with the License.  You may obtain a copy
 *  * of the License at
 *  * 
 *  *   http://www.apache.org/licenses/LICENSE-2.0
 *  * 
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *  * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the
 *  * License for the specific language governing permissions and limitations under
 *  * the License.
 *******************************************************************************/
package com.cognizant.devops.platformservice.customsettings.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.cognizant.devops.platformcommons.config.ApplicationConfigProvider;
import com.cognizant.devops.platformcommons.core.enums.InsightsSettingTypes;
import com.cognizant.devops.platformcommons.core.util.DataPurgingUtils;
import com.cognizant.devops.platformcommons.exception.InsightsCustomException;
import com.cognizant.devops.platformdal.settingsconfig.SettingsConfiguration;
import com.cognizant.devops.platformdal.settingsconfig.SettingsConfigurationDAL;
import com.google.gson.JsonObject;


@Service("settingsConfigurationService")
public class SettingsConfigurationServiceImpl implements SettingsConfigurationService{
	
	private static Logger LOG = Logger.getLogger(SettingsConfigurationServiceImpl.class);

	@Override
	public Boolean saveSettingsConfiguration(String settingsJson,String settingsType,String activeFlag,String lastModifiedByUser) {	
		Boolean flag = Boolean.FALSE;
		try {
			SettingsConfiguration settingsConfiguration = populateSettingsConfiguration(settingsJson,settingsType, activeFlag, lastModifiedByUser);
			SettingsConfigurationDAL settingsConfigurationDAL = new SettingsConfigurationDAL();		
			flag = settingsConfigurationDAL.saveSettingsConfiguration(settingsConfiguration);
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
		return flag;
				
	}	

	@Override
	public SettingsConfiguration loadSettingsConfiguration(String settingsType)  throws InsightsCustomException{
		SettingsConfigurationDAL settingsConfigurationDAL = new SettingsConfigurationDAL();		
		return settingsConfigurationDAL.loadSettingsConfiguration(settingsType);	
	}
	

	private SettingsConfiguration populateSettingsConfiguration(String settingsJson, String settingsType,
			String activeFlag, String lastModifiedByUser) throws InsightsCustomException {
		SettingsConfiguration settingsConfiguration = new SettingsConfiguration();
		String updatedSettingsJson = updateNextRunTimeValue(settingsJson);
		settingsConfiguration.setSettingsJson(updatedSettingsJson);
		settingsConfiguration.setSettingsType(settingsType);
		settingsConfiguration.setActiveFlag(activeFlag);
		settingsConfiguration.setLastModifiedByUser(lastModifiedByUser);
		if(InsightsSettingTypes.DEVOPSMATURITY.getValue().equals(settingsType)) {
			getDevopsMaturityFile(settingsConfiguration);
		}
		return settingsConfiguration;
	}
	@Override
	public boolean createDevopsDataMaturity(MultipartFile file) {
		boolean status = false;
		try {
			File csvfile = saveToFile(file);
			status = true;
		} catch (IOException ex) {
			LOG.debug("Exception while creating MaturityFile on server", ex);
			status = true;
		}
		return status;
	}
	private File saveToFile(MultipartFile multipartFile) throws IOException {
		File file = new File(multipartFile.getOriginalFilename());
		System.out.println(file);
		String file_name = ApplicationConfigProvider.getInstance().getMaturityModelConfig().getInputFilelocation();
		System.out.println(file_name);
		try (FileOutputStream fos = new FileOutputStream(file_name)) {
			fos.write(multipartFile.getBytes());
		}
		return file;
	}
	@Override
	public byte[] downloadMaturityFile() {
		byte[] array = null;
		try {
			array = Files.readAllBytes(new File(ApplicationConfigProvider.getInstance().getMaturityModelConfig().getInputFilelocation()).toPath());
			String str = new String(array);
			//System.out.println(str);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println(array);
		return array;
	}
	
	private void getDevopsMaturityFile(SettingsConfiguration settingsConfiguration) throws InsightsCustomException {
		
		byte[] array;
		try {
			array = Files.readAllBytes(new File(ApplicationConfigProvider.getInstance().getMaturityModelConfig().getInputFilelocation()).toPath());
			settingsConfiguration.setSettingFile(array);
		} catch (IOException e) {
			LOG.error("Devops Maturity file reading issue", e);
			throw new InsightsCustomException("Devops Maturity file reading issue");
		}
	}

	/**
	 * Updates settingJson string coming from UI with nextRunTime value
	 * and saved into the database 
	 * @param settingsJson
	 * @return
	 */
	private String updateNextRunTimeValue(String settingsJson) {
		String updatedSettingsJson = null;
		JsonObject settingsJsonObject = DataPurgingUtils.convertSettingsJsonObject(settingsJson);
		String dataArchivalFrequency = DataPurgingUtils.getDataArchivalFrequency(settingsJsonObject);
		String nextRunTime = DataPurgingUtils.calculateNextRunTime(dataArchivalFrequency);
		settingsJsonObject = DataPurgingUtils.updateNextRunTime(settingsJsonObject,nextRunTime);
		if (settingsJsonObject != null) {
		  updatedSettingsJson = settingsJsonObject.toString();			
		}
		return updatedSettingsJson;
	}
}
