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
package com.cognizant.devops.platformengine.modules.offlinedataprocessing;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.time.Duration;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;

import org.apache.commons.io.FilenameUtils;
import org.apache.log4j.Logger;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.cognizant.devops.platformcommons.config.ApplicationConfigCache;
import com.cognizant.devops.platformcommons.constants.ConfigOptions;
import com.cognizant.devops.platformcommons.core.util.InsightsUtils;
import com.cognizant.devops.platformcommons.dal.neo4j.GraphDBException;
import com.cognizant.devops.platformcommons.dal.neo4j.GraphResponse;
import com.cognizant.devops.platformcommons.dal.neo4j.Neo4jDBHandler;
import com.cognizant.devops.platformengine.modules.offlinedataprocessing.model.DataEnrichmentModel;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonSyntaxException;
import com.google.gson.stream.JsonWriter;

/**
 * This is the executor class for Offline Data Processing This class has the
 * ability to execute a sequence of Cypher queries. These cypher queries should
 * be stored inside a JSON configuration file. This code has the capability of
 * reading multiple json files which reside inside "data-enrichment" folder of
 * INSIGHTS_HOME path.
 * Config JSON files should have following predefined format
 * "queryName": "Some description on the query", 
 * "cypherQuery": "Actual cypher query", 
 * "runSchedule": "Query execution interval in minutes",
 * "lastExecutionTime": "Last execution time will be updated by code",
 * 
 * @author 368419
 *
 */
