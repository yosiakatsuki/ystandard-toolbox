import { isObject } from '@ystdtb/helper/object';

export const setSlidesOption = ( props ) => {
	const { setAttributes, type, slides, newValue } = props;

	if ( ! isObject( newValue ) ) {
		return;
	}
	if ( ! isObject( slides ) ) {
		setAttributes( {
			slides: {
				[ type ]: newValue,
			},
		} );
		return;
	}
	if ( ! slides.hasOwnProperty( type ) ) {
		setAttributes( {
			slides: {
				...slides,
				...{ [ type ]: newValue },
			},
		} );
		return;
	}
	setAttributes( {
		slides: {
			...slides,
			...{
				[ type ]: {
					...slides[ type ],
					...newValue,
				},
			},
		},
	} );
};
