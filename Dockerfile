FROM node:12.2.0-alpine as build

# 1. Setup environemnt
# --------------------

  RUN apk --no-cache add \
    git \
    tig \
    # openssh \
    nano \
    bash
    # ca-certificates \
    # groff \
    # less \
    # curl \
    # gzip \
    # htop \
    # sudo \
    # vim \
    # wget \
    # unzip

  USER node

  # Ensure directory is owned by user "node"
  RUN mkdir /home/node/app
  WORKDIR /home/node/app


# 2. Install dependencies
# -----------------------

  COPY package.json yarn.lock .env.sample ./
  COPY patches/ ./patches
  COPY scripts/ ./scripts
  RUN yarn


# 3. Setup shell 
# --------------

  COPY ./docker/.bashrc /home/node/.bashrc


# 4. Setup execution
# ------------------

  COPY --chown=node . .
  ENV NODE_ENV production

  CMD ["yarn", "start"]
