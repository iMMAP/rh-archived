FROM node:alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY api/node_modules /usr/src/app/node_modules
COPY api/package.json /usr/src/app/package.json
RUN npm install
# .dockerignore will ignore node_modules folder
COPY api /usr/src/app
EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]