import { toBool } from '../index';

describe('toBool', () => {
	it('boolean型のtrueに対してtrueを返す', () => {
		expect(toBool(true)).toBe(true);
	});

	it('文字列"true"に対してtrueを返す', () => {
		expect(toBool('true')).toBe(true);
	});

	it('数値1に対してtrueを返す', () => {
		expect(toBool(1)).toBe(true);
	});

	it('文字列"1"に対してtrueを返す', () => {
		expect(toBool('1')).toBe(true);
	});

	it('boolean型のfalseに対してfalseを返す', () => {
		expect(toBool(false)).toBe(false);
	});

	it('文字列"false"に対してfalseを返す', () => {
		expect(toBool('false')).toBe(false);
	});

	it('数値0に対してfalseを返す', () => {
		expect(toBool(0)).toBe(false);
	});

	it('文字列"0"に対してfalseを返す', () => {
		expect(toBool('0')).toBe(false);
	});

	it('nullに対してfalseを返す', () => {
		expect(toBool(null)).toBe(false);
	});

	it('undefinedに対してfalseを返す', () => {
		expect(toBool(undefined)).toBe(false);
	});

	it('空文字に対してfalseを返す', () => {
		expect(toBool('')).toBe(false);
	});

	it('任意の文字列に対してfalseを返す', () => {
		expect(toBool('random')).toBe(false);
	});

	it('オブジェクトに対してfalseを返す', () => {
		expect(toBool({})).toBe(false);
	});

	it('配列に対してfalseを返す', () => {
		expect(toBool([])).toBe(false);
	});
});