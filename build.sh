chmod -R +x scripts/*
git pull
chmod -R +x docker-*.sh
docker rmi -f negex/eticos-torres
docker build -t negex/eticos-torres .

docker image tag negex/eticos-torres registry.eticosweb.net/eticos-torres
docker push registry.eticosweb.net/eticos-torres
docker rmi -f negex/eticos-torres
docker pull registry.eticosweb.net/eticos-torres