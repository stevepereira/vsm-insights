package com.cognizant.devops.platforminsights.core;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.io.Serializable;
import java.lang.reflect.Type;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.cognizant.devops.platformcommons.constants.PlatformServiceConstants;
import com.cognizant.devops.platforminsights.core.job.config.Neo4jJobConfiguration;
import com.cognizant.devops.platforminsights.core.job.config.SparkJobConfigHandler;
import com.cognizant.devops.platforminsights.core.job.config.SparkJobConfiguration;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;

public class InferenceJobExecutor implements Job, Serializable {
	private static final Logger log = LogManager.getLogger(InferenceJobExecutor.class);
	private static final long serialVersionUID = -4343203101560318074L;

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		try {
			startExecution();
			InsightsStatusProvider.getInstance().createInsightStatusNode(
					"Platform Insights Inference Application started Successfully", PlatformServiceConstants.SUCCESS);
		} catch (JobExecutionException e) {
			InsightsStatusProvider.getInstance().createInsightStatusNode(
					"message Exception occur while Job Execution " + e.getMessage(), PlatformServiceConstants.FAILURE);
		}
	}

	private void startExecution() throws JobExecutionException {
		log.debug("Starting Spark Jobs Execution");
		//ApplicationConfigCache.loadConfigCache();
		SparkJobConfigHandler configHandler = new SparkJobConfigHandler();
		try {

			String kpiJobJson = readKPIJobsFromFile();
			log.debug(kpiJobJson);
			List<SparkJobConfiguration> jobs = configHandler.loadJobsFromES();

		} catch (Exception e) {
			log.error(e.getMessage(), e);
			InsightsStatusProvider.getInstance().createInsightStatusNode(
					"Platform Insights Inference  not started job " + e.getMessage(),
					PlatformServiceConstants.FAILURE);
			throw new JobExecutionException("Platform Insights Inference Application not started " + e.getMessage());
		}
	}

	private String readKPIJobsFromFile() {
		JsonElement objObject = null;
		Gson gson = new Gson();
		Type type = new TypeToken<List<Neo4jJobConfiguration>>() {
		}.getType();
		try {
			ClassLoader classLoader = ClassLoader.getSystemClassLoader();
			File fileName = new File(classLoader.getResource("kpi_jobs_neo4j.json").getFile());
			Reader jsonFileReader = new FileReader(fileName);
			JsonParser parser = new JsonParser();
			objObject = parser.parse(jsonFileReader);
			List<Neo4jJobConfiguration> jobs = gson.fromJson(objObject, type);
			log.debug(" jobs  " + jobs.size());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return objObject.toString();
	}

}
