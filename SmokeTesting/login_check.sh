#!/bin/bash
myextip=$(wget -qO- icanhazip.com)
echo $myextip
TEST="curl -X POST -u admin:admin --header \"Authorization: Basic token\" http://${myextip}:8080/PlatformService/user/authenticate"
#echo $TEST

RESPONSE=`$TEST`
echo "Testing"
echo $RESPONSE


if [[ $RESPONSE = *"\"status\":\"SUCCESS\""* ]]; then
  echo "Login is working with $TEST" >> login.log
else
  echo "Login is not working TEST" >> login.log
fi
mq_test="curl -X GET -u iSight:iSight http://localhost:15672/api/queues"
queue_limit=1
RESPONSE=`$mq_test`

for row in $(echo "${RESPONSE}" | jq -r '.[] | @base64'); do
    _jq() {
     echo ${row} | base64 --decode | jq -r ${1}
    }

   queue_size=$(_jq '.messages')
   if [[ $queue_size -gt $queue_limit ]]; then
       echo $(_jq '.name') >> login.log
       echo $queue_size >> login.log
       echo "This is more than expected" >> login.log
   fi
done