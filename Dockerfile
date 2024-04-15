FROM node:20.9.0-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

CMD "yarn" "run" "start:dev"


