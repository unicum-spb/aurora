run_front: ## Run Vue app
	@cd frontend && \
	yarn serve

run_back: ## Run Node.js app
	@cd backend && \
	yarn start