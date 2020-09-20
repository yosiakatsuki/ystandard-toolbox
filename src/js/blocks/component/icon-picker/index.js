import FontIconPicker from '@fonticonpicker/react-fonticonpicker';
import icons from './icons.json';
import { __ } from '@wordpress/i18n';
import { RadioControl, BaseControl } from '@wordpress/components';
import { Component } from '@wordpress/element';
import classnames from 'classnames';
import { getFeatherIcon } from './_getFeatherIcon';
import { getSimpleIcons } from './_getSimpleIcons';

export const getSVGIconTag = ( name ) => {
	if ( ! name ) {
		return '';
	}
	let svg = '';
	const isSNSIcon = -1 !== name.indexOf( 'sns-' );

	if ( isSNSIcon ) {
		svg = getSimpleIcons( name );
	} else {
		svg = getFeatherIcon( name );
	}

	return svg;
};

class SVGIconSelect extends Component {
	render() {
		const {
			iconControlTitle,
			iconPosition,
			onChangePosition,
			selectedIcon,
			onClickIcon,
			customInfo,
			customInfoStyle,
		} = this.props;

		const iconBaseControlTitle =
			iconControlTitle === undefined
				? __( '表示アイコン', 'ystandard-toolbox' )
				: iconControlTitle;
		const pickerProps = {
			icons,
			theme: 'bluegrey',
			renderUsing: 'class',
			value: selectedIcon,
			onChange: ( value ) => {
				onClickIcon( value );
			},
			renderFunc: ( name ) => {
				return (
					<div
						className={ classnames( {
							'sns-icon': -1 !== name.indexOf( 'sns-' ),
						} ) }
						dangerouslySetInnerHTML={ {
							__html: getSVGIconTag( name ),
						} }
					/>
				);
			},
			isMulti: false,
		};

		return (
			<div className={ 'ystdtb-icon-select' }>
				{ customInfo && (
					<div style={ customInfoStyle }>{ customInfo }</div>
				) }
				{ !! onChangePosition && (
					<BaseControl
						id={ 'icon-position' }
						label={ __( 'アイコン表示位置', 'ystandard-toolbox' ) }
					>
						<div className={ 'ystdtb-icon-select__position' }>
							<RadioControl
								selected={ iconPosition }
								options={ [
									{
										label: __( '左', 'ystandard-toolbox' ),
										value: 'left',
									},
									{
										label: __( '右', 'ystandard-toolbox' ),
										value: 'right',
									},
								] }
								onChange={ onChangePosition }
							/>
						</div>
					</BaseControl>
				) }
				<BaseControl
					id={ 'icon-picker' }
					label={ iconBaseControlTitle }
				>
					<div className={ 'ystdtb-icon-select__picker' }>
						<FontIconPicker { ...pickerProps } />
					</div>
				</BaseControl>
			</div>
		);
	}
}

export default SVGIconSelect;
