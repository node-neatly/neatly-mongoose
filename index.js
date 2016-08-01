'use strict';


const Mongoose = require('mongoose').Mongoose;
const neatly = require('neatly');
const extend = require('extend');

const mod = module.exports = neatly.module('mongoose');



mod.provider('mongoose', function() {

	let instance;
	let config = {
		connectOnStart: true
	};

	this.setInstance = (_instance) => {
		instance = _instance;
		return this;
	};


	this.setConfig = (_config) => {
		config = extend(true, config, _config);
		return this;
	};


	// Service-Factory
	this.$get = function($ext) {

		if(!instance) {
			instance = new Mongoose();
		}

		if(config.connectOnStart) {
			$ext('start', () => new Promise((resolve, reject) => {

				if(!config.uri) {
					throw new Error('mongoose: Missing uri');
				}

				instance.Promise = global.Promise;

				instance.connect(config.uri, config.options || {}, function(err, res) {
					if(err) {
						return reject(err);
					}
					resolve(res);
				});

			}));
		}

		return instance;
	};

});

