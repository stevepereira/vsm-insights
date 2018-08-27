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

import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.cognizant.devops.platformdal.config.PlatformDALSessionFactoryProvider;

public class GenericMySqlDAL {
	final static Logger logger = Logger.getLogger(MaturityMySQLDAL.class);
	private Session session;
	private SessionFactory sessionFactory =PlatformDALSessionFactoryProvider.getMySqlSessionFactory();

	public Session getSession(){
		if(session == null || !session.isOpen()){
			session = sessionFactory.openSession();
		}
		return session;
	}
	
	public void terminateSession(){
		if(session != null){
			session.close();
			session = null;
		}
	}
	
	public void terminateSessionFactory(){
		terminateSession();
	}
	
	public void closeSession(Session session) {
		session.close();
	}
	
    public <T> T save(final T o){
    	Object objReturn;
    	Session session = sessionFactory.openSession();
    	objReturn= (T) session.save(o);
    	closeSession(session);
        return (T) objReturn;
      }


      public void delete(final Object object){
    	  Session session = sessionFactory.openSession();
    	  session.delete(object);
    	  closeSession(session);
      }

      /***/
      public <T> T get(final Class<T> type, final Long id){
    	Object objReturn;
    	Session session = sessionFactory.openSession();
    	objReturn = (T) session.get(type, id);
    	closeSession(session);
        return (T) objReturn;
      }

      /***/
      public <T> T merge(final T o)   {
    	  Object objReturn;
    	  Session session = sessionFactory.openSession();
    	  objReturn =(T) session.merge(o);
    	  closeSession(session);
          return (T) objReturn;
      }

      /***/
      public <T> void saveOrUpdate(final T o){
    	  Session session = sessionFactory.openSession();
    	  session.saveOrUpdate(o);
      }

      public <T> List<T> getAll(final Class<T> type) {
        Session session = sessionFactory.openSession();
         Criteria crit = session.createCriteria(type);
        return crit.list();
      }
	
}
