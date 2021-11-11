import { BlockControls } from '@wordpress/block-editor';
import LinkButton from "./link-button";

export const BannerLinkBlockControls = ( props ) => {

	return (
		<BlockControls>
			<LinkButton { ...props } />
		</BlockControls>
	);
};
