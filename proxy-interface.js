var proxy = module.exports = {

	events: {

		/**
		 * Adds a global event listener.
		 * @param {string}   ns       Global NS to listen on (App, Gesture or Geolocation)
		 * @param {string}   name     Event name
		 * @param {Function} callback Event callback
		 */
		addEventListener: function (ns, name, callback) {
			throw 'Not Implemented: addEventListener';
		},

		/**
		 * Removes a global event listener.
		 * @param  {string}   ns       Global NS to listen on (App, Gesture or Geolocation)
		 * @param  {string}   name     Event name
		 * @param  {Function} callback Event callback
		 */
		removeEventListener: function (ns, name, callback) {
			throw 'Not Implemented: removeEventListener';
		},

		/**
		 * Fires a global event listener.
		 * @param  {string}   ns       Global NS to listen on (App, Gesture or Geolocation)
		 * @param  {string}   name     Event name
		 * @param  {Object}   event    Event payload
		 */
		fireEvent: function (ns, name, event) {
			throw 'Not Implemented: fireEvent';
		}
	},

	/**
	 * Receives an uncaught exception.
	 * @param  {Object} exc           Exception caught
	 * @param  {string} exec.filename Filename in which the exception was thrown
	 * @param  {string} exec.error    The original error
	 */
	exception: function (exc) {
		throw 'Not Implemented: exception';
	},

	/**
	 * Takes a path, an Array of paths or a single path split in multiple arguments.
	 * Returns the full path to the resource or the resourcesDirectory if no arguments are given.
	 * @param {string|Array} Single path, Array of paths, the first of multiple parts of a part or none for the resourceDirectory
	 * @return {string} Full path to resource
	 */
	resource: function () {

		if (arguments.length === 0) {
			return proxy._resource();
		}

		if (Array.isArray(arguments[0])) {
			return arguments[0].map(proxy._resource);
		}

		if (arguments.length > 1) {
			var path = '';

			for (var i = 0; i < arguments.length; i++) {
				var argument = arguments[i];

				// only adds a slash when left arguments don't have it
				if (path.charAt(path.length - 1) !== '/' && argument.charAt(0) !== '/' && i !== 0) {
					path += '/' + argument;
				} else {
					path += argument;
				}
			}

			return proxy._resource(path);
		}

		return proxy._resource(arguments[0]);
	},

	_resource: function (path) {

		// return path to codebase
		if (!path) {
			throw 'Not Implemented: resource';

			// return parth to resource
		} else {
			throw 'Not Implemented: resource';
		}
	},

	// since the proxy interface keys are identical to the options
	// setting include to true here will enable it if you pass the proxy
	// instead of a normal options object
	include: true,

	// will collect globals
	globals: {},

	/**
	 * Return translation for key or fallback to hint.
	 * @param {string} key  String key
	 * @param {string} hint Fallback
	 */
	i18n: function (key, hint) {
		throw 'Not Implemented: L';
	},

	/**
	 * Log a message. Should be able to take multiple arguments, first being the level.
	 * @param  {string} level   Level to log at
	 * @param  {string} message Message to log
	 */
	log: function (level, message) {
		throw 'Not Implemented: log';
	},

	/**
	 * Requires a CommonJS or native module.
	 * @param  {string} moduleId Module ID
	 * @return {[type]}          Loaded or cached module
	 */
	require: function (moduleId) {
		throw 'Not Implemented: require';
	},

	/**
	 * Calls a Ti.UI factory and returns the view.
	 * @param {[type]} ns      [description]
	 * @param {[type]} factory [description]
	 */
	UI: function (ns, factory) {
		throw 'Not Implemented: UI';
	}

};
