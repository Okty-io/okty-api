GREEN = $$(tput setaf 2)
YELLOW = $$(tput setaf 3)
RESET = $$(tput sgr0)

all: help

help:                  #~ Show this help
	@fgrep -h "#~"  $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e "s/^\([^:]*\):/${GREEN}\1${RESET}/;s/#~r/${RESET}/;s/#~y/${YELLOW}/;s/#~ //"

#~y
#~ Project Setup
#~ ________________________________________________________________
#~r

install:               #~ Install and start the project
install: build start npm-install

build:                 #~ Build docker containers
	docker-compose build

start:                 #~ Start the docker containers
	docker-compose up -d

stop:                  #~ Stop the docker containers
	docker-compose stop

clean:                 #~ Clean the docker containers
clean: stop
	docker-compose rm

destroy:               #~ Remove all docker images
destroy: stop
	docker-compose down --rmi all

.PHONY: install build npm-install start stop clean destroy


#~y
#~ Node
#~ ________________________________________________________________
#~r


npm-install:      #~ Run npm install.
	docker-compose exec php sh -c "npm install"

.PHONY: npm-install

#~y
#~ Tests
#~ ________________________________________________________________
#~r

test:		# Run the tests
	docker-compose exec sam sh -c "npm run test"


.PHONY: test