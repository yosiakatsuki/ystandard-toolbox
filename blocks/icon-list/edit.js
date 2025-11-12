import classnames from 'classnames';
import {
	useInnerBlocksProps,
	InspectorControls,
	withColors,
	useBlockProps,
} from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import {
	PanelBody,
	BaseControl,
	ToggleControl,
	ColorPalette,
} from '@wordpress/components';
import { select } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { blockClassName } from './config';
import * as BlockOption from './inspector-controls';

function IconList( props ) {
	const { attributes, setAttributes, iconColor, setIconColor } = props;
	const { iconType, customIconClass, iconBold } = attributes;

	const { colors } = select( 'core/block-editor' ).getSettings();
	const blockProps = useBlockProps( {
		className: classnames( blockClassName, {
			'has-icon-font-color': iconColor.color,
		} ),
		style: {
			'--icon-font-color': iconColor.color,
		},
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'アイコン', 'ystandard-toolbox' ) }>
					<BlockOption.ListIcon { ...props } />
					<BaseControl
						id={ 'icon-color' }
						label={ __( 'アイコン色', 'ystandard-toolbox' ) }
						__nextHasNoMarginBottom
					>
						<ColorPalette
							colors={ colors }
							disableCustomColors={ false }
							onChange={ ( color ) => {
								setIconColor( color );
							} }
							value={ iconColor.color }
						/>
					</BaseControl>
				</PanelBody>
			</InspectorControls>
			<ul
				{ ...useInnerBlocksProps( blockProps, {
					allowedBlocks: [ 'ystdtb/icon-list-item' ],
					template: [ [ 'ystdtb/icon-list-item' ] ],
					templateLock: false,
					templateInsertUpdatesSelection: false,
				} ) }
			/>
		</>
	);
}

export default compose( [
	withColors( {
		iconColor: 'iconFontColor',
	} ),
] )( IconList );
