## STAGE 1: build  ##
FROM node:alpine as builder
WORKDIR /usr/src/app
RUN npm install yarn -g && yarn global add @angular/cli && ng set --global packageManager=yarn
COPY package*.json ./
RUN yarn install
COPY . .
RUN ng build --prod

## STAGE 2: deploy ##
FROM nginx
COPY nginx.conf /etc/nginx/conf.d
RUN rm -R /usr/share/nginx/html/*
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]