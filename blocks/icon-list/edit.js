import classnames from 'classnames';
import {
	RichText,
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
import { createBlock } from '@wordpress/blocks';
import { select } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { blockClassName } from './config';
import * as BlockOption from './inspector-controls';

function IconList( props ) {
	const {
		attributes,
		setAttributes,
		mergeBlocks,
		onReplace,
		iconColor,
		setIconColor,
	} = props;
	const { values, iconType, customIconClass, iconBold } = attributes;

	const { colors } = select( 'core/block-editor' ).getSettings();
	const blockProps = useBlockProps( {
		className: classnames( blockClassName, `icon--${ iconType }`, {
			'is-bold': iconBold,
			'has-icon-font-color': iconColor.color,
			[ customIconClass ]: customIconClass,
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
					<BaseControl
						id={ 'icon-bold' }
						label={ __( 'アイコン太さ', 'ystandard-toolbox' ) }
					>
						<ToggleControl
							label={ __(
								'アイコンを太くする',
								'ystandard-toolbox'
							) }
							onChange={ () => {
								setAttributes( {
									iconBold: ! iconBold,
								} );
							} }
							checked={ iconBold }
						/>
					</BaseControl>
				</PanelBody>
			</InspectorControls>
			<RichText
				identifier="values"
				className={ blockClassName }
				multiline="li"
				tagName="ul"
				onChange={ ( nextValues ) =>
					setAttributes( { values: nextValues } )
				}
				value={ values }
				aria-label={ __( 'Icon list text', 'ystandard-toolbox' ) }
				placeholder={ __( 'リストを入力…', 'ystandard-toolbox' ) }
				onMerge={ mergeBlocks }
				onSplit={ ( value ) =>
					createBlock( 'ystdtb/icon-list', {
						...attributes,
						values: value,
					} )
				}
				onReplace={ onReplace }
				onRemove={ () => onReplace( [] ) }
				type="ul"
				{ ...blockProps }
			/>
		</>
	);
}

export default compose( [
	withColors( {
		iconColor: 'iconFontColor',
	} ),
] )( IconList );
