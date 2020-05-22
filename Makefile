.DEFAULT_GOAL := help

# make ENVIRONMENT variables available from the makefile
.EXPORT_ALL_VARIABLES:

# uses a real interpreteur
SHELL := /bin/bash

.PHONY: help
help:
	@awk '/^#/{c=substr($$0,3);next}c&&/^[[:alpha:]][[:alnum:]_-]+:/{print substr($$1,1,index($$1,":")),c}1{c=0}' $(MAKEFILE_LIST) | column -s: -t


.PHONY: run
# run
run: clean
	docker-compose down && docker-compose build --no-cache && docker-compose up

.PHONY: clean
# clean
clean:
	rm .migrate || true
