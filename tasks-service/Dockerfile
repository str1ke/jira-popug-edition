FROM node:lts-alpine

RUN apk --no-cache -U upgrade

ENV APP_DIR /opt/app

RUN mkdir $APP_DIR
RUN chown node:node $APP_DIR
WORKDIR $APP_DIR

USER node
EXPOSE 3000

CMD [ "yarn", "dev" ]