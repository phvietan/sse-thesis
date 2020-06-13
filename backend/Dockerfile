FROM node:14-alpine

MAINTAINER anpham

ARG WORK_DIR
ARG BACKEND_PORT

WORKDIR $WORK_DIR
EXPOSE $BACKEND_PORT

# RUN npm install

RUN npm install -g knex

CMD [ "npm", "start" ]