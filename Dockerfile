FROM node:21
WORKDIR /usr/src/app
COPY . .
RUN npm install -g pg
RUN yarn
EXPOSE 3000
CMD ["yarn", "start"]
