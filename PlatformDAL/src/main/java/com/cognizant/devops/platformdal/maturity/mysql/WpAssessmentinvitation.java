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
import java.sql.Timestamp;


/**
 * The persistent class for the wp_assessmentinvitations database table.
 * 
 */
@Entity
@Table(name="wp_assessmentinvitations")
@NamedQuery(name="WpAssessmentinvitation.findAll", query="SELECT w FROM WpAssessmentinvitation w")
public class WpAssessmentinvitation implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	@Column(name="active_flag")
	private int activeFlag;

	@Column(name="asses_status")
	private int assesStatus;

	private int assesid;

	@Column(name="completion_flag")
	private int completionFlag;

	private int createdby;

	@Temporal(TemporalType.TIMESTAMP)
	private Date createdon;

	@Column(name="customer_name")
	private String customerName;

	private String email;

	private String horizontal;

	private String invitationurl;

	@Column(name="mail_sent")
	private int mailSent;

	private int modifiedby;

	@Temporal(TemporalType.TIMESTAMP)
	private Date modifiedon;

	private String name;

	private int page;

	private String projectid;

	@Column(name="sent_on")
	private Timestamp sentOn;

	@Temporal(TemporalType.DATE)
	@Column(name="start_date")
	private Date startDate;

	@Column(name="survey_session")
	private String surveySession;

	@Column(name="survey_userid")
	private int surveyUserid;

	private String vertical;

	public WpAssessmentinvitation() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getActiveFlag() {
		return this.activeFlag;
	}

	public void setActiveFlag(int activeFlag) {
		this.activeFlag = activeFlag;
	}

	public int getAssesStatus() {
		return this.assesStatus;
	}

	public void setAssesStatus(int assesStatus) {
		this.assesStatus = assesStatus;
	}

	public int getAssesid() {
		return this.assesid;
	}

	public void setAssesid(int assesid) {
		this.assesid = assesid;
	}

	public int getCompletionFlag() {
		return this.completionFlag;
	}

	public void setCompletionFlag(int completionFlag) {
		this.completionFlag = completionFlag;
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

	public String getCustomerName() {
		return this.customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getHorizontal() {
		return this.horizontal;
	}

	public void setHorizontal(String horizontal) {
		this.horizontal = horizontal;
	}

	public String getInvitationurl() {
		return this.invitationurl;
	}

	public void setInvitationurl(String invitationurl) {
		this.invitationurl = invitationurl;
	}

	public int getMailSent() {
		return this.mailSent;
	}

	public void setMailSent(int mailSent) {
		this.mailSent = mailSent;
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

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getPage() {
		return this.page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public String getProjectid() {
		return this.projectid;
	}

	public void setProjectid(String projectid) {
		this.projectid = projectid;
	}

	public Timestamp getSentOn() {
		return this.sentOn;
	}

	public void setSentOn(Timestamp sentOn) {
		this.sentOn = sentOn;
	}

	public Date getStartDate() {
		return this.startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public String getSurveySession() {
		return this.surveySession;
	}

	public void setSurveySession(String surveySession) {
		this.surveySession = surveySession;
	}

	public int getSurveyUserid() {
		return this.surveyUserid;
	}

	public void setSurveyUserid(int surveyUserid) {
		this.surveyUserid = surveyUserid;
	}

	public String getVertical() {
		return this.vertical;
	}

	public void setVertical(String vertical) {
		this.vertical = vertical;
	}

}