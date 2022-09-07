FROM kikobeats/docker-vips:latest

# Build Args
ARG NODE_ENV=development

# Application parameters and variables
ENV NODE_ENV=${NODE_ENV}

COPY package.json .

RUN npm install

COPY . .
