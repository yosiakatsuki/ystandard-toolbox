import { toBool } from '../index';

describe('toBool', () => {
	it('should return true for boolean true', () => {
		expect(toBool(true)).toBe(true);
	});

	it('should return true for string "true"', () => {
		expect(toBool('true')).toBe(true);
	});

	it('should return true for number 1', () => {
		expect(toBool(1)).toBe(true);
	});

	it('should return true for string "1"', () => {
		expect(toBool('1')).toBe(true);
	});

	it('should return false for boolean false', () => {
		expect(toBool(false)).toBe(false);
	});

	it('should return false for string "false"', () => {
		expect(toBool('false')).toBe(false);
	});

	it('should return false for number 0', () => {
		expect(toBool(0)).toBe(false);
	});

	it('should return false for string "0"', () => {
		expect(toBool('0')).toBe(false);
	});

	it('should return false for null', () => {
		expect(toBool(null)).toBe(false);
	});

	it('should return false for undefined', () => {
		expect(toBool(undefined)).toBe(false);
	});

	it('should return false for empty string', () => {
		expect(toBool('')).toBe(false);
	});

	it('should return false for random string', () => {
		expect(toBool('random')).toBe(false);
	});

	it('should return false for object', () => {
		expect(toBool({})).toBe(false);
	});

	it('should return false for array', () => {
		expect(toBool([])).toBe(false);
	});
});