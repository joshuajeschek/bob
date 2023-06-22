FROM node:20-bullseye-slim
WORKDIR /bob
COPY package.json yarn.lock tsconfig.json next.config.js .eslintrc.json ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build
EXPOSE 4000
CMD ["yarn", "start"]
