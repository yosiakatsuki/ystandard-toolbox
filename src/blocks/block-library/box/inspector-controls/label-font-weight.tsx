/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import Button from '@aktk/block-components/wp-controls/button';

/*
 * Plugin Dependencies
 */
import type { BoxAttributes } from '../types';
import { fontWeightList } from '../utils';

interface LabelFontWeightProps {
	attributes: BoxAttributes;
	setAttributes: ( attributes: Partial< BoxAttributes > ) => void;
}

/**
 * ラベル文字の太さコントロール
 * @param props
 */
const LabelFontWeight = ( props: LabelFontWeightProps ): React.ReactElement => {
	const { attributes, setAttributes } = props;

	const { labelWeight } = attributes;

	return (
		<BaseControl
			id="label-font-weight"
			label={ __( '文字の太さ', 'ystandard-toolbox' ) }
		>
			<div className="ystdtb__horizon-buttons">
				{ fontWeightList.map( ( item ) => {
					return (
						<Button
							key={ item.value }
							variant={ labelWeight === item.value ? 'primary' : 'secondary' }
							onClick={ () => {
								setAttributes( {
									labelWeight: item.value as BoxAttributes['labelWeight'],
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
