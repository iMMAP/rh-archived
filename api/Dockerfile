FROM node:6.12
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
COPY package*.json /usr/src/app/
RUN npm install
EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]