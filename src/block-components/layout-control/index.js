/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';
/**
 * Plugin.
 */
import OrientationControl from '@aktk/components/orientation-control';
import JustifyContentControl from '@aktk/components/justify-content-control';
import AlignItemsControl from '@aktk/components/align-items-control';
/**
 * Component
 */
import './_editor.scss';
import classnames from 'classnames';
import { getObjectValue, parseObject } from '@aktk/helper/object.js';

export const layoutSchema = {
	orientation: 'vertical',
	justifyContent: 'left',
	alignItems: 'flex-start',
	flexWrap: 'nowrap',
};

export const orientationStyle = {
	horizontal: 'row',
	vertical: 'column',
};

const LayoutControl = ( {
	layout = {},
	onChange,
	label = __( 'レイアウト', 'ystandard-toolbox' ),
	className,
} ) => {
	const { orientation = 'vertical', flexWrap = 'nowrap' } = layout;
	const _className = classnames( 'aktk-component-layout-control', className );
	const handleOnChange = ( newValue ) => {
		onChange( {
			...layout,
			...newValue,
		} );
	};
	return (
		<div className={ _className }>
			{ !! label && (
				<div className="aktk-component-layout-control__label">
					{ label }
				</div>
			) }
			<div className="aktk-component-layout-control__container">
				<div className="aktk-component-layout-control__row">
					<OrientationControl
						layout={ layout }
						onChange={ handleOnChange }
					/>
					<JustifyContentControl
						layout={ layout }
						onChange={ handleOnChange }
					/>
				</div>
				{ 'horizontal' === orientation && (
					<div
						className="aktk-component-layout-control__row"
						style={ { flexDirection: 'column' } }
					>
						<AlignItemsControl
							layout={ layout }
							onChange={ handleOnChange }
						/>
						<div>
							<ToggleControl
								label={ __(
									'Allow to wrap to multiple lines'
								) }
								onChange={ ( value ) => {
									handleOnChange( {
										flexWrap: value ? 'wrap' : 'nowrap',
									} );
								} }
								checked={ flexWrap === 'wrap' }
							/>
						</div>
					</div>
				) }
			</div>
		</div>
	);
};

export default LayoutControl;

export const getLayoutStyles = ( layout ) => {
	return parseObject( {
		flexDirection: getObjectValue( orientationStyle, layout?.orientation ),
		justifyContent: layout?.justifyContent,
		alignItems: layout?.alignItems,
		flexWrap: layout?.flexWrap,
	} );
};
