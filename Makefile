.PHONY: test build release clean tag buildtag login logout publish
test:
 ${INFO} "Creating cache volume..."
 @ docker volume create --name cache
 ${INFO} "Pulling latest images..."
 @ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) pull
 ${INFO} "Building images..."
 @ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) build --pull test
 ${INFO} "Ensuring database is ready..."
 @ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) run --rm agent
 ${INFO} "Running tests..."
 @ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) up test
 @ docker cp $$(docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) ps -q test):/reports/. reports
 ${CHECK} $(DEV_PROJECT) $(DEV_COMPOSE_FILE) test
 ${INFO} "Testing complete"

# Shell Functions
INFO := @bash -c '\
  printf $(YELLOW); \
  echo "=> $$1"; \
  printf $(NC)' SOME_VALUE
