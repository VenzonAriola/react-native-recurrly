FROM ubuntu:latest
LABEL authors="venzo"

ENTRYPOINT ["top", "-b"]