FROM node:alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY api .
COPY package*.json /usr/src/app/
RUN npm install
EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]