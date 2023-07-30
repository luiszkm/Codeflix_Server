FROM node:20-slim

RUN apt-get update && apt-get install --no-install-recommends -y \
  git gpg gnupg gpg-agent socat

WORKDIR /home/node/app

USER node

CMD [ "sh", "-c", "npm install && tail -f /dev/null" ]