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
package com.cognizant.devops.platformservice.test.CorrelationBuilder;

import java.io.IOException;

import org.testng.Assert;
import org.testng.annotations.AfterTest;
import org.testng.annotations.Test;

import com.cognizant.devops.platformcommons.exception.InsightsCustomException;
import com.cognizant.devops.platformservice.correlationbuilder.service.CorrelationBuilderServiceImpl;

@Test
public class CorrelationBuilderTest extends CorrelationBuilderTestData {

	public static final CorrelationBuilderTestData correlationBuilderTestData = new CorrelationBuilderTestData();
	public static final CorrelationBuilderServiceImpl correlationBuilderImpl = new CorrelationBuilderServiceImpl();
	
	@Test(priority = 1)
	public void testGetSaveConfig() throws InsightsCustomException {
		String config = "success";
		String response = correlationBuilderImpl.saveConfig(correlationBuilderTestData.saveDataConfig);
		Assert.assertEquals(config, response);
	}

	@Test(priority = 2)
	public void testGetCorrelationJson() throws InsightsCustomException {

		String actualOutCome = correlationBuilderImpl.getCorrelationJson().toString();

		Assert.assertEquals(actualOutCome, correlationBuilderTestData.getConfigDetails);
		Assert.assertTrue(correlationBuilderTestData.getConfigDetails.length() > 0);
	}

	@Test(priority = 3)
	public void testUpdateJsonConfig() throws InsightsCustomException {
		String config = "success";
		String response = correlationBuilderImpl.saveConfig(correlationBuilderTestData.UpdateConfigDetails);
		Assert.assertEquals(config, response);
	}

	@Test(priority = 4)
	public void testDeleteJsonConfig() throws InsightsCustomException {
		String config = "success";
		String response = correlationBuilderImpl.saveConfig(correlationBuilderTestData.DeleteConfigDetails);
		Assert.assertEquals(config, response);
	}

	@AfterTest
	public void cleanUP() throws IOException {
		String resetConfigData = "[{\"destination\":{\"toolName\":\"JENKINS\",\"toolCategory\":\"CI\",\"fields\":[\"scmcommitId\"]},\"source\":{\"toolName\":\"GIT\",\"toolCategory\":\"SCM\",\"fields\":[\"commitId\"]},\"relationName\":\"TEST_FROM_GIT_TO_JENKINS\"}]";
		CorrelationBuilderTestData.resetConfig(resetConfigData);

	}
}
