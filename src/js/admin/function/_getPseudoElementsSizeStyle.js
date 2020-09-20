export default function _getPseudoElementsSizeStyle( size, preset ) {
	if ( '' === size || 0 === size ) {
		return {};
	}
	if ( ! preset.hasOwnProperty( 'usePseudoElementsSize' ) ) {
		return {};
	}
	const useSize = preset.usePseudoElementsSize;

	const result = {};
	if ( useSize.includes( 'height' ) ) {
		result.height = size + 'px';
	}
	if ( useSize.includes( 'width' ) ) {
		result.width = size + 'px';
	}
	if ( useSize.includes( 'borderWidth' ) ) {
		result.borderWidth = size + 'px';
	}
	if ( useSize.includes( 'borderTopWidth' ) ) {
		result.borderTopWidth = size + 'px';
	}
	if ( useSize.includes( 'borderRightWidth' ) ) {
		result.borderRightWidth = size + 'px';
	}
	if ( useSize.includes( 'borderBottomWidth' ) ) {
		result.borderBottomWidth = size + 'px';
	}
	if ( useSize.includes( 'borderLeftWidth' ) ) {
		result.borderLeftWidth = size + 'px';
	}

	return result;
}
