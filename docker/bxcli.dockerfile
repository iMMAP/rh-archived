FROM ubuntu
# File Author / Maintainer
MAINTAINER Mohammed Sallam

#Install CURL
RUN apt-get update && apt-get install curl -y

#Install Bluemix CLI
RUN curl -fsSL https://clis.ng.bluemix.net/install/linux | sh

#Install Bluemix Cloud-Functions CLI Plugin
RUN bx plugin install Cloud-Functions -r Bluemix

WORKDIR ~/