/* global describe, it */

'use strict';

var assert = require('chai').assert,
	Rx = require('rx'),
	uglify = require('..'),
	parse = require('esprima').parse;

it('should minify', function (done) {
	var input = [{
			type: 'File',
			program: parse('\nvar aaa = 1;\nif (false)\n    aaa = 2;', {loc: true, source: 'file.js'}),
			loc: {
				source: 'file.js'
			}
		}],
		expected = [{
			type: 'File',
			program: {
				type: 'Program',
				body: [
					{
						loc: {
							start: {
								line: 2,
								column: 0
							},
							end: {
								line: 2,
								column: 12
							},
							source: 'file.js'
						},
						type: 'VariableDeclaration',
						declarations: [
							{
								loc: {
									start: {
										line: 2,
										column: 4
									},
									end: {
										line: 2,
										column: 11
									},
									source: 'file.js'
								},
								type: 'VariableDeclarator',
								id: {
									loc: {
										start: {
											line: 2,
											column: 4
										},
										end: {
											line: 2,
											column: 7
										},
										source: 'file.js'
									},
									type: 'Identifier',
									name: 'aaa'
								},
								init: {
									loc: {
										start: {
											line: 2,
											column: 10
										},
										end: {
											line: 2,
											column: 11
										},
										source: 'file.js'
									},
									type: 'Literal',
									value: 1
								}
							}
						],
						kind: 'var'
					}
				],
				loc: {
					start: {
						line: 2,
						column: 0
					},
					end: {
						line: 4,
						column: 12
					},
					source: 'file.js'
				}
			},
			loc: {
				source: 'file.js'
			}
		}];

	// simulating file sequence and applying transformation
	uglify({
		mangle: true,
		compress: {
			warnings: false
		}
	})(Rx.Observable.fromArray(input))
	// checking against array of expected results iteratively
	.zip(expected, assert.deepEqual)
	// subscribing to check results
	.subscribe(function () {}, done, done);
});
