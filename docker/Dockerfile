FROM node:alpine
ARG CLIENT_ID
ARG REDIRECT_URI

ENV REACT_APP_CLIENT_ID $CLIENT_ID
ENV REACT_APP_REDIRECT_URI $REDIRECT_URI
ENV NODE_ENV development

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm i

COPY . ./

RUN ls -l *

EXPOSE 3000

CMD ["npm", "start"]