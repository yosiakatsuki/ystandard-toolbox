import { BlockControls } from '@wordpress/block-editor';
import PreviewType from './preview-type';

export const SliderBlockControls = ( props ) => {
	return (
		<BlockControls>
			<PreviewType { ...props } />
		</BlockControls>
	);
};
