export default function _parseStyle( style ) {
	const pos = [ 'Top', 'Right', 'Bottom', 'Left' ];
	const newStyle = { ...style };
	pos.forEach( ( value ) => {
		// border
		if (
			style[ `border${ value }Width` ] &&
			style[ `border${ value }WidthUnit` ]
		) {
			newStyle[ `border${ value }Width` ] =
				style[ `border${ value }Width` ] +
				style[ `border${ value }WidthUnit` ];
		}
		//padding
		if (
			style[ `padding${ value }` ] &&
			style[ `padding${ value }Unit` ]
		) {
			newStyle[ `padding${ value }` ] =
				style[ `padding${ value }` ] + style[ `padding${ value }Unit` ];
		}
		//margin
		if ( style[ `margin${ value }` ] && style[ `margin${ value }Unit` ] ) {
			newStyle[ `margin${ value }` ] =
				style[ `margin${ value }` ] + style[ `margin${ value }Unit` ];
		}
	} );
	return newStyle;
}
