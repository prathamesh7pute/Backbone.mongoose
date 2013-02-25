TESTS = test/*.js
EXAMPLE = example/*.js
REPORTER = dot

test: jshint test-unit

jshint:
	@./node_modules/.bin/jshint $(EXAMPLE) --config .jshintrc
	@./node_modules/.bin/jshint $(TESTS) --config .jshintrc
	@./node_modules/.bin/jshint Backbone.mongoose.js --config .jshintrc

test-unit:
	@./node_modules/.bin/mocha \
		--require should \
		--reporter $(REPORTER) \
		--growl \
		--timeout 5000 \
		$(TESTS)

.PHONY: test jshint test-unit bench
