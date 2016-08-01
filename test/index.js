'use strict';

const Code = require('code');
const expect = Code.expect;

const neatly = require('neatly');
const driller = require('neatly-driller')(neatly);

const Mongoose = require('mongoose').Mongoose;

const mod = require('../');


const init = driller.wrap(mod);



describe('neatly-mongoose', () => {



	describe('provider', () => {

		let provider;
		beforeEach(() => provider = init().get('mongooseProvider'));

		it('should have method setConfig()', () => {
			expect(provider.setConfig)
				.to.be.a.function();
		});

		it('should have method setInstance()', () => {
			expect(provider.setInstance)
				.to.be.a.function();
		});

	});



	describe('service', () => {


		it('should return new mongoose instance as service', () => {

			return init()
				// Mock $ext to avoid registration of start-extension
				// which would validate config and try to connect.
				.start(($extProvider) => {
					$extProvider.$get = () => () => true;
				})
				.then((instance) => {

					expect(instance.get('mongoose'))
						.to.be.instanceOf(Mongoose);

				});


		});


		it('should return custom instance as service', () => {

			let myMongoose = {
				test: 123
			};

			return init((mongooseProvider) => mongooseProvider.setInstance(myMongoose))
				.start(($extProvider) => {
					$extProvider.$get = () => () => true;
				})
				.then((instance) => expect(instance.get('mongoose')).to.equal(myMongoose));

		});

	});

});
