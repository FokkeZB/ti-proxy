var UglifyJS = require('uglify-js');

var Transformer = require('./lib/transformer');

exports.convert = function convert(code, options) {
	options = options || {};
	options.ns = options.ns || '__proxy';

	var ast = UglifyJS.parse(code);

	var transformer = Transformer.create(options);

	if (options.globals) {
		ast.figure_out_scope();
	}

	ast = ast.transform(transformer);

	code = ast.print_to_string({
		beautify: options.beautify !== true
	});

	if (options.exception !== false) {
		code = 'try {' + code + '} catch (e) { e.filename = __filename; ' + options.ns + '.exception(e); }';
	}

	return code;
};
