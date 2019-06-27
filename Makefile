SHELL := /bin/bash
.PHONY: run build in stop clean

install:
	docker-compose run --service-ports --rm app yarn

run:
	touch docker/.bash_history
	docker-compose run --service-ports --rm app

start:
	docker-compose run --service-ports --rm app yarn start

build:
	docker-compose build

in:
	docker exec -it $(shell docker-compose ps -q app) /bin/bash

stop:
	docker-compose stop

clean:
	docker-compose down
	docker-compose down --remove-orphans -v --rmi all

default: run
