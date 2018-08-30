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
package com.cognizant.devops.platformdal.maturity.dal;

import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.log4j.Logger;

import com.cognizant.devops.platformdal.dal.GenericMySqlDAL;
import com.cognizant.devops.platformdal.maturity.mysql.WpAssessmentContactusDetail;
import com.cognizant.devops.platformdal.maturity.mysql.WpAssessmentanswer;
import com.cognizant.devops.platformdal.maturity.mysql.WpAssessmentdetail;
import com.cognizant.devops.platformdal.maturity.mysql.WpAssessmentinvitation;
import com.cognizant.devops.platformdal.maturity.mysql.WpAssessmentquestion;
import com.cognizant.devops.platformdal.maturity.mysql.WpAssessmentvector;

public class MaturityMySQLDAL {
	
	final static Logger logger = Logger.getLogger(MaturityMySQLDAL.class);
	private GenericMySqlDAL genericDao;
	
	public MaturityMySQLDAL() {
		genericDao=new GenericMySqlDAL();
	}
	
	public void addAssementInvitation() {
		WpAssessmentinvitation wai=new WpAssessmentinvitation();
		wai.setAssesid(88);
		wai.setInvitationurl(UUID.randomUUID().toString());
		wai.setAssesStatus(1);
		wai.setName("Insight name");
		wai.setCreatedon(new Date());
		wai.setHorizontal("88");
		wai.setSurveySession(UUID.randomUUID().toString());
		wai.setPage(0);
		wai.setSurveyUserid(12345);
		wai.setCompletionFlag(1);
		wai.setActiveFlag(111155);
		wai.setCustomerName("Abcvfd");
		wai.setProjectid("AAdsdsf");
		wai.setStartDate(new Date());
		wai.setCreatedby(112434);
		wai.setModifiedby(112434);
		wai.setModifiedon(new Date());
		wai.setVertical("1");
		wai.setHorizontal("1");
		wai.setSentOn(new Timestamp(System.currentTimeMillis()));
		wai.setMailSent(1);
		Object waiReturnget=genericDao.save(wai);
		logger.info("message WpAssessmentinvitation "+waiReturnget);
	}
	
	public List<WpAssessmentinvitation> getAllWpAssessmentinvitationList(){
		List<WpAssessmentinvitation> wailist;
		wailist=genericDao.getAll(WpAssessmentinvitation.class);
		//logger.info("size of list get Wp Assessment invitation "+wailist.size());
		wailist.forEach((g) -> logger.info(g.toString()));
		return wailist;
   }
	
	public List<WpAssessmentanswer> getAllWpAssessmentanswerList(){
		List<WpAssessmentanswer> waalist;
		waalist=genericDao.getAll(WpAssessmentanswer.class);
		//logger.info("size of list get Wp Assessment answer"+waalist.size());
		waalist.forEach((g) -> logger.info(g.toString()));
		return waalist;
    }
	
	public List<WpAssessmentContactusDetail> getAllWpAssessmentContactusDetailList(){
		List<WpAssessmentContactusDetail> wacdlist;
		wacdlist=genericDao.getAll(WpAssessmentContactusDetail.class);
		//logger.info("size of list get Wp Assessment Contactus Detail"+wacdlist.size());
		wacdlist.forEach((g) -> logger.info(g.toString()));
		return wacdlist;
   }
	
	public List<WpAssessmentdetail> getAllWpAssessmentdetailList(){
		List<WpAssessmentdetail> wadlist;
		wadlist=genericDao.getAll(WpAssessmentdetail.class);
		//logger.info("size of list get Wp Assessment detail"+wadlist.size());
		wadlist.forEach((g) -> logger.info(g.toString()));
		return wadlist;
    }
	public List<WpAssessmentquestion> getAllWpAssessmentquestionList(){
		List<WpAssessmentquestion> waqlist;
		waqlist=genericDao.getAll(WpAssessmentquestion.class);
		//logger.info("size of list get Wp Assessment question"+waqlist.size());
		waqlist.forEach((g) -> logger.info(g.toString()));
		return waqlist;
    }
	public List<WpAssessmentvector> getAllWpAssessmentvectorList(){
		List<WpAssessmentvector> wavlist;
		wavlist=genericDao.getAll(WpAssessmentvector.class);
		//logger.info("size of list get Wp Assessment vector"+wavlist.size());
		wavlist.forEach((g) -> logger.info(g.toString()));
		return wavlist;
   }
	
	public List<WpAssessmentinvitation> getAssessentInvitationByFilter(){
		List<WpAssessmentinvitation> wailist;
		Map<Object,Object> parameterList=new HashMap<Object,Object>(0);
		parameterList.put("id",74);
		parameterList.put("assesid",88);
		parameterList.put("completionFlag",1);
		wailist=genericDao.getListByParameters(WpAssessmentinvitation.class, parameterList,Boolean.TRUE);
		logger.info("size of list get Wp Assessment invitation With AND "+wailist.size());
		wailist.forEach((g) -> logger.info(g.toString()));
		wailist.clear();
		wailist=genericDao.getListByParameters(WpAssessmentinvitation.class, parameterList,Boolean.FALSE);
		logger.info("size of list get Wp Assessment invitation With  OR "+wailist.size());
		wailist.forEach((g) -> logger.info(g.toString()));
		return wailist;
		
	}
	
	public WpAssessmentinvitation getAssessentInvitationById(int id) {
		WpAssessmentinvitation waibyId = genericDao.getRecordById(WpAssessmentinvitation.class,"id",id);
		logger.info("Record Detail Wp Assessment invitation "+waibyId);
		return waibyId;
	}
	
}
