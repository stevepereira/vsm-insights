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
package com.cognizant.devops.platformdal.dal;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;

import com.cognizant.devops.platformdal.config.PlatformDALSessionFactoryProvider;

public class GenericMySqlDAL {
	final static Logger logger = Logger.getLogger(GenericMySqlDAL.class);
	private Session session;
	private SessionFactory sessionFactory ;
	
	public GenericMySqlDAL(){
		if(sessionFactory==null) {
			sessionFactory=PlatformDALSessionFactoryProvider.getMySqlSessionFactory();
		}
	}

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
	
    public <T> int save(final T o){
    	Object objReturn;
    	Session session = sessionFactory.openSession();
    	session.beginTransaction();
    	objReturn= session.save(o);
    	session.getTransaction().commit();
    	session.close();
        return (int) objReturn;
      }


      public void delete(final Object object){
    	  Session session = sessionFactory.openSession();
    	  session.beginTransaction();
    	  session.delete(object);
    	  session.getTransaction().commit();
    	  session.close();
      }

      /***/
      public <T> T get(final Class<T> type, final Long id){
    	Object objReturn;
    	Session session = sessionFactory.openSession();
    	objReturn = (T) session.get(type, id);
    	session.close();
        return (T) objReturn;
      }

      /***/
      public <T> T merge(final T o)   {
    	  Object objReturn;
    	  Session session = sessionFactory.openSession();
    	  objReturn =(T) session.merge(o);
    	  session.close();
          return (T) objReturn;
      }

      /***/
      public <T> void saveOrUpdate(final T o){
    	  Session session = sessionFactory.openSession();
    	  session.saveOrUpdate(o);
      }

      public <T> List<T> getAll(final Class<T> type) {
        Session session = sessionFactory.openSession();
        CriteriaBuilder builder = session.getCriteriaBuilder();
        CriteriaQuery<T> criteria = builder.createQuery(type);
        criteria.select(criteria.from(type));
        Query<T> q=session.createQuery(criteria);
        return q.getResultList();
      }
      
      public <T> T getRecordById(Class<T> type,String key,Object value) {
          Session session = sessionFactory.openSession();
          CriteriaBuilder builder = session.getCriteriaBuilder();
          CriteriaQuery<T> criteria = builder.createQuery(type);
          Root<T> root =criteria.from(type);
          criteria.select(root);
          criteria.where(builder.equal(root.get(key),value));
          System.out.println(" criteria "+criteria.toString());
          Query<T> q=session.createQuery(criteria);
          return q.getSingleResult();
        }
      
      public <T> List<T> getListByParameters(Class<T> type,Map<Object,Object> parameterList,Boolean isAnd) {
          Session session = sessionFactory.openSession();
          CriteriaBuilder builder = session.getCriteriaBuilder();
          CriteriaQuery<T> criteria = builder.createQuery(type);
          List<Predicate> predicateList=new ArrayList<Predicate>(0);
          Root<T> root =criteria.from(type);
          criteria.select(root);
          for (Entry<Object,Object> parameter : parameterList.entrySet()) {
        	  predicateList.add(builder.equal(root.get(parameter.getKey().toString()),parameter.getValue()));
          }
          if(isAnd) {
        	  criteria.where(builder.and(predicateList.toArray(new Predicate[predicateList.size()])));
          }else {
        	  criteria.where(builder.or(predicateList.toArray(new Predicate[predicateList.size()])));
          }
          System.out.println(" criteria "+criteria.toString());
          Query<T> q=session.createQuery(criteria);
          return q.getResultList();
        }
	
}
