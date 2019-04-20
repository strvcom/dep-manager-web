.PHONY: run build in stop clean

SHELL := /bin/bash # Use bash syntax

# Configure environment.
# ----------------------

export USER_ID=$(shell id -u)


# Task declarations.
# ------------------

run:
	touch docker/.bash_history
	docker-compose run --service-ports --rm app

build:
	docker-compose -f docker-compose.yml up -d

in:
	docker exec -it $(shell docker-compose ps -q app) /bin/bash

stop:
	docker-compose stop

clean:
	docker-compose down
	docker rmi dep-manager-web

default: run
