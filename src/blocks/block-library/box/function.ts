export const getBoxBorderRadius = ( boxStyle, position, value, hasLabel ) => {
	if ( ! hasLabel ) {
		return value;
	}

	switch ( position ) {
		case 'topLeft':
			if ( 'label-in' === boxStyle || 'label-line' === boxStyle ) {
				return value;
			}
			break;
		case 'topRight':
			if ( 'label-wide' !== boxStyle ) {
				return value;
			}
			break;

		case 'bottomRight':
			return value;

		case 'bottomLeft':
			return value;
	}

	return undefined;
};

export const isLabelOutside = ( boxStyle ) => {
	return 'label-out' === boxStyle || 'label-wide' === boxStyle;
};

export const getLabelBorderRadius = ( boxStyle, position, value ) => {
	switch ( position ) {
		case 'topLeft':
			if (
				'label-out' === boxStyle ||
				'label-wide' === boxStyle ||
				'label-line' === boxStyle
			) {
				return value;
			}
			break;
		case 'topRight':
			if (
				'label-out' === boxStyle ||
				'label-wide' === boxStyle ||
				'label-line' === boxStyle
			) {
				return value;
			}
			break;
		case 'bottomLeft':
			if ( 'label-line' === boxStyle ) {
				return value;
			}
			break;
		case 'bottomRight':
			if ( 'label-in' === boxStyle || 'label-line' === boxStyle ) {
				return value;
			}
			break;
	}

	return undefined;
};
