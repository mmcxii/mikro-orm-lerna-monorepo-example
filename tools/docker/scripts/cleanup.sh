RUNNING_CONTAINERS=$(docker ps -aq)

if [ -z $RUNNING_CONTAINERS ]
  then
    echo "No containers running, proceeding."
  else
    docker stop $(docker ps -aq)
    docker rm $(docker ps -aq)
    echo "All running containers stopped, proceeding."
fi