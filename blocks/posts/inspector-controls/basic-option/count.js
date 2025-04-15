/**
 * WordPress.
 */
import { __ } from '@wordpress/i18n';
import { BaseControl, RangeControl } from '@wordpress/components';
import ResponsiveTab, { tabType } from '@ystd/components/responsive-tab';
import { getNumber } from '@ystd/helper/number';

const Count = ( { attributes, setAttributes } ) => {
	const { count, countMobile } = attributes;
	return (
		<BaseControl __nextHasNoMarginBottom>
			<ResponsiveTab
				label={ __( '表示件数', 'ystandard-toolbox' ) }
				hasTablet={ false }
			>
				{ ( tab ) => {
					return (
						<>
							{ tabType.desktop === tab.name && (
								<RangeControl
									value={ count }
									onChange={ ( value ) => {
										setAttributes( {
											count: getNumber( value, 3, 1, 20 ),
										} );
									} }
									min={ 1 }
									max={ 20 }
									__next40pxDefaultSize
									__nextHasNoMarginBottom
								/>
							) }
							{ tabType.mobile === tab.name && (
								<RangeControl
									value={ countMobile }
									onChange={ ( value ) => {
										const newValue =
											0 === value || ! value
												? undefined
												: getNumber( value, 3, 1, 20 );
										setAttributes( {
											countMobile: newValue,
										} );
									} }
									min={ 1 }
									max={ 20 }
									allowReset={ true }
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
export default Count;
