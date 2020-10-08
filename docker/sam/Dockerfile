FROM python:alpine

RUN apk update && \
    apk upgrade && \
    apk add bash && \
    apk add --no-cache --virtual build-deps build-base gcc && \
    pip install aws-sam-cli && \
    apk del build-deps

RUN apk add --update nodejs nodejs-npm

RUN mkdir /app

WORKDIR /app

EXPOSE 3000

ENTRYPOINT ["/usr/local/bin/sam", "local", "start-api", "--port", "3000"]
