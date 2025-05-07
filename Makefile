.PHONY: build start

build:
	cd frontend && npm ci && npm run build

start:
	npm start
