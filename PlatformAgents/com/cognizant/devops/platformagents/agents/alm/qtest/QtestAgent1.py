import base64
import json
import logging.handlers
import math
import datetime

from com.cognizant.devops.platformagents.core.BaseAgent import BaseAgent
from dateutil import parser


class QtestAgent (BaseAgent):

    def process(self):
        currentDateTime = datetime.datetime.now()
        baseUrl = self.config.get('baseUrl', '')
        startFrom = self.config.get('startFrom') + '+00:00'
        startFromDate = parser.parse(startFrom, ignoretz=True)
        pageSize = self.config.get('responsePageSize', 99)
        dynamicTemplate = self.config.get("dynamicTemplate", {})
        almEntities = dynamicTemplate.get('almEntities', {})
        metadata = dynamicTemplate.get("almEntityMetaData", None)
        isHistoryApi = self.config.get('isHistoryApi', False)
        automationType = dict()
        idChunkSize = 10
        if isHistoryApi:
            automationConfig = dynamicTemplate.get("automationType", {})
            automationType = automationConfig.get("test-cases", automationType)
            idChunkSize = self.config.get('historyIdChunkSize', idChunkSize)
        testRunTypes = dynamicTemplate.get('testRunsType', {})
        if 'test-runs' in almEntities:
            for testRunType in testRunTypes:
                almEntities[testRunType] = almEntities.get('test-runs', {})
            almEntities.pop('test-runs', {})
        payloadConfig = dict()
        for entityType in almEntities:
            payloadConfig[entityType] = dict()
            payload = dict()
            payload['fields'] = ['*']
            entity = entityType
            if entityType in testRunTypes:
                testRunType = testRunTypes[entityType]
                payload['query'] = testRunType.get('query') + " and 'Last Modified Date' >= '%s' and 'Last Modified Date' < '%s'"
                entity = 'test-runs'
                payloadConfig[entityType]['automation'] = testRunType.get('automation')
            else:
                payload['query'] = "'Last Modified Date' >= '%s' and 'Last Modified Date' < '%s'"
            payload['object_type'] = entity
            payloadConfig[entityType]['payload'] = json.dumps(payload)
            payloadConfig[entityType]['entity'] = entity
        token = self.login()
        bearerToken = 'bearer ' + token if token else None
        apiHeaders = {'Content-Type': 'application/json', 'accept': 'application/json', 'Authorization': bearerToken}
        projectData = self.getResponse(baseUrl + "/api/v3/projects?assigned=false", 'GET', None, None, None, None, apiHeaders)
        injectData = dict()
        try:
            for project in projectData:
                projectId = project.get('id', -1)
                projectIdStr = str(projectId)
                projectName = project.get('name', '')
                projectUrl = baseUrl + '/api/v3/projects/' + projectIdStr
                searchUrl = projectUrl + '/search?page={0}&pageSize={1}'
                historyUrl = projectUrl + "/histories?page={0}&pageSize={1}"
                if projectIdStr not in self.tracking:
                    self.tracking[projectIdStr] = dict()
                projectTrackingDetails = self.tracking[projectIdStr]
                injectData['projectId'] = projectId
                injectData['projectName'] = projectName
                for entity in payloadConfig:
                    idList = list()
                    toolsData = list()
                    responseTemplate = almEntities[entity]
                    if entity not in projectTrackingDetails:
                        lastTracked = startFrom
                        lastTrackedDate = startFromDate
                        projectTrackingDetails[entity] = dict()
                    else:
                        lastTracked = projectTrackingDetails[entity].get('lastModificationDate', startFrom)
                        lastTrackedDate = parser.parse(lastTracked, ignoretz=True)
                    entityConfig = payloadConfig[entity]
                    injectData['almType'] = entityConfig['entity']
                    if 'automation' in entityConfig:
                        injectData['automation'] = payloadConfig[entity]['automation']

                    batchStartDate = lastTrackedDate
                    while batchStartDate <= currentDateTime:
                        batchEndDate = batchStartDate + datetime.timedelta(1)
                        batchStartDateStr = batchStartDate.strftime("%Y-%m-%dT%H:%M:%S") + '+00:00'
                        batchEndDateStr = batchEndDate.strftime("%Y-%m-%dT%H:%M:%S") + '+00:00'
                        payload = entityConfig['payload'] % (batchStartDateStr, batchEndDateStr)
                        nextResponse, page = True, 1
                        pageSetFlag, totalPage = False, 0
                        while nextResponse:
                            response = dict()
                            try:
                                url = searchUrl.format(page, pageSize)
                                response = self.getResponse(url, 'POST', None, None, payload, None, apiHeaders)
                                if not pageSetFlag:
                                    total = response.get('total', 0)
                                    totalPage = int(math.ceil(float(total) / 100))
                                    pageSetFlag = True
                                    if total >= pageSize:
                                        self.loadBalancing(projectIdStr, entity, searchUrl, batchStartDate, batchEndDate, lastTracked,
                                                           entityConfig['payload'], apiHeaders, injectData)
                                        break
                            except Exception as err:
                                logging.error(err)
                                if 'invalid_token' in err.message:
                                    token = self.login()
                                    bearerToken = 'bearer ' + token
                                    apiHeaders['Authorization'] = bearerToken
                                    continue
                            responseData = response.get('items', None)
                            if responseData:
                                for response in responseData:
                                    lastModified = response.get('last_modified_date', None)
                                    lastModifiedDate = parser.parse(lastModified, ignoretz=True)
                                    if lastModifiedDate > lastTrackedDate:
                                        lastTrackedDate = lastModifiedDate
                                        lastTracked = lastModified
                                    responseId = response.get('id')
                                    idList.append(responseId)
                                    if injectData['almType'] == 'requirements':
                                        injectData['jiraKey'] = response.get('name', '').split(' ')[0]
                                    for entityProperty in response.get('properties', []):
                                        if entityProperty.get('field_name', None):
                                            injectData[str(entityProperty.get('field_name').lower()).replace(' ', '')] = entityProperty.get('field_value_name')
                                    toolsData += self.parseResponse(responseTemplate, response, injectData)
                                if totalPage == page:
                                    pageSetFlag, nextResponse = False, False
                            else:
                                pageSetFlag, nextResponse = False, False
                            page = page + 1
                        batchStartDate = batchEndDate
                    if isHistoryApi and entity == 'test-cases' and idList:
                        automationData = self.automationTypeHistory(historyUrl, projectId, entity, automationType, apiHeaders, idList, idChunkSize, pageSize)
                        if automationData:
                            toolsData += automationData
                    if toolsData:
                        self.publishToolsData(toolsData, metadata)
                        if entity in projectTrackingDetails and 'idList' in projectTrackingDetails[entity]:
                            idList += projectTrackingDetails[entity]['idList']
                            idList = list(set(idList))
                        projectTrackingDetails[entity] = {'idList': idList, 'lastModificationDate': lastTracked}
                        self.updateTrackingJson(self.tracking)
        except Exception as err:
            logging.error(err)
        finally:
            self.logout(token, baseUrl)

    def getTotalRecords(self, startDate, endDate, searchUrl, entityPayload, apiHeaders):
        url = searchUrl.format(1, 1)
        startDateStr = startDate.strftime("%Y-%m-%dT%H:%M:%S") + '+00:00'
        endDateStr = endDate.strftime("%Y-%m-%dT%H:%M:%S") + '+00:00'
        payload = entityPayload % (startDateStr, endDateStr)
        try:
            response = self.getResponse(url, 'POST', None, None, payload, None, apiHeaders)
            return response.get('total', 0)
        except Exception as err:
            logging.error(err)
            if 'invalid_token' in err.message:
                token = self.login()
                bearerToken = 'bearer ' + token
                apiHeaders['Authorization'] = bearerToken
                if token:
                    response = self.getResponse(url, 'POST', None, None, payload, None, apiHeaders)
                    return response.get('total', 0)
        return 0

    @staticmethod
    def depthDecisionMaker(depthLevel, **kwargs):
        param = dict()
        if depthLevel == 0:
            param['hours'] = kwargs.get('hours', 24) / 2
            if param['hours'] == 0:
                depthLevel += 1
        if depthLevel == 1:
            param['minutes'] = kwargs.get('minutes', 60) / 2
            if param['minutes'] == 0:
                depthLevel += 1
        if depthLevel == 2:
            param['seconds'] = kwargs.get('seconds', 60) / 2
            if param['seconds'] == 0:
                depthLevel += 1
        return depthLevel, param

    def loadBalancer(self, startDate, endDate, searchUrl, payload, apiHeaders, maxDepth=2, depthLevel=0, maxRecords=100, **kwargs):
        total = self.getTotalRecords(startDate, endDate, searchUrl, payload, apiHeaders)
        if total >= maxRecords:
            depthLevel, param = self.depthDecisionMaker(depthLevel, **kwargs)
            if maxDepth > depthLevel:
                return self.loadBalancer(startDate, startDate + datetime.timedelta(**param), searchUrl, payload, apiHeaders,
                                         maxDepth, depthLevel, maxRecords, **param)
            else:
                logging.error("depth need to be incremented for the period %s, %s" % (startDate, endDate) + " total=%s" % total)
        return endDate

    def loadBalancing(self, projectId, entity, searchUrl, batchStartDate, batchEndDate,
                      lastTracked, entityPayload, apiHeaders, injectData):
        pageSize = self.config.get('responsePageSize', 99)
        dynamicTemplate = self.config.get("dynamicTemplate", {})
        almEntities = dynamicTemplate.get('almEntities', {})
        metadata = dynamicTemplate.get("almEntityMetaData", None)
        if entity not in self.tracking[projectId]:
            self.tracking[projectId][entity] = dict()
        entityTrackingDetails = self.tracking[projectId][entity]
        responseTemplate = almEntities[entity]
        idList = entityTrackingDetails.get('idList', list())
        lastTrackedDate = parser.parse(lastTracked, ignoretz=True)
        endDate = batchStartDate
        try:
            while endDate < batchEndDate:
                toolsData = list()
                startDate = endDate
                endDate = self.loadBalancer(endDate, batchEndDate, searchUrl, entityPayload, apiHeaders, maxDepth=3, maxRecords=pageSize)
                startDateStr = startDate.strftime("%Y-%m-%dT%H:%M:%S") + '+00:00'
                endDateStr = endDate.strftime("%Y-%m-%dT%H:%M:%S") + '+00:00'
                payload = entityPayload % (startDateStr, endDateStr)
                nextResponse, page = True, 1
                pageSetFlag, totalPage = False, 0
                while nextResponse:
                    response = dict()
                    try:
                        url = searchUrl.format(page, pageSize)
                        response = self.getResponse(url, 'POST', None, None, payload, None, apiHeaders)
                        if not pageSetFlag:
                            total = response.get('total', 0)
                            totalPage = int(math.ceil(float(total) / 100))
                            pageSetFlag = True
                    except Exception as err:
                        logging.error(err)
                        if 'invalid_token' in err.message:
                            token = self.login()
                            bearerToken = 'bearer ' + token
                            apiHeaders['Authorization'] = bearerToken
                            continue
                    responseData = response.get('items', None)
                    if responseData:
                        for response in responseData:
                            lastModified = response.get('last_modified_date', None)
                            lastModifiedDate = parser.parse(lastModified, ignoretz=True)
                            if lastModifiedDate > lastTrackedDate:
                                lastTrackedDate = lastModifiedDate
                                lastTracked = lastModified
                            responseId = response.get('id')
                            idList.append(responseId)
                            if injectData['almType'] == 'requirements':
                                injectData['jiraKey'] = response.get('name', '').split(' ')[0]
                            for entityProperty in response.get('properties', []):
                                if entityProperty.get('field_name', None):
                                    injectData[str(entityProperty.get('field_name').lower()).replace(' ', '')] = entityProperty.get('field_value_name')
                            toolsData += self.parseResponse(responseTemplate, response, injectData)
                        if totalPage == page:
                            pageSetFlag, nextResponse = False, False
                    else:
                        pageSetFlag, nextResponse = False, False
                    page = page + 1
                if toolsData:
                    self.publishToolsData(toolsData, metadata)
                    projectTrackingDetails = self.tracking[projectId]
                    if entity in projectTrackingDetails and 'idList' in projectTrackingDetails[entity]:
                        idList += projectTrackingDetails[entity]['idList']
                        idList = list(set(idList))
                    projectTrackingDetails[entity] = {'idList': idList, 'lastModificationDate': lastTracked}
                    self.updateTrackingJson(self.tracking)
        except Exception as err:
            logging.error(err)

    def scheduleExtensions(self):
        extensions = self.config.get('dynamicTemplate', {}).get('extensions', None)
        if extensions:
            linkedArtifacts = extensions.get('linkedArtifacts', None)
            if linkedArtifacts:
                self.registerExtension('linkedArtifacts', self.retrieveLinkedArtifacts, linkedArtifacts.get('runSchedule'))

    def login(self):
        baseUrl = self.config.get('baseUrl', '')
        userName = self.config.get('username', '')
        password = self.config.get('password', '')
        encodeKey = 'InSightsAlmAgent:'
        authKey = base64.b64encode(encodeKey.encode('utf-8'))
        headers = {'accept': 'application/json', 'content-type': 'application/x-www-form-urlencoded', 'authorization': 'Basic ' + authKey}
        payload = 'grant_type=password&username=' + userName + '&password=' + password
        response = self.getResponse(baseUrl + '/oauth/token', 'POST', None, None, payload, None, headers)
        if "error" in response:
            logging.error(response)
        return response.get("access_token", None)

    def automationTypeHistory(self, historyUrl, projectId, entityType, automationType, headers, idList, idChunkSize, pageSize):
        try:
            automationData = list()
            payload = json.dumps({"object_type": entityType, "fields": ["*"], "object_query": "%s"})
            objectQueryChunks = self.constructHistoryObjectQuery(idList, idChunkSize)
            automationTimeDict = dict()
            for idChunk in objectQueryChunks:
                nextResponse = True
                page = 1
                payloadData = payload % idChunk
                pageSetFlag, totalPage = False, 0
                while nextResponse:
                    historyResponse = dict()
                    try:
                        url = historyUrl.format(page, pageSize)
                        historyResponse = self.getResponse(url, "POST", None, None, payloadData, None, headers)
                        if not pageSetFlag:
                            total = historyResponse.get('total', 0)
                            totalPage = int(math.ceil(float(total) / 100))
                            pageSetFlag = True
                    except Exception as err:
                        logging.error(err)
                    finally:
                        if 'items' in historyResponse and historyResponse['items']:
                            changeHistoryList = historyResponse.get('items')
                            for changeHistory in changeHistoryList:
                                changesList = changeHistory.get('changes', [])
                                for changedField in changesList:
                                    if changedField.get('field', None) == automationType['field'] and changedField.get('new_value', None) == automationType['newValue']:
                                        resId = changeHistory.get('linked_object', {}).get('object_id', -1)
                                        automationTime = parser.parse(changeHistory['created'], ignoretz=True)
                                        if resId not in automationTimeDict:
                                            automationTimeDict[resId] = ""
                                        automation = automationTimeDict[resId]
                                        if automation == "" or automation > automationTime:
                                            automationTimeDict[resId] = automationTime
                            if totalPage == page:
                                pageSetFlag, nextResponse = False, False
                        else:
                            pageSetFlag, nextResponse = False, False
                        page = page + 1
            for resId in automationTimeDict:
                data = dict()
                data["projectId"] = projectId
                data["almType"] = entityType
                data["id"] = resId
                data["automationTime"] = automationTimeDict[resId].strftime(self.config.get('timeStampFormat'))
                automationData.append(data)
            return automationData

        except Exception as err:
            logging.error(err)

    @staticmethod
    def _ConstructHistoryObjectQuery(entityIdList):
        objectQuery = str()
        entityIdListLen = len(entityIdList)
        for index in range(0, entityIdListLen):
            entityId = entityIdList[index]
            objectQuery += '\'id\' = \'' + str(entityId) + '\''
            if index != entityIdListLen - 1:
                objectQuery += ' or '
        return objectQuery

    def constructHistoryObjectQuery(self, idList, idChunkSize):
        if len(idList) > idChunkSize:
            objectQueryList = list()
            chunks = list()
            for responseId in range(0, len(idList), idChunkSize):
                chunks.append(idList[responseId: responseId + idChunkSize])
            for chunk in chunks:
                objectQueryList.append(self._ConstructHistoryObjectQuery(chunk))
            return objectQueryList
        else:
            return [self._ConstructHistoryObjectQuery(idList), ]

    def retrieveLinkedArtifacts(self):
        baseUrl = self.config.get('baseUrl', '')
        pageSize = self.config.get('responsePageSize', 99)
        dynamicTemplate = self.config.get("dynamicTemplate", {})
        linkedArtifacts = dynamicTemplate.get('extensions', {}).get('linkedArtifacts', None)
        token = self.login()
        bearerToken = 'bearer ' + token if token else None
        apiHeaders = {'Content-Type': 'application/json', 'accept': 'application/json', 'Authorization': bearerToken}
        trackingDetails = self.tracking
        testRunTypes = dynamicTemplate.get('testRunsType', {})
        try:
            for project in trackingDetails:
                projectTrackingDetails = trackingDetails.get(project)
                almEntities = sorted(projectTrackingDetails.keys(), reverse=True)
                testCaseIds = list()
                for almEntity in almEntities:
                    data = list()
                    entity = almEntity
                    if almEntity in linkedArtifacts.get('almEntities', None):
                        entityTrackingDetails = projectTrackingDetails.get(almEntity)
                        idList = entityTrackingDetails.get('idList', None)
                        if idList is None:
                            continue
                        try:
                            if almEntity in testRunTypes:
                                entity = 'test-runs'
                            dictIsNotEmpty = True
                            start = 0
                            end = pageSize
                            while dictIsNotEmpty:
                                idListStr = str(idList[start:end])[1: -1]
                                linkedArtifactUrl = "{}/api/v3/projects/{}/linked-artifacts?type={}&ids={}".format(baseUrl, str(project), entity, idListStr)
                                entityTypeResponse = self.getResponse(linkedArtifactUrl, 'GET', None, None, None, None, apiHeaders)
                                for res in entityTypeResponse:
                                    parentId = res.get('id', None)
                                    injectData = dict()
                                    injectData['id'] = parentId
                                    injectData['projectId'] = int(project)
                                    injectData['almType'] = 'linked-objects'
                                    injectData['almParentType'] = entity
                                    if len(res.get('objects', [])) > 0:
                                        injectData['isLinked'] = True
                                        for link in res.get('objects', None):
                                            linkType = (link.get('self', None).split('/')[-2]).replace('-', '')
                                            linkId = link.get('id')
                                            if linkType == 'testcases':
                                                testCaseIds.append(linkId)
                                            if linkType not in injectData:
                                                injectData[linkType] = [linkId]
                                            else:
                                                injectData[linkType].append(linkId)
                                    else:
                                        injectData['isLinked'] = False
                                    data.append(injectData)
                                start = end
                                end = end + pageSize
                                if len(idList[start:end]) == 0:
                                    dictIsNotEmpty = False
                        except Exception as err:
                            logging.error(err)
                        finally:
                            entityTrackingDetails.pop('idList')
                    if data:
                        metadata = self.config.get("dynamicTemplate", {}).get('extensions', {}).get('linkedArtifacts', {}).get("almEntityMetaData", None)
                        self.publishToolsData(data, metadata)
                        if almEntity in testRunTypes and testCaseIds:
                            idData = projectTrackingDetails.get('test-cases', {}).get('idList', []) + testCaseIds
                            idData = list(set(idData))
                            if 'test-cases' in projectTrackingDetails:
                                testCaseConfig = projectTrackingDetails['test-cases']
                                testCaseConfig['idList'] = idData
                            else:
                                projectTrackingDetails['test-cases'] = dict()
                                projectTrackingDetails['test-cases']['idList'] = idData
                        self.updateTrackingJson(self.tracking)
        except Exception as ex1:
            logging.error(ex1)
        finally:
            self.logout(token, baseUrl)

    def logout(self, token, baseUrl):
        headerTokenRevoke = {"Authorization": "bearer "+str(token)+""}
        self.getResponse(baseUrl+"/oauth/revoke", 'POST', None, None, None, None, headerTokenRevoke)


if __name__ == '__main__':
    QtestAgent()
