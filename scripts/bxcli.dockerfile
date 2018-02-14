FROM ubuntu
RUN apt-get update && apt-get install curl -y
RUN curl -fsSL https://clis.ng.bluemix.net/install/linux | sh
RUN bx plugin install Cloud-Functions -r Bluemix
WORKDIR ~/