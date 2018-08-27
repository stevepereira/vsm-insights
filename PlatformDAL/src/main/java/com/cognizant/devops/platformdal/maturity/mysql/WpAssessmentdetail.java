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
package com.cognizant.devops.platformdal.maturity.mysql;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;


/**
 * The persistent class for the wp_assessmentdetails database table.
 * 
 */
@Entity
@Table(name="wp_assessmentdetails")
@NamedQuery(name="WpAssessmentdetail.findAll", query="SELECT w FROM WpAssessmentdetail w")
public class WpAssessmentdetail implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	private int createdby;

	@Temporal(TemporalType.TIMESTAMP)
	private Date createdon;

	@Lob
	private String description;

	@Temporal(TemporalType.TIMESTAMP)
	private Date enddate;

	private int modifiedby;

	@Temporal(TemporalType.TIMESTAMP)
	private Date modifiedon;

	@Temporal(TemporalType.TIMESTAMP)
	private Date startdate;

	private int status;

	private String surveyname;

	@Lob
	private String thankyoutext;

	public WpAssessmentdetail() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getCreatedby() {
		return this.createdby;
	}

	public void setCreatedby(int createdby) {
		this.createdby = createdby;
	}

	public Date getCreatedon() {
		return this.createdon;
	}

	public void setCreatedon(Date createdon) {
		this.createdon = createdon;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getEnddate() {
		return this.enddate;
	}

	public void setEnddate(Date enddate) {
		this.enddate = enddate;
	}

	public int getModifiedby() {
		return this.modifiedby;
	}

	public void setModifiedby(int modifiedby) {
		this.modifiedby = modifiedby;
	}

	public Date getModifiedon() {
		return this.modifiedon;
	}

	public void setModifiedon(Date modifiedon) {
		this.modifiedon = modifiedon;
	}

	public Date getStartdate() {
		return this.startdate;
	}

	public void setStartdate(Date startdate) {
		this.startdate = startdate;
	}

	public int getStatus() {
		return this.status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getSurveyname() {
		return this.surveyname;
	}

	public void setSurveyname(String surveyname) {
		this.surveyname = surveyname;
	}

	public String getThankyoutext() {
		return this.thankyoutext;
	}

	public void setThankyoutext(String thankyoutext) {
		this.thankyoutext = thankyoutext;
	}

}