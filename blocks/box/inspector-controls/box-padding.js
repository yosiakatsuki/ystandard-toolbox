import {
	BaseControl,
	ToggleControl,
	__experimentalBoxControl as BoxControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { units } from '../config';
import {
	addResponsiveProperty,
	deleteResponsiveProperty,
	getResponsiveProperty,
} from '@aktk/helper/responsive';

const BoxPadding = ( props ) => {
	const { attributes, setAttributes } = props;

	const { boxPadding, isResponsiveBoxPadding } = attributes;

	return (
		<BaseControl
			id={ 'box-padding' }
			label={ __( '余白設定', 'ystandard-toolbox' ) }
		>
			<BaseControl>
				<BoxControl
					label={ __( 'ボックス内側余白', 'ystandard-toolbox' ) }
					values={ getResponsiveProperty( boxPadding, 'desktop' ) }
					onChange={ ( nextValues ) => {
						setAttributes( {
							boxPadding: {
								...boxPadding,
								desktop: nextValues,
							},
						} );
					} }
					units={ units }
				/>
				<ToggleControl
					label={ __(
						'タブレット・モバイル設定',
						'ystandard-toolbox'
					) }
					onChange={ ( value ) => {
						let newBoxPadding;
						if ( value ) {
							newBoxPadding = addResponsiveProperty( boxPadding );
						} else {
							newBoxPadding =
								deleteResponsiveProperty( boxPadding );
						}
						setAttributes( {
							isResponsiveBoxPadding: value,
							boxPadding: newBoxPadding,
						} );
					} }
					checked={ isResponsiveBoxPadding }
				/>
			</BaseControl>
			{ isResponsiveBoxPadding && (
				<BaseControl>
					<BoxControl
						label={ __( 'タブレット', 'ystandard-toolbox' ) }
						values={ getResponsiveProperty( boxPadding, 'tablet' ) }
						onChange={ ( nextValues ) => {
							setAttributes( {
								boxPadding: {
									...boxPadding,
									tablet: nextValues,
								},
							} );
						} }
						units={ units }
					/>
					<BoxControl
						label={ __( 'モバイル', 'ystandard-toolbox' ) }
						values={ getResponsiveProperty( boxPadding, 'mobile' ) }
						onChange={ ( nextValues ) => {
							setAttributes( {
								boxPadding: {
									...boxPadding,
									mobile: nextValues,
								},
							} );
						} }
						units={ units }
					/>
				</BaseControl>
			) }
		</BaseControl>
	);
};

export default BoxPadding;
