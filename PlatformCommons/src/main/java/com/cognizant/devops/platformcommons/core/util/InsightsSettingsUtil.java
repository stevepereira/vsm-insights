package com.cognizant.devops.platformcommons.core.util;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;

import com.cognizant.devops.platformcommons.constants.ConfigOptions;
import com.cognizant.devops.platformcommons.core.enums.JobSchedule;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

public class InsightsSettingsUtil {
	
	public static final String DATE_TIME_FORMAT = "yyyy/MM/dd hh:mm a";
	
	private InsightsSettingsUtil() {
	}

	/**
	 * Checks whether DataPurging job should be run or not as per nextRunTime
	 * @return
	 */
	public static Boolean shouldExecuteJob(JsonObject settingsJsonObject) {
		String lastRunTimeStr = getLastRunTime(settingsJsonObject);
		String nextRunTimeStr = getNextRunTime(settingsJsonObject);
		Long lastRunTime = InsightsUtils.parseDateIntoEpochSeconds(lastRunTimeStr,DATE_TIME_FORMAT);
		Long nextRunTime = InsightsUtils.parseDateIntoEpochSeconds(nextRunTimeStr,DATE_TIME_FORMAT);
		Long x = InsightsUtils.getDifferenceFromLastRunTime(lastRunTime);
		Long y = InsightsUtils.getDifferenceFromNextRunTime(lastRunTime, nextRunTime);
		if (x > y) {
			return Boolean.TRUE;
		}
		return Boolean.FALSE;
	}
	
	/**
	 * Calculates nextRunTime as per dataArchivalFrequency and job schedule
	 * @param jobFrequency
	 * @return
	 */
	public static String calculateNextRunTime(String jobFrequency) {
		LocalDateTime currentDateTime = LocalDateTime.now();
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern(DATE_TIME_FORMAT);
		String nextRunTime = null;
		if(JobSchedule.DAILY.name().equalsIgnoreCase(jobFrequency)){
			//Schedule daily at 01:00 am
			LocalDateTime nextDaySchedule = currentDateTime.plusDays(1);
			nextDaySchedule = nextDaySchedule.withHour(01).withMinute(00);
			nextRunTime = dtf.format(nextDaySchedule);
		} else if(JobSchedule.WEEKLY.name().equalsIgnoreCase(jobFrequency)){
			//Schedule weekly every Monday at 01:00 am
			LocalDateTime nextOrSameMonday = currentDateTime.with(TemporalAdjusters.nextOrSame(DayOfWeek.MONDAY ) ) ;
			nextOrSameMonday = nextOrSameMonday.withHour(01).withMinute(00);
			nextRunTime = dtf.format(nextOrSameMonday);
		} else if(JobSchedule.MONTHLY.name().equalsIgnoreCase(jobFrequency)){
			//Schedule monthly 01st day of every month at 01:00 AM
			LocalDateTime firstDayOfNextMonth = currentDateTime.with(TemporalAdjusters.firstDayOfNextMonth()) ;
			firstDayOfNextMonth = firstDayOfNextMonth.withHour(01).withMinute(00);
			nextRunTime = dtf.format(firstDayOfNextMonth);
		}
		return nextRunTime;
	}
	
	/**
	 * Returns value of lastRunTime in String from JsonObject
	 * @param settingsJsonObject
	 * @return
	 */
	public static String getLastRunTime(JsonObject settingsJsonObject) {
		String lastRunTime = null;
		if (settingsJsonObject != null && settingsJsonObject.get(ConfigOptions.LAST_RUN_TIME)!= null) {
			lastRunTime = settingsJsonObject.get(ConfigOptions.LAST_RUN_TIME).getAsString();
		}
		return lastRunTime;
	}
	
	/**
	 * Returns value of nextRunTime in String from JsonObject
	 * @param settingsJsonObject
	 * @return
	 */
	public static String getNextRunTime(JsonObject settingsJsonObject) {
		String nextRunTime = null;
		if (settingsJsonObject != null && settingsJsonObject.get(ConfigOptions.NEXT_RUN_TIME)!= null) {
			nextRunTime = settingsJsonObject.get(ConfigOptions.NEXT_RUN_TIME).getAsString();
		}
		return nextRunTime;
	}
	
	/**
	 * Returns value of dataArchivalFrequency in String from JsonObject
	 * @param settingsJsonObject
	 * @return
	 */
	public static String getJobFrequency(JsonObject settingsJsonObject) {
		String jobFrequency = null;
		if (settingsJsonObject != null && settingsJsonObject.get(ConfigOptions.JOB_FREQUENCY)!= null) {
			jobFrequency = settingsJsonObject.get(ConfigOptions.JOB_FREQUENCY).getAsString();
		}
		return jobFrequency;
	}
	
	/**
	 * Converts settingJson String into a JsonObject
	 * @param settingsJson
	 * @return
	 */
	public static JsonObject convertSettingsJsonObject(String settingsJson) {
		if (settingsJson != null && !settingsJson.isEmpty()) {
			Gson gson = new Gson();
			JsonElement jsonElement = gson.fromJson(settingsJson.trim(),JsonElement.class);
			return jsonElement.getAsJsonObject();
		}
		return null;
	}
	
	/**
	 * Updates calculated next run time inside JsonObject
	 * @param settingsJsonObject
	 * @param nextRunTime
	 * @return
	 */
	public static JsonObject updateNextRunTime(JsonObject settingsJsonObject, String nextRunTime) {
		if (settingsJsonObject != null) {
			settingsJsonObject.remove(ConfigOptions.NEXT_RUN_TIME);
			settingsJsonObject.addProperty(ConfigOptions.NEXT_RUN_TIME, nextRunTime);
		}
		return settingsJsonObject;
	}
	
	/**
	 * Updates last run time inside JsonObject
	 * @param settingsJsonObject
	 * @param lastRunTime
	 * @return
	 */
	public static JsonObject updateLastRunTime(JsonObject settingsJsonObject, String lastRunTime) {
		if (settingsJsonObject != null) {
			settingsJsonObject.remove(ConfigOptions.LAST_RUN_TIME);
			settingsJsonObject.addProperty(ConfigOptions.LAST_RUN_TIME, lastRunTime);
		}
		return settingsJsonObject;
	}
	
}
