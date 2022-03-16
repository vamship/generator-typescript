FROM nginx:alpine

ARG APP_NAME
ARG APP_DESCRIPTION
ARG APP_VERSION

# Metadata
LABEL org.label-schema.name=$APP_NAME \
      org.label-schema.description=$APP_DESCRIPTION \
      org.label-schema.version=$APP_VERSION \
      org.label-schema.vcs-url="https://<%= gitUrl %>" \
      org.label-schema.url="<%= dockerRepoHome %>"

LABEL maintainer="<%= authorName %> <<%= authorEmail %>>"

COPY . /usr/share/nginx/html
RUN chmod +x /usr/share/nginx/html/launch.sh
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

ENTRYPOINT [ "/usr/share/nginx/html/launch.sh" ]
