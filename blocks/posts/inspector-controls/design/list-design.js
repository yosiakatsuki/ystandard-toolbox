/**
 * WordPress.
 */
import { __ } from '@wordpress/i18n';
import { BaseControl, SelectControl } from '@wordpress/components';
/**
 * yStandard Toolbox.
 */
import { getBlockConfig } from '@ystd/helper/blockConfig';
import ResponsiveTab, { tabType } from '@ystd/components/responsive-tab';

const listTypes = [
	{ label: __( 'カード', 'ystandard-toolbox' ), value: 'card' },
	{ label: __( 'リスト', 'ystandard-toolbox' ), value: 'list' },
	{ label: __( 'シンプル', 'ystandard-toolbox' ), value: 'simple' },
];

const ListDesign = ( { attributes, setAttributes } ) => {
	const { listType, listTypeMobile } = attributes;
	const config = getBlockConfig( 'postsDesign', [] );
	let options = listTypes;
	if ( config ) {
		options = [ ...listTypes, ...config ];
	}

	return (
		<BaseControl __nextHasNoMarginBottom>
			<ResponsiveTab
				label={ __( 'デザイン', 'ystandard-toolbox' ) }
				hasTablet={ false }
			>
				{ ( tab ) => {
					return (
						<>
							{ tabType.desktop === tab.name && (
								<SelectControl
									value={ listType }
									options={ options }
									onChange={ ( value ) => {
										setAttributes( { listType: value } );
									} }
									__next40pxDefaultSize
									__nextHasNoMarginBottom
								/>
							) }
							{ tabType.mobile === tab.name && (
								<SelectControl
									value={ listTypeMobile }
									options={ options }
									onChange={ ( value ) => {
										setAttributes( {
											listTypeMobile: value,
										} );
									} }
									__next40pxDefaultSize
									__nextHasNoMarginBottom
								/>
							) }
						</>
					);
				} }
			</ResponsiveTab>
		</BaseControl>
	);
};

export default ListDesign;
