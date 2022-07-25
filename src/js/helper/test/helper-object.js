import { object2Array, getObjectValue, parseObject } from '../object.js';

describe( 'object2Array', () => {
	test( 'object to Array', () => {
		const testObject = {
			key1: { label: 'key1', value: 1 },
			key2: { label: 'key2', value: 2 },
			key3: { label: 'key3', value: 3 },
		};
		expect( object2Array( testObject ) ).toEqual( [
			{ label: 'key1', value: 1 },
			{ label: 'key2', value: 2 },
			{ label: 'key3', value: 3 },
		] );
	} );
	test( 'input array', () => {
		const testObject = [
			{ label: 'key1', value: 1 },
			{ label: 'key2', value: 2 },
			{ label: 'key3', value: 3 },
		];
		expect( object2Array( testObject ) ).toEqual( [
			{ label: 'key1', value: 1 },
			{ label: 'key2', value: 2 },
			{ label: 'key3', value: 3 },
		] );
	} );
} );

describe( 'getObjectValue', () => {
	const testObject = {
		key1: { label: 'key1', value: 1 },
		key2: { label: 'key2', value: 2 },
		key3: { label: 'key3', value: 3 },
	};
	test( 'get value', () => {
		expect( getObjectValue( testObject, 'key1' ) ).toEqual( {
			label: 'key1',
			value: 1,
		} );
	} );
	test( 'not has key', () => {
		expect( getObjectValue( testObject, 'key1234' ) ).toBeUndefined();
	} );
	test( 'not Object', () => {
		expect( getObjectValue( false, 'key1234' ) ).toBeUndefined();
	} );
	test( 'not has key and has default', () => {
		expect( getObjectValue( testObject, 'key1234', 'default' ) ).toBe(
			'default'
		);
	} );
	test( 'not Object and has default', () => {
		expect( getObjectValue( 'obj', 'key1234', 'default' ) ).toBe(
			'default'
		);
	} );
} );

describe( 'parseObject', () => {
	test( 'string', () => {
		expect( parseObject( 'test' ) ).toBeUndefined();
	} );
	test( 'undefined', () => {
		expect( parseObject( undefined ) ).toBeUndefined();
	} );
	test( 'empty', () => {
		expect( parseObject( {} ) ).toBeUndefined();
	} );
	test( 'object', () => {
		expect( parseObject( { natsume: 'souseki' } ) ).toStrictEqual( {
			natsume: 'souseki',
		} );
	} );
	test( 'object has undefined', () => {
		const input = {
			natsume: 'souseki',
			natsume2: undefined,
		};
		expect( parseObject( input ) ).toStrictEqual( { natsume: 'souseki' } );
	} );
} );
