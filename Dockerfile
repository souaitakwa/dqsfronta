FROM node:14 as build

WORKDIR /app

COPY . /app

RUN npm install 

RUN npm install -g xlsx

RUN npm install -g @angular/cli

EXPOSE 4200

ENTRYPOINT ng serve --host 0.0.0.0


