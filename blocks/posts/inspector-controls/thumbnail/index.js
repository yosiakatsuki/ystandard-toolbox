/**
 * WordPress.
 */
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
/**
 * Block.
 */
import ShowImage from './show-image';
import Size from './size';
import Ratio from './ratio';

const PanelThumbnail = ( props ) => {
	const { attributes } = props;
	const { listType } = attributes;
	const showThumbnailOption = () => {
		if ( 'simple' === listType ) {
			return false;
		}
		return true;
	};
	return (
		<>
			{ showThumbnailOption() && (
				<PanelBody title={ __( '画像設定', 'ystandard-toolbox' ) }>
					<ShowImage { ...props } />
					<Size { ...props } />
					<Ratio { ...props } />
				</PanelBody>
			) }
		</>
	);
};
export default PanelThumbnail;
