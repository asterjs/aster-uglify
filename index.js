'use strict';

var uglify = require('uglify-js');
var sourceMapToAst = require('sourcemap-to-ast');
var parse = require('esprima').parse;

module.exports = function (options) {
	var compressor = options.compress ? uglify.Compressor(options.compress) : null;
	var mangle = !!options.mangle;

	return function (files) {
		return files.do(function (file) {
			var uglifyAst = uglify.AST_Node.from_mozilla_ast(file.program);

			if (compressor) {
				uglifyAst.figure_out_scope();
				uglifyAst = uglifyAst.transform(compressor);
			}

			if (mangle) {
				uglifyAst.figure_out_scope();
				uglifyAst.compute_char_frequency();
				uglifyAst.mangle_names();
			}

			var sourceMap = uglify.SourceMap();

			var stream = uglify.OutputStream({
				beautify: false,
				source_map: sourceMap
			});

			uglifyAst.print(stream);

			sourceMap = JSON.parse(sourceMap);
			sourceMap.sources = [file.loc.source];

			file.program = sourceMapToAst(
				parse(stream, {loc: true}),
				sourceMap
			);
		});
	}
};
