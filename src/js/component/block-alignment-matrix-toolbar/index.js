import { __experimentalBlockAlignmentMatrixToolbar as WPBlockAlignmentMatrixToolbar } from '@wordpress/block-editor';

const BlockAlignmentMatrixToolbar = ( {
	label,
	value,
	onChange,
	isDisabled,
	...props
} ) => {
	return (
		<WPBlockAlignmentMatrixToolbar
			label={ label }
			value={ value }
			onChange={ onChange }
			isDisabled={ isDisabled }
			{ ...props }
		/>
	);
};
export default BlockAlignmentMatrixToolbar;
