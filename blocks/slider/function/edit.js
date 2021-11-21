import { isObject, parseObjectAll } from "@ystdtb/helper/object";
import { parseResponsiveValues } from "@ystdtb/helper/responsive";

export const setSlidesOption = ( props ) => {
	const {
		setAttributes,
		type,
		slides,
		newValue,
	} = props;

	if ( ! isObject( newValue ) ) {
		return;
	}
	if ( ! isObject( slides ) ) {
		setAttributes( {
			slides: parseResponsiveValues( {
				[ type ]: newValue
			} )
		} );
		return;
	}
	if ( ! slides.hasOwnProperty( type ) ) {
		setAttributes( {
			slides: {
				...slides,
				...parseObjectAll( { [ type ]: newValue } )
			}
		} );
		return;
	}
	setAttributes( {
		slides: parseObjectAll( {
			...slides,
			...{
				[ type ]: {
					...slides[ type ],
					...newValue,
				}
			}
		} )
	} );
}
