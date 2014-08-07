'use strict';

var UglifyJS = require('uglify-js');
var sourceMapToAst = require('sourcemap-to-ast');
var parse = require('esprima').parse;

module.exports = function (options) {
	var compressor = options.compress ? UglifyJS.Compressor(options.compress) : null;
	var mangle = !!options.mangle;

	return function (files) {
		return files.do(function (file) {
			var uglifyAST = UglifyJS.AST_Node.from_mozilla_ast(file.program);

			if (compressor) {
				uglifyAST.figure_out_scope();
				uglifyAST = uglifyAST.transform(compressor);
			}

			if (mangle) {
				uglifyAST.figure_out_scope();
				uglifyAST.compute_char_frequency();
				uglifyAST.mangle_names();
			}

			file.program = uglifyAST.to_mozilla_ast();
		});
	}
};
