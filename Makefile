run_front: ## Run Vue app
	@cd frontend && \
	yarn serve

run_backend: ## Run Node.js app
	@cd backend && \
	yarn start