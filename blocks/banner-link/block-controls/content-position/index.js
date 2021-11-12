import {
	AlignmentToolbar,
	BlockVerticalAlignmentToolbar,
} from '@wordpress/block-editor';
import { parseObject } from "@ystdtb/helper/object";

const ContentPosition = ( { attributes, setAttributes } ) => {
	const { contentPosition } = attributes;
	const setPosition = ( value ) => {
		if ( ! value?.vertical ) {
			delete value.vertical;
		}
		if ( ! value?.horizontal ) {
			delete value.horizontal;
		}
		setAttributes( {
			contentPosition: parseObject( value ),
		} );
	};
	const handleHorizontalOnChange = ( value ) => {
		setPosition( {
			...contentPosition,
			horizontal: value || undefined
		} );
	};
	const handleVerticalOnChange = ( value ) => {
		setPosition( {
			...contentPosition,
			vertical: value || undefined
		} );
	};
	return (
		<>
			<AlignmentToolbar
				value={ contentPosition?.horizontal ?? 'center' }
				onChange={ handleHorizontalOnChange }
			/>
			<BlockVerticalAlignmentToolbar
				value={ contentPosition?.vertical ?? 'center' }
				onChange={ handleVerticalOnChange }
			/>
		</>
	);
}
export default ContentPosition;
