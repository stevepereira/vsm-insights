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
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;

	@Column(name="active_flag")
	private Integer activeFlag;

	@Column(name="asses_status")
	private Integer assesStatus;

	private Integer assesid;

	@Column(name="completion_flag")
	private Integer completionFlag;

	private Integer createdby;

	@Temporal(TemporalType.TIMESTAMP)
	private Date createdon;

	@Column(name="customer_name")
	private String customerName;

	private String email;

	private String horizontal;

	private String invitationurl;

	@Column(name="mail_sent")
	private Integer mailSent;

	private Integer modifiedby;

	@Temporal(TemporalType.TIMESTAMP)
	private Date modifiedon;

	private String name;

	private Integer page;

	private String projectid;

	@Column(name="sent_on")
	private Timestamp sentOn;

	@Temporal(TemporalType.DATE)
	@Column(name="start_date")
	private Date startDate;

	@Column(name="survey_session")
	private String surveySession;

	@Column(name="survey_userid")
	private Integer surveyUserid;

	private String vertical;

	public WpAssessmentinvitation() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getActiveFlag() {
		return this.activeFlag;
	}

	public void setActiveFlag(Integer activeFlag) {
		this.activeFlag = activeFlag;
	}

	public Integer getAssesStatus() {
		return this.assesStatus;
	}

	public void setAssesStatus(Integer assesStatus) {
		this.assesStatus = assesStatus;
	}

	public Integer getAssesid() {
		return this.assesid;
	}

	public void setAssesid(Integer assesid) {
		this.assesid = assesid;
	}

	public Integer getCompletionFlag() {
		return this.completionFlag;
	}

	public void setCompletionFlag(Integer completionFlag) {
		this.completionFlag = completionFlag;
	}

	public Integer getCreatedby() {
		return this.createdby;
	}

	public void setCreatedby(Integer createdby) {
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

	public Integer getMailSent() {
		return this.mailSent;
	}

	public void setMailSent(Integer mailSent) {
		this.mailSent = mailSent;
	}

	public Integer getModifiedby() {
		return this.modifiedby;
	}

	public void setModifiedby(Integer modifiedby) {
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

	public Integer getPage() {
		return this.page;
	}

	public void setPage(Integer page) {
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

	public Integer getSurveyUserid() {
		return this.surveyUserid;
	}

	public void setSurveyUserid(Integer surveyUserid) {
		this.surveyUserid = surveyUserid;
	}

	public String getVertical() {
		return this.vertical;
	}

	public void setVertical(String vertical) {
		this.vertical = vertical;
	}

	
	@Override
	public String toString() {
		return "WpAssessmentinvitation [id=" + id + ", activeFlag=" + activeFlag + ", assesStatus=" + assesStatus
				+ ", assesid=" + assesid + ", completionFlag=" + completionFlag + ", createdby=" + createdby
				+ ", createdon=" + createdon + ", customerName=" + customerName + ", email=" + email + ", horizontal="
				+ horizontal + ", invitationurl=" + invitationurl + ", mailSent=" + mailSent + ", modifiedby="
				+ modifiedby + ", modifiedon=" + modifiedon + ", name=" + name + ", page=" + page + ", projectid="
				+ projectid + ", sentOn=" + sentOn + ", startDate=" + startDate + ", surveySession=" + surveySession
				+ ", surveyUserid=" + surveyUserid + ", vertical=" + vertical + "]";
	}

}