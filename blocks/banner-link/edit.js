import classnames from 'classnames';
import {
	withColors,
	withFontSizes,
	useBlockProps,
} from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { blockClassName } from "./config";
import { BannerLinkInspectorControls as InspectorControls } from './inspector-controls';

const BannerLink = ( props ) => {

	const blockProps = useBlockProps( {
		className: classnames( blockClassName, {} )
	} );

	return (
		<>
			<InspectorControls { ...props } />

			<div { ...blockProps }>
				<p>開発中。。。</p>
			</div>
		</>
	);
};

export default compose( [] )( BannerLink );
