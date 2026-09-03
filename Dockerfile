FROM node:24

COPY controllers ./controllers
COPY models ./models
COPY routes ./routes
COPY app.js .
COPY package.json .
COPY server.js .

RUN npm install

EXPOSE 3000
CMD ["node", "server.js"]
