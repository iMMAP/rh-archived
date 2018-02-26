## STAGE 1: build  ##
# FROM node as builder
FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g @angular/cli && npm install
COPY . .
EXPOSE 4200
CMD ng serve --host 0.0.0.0

# ## STAGE 2: deploy ##
# FROM nginx
# COPY nginx.conf /etc/nginx/conf.d
# RUN rm -R /usr/share/nginx/html/*
# COPY --from=builder /app/dist /usr/share/nginx/html
# EXPOSE 80
# # CMD ["nginx", "-g", "daemon off;"]