import {
	BaseControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import SVGIconSelect from "@ystdtb/components/icon-picker";

const LabelIcon = ( props ) => {

	const {
		attributes,
		setAttributes,
	} = props;

	const {
		labelIcon,
	} = attributes;

	return (
		<BaseControl
			id={ 'label-icon' }
			label={ __( 'アイコン', 'ystandard-toolbox' ) }
		>
			<SVGIconSelect
				iconControlTitle={ '' }
				selectedIcon={ labelIcon }
				onClickIcon={ ( value ) => {
					setAttributes( { labelIcon: value } );
				} }
			/>
		</BaseControl>
	);
}

export default LabelIcon;
