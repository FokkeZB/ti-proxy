var UglifyJS = require('uglify-js');

exports.create = function create(options) {
	options = options || {};

	options.ns = options.ns || '__proxy';

	options.events = options.events !== false;
	options.i18n = options.i18n !== false;
	options.include = options.include !== false;
	options.log = options.log !== false;
	options.require = options.require !== false;
	options.resource = options.resource !== false;
	options.UI = options.UI !== false;

	return new UglifyJS.TreeTransformer(null, function (node) {

		if (node instanceof UglifyJS.AST_Call) {

			if (options.require) {

				// require()
				if (node.expression.start.value === 'require') {
					node.name = node.expression.name = options.ns + '.require';
					return;
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
				if (node.expression.start.value === 'L') {
					node.name = node.expression.name = options.ns + '.i18n';
					return node;
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
					node.args[0].value = toFullPath(node.args[0].value);
					node.args = [functionCall(options.ns + '.resource', node.args)];
					return node;
				}
			}

		} else if (node instanceof UglifyJS.AST_Assign && !doNotTouch(node.right)) {

			// *.title =
			if (node.left.property && node.left.property.match && node.left.property.match('^(title|text)id$')) {

				if (options.i18n) {
					node.left.property = node.left.property.replace('id', '');
					node.right = functionCall(options.ns + '.i18n', [node.right]);
					return node;
				}

				// *.image = 
			} else if (couldBeAsset(node.left.property, node.right)) {

				if (options.resource) {

					if (node.left.property === 'url' && node.operator === '+=') {
						return node;
					}

					node.right.value = toFullPath(node.right.value);
					node.right = functionCall(options.ns + '.resource', [node.right]);
					return node;
				}
			}

		} else if (node instanceof UglifyJS.AST_ObjectKeyVal && !doNotTouch(node.value)) {

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
					node.value.value = toFullPath(node.value.value);
					node.value = functionCall(options.ns + '.resource', [node.value]);
					return node;
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

function functionCallByNode(node, args) {
	return new UglifyJS.AST_Call({
		expression: node,
		args: args
	});
}

function binaryAdd(left, right) {
	return new UglifyJS.AST_Binary({
		left: left,
		operator: '+',
		right: right
	});
}

function couldBeAsset(name, value) {
	return typeof name === 'string' &&
		(!value || !isCallingTi(value)) &&
		(name.toLowerCase().match('image$') ||
			name.toLowerCase().match('icon$') || ['file', 'sound', 'icon', 'url', 'leftButton', 'rightButton', 'images'].indexOf(name) !== -1);
}

function doNotTouch(node) {
	return node instanceof UglifyJS.AST_Atom || //Booleans, Nulls, Undefined, etc 
		node instanceof UglifyJS.AST_Lambda; //Functions, etc
}

function isCallingTi(node) {
	return (node instanceof UglifyJS.AST_Call && node.expression.start.value.match && node.expression.start.value.match('^Ti(tanium)?$'));
}

function toFullPath(p) {
	if (typeof p === 'string' &&
		p.match(/^\.{1,2}\//) &&
		current_file) {
		var full = path.join(path.dirname(current_file), p);
		return full.substring(full.indexOf('Resources/') + 10);
	}
	return p;
}
