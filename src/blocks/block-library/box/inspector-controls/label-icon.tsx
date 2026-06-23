/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { IconSelect } from '@aktk/block-components/components/icon-select';

/*
 * Plugin Dependencies
 */
import type { BoxAttributes } from '../types';

interface LabelIconProps {
	attributes: BoxAttributes;
	setAttributes: ( attributes: Partial< BoxAttributes > ) => void;
}

/**
 * ラベルアイコンコントロール
 * @param props
 */
const LabelIcon = ( props: LabelIconProps ): React.ReactElement => {
	const { attributes, setAttributes } = props;

	const { labelIcon } = attributes;

	return (
		<BaseControl
			id="label-icon"
			label={ __( 'アイコン', 'ystandard-toolbox' ) }
		>
			<IconSelect
				icon={ labelIcon || '' }
				label=""
				onChange={ ( value ) => {
					setAttributes( { labelIcon: value } );
				} }
			/>
		</BaseControl>
	);
};

export default LabelIcon;
