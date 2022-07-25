import { PanelBody, BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import ResponsiveGapControl from '@aktk/controls/responsive-gap-control';
import ResponsiveLayoutControl from '@aktk/controls/responsive-layout-control';

const PanelLayout = ( { attributes, setAttributes } ) => {
	const { layout, gap } = attributes;
	const onLayoutChange = ( newValue ) => {
		setAttributes( {
			layout: {
				...layout,
				...newValue,
			},
		} );
	};
	const onGapChange = ( newValue ) => {
		setAttributes( {
			gap: newValue,
		} );
	};
	return (
		<PanelBody title={ __( 'レイアウト', 'ystandard-toolbox' ) }>
			<BaseControl>
				<ResponsiveLayoutControl
					values={
						!! layout
							? layout
							: {
									desktop: {
										orientation: 'vertical',
										justifyContent: 'left',
									},
							  }
					}
					onChange={ onLayoutChange }
				/>
			</BaseControl>
			<ResponsiveGapControl onChange={ onGapChange } values={ gap } />
		</PanelBody>
	);
};
export default PanelLayout;
