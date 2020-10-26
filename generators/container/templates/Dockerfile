FROM alpine:3.11

ARG APP_NAME
ARG APP_DESCRIPTION
ARG APP_VERSION
ARG BUILD_TIMESTAMP

# Metadata
LABEL org.label-schema.name=$APP_NAME \
      org.label-schema.description=$APP_DESCRIPTION \
      org.label-schema.version=$APP_VERSION \
      org.label-schema.build-date=$BUILD_TIMESTAMP \
      org.label-schema.vcs-url="https://<%= gitUrl %>" \
      org.label-schema.url="<%= dockerRepoHome %>"

ENTRYPOINT ["/bin/sh"]
