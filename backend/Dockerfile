FROM node:14-alpine

WORKDIR ${WORK_DIR}
COPY . ${WORK_DIR}

EXPOSE ${BACKEND_PORT}

# RUN npm install 

CMD [ "npm", "start" ]