Docker Image for Insights:

(1). This Docker image consists of tools used for Insights Build , Slack Plugin for notification to slack post build.
(2). settings.xml with sonar, nexus and tomcat urls and credentials are now moved to Buildon python Framework folder. 
(3). Removed insights pem file, tini-static
(4). Version used in Dockerfile : Ubuntu 16.04, Jenkins version 2.121.1 , nodejs https://deb.nodesource.com/setup_8.x , maven 3.3.9 , openjdk-8-jdk