/*
 * WordPress Dependencies
 */
import { RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';

/*
 * Plugin Dependencies
 */
import { BoxAttributes } from '../types';

interface BackgroundOpacityProps {
	attributes: BoxAttributes;
	setAttributes: ( attributes: Partial< BoxAttributes > ) => void;
}

/**
 * 背景色不透明度コントロール
 * @param props
 */
const BackgroundOpacity = ( props: BackgroundOpacityProps ) => {
	const { attributes, setAttributes } = props;

	const { backgroundImageCoverOpacity } = attributes;

	const handleOnChange = ( value: number | undefined ) => {
		setAttributes( { backgroundImageCoverOpacity: value || 0.8 } );
	};

	return (
		<BaseControl
			id="background-opacity"
			label={ __( '背景色の不透明度', 'ystandard-toolbox' ) }
		>
			<RangeControl
				value={ backgroundImageCoverOpacity }
				onChange={ handleOnChange }
				min={ 0 }
				max={ 1 }
				step={ 0.1 }
				__next40pxDefaultSize
			/>
		</BaseControl>
	);
};

export default BackgroundOpacity;
