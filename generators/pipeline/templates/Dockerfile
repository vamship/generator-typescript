FROM node:10.15.3-alpine

ARG APP_NAME
ARG APP_DESCRIPTION
ARG APP_VERSION
ARG CONFIG_NAME
ARG BUILD_TIMESTAMP
ARG NPM_TOKEN

# Metadata
LABEL org.label-schema.name=$APP_NAME \
      org.label-schema.description=$APP_DESCRIPTION \
      org.label-schema.version=$APP_VERSION \
      org.label-schema.build-date=$BUILD_TIMESTAMP \
      org.label-schema.vcs-url="https://<%= gitUrl %>" \
<% if(dockerCustomRegistry) { -%>
      org.label-schema.url="<%= dockerCustomRegistry %>/<%= projectNamespacedName.replace(/^@/, '') %>"
<% } else { -%>
      org.label-schema.url="https://hub.docker.com/r/<%= projectNamespacedName.replace(/^@/, '') %>"
<% } -%>

RUN mkdir -p app/logs

COPY ./dist app/dist
COPY ./.${CONFIG_NAME}rc app/.${CONFIG_NAME}rc
COPY ./package.json app/package.json
COPY ./package-lock.json app/package-lock.json

WORKDIR app

ENV NODE_ENV=production
RUN npm install --registry https://npm-proxy.fury.io/${NPM_TOKEN}/analogdevices/
#RUN ["npm", "install", "-g", "."]

# ENTRYPOINT ["<%= projectCliName %>"]
CMD ["npm", "start"]

