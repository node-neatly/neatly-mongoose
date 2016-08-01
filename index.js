'use strict';


const Mongoose = require('mongoose').Mongoose;
const neatly = require('neatly');

const mod = module.exports = neatly.module('mongoose');



mod.provider('mongoose', function() {

	let instance;
	let config;

	this.setInstance = (_instance) => instance = _instance;
	this.setConfig = (_config) => config = _config;


	// Service-Factory
	this.$get = function($ext) {

		if(!instance) {
			instance = new Mongoose();
		}


		$ext('start', () => new Promise((resolve, reject) => {

			if(!config) {
				throw new Error('mongoose: Missing config');
			}

			if(!config.uri) {
				throw new Error('mongoose: Missing uri');
			}

			instance.Promise = global.Promise;

			instance.connect(config.uri, config.options || {}, function(err, res) {
				if(err) {
					return reject(err);
				}
				resolve(res);
			})

		}));

		return instance;
	};

});

