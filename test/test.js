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
						"loc": {
							"start": {
								"line": 2,
								"column": 0
							},
							"end": {
								"line": 2,
								"column": 12
							}
						},
						"type": "VariableDeclaration",
						"declarations": [
							{
								"loc": {
									"start": {
										"line": 2,
										"column": 4
									},
									"end": {
										"line": 2,
										"column": 11
									}
								},
								"type": "VariableDeclarator",
								"id": {
									"loc": {
										"start": {
											"line": 2,
											"column": 4
										},
										"end": {
											"line": 2,
											"column": 7
										}
									},
									"type": "Identifier",
									"name": "aaa"
								},
								"init": {
									"loc": {
										"start": {
											"line": 2,
											"column": 10
										},
										"end": {
											"line": 2,
											"column": 11
										}
									},
									"type": "Literal",
									"value": 1,
									"raw": "1"
								}
							}
						],
						"kind": "var"
					},
					{
						"loc": {
							"start": {
								"line": 3,
								"column": 0
							},
							"end": {
								"line": 3,
								"column": 19
							}
						},
						"type": "IfStatement",
						"test": {
							"loc": {
								"start": {
									"line": 3,
									"column": 4
								},
								"end": {
									"line": 3,
									"column": 9
								}
							},
							"type": "Literal",
							"value": false,
							"raw": "false"
						},
						"consequent": {
							"loc": {
								"start": {
									"line": 3,
									"column": 11
								},
								"end": {
									"line": 3,
									"column": 19
								}
							},
							"type": "ExpressionStatement",
							"expression": {
								"loc": {
									"start": {
										"line": 3,
										"column": 11
									},
									"end": {
										"line": 3,
										"column": 18
									}
								},
								"type": "AssignmentExpression",
								"operator": "=",
								"left": {
									"loc": {
										"start": {
											"line": 3,
											"column": 11
										},
										"end": {
											"line": 3,
											"column": 14
										}
									},
									"type": "Identifier",
									"name": "aaa"
								},
								"right": {
									"loc": {
										"start": {
											"line": 3,
											"column": 17
										},
										"end": {
											"line": 3,
											"column": 18
										}
									},
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
