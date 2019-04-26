FROM centos
MAINTAINER Insights
ADD insights_wrapper.sh /opt
RUN chmod -R 755 /opt/*
ENTRYPOINT ["/opt/insights_wrapper.sh"]
