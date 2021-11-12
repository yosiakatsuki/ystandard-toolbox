import { BlockControls } from '@wordpress/block-editor';
import LinkButton from "./link-button";
import ContentPosition from "./content-position";

export const BannerLinkBlockControls = ( props ) => {

	return (
		<BlockControls>
			<LinkButton { ...props } />
			<ContentPosition  { ...props } />
		</BlockControls>
	);
};
