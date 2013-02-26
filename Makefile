TESTS = test/*.js
EXAMPLE = example/*.js
REPORTER = dot

test: jshint test-unit

jshint:
	@./node_modules/.bin/jshint $(EXAMPLE) --config .jshintrc
	@./node_modules/.bin/jshint $(TESTS) --config .jshintrc
	@./node_modules/.bin/jshint backbone.mongoose.js --config .jshintrc

test-unit:
	@./node_modules/.bin/mocha \
		--require should \
		--reporter $(REPORTER) \
		--growl \
		$(TESTS)

.PHONY: test jshint test-unit bench
