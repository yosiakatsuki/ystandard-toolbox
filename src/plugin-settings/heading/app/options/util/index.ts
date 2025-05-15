import { isObject } from '@aktk/block-components/utils/object';

export function isResponsiveHeadingOption( value: unknown ) {
	// オブジェクトでなければfalse
	if ( ! isObject( value as unknown as object ) ) {
		return false;
	}
	// キーの存在確認.
	const keys = Object.keys( value as unknown as object );
	if ( 0 >= keys.length ) {
		return false;
	}
	const responsiveKeys = [ 'tablet', 'mobile' ];

	// モバイル・タブレットがあればレスポンシブ、それ以外はfalse.
	return responsiveKeys.some( ( key ) => keys.includes( key ) );
}
