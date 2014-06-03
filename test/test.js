/* global describe, it */

'use strict';

var assert = require('chai').assert,
	Rx = require('rx'),
	uglify = require('..');


it('should minify', function (done) {
	var input = [{
			type: 'File',
			program: {
				"type": "Program",
				"body": [
					{
						"type": "VariableDeclaration",
						"declarations": [
							{
								"type": "VariableDeclarator",
								"id": {
									"type": "Identifier",
									"name": "aaa"
								},
								"init": {
									"type": "Literal",
									"value": 1,
									"raw": "1"
								}
							}
						],
						"kind": "var"
					},
					{
						"type": "IfStatement",
						"test": {
							"type": "Literal",
							"value": false,
							"raw": "false"
						},
						"consequent": {
							"type": "ExpressionStatement",
							"expression": {
								"type": "AssignmentExpression",
								"operator": "=",
								"left": {
									"type": "Identifier",
									"name": "aaa"
								},
								"right": {
									"type": "Literal",
									"value": 2,
									"raw": "2"
								}
							}
						},
						"alternate": null
					}
				]
			},
			loc: {
				source: 'file.js'
			}
		}],
		expected = [{
			type: 'File',
			program: {
				"type": "Program",
				"body": [
					{
						"type": "VariableDeclaration",
						"declarations": [
							{
								"type": "VariableDeclarator",
								"id": {
									"type": "Identifier",
									"name": "aaa"
								},
								"init": {
									"type": "Literal",
									"value": 1,
									"raw": "1"
								}
							}
						],
						"kind": "var"
					}
				]
			},
			loc: {
				source: 'file.js'
			}
		}];

	// simulating file sequence and applying transformation
	uglify({
		warnings : false,
		mangle: true,
		compress: {
			warnings : false
		}
	})(Rx.Observable.fromArray(input))
	// checking against array of expected results iteratively
	.zip(expected, assert.deepEqual)
	// subscribing to check results
	.subscribe(function () {}, done, done);
});

it('should work width empty files', function (done) {
	var input = [{
			type: 'File',
			program: {
				type: 'Program',
				body: []
			},
			loc: {
				source: 'file.js'
			}
		}],
		expected = [{
			type: 'File',
			program: {
				type: 'Program',
				body: []
			},
			loc: {
				source: 'file.js'
			}
		}];

	// simulating file sequence and applying transformation
	uglify({ compress: { warnings: false } })(Rx.Observable.fromArray(input))
	// checking against array of expected results iteratively
	.zip(expected, assert.deepEqual)
	// subscribing to check results
	.subscribe(function () {}, done, done);
});
