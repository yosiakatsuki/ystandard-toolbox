import { BaseControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { fontWeightList } from '../utils';

const LabelFontWeight = ( props ) => {
	const { attributes, setAttributes } = props;

	const { labelWeight } = attributes;

	return (
		<BaseControl
			id={ 'label-font-weight' }
			label={ __( '文字の太さ', 'ystandard-toolbox' ) }
			__nextHasNoMarginBottom
		>
			<div className="ystdtb__horizon-buttons">
				{ fontWeightList.map( ( item ) => {
					return (
						<Button
							key={ item.value }
							isSecondary={ labelWeight !== item.value }
							isPrimary={ labelWeight === item.value }
							onClick={ () => {
								setAttributes( {
									labelWeight: item.value,
								} );
							} }
						>
							<span>{ item.label }</span>
						</Button>
					);
				} ) }
			</div>
		</BaseControl>
	);
};

export default LabelFontWeight;
