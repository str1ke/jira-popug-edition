run:
	docker compose up

run-infra:
	docker compose up database

run-app:
	docker compose up oauth-server

run-debug:
	DB_DEBUG=true docker compose up

run-cli:
	docker compose run --service-ports --rm oauth-server sh

install-deps:
	docker compose run --rm oauth-server npm install

db-create:
	docker compose run --rm oauth-server sh -c "./bin/create_database.js"

db-drop:
	docker compose run --rm oauth-server sh -c "./bin/drop_database.js"

db-migrate:
	docker compose run --rm oauth-server sh -c "./node_modules/.bin/knex migrate:latest"

db-rollback:
	docker compose run --rm oauth-server sh -c "./node_modules/.bin/knex migrate:down"

db-seed:
	docker compose run --rm oauth-server sh -c "./node_modules/.bin/knex seed:run"

db-migration-create:
	docker compose run --rm oauth-server sh -c "./node_modules/.bin/knex migrate:make migration"

lint:
	docker compose run --rm oauth-server npm run lint

lint-fix:
	docker compose run --rm oauth-server npm run lint:fix

build:
	docker compose build
