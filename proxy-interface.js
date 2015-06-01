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
	 * Takes a path, an Array of paths or a single path split in multiple arguments.
	 * Returns the full path to the resource.
	 * @param {string|Array} Single path, Array of paths or the first part
	 * @return {string} Full path to resource
	 */
	resource: function () {

		if (Array.isArray(arguments[0])) {
			return arguments[0].map(proxy.resource);
		}

		if (arguments.length > 1) {
			var normalized = '';

			for (var i = 0; i < arguments.length; i++) {
				var argument = arguments[i];

				// only adds a slash when left arguments don't have it
				if (normalized.charAt(normalized.length - 1) !== '/' && argument.charAt(0) !== '/' && i !== 0) {
					normalized += '/' + argument;
				} else {
					normalized += argument;
				}
			}

			return proxy.resource(normalized);
		}

		throw 'Not Implemented: resource';
	},

	/**
	 * Return path to resourcesDirectory with no trailing slash on the end.
	 * @return {string} Path to resources directory
	 */
	getResourcesDirectory: function () {

		throw 'Not Implemented: getResourcesDirectory';
	},

	/**
	 * Return translation for key or fallback to hint.
	 * @param {string} key  String key
	 * @param {string} hint Fallback
	 */
	L: function (key, hint) {
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
	 * Requires a CommonJS or native module
	 * @param  {string} moduleId Module ID
	 * @return {[type]}          Loaded or cached module
	 */
	require: function (moduleId) {
		throw 'Not Implemented: require';
	},

	UI: {
		
	}

};
