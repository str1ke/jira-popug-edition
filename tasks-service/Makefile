run:
	docker compose up

run-infra:
	docker compose up database

run-app:
	docker compose up tasks-service

run-debug:
	DB_DEBUG=true docker compose up

run-cli:
	docker compose run --service-ports --rm tasks-service sh

install-deps:
	docker compose run --rm tasks-service npm install

db-create:
	docker compose run --rm tasks-service sh -c "./bin/create_database.js"

db-drop:
	docker compose run --rm tasks-service sh -c "./bin/drop_database.js"

db-migrate:
	docker compose run --rm tasks-service sh -c "./node_modules/.bin/knex migrate:latest"

db-rollback:
	docker compose run --rm tasks-service sh -c "./node_modules/.bin/knex migrate:down"

db-seed:
	docker compose run --rm tasks-service sh -c "./node_modules/.bin/knex seed:run"

db-migration-create:
	docker compose run --rm tasks-service sh -c "./node_modules/.bin/knex migrate:make migration"

lint:
	docker compose run --rm tasks-service npm run lint

lint-fix:
	docker compose run --rm tasks-service npm run lint:fix

build:
	docker compose build
