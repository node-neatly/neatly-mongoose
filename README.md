# neatly-mongoose

mongooseProvider for [neatly](https://www.npmjs.com/package/neatly).


# Install

`npm install --save neatly-mongoose`


# Usage

```javascript
const neatly = require('neatly');

const mod = neatly.module('myModule', [
	require('neatly-mongoose')
]);

// Configure the instance ...
mod.config((mongooseProvider) => mongooseProvider.setConfig({
	// will be passed to mongoose.connect(uri, options)
	uri: 'mongodb://localhost:27017/my-db',
	options: {}
}));

// ... or provide a custom instance
mod.config((mongooseProvider) => mongooseProvider.setInstance(myExistingMongooseInstance));

// Example usage of mongoose instance in a service
mod.service('User', function(mongoose) {
	let Model = mongoose.model('User', new mongoose.Schema({
		// define your schema here
	}));
	
	this.validateSigninCredentials = function(credentials) {
		return Model.findOne({
			email: credentials.email
			// ...
		})
		// ...
	};
});
```

# Provider

- **`setConfig(config)`**

	Set config parameters which will be used to connect to mongodb by executing `mongoose.connect(uri, options)`. Possible attributes are:

	- **`uri`** *(String)* mongodb connection string.
	- **`options`** *(Object)* mongoose connection options.

- **`setInstance(mongooseInstance)`**

	Set a custom or already existing mongoose instance, which will be used as service.


# Service

By default the service will be a new and clean instance of `Mongoose`. In case of providing a custom/already existing one, it will be used as service instance. (see `mongooseProvider.setInstance()`)


# Author

[@platdesign](https://twitter.com/platdesign)
