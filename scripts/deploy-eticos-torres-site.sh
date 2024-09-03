#!/bin/bash
echo "***** Deploy Eticos - Torres Site ******"

echo "Digite usuario ssh:"
read SSH_USER

REMOTE_DOCKER_HOSTS=${REMOTE_DOCKER_HOSTS:-"10.120.200.208"}
CONTAINER_NAME=${CONTAINER_NAME:-"eticos-torres-site"}
SSH_USER=${SSH_USER:-"despliegue"}

echo "REMOTE_DOCKER_HOSTS=${REMOTE_DOCKER_HOSTS}"
echo "CONTAINER_NAME=${CONTAINER_NAME}"
echo "SSH_USER=${SSH_USER}"

echo "--------------------------------------------------------------------"
echo "Iniciando..."
echo "--------------------------------------------------------------------"

i=0
for host in $REMOTE_DOCKER_HOSTS; do	
    echo "Creating in Host ${host} - ${CONTAINER_NAME}"	

    COMANDO_SSH=' docker rm -f '${CONTAINER_NAME}'; '
    COMANDO_SSH=${COMANDO_SSH}' docker pull registry.eticosweb.net/eticos-torres; '    
	COMANDO_SSH=${COMANDO_SSH}' docker run -d  '
    COMANDO_SSH=${COMANDO_SSH}' -p 3001:3001'
    COMANDO_SSH=${COMANDO_SSH}' --ulimit nofile=65535 --ulimit memlock=9223372036854775807 '
    COMANDO_SSH=${COMANDO_SSH}' -v /etc/localtime:/etc/localtime '
    COMANDO_SSH=${COMANDO_SSH}' --dns=10.120.120.20 --dns=10.120.120.21 --dns=10.40.120.4 --dns=10.60.120.200 --dns-search=eticos.local --dns-search=eticos.com --dns-search=eticosweb.net --dns-search=droguerialaeconomia.com '    
    COMANDO_SSH=${COMANDO_SSH}' --name='${CONTAINER_NAME}' --hostname='${CONTAINER_NAME}' --restart=always registry.eticosweb.net/eticos-torres ; '
    COMANDO_SSH=${COMANDO_SSH}' docker rmi $(docker images | grep "^<none>" | awk "{print $3}"); '
    COMANDO_SSH=${COMANDO_SSH}' exit;'
    ssh -t ${SSH_USER}@${host} 'docker pull registry.eticosweb.net/eticos-torres; exit;'
    ssh -t ${SSH_USER}@${host} ${COMANDO_SSH}  

    i=$((i+1))
	echo "--------------------------------------------------------------------"
	sleep 5  