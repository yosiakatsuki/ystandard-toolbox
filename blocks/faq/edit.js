import classnames from 'classnames';
import { template } from './config';
import {
	InnerBlocks,
	InspectorControls,
	FontSizePicker,
	__experimentalBlock as Block,
} from '@wordpress/block-editor';
import {
	PanelBody,
	BaseControl,
	RangeControl,
	Button,
	ToggleControl,
	ColorPalette,
} from '@wordpress/components';
import { withState, compose } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { withDispatch, select } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import {
	getColorSlug,
	getColorCode,
} from '../../src/js/blocks/function/_getColorSlug';
import {
	getFontSize,
	getFontSlug,
} from '../../src/js/blocks/function/_getFontSlug';

function faq( props ) {
	const {
		className,
		setState,
	} = props;

	const { colors } = select( 'core/block-editor' ).getSettings();

	const classes = classnames( 'ystdtb-faq', className, {} );

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody
					title={ __( 'FAQ一括設定', 'ystandard-toolbox' ) }
				>

				</PanelBody>
			</InspectorControls>

			<Block.div className={ classnames( 'ystdtb-faq-wrap' ) }>
				<div className={ classes }>
					<InnerBlocks
						allowedBlocks={ [ 'ystdtb/faq-item' ] }
						template={ template }
						templateLock={ 'all' }
					/>
				</div>
			</Block.div>
		</Fragment>
	);
}

const faqEdit = withDispatch( ( dispatch, ownProps, registry ) => ( {
	updateChildAttributes( attributes ) {
		const { clientId } = ownProps;
		const { updateBlockAttributes } = dispatch( 'core/block-editor' );
		const { getBlockOrder } = registry.select( 'core/block-editor' );
		const innerBlockClientIds = getBlockOrder( clientId );
		innerBlockClientIds.forEach( ( innerBlockClientId ) => {
			updateBlockAttributes( innerBlockClientId, attributes );
		} );
	},
} ) )( faq );

export default compose( [
	withState( {} ),
] )( faqEdit );