public class OfflineDataProcessingExecutor implements Job {
	private static Logger log = Logger.getLogger(OfflineDataProcessingExecutor.class);
	private static final String DATE_TIME_FORMAT = "yyyy/MM/dd hh:mm a";
	private static final String JSON_FILE_EXTENSION = "json";

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		executeOfflineProcessing();
	}

	private void executeOfflineProcessing() {
		File queryFolderPath = new File(ConfigOptions.OFFLINE_DATA_PROCESSING_RESOLVED_PATH);
		File[] files = queryFolderPath.listFiles();
		for (File eachFile : files) {
			if (eachFile.isFile()) { // this line removes other
										// directories/folders
				String fileName = eachFile.getName();
				if (hasJsonFileExtension(fileName)) {
					processOfflineConfiguration(eachFile);
				}
			}
		}
	}

	/**
	 * Checks whether file has .json/.JSON extension
	 * 
	 * @param fileName
	 * @return
	 */
	private Boolean hasJsonFileExtension(String fileName) {
		if (fileName != null && !fileName.isEmpty()) {
			String extension = FilenameUtils.getExtension(fileName);
			if (JSON_FILE_EXTENSION.equalsIgnoreCase(extension)) {
				return Boolean.TRUE;
			}
		}
		return Boolean.FALSE;
	}

	/**
	 * Processes each offline configuration file
	 * Processes each query block inside each configuration file and executes cypher query
	 * @param jsonFile
	 */
	private void processOfflineConfiguration(File jsonFile) {
		try {
			try (BufferedReader reader = new BufferedReader(new FileReader(jsonFile))) {
				DataEnrichmentModel[] dataEnrichmentModelArray = new Gson().fromJson(reader,
						DataEnrichmentModel[].class);
				List<DataEnrichmentModel> dataEnrichmentModels = Arrays.asList(dataEnrichmentModelArray);
				for (DataEnrichmentModel dataEnrichmentModel : dataEnrichmentModels) {
					String cypherQuery = dataEnrichmentModel.getCypherQuery();
					if (isQueryScheduledToRun(dataEnrichmentModel.getRunSchedule(),
							dataEnrichmentModel.getLastExecutionTime())) {
						executeCypherQuery(cypherQuery, dataEnrichmentModel);
						updateLastExecutionTime(dataEnrichmentModel);
					}
				}
				// Write into the file
				try (JsonWriter writer = new JsonWriter(new FileWriter(jsonFile))) {
					writer.setIndent("  ");
					new GsonBuilder().disableHtmlEscaping().create().toJson(dataEnrichmentModels.toArray(),
							DataEnrichmentModel[].class, writer);
				} catch (IOException e) {
					log.error("Unable to update offline configuration file.", e);
				}
			} catch (FileNotFoundException e) {
				log.error("offline configuration file not found.", e);
			} catch (IOException e) {
				log.error("Unable to read offline configuration file.", e);
			}
		} catch (IllegalStateException | JsonSyntaxException ex) {
			log.error(jsonFile.getName() + " file is not as per expected format", ex);
			return;
		}

	}

	/**
	 * Updates lastRunTime in the offline vector file after processing cypher
	 * query
	 * 
	 */
	private DataEnrichmentModel updateLastExecutionTime(DataEnrichmentModel dataEnrichmentModel) {
		String lastRunTime = InsightsUtils.getLocalDateTime(DATE_TIME_FORMAT);
		if (dataEnrichmentModel != null) {
			dataEnrichmentModel.setLastExecutionTime(lastRunTime);
		}
		return dataEnrichmentModel;
	}

	/**
	 * Executes cypherQuery and adds/updates two attributes "recordsProcessed"
	 * and "processingTime"
	 * 
	 * @param cypherQuery
	 * @param jsonObject
	 */
	private void executeCypherQuery(String cypherQuery, DataEnrichmentModel dataEnrichmentModel) {
		Neo4jDBHandler dbHandler = new Neo4jDBHandler();
		int processedRecords = 1;
		int recordCount = 0;
		long queryExecutionStartTime = System.currentTimeMillis();
		try {
			while (processedRecords > 0) {
				GraphResponse sprintResponse = dbHandler.executeCypherQuery(cypherQuery);
				JsonObject sprintResponseJson = sprintResponse.getJson();
				try {
					processedRecords = sprintResponseJson.getAsJsonArray("results").get(0).getAsJsonObject()
							.getAsJsonArray("data").get(0).getAsJsonObject().getAsJsonArray("row").get(0).getAsInt();
				} catch (UnsupportedOperationException | IllegalStateException ex) {
					log.error(cypherQuery + "  - query processing failed", ex);
					break;
				}
				log.debug(" Processed " + processedRecords);
				recordCount = recordCount + processedRecords;
			}
			long queryExecutionEndTime = System.currentTimeMillis();
			long queryProcessingTime = (queryExecutionEndTime - queryExecutionStartTime);
			if (dataEnrichmentModel != null) {
				dataEnrichmentModel.setRecordsProcessed(recordCount);
				dataEnrichmentModel.setQueryProcessingTime(queryProcessingTime);
			}
		} catch (GraphDBException e) {
			log.error(cypherQuery + " - query processing failed", e);
		}
	}

	/**
	 * 
	 * Checks whether query is scheduled to run or not depending on runSchedule
	 * and lastRunTime
	 * 
	 * @param runSchedule
	 * @param lastRunTime
	 * @return
	 */
	private Boolean isQueryScheduledToRun(Long runSchedule, String lastRunTime) {
		// if lastExecutionTime property is not added in the json file, we'll
		// execute the query by default
		if (lastRunTime == null) {
			return Boolean.TRUE;
		}
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern(DATE_TIME_FORMAT).withZone(InsightsUtils.zoneId);
		ZonedDateTime dateTime = null;
		ZonedDateTime now = ZonedDateTime.now(InsightsUtils.zoneId);
		Long timeDifferenceInMinutes = null;
		if (!lastRunTime.isEmpty()) {
			dateTime = ZonedDateTime.parse(lastRunTime, formatter);
		}
		if (dateTime != null && now != null) {
			Duration d = Duration.between(dateTime, now);
			timeDifferenceInMinutes = d.abs().toMinutes();
		}
		if (timeDifferenceInMinutes > runSchedule) {
			return Boolean.TRUE;
		}
		return Boolean.FALSE;
	}

	/*public static void main(String args[]) {
		ApplicationConfigCache.loadConfigCache();
		OfflineDataProcessingExecutor dataProcessing = new OfflineDataProcessingExecutor();
		dataProcessing.executeOfflineProcessing();
	}*/

}
