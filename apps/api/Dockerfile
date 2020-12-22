#* ###########################
#* ##### Stage 0: Base #######
#* ###########################
FROM node:12.18.1-buster-slim as base

# Ensure container is up to date
RUN apt-get update && apt-get install --no-install-recommends --yes openssl

# Set Timezone to Pacific
ENV TZ=America/Los_Angeles
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Establish working directory to contain application
WORKDIR /app

#* ###########################
#* #### Stage 1: Builder #####
#* ###########################
FROM base as builder

# Copy build tools and configuration files
COPY package.json nest-cli.json tsconfig*.json yarn.lock ./
COPY apps/api/tsconfig.app.json ./apps/api/tsconfig.app.json

# Install production dependencies
# Note: Installing and copying these files to a temporary holding folder allows
#       us to exclude unneccessary dev dependencies from the final resulting image
RUN yarn install --production --pure-lockfile
RUN mkdir tmp && cp -a ./node_modules/. ./tmp/node_modules

# Install dev depdendencies
RUN yarn install --pure-lockfile

# Copy libraries
COPY libs ./libs

# Copy app source
COPY apps/api/src ./apps/api/src

# Build production app
RUN yarn nest build api

#* ###########################
#* #### Stage 2: Runner ######
#* ###########################
FROM base as runner

# Set the Node env to production
ENV NODE_ENV=production

# Copy production depdendencies
COPY --from=builder /app/tmp/node_modules ./node_modules

# Copy compiled app
COPY --from=builder /app/dist/apps/api ./dist

# Expose port 4000 for connections
EXPOSE 4000

# Run the app using `node dist/main.js`
CMD [ "node", "dist/main.js" ]