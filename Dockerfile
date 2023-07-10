FROM mcr.microsoft.com/devcontainers/javascript-node:0-20 AS build
ARG REACT_APP_BACKEND_URL
WORKDIR /code
COPY ./app ./app
COPY package.json .
COPY package-lock.json .
RUN cd app/frontend && npm install --include=dev
RUN cd app/frontend && REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL npm run build
RUN cd app/frontend && CI=1 npm run test

FROM node
WORKDIR /code

COPY --from=build /code/dist ./build
RUN npm install -g serve

ENTRYPOINT serve -s build