var UglifyJS = require('uglify-js');

exports.create = function create(options) {
	options = options || {};
	options.ns = options.ns || '__proxy';

	return new UglifyJS.TreeTransformer(null, function (node) {

		if (options.globals) {

			if (node instanceof UglifyJS.AST_SymbolVar && node.global()) {
				var originalName = node.thedef.name;
				node.thedef.name = options.ns + '.globals.' + node.thedef.name;

				return new UglifyJS.AST_VarDef({
					name: new UglifyJS.AST_SymbolConst({
						name: originalName
					}),
					value: node
				});
			}

		}

		if (node instanceof UglifyJS.AST_Call) {

			if (options.require) {

				// require()
				if (node.expression.name === 'require') {
					return functionCall(options.ns + '.require', node.args);
				}
			}

			if (options.log) {

				if (node.expression.start.value === 'console') {

					// console.*()
					if (typeof node.expression.property === 'string') {
						node.args.unshift(new UglifyJS.AST_String({
							value: node.expression.end.value
						}));

						// console[*]()
					} else {
						node.args.unshift(node.expression.property);
					}

					return functionCall(options.ns + '.log', node.args);
				}
			}

			if (options.i18n) {

				// L()
				if (node.expression.name === 'L') {
					return functionCall(options.ns + '.i18n', node.args);
				}
			}

			if (isCallingTi(node)) {

				// Ti.include
				if (options.include) {
					if (node.expression.end.value === 'include' &&
						node.expression.expression.property === undefined) {
						return functionCall('eval', [functionCall('Ti.Filesystem.getFile', [functionCall(options.ns + '.resource', node.args)])]);
					}
				}

				if (options.resource) {

					// Ti.Filesystem.getResourcesDirectory()
					if (node.expression.end.value === 'getResourcesDirectory' &&
						node.expression.expression.property === 'Filesystem') {
						return functionCall(options.ns + '.resource');
					}

					// Ti.Filesystem.getFile()
					if (node.expression.end.value === 'getFile' &&
						node.expression.expression.property === 'Filesystem') {
						node.args = [functionCall(options.ns + '.resource', node.args)];
						return node;
					}

					// Ti.Database.install()
					if (node.expression.end.value === 'install' &&
						node.expression.expression.property === 'Database') {
						node.args[0] = functionCall(options.ns + '.resource', [node.args[0]]);
						return node;
					}
				}

				if (options.i18n) {

					// Locale.getString()
					if (node.expression.end.value === 'getString' &&
						node.expression.expression.property === 'Locale') {
						return functionCall(options.ns + '.i18n', node.args);
					}
				}

				// Ti.*.UI.create*()
				if (options.UI) {

					if (node.expression.end.value.match('^(createWindow|createTabGroup|createAlertDialog|createOptionDialog)$') &&
						node.expression.expression.property === 'UI') {
						return functionCall(options.ns + '.UI.' + node.expression.end.value, node.args);
					}

					if (node.expression.end.value === 'createNavigationWindow' &&
						node.expression.expression.property === 'iOS') {
						return functionCall(options.ns + '.UI.createNavigationWindow', node.args);
					}

					// if (node.expression.end.value.match('^(createSplitWindow|createPopover)$') &&
					// 	node.expression.expression.property === 'iPad') {
					// 	return functionCall(options.ns + '.UI.' + node.expression.end.value, node.args);
					// }
				}

				if (options.events) {

					// Ti.(App|Geolication|Gesture).*Event()
					if (node.expression.end.value.match('^(addEventListener|removeEventListener|fireEvent)$') && ['App', 'Gesture', 'Geolocation'].indexOf(node.expression.expression.property) > -1) {
						return functionCall(options.ns + '.events.' + node.expression.end.value, [new UglifyJS.AST_String({
							value: node.expression.expression.property
						})].concat(node.args));
					}
				}

				if (options.log) {

					if (node.expression.expression.property === 'API') {

						// Ti.API.*()
						if (typeof node.expression.property === 'string') {

							if (node.expression.property !== 'log') {
								node.args.unshift(new UglifyJS.AST_String({
									value: node.expression.end.value
								}));
							}

							// Ti.API[*]()
						} else {
							node.args.unshift(node.expression.property);
						}

						return functionCall(options.ns + '.log', node.args);
					}
				}
			}

			if (options.resource) {

				// setBackgroundImage etc
				if (node.expression.end.value.match('^set') &&
					!doNotTouch(node.args) &&
					node.args[0] !== undefined &&
					couldBeAsset(node.expression.end.value.replace('set', '').toLowerCase())) {
					node.args = [functionCall(options.ns + '.resource', node.args)];
					return node;
				}
			}

		} else if (node instanceof UglifyJS.AST_Assign && node.right) {

			// *.exitOnClose =
			if (node.left.property && node.left.property === 'exitOnClose') {

				if (options.exit) {
					node.right = new UglifyJS.AST_False();
					return node;
				}

				// *.title =
			} else if (node.left.property && node.left.property.match && node.left.property.match('^(title|text)id$')) {

				if (options.i18n) {
					node.left.property = node.left.property.replace('id', '');
					node.right = functionCall(options.ns + '.i18n', [node.right]);
					return node;
				}

				// *.image = 
			} else if (couldBeAsset(node.left.property, node.right) && !doNotTouch(node.right)) {

				if (options.resource) {

					if (node.left.property === 'url' && node.operator === '+=') {
						return node;
					}

					node.right = functionCall(options.ns + '.resource', [node.right]);
					return node;
				}
			}

		} else if (node instanceof UglifyJS.AST_ObjectKeyVal) {

			// exitOnClose
			if (node.key === 'exitOnClose') {

				if (options.exit) {

					console.log('working on it');

					node.value = new UglifyJS.AST_False();
					return node;
				}

			} else if (!doNotTouch(node.value)) {

				// title:
				if (typeof node.key === 'string' && node.key.match('^(title|text)id$')) {

					if (options.i18n) {
						node.key = node.key.replace('id', '');
						node.value = functionCall(options.ns + '.i18n', [node.value]);
						return node;
					}

					// image:
				} else if (couldBeAsset(node.key, node.value)) {

					if (options.resource) {
						node.value = functionCall(options.ns + '.resource', [node.value]);
						return node;
					}
				}
			}

		} else if (node instanceof UglifyJS.AST_PropAccess) {

			if (options.resource) {

				// Ti.Filesystem.getResourcesDirectory()
				if (node.property === 'resourcesDirectory' &&
					node.start.value.match('^Ti(tanium)?$') &&
					node.expression.property === 'Filesystem') {
					return functionCall(options.ns + '.resource');
				}
			}
		}
	});

};

function functionCall(name, args) {
	return new UglifyJS.AST_Call({
		expression: new UglifyJS.AST_SymbolRef({
			name: name
		}),
		args: args || []
	});
}

function couldBeAsset(name, value) {
	return (typeof name === 'string') &&
		(!value || !isCallingTi(value)) &&
		(name.match(/(^|[a-z])(image|icon)$/i) || ['file', 'sound', 'icon', 'url', 'leftButton', 'rightButton', 'images'].indexOf(name) !== -1);
}

function doNotTouch(node) {
	return node instanceof UglifyJS.AST_Atom || //Booleans, Nulls, Undefined, etc 
		node instanceof UglifyJS.AST_Lambda; //Functions, etc
}

function isCallingTi(node) {
	return (node instanceof UglifyJS.AST_Call && node.expression.start.value.match && node.expression.start.value.match('^Ti(tanium)?$'));
}
