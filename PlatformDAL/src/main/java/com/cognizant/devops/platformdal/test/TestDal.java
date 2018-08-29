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
package com.cognizant.devops.platformdal.test;

import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.cognizant.devops.platformcommons.config.ApplicationConfigCache;
import com.cognizant.devops.platformdal.config.PlatformDALSessionFactoryProvider;
import com.cognizant.devops.platformdal.maturity.dal.MaturityMySQLDAL;


public class TestDal {
	final static Logger logger = Logger.getLogger(TestDal.class);
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		try {
			ApplicationConfigCache.loadConfigCache();
			/*Configuration configuration = new Configuration();
			configuration.configure("hibernate.cfg.xml");
			configuration.setProperty("hibernate.connection.username","grafana123");
			ServiceRegistry standardRegistry = new StandardServiceRegistryBuilder().applySettings(configuration.getProperties()).configure().build();
			ServiceRegistry standardRegistry = new StandardServiceRegistryBuilder().configure().build();
			MetadataSources sources = new MetadataSources( standardRegistry );
			sources.addAnnotatedClass( Test.class );
			Metadata metadata = sources.getMetadataBuilder().applyImplicitNamingStrategy(ImplicitNamingStrategyJpaCompliantImpl.INSTANCE).build();
			SessionFactory sessionFactory = metadata.buildSessionFactory();
			Session session = sessionFactory.openSession();
			session.beginTransaction();
			Test s = new Test();
			s.setName("12Vishal123");
			session.save(s);
			session.getTransaction().commit();
			session.close();
			sessionFactory.close();*/
			logger.info(" Testing mySql Connection");
			
			
			// Mysql Testing for Maturity Model 
			//Configuration  configuration = new Configuration().configure( "hibernate_mysql.cfg.xml");
			//PlatformDALSessionFactoryProvider.initMySqlDAL();
			MaturityMySQLDAL maturityDal=new MaturityMySQLDAL();
			SessionFactory sessionFactory =PlatformDALSessionFactoryProvider.getMySqlSessionFactory();    //  configuration.buildSessionFactory();
			logger.info(" session factory "+sessionFactory.toString());
			Session session=sessionFactory.openSession();
			logger.info(" session "+session );
			maturityDal.addAssementInvitation();
			maturityDal.getAllWpAssessmentinvitationList();
			maturityDal.getAllWpAssessmentanswerList();
			maturityDal.getAllWpAssessmentContactusDetailList();
			maturityDal.getAllWpAssessmentdetailList();
			maturityDal.getAllWpAssessmentquestionList();
			maturityDal.getAllWpAssessmentvectorList();
			maturityDal.getAssessentInvitationById(74);
			maturityDal.getAssessentInvitationByFilter();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
