export function calcContentMarginTop( type, margin, contents ) {
	if ( undefined === margin ) {
		if ( 'text' === type ) {
			if ( undefined !== contents && 1 < contents.length ) {
				return 16 * 4;
			}
			return 10;
		}
		if ( 'icon' === type ) {
			return 5;
		}
		return 0;
	}
	return margin;
}
