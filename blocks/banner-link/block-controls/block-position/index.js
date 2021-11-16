import { BlockAlignmentToolbar } from '@wordpress/block-editor';

const BlockPosition = ( { attributes, setAttributes } ) => {
	const {
		blockPosition,
		size,
	} = attributes;
	const handleOnChange = ( value ) => {
		setAttributes( { blockPosition: value } );
	};
	return (
		<>
			{ ( size?.maxWidth &&
				<BlockAlignmentToolbar
					value={ blockPosition ?? 'left' }
					onChange={ handleOnChange }
					controls={ [ 'left', 'center', 'right' ] }
				/>
			) }
		</>
	);
}
export default BlockPosition;
