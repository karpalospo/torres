FROM node:16.15
LABEL Raul Castro Palmett <ral.amgstromg@gmail.com>

COPY src / \
     docker-entrypoint.sh /

RUN apt-get update && apt-get install ca-certificates
RUN cd /opt/site \
    && npm install -g npm@9.2.0 \
    && npm install    

EXPOSE 3700

ENTRYPOINT ["/docker-entrypoint.sh"]