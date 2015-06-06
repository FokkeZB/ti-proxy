var fs = require('fs'),
	path = require('path');

var should = require('should');

var mod = require('../');
var intf = require('../proxy-interface');

var PATH_FIXTURES = path.join(__dirname, 'fixtures');
var PATH_EXPECTED = path.join(__dirname, 'expected');
var REGEXP_PREFIX = /^convert_/;

var convert = process.argv.indexOf('--convert');
convert = (convert !== -1) ? process.argv[convert + 1] : false;

describe('lib/index', function () {

	var files = fs.readdirSync(PATH_FIXTURES).filter(function (file) {
		return REGEXP_PREFIX.exec(file) && (!convert || file === 'convert_' + convert + '.js');
	});

	files.should.be.an.Array.with.not.lengthOf(0);

	files.forEach(function (file) {

		it('should convert ' + file + ' as expected', function () {

			var fixture = fs.readFileSync(path.join(PATH_FIXTURES, file), {
				encoding: 'utf-8'
			});

			var converted = mod.convert(fixture, intf);

			var expected = fs.readFileSync(path.join(PATH_EXPECTED, file), {
				encoding: 'utf-8'
			});

			if (converted !== expected) {
				console.log('### ' + file);
				console.log(converted);
				console.log('### SHOULD BE:');
				console.log(expected);
				console.log('###');
			}

			converted.should.equal(expected);
		});
	});

});
