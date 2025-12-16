/**
 * WordPress dependencies.
 */
import {
	RichText,
	useBlockProps,
	// @ts-ignore.
	__experimentalUseGradient as useGradient,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Block Dependencies.
 */
import type { DdSimpleBlockProps } from './types';
import { getDdSimpleBlockClasses, getDdSimpleBlockStyles } from './utils';
import './style-editor.scss';
import { InspectorControls } from '@aktk/blocks/block-library/description-list-dd-simple/inspector-controls';

export default function Edit( props: DdSimpleBlockProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { text } = attributes;
	const { gradientClass, gradientValue, setGradient } = useGradient();

	const blockProps = useBlockProps( {
		className: getDdSimpleBlockClasses( {
			...attributes,
			gradient: gradientClass,
			customGradient: gradientValue,
		} ),
		style: getDdSimpleBlockStyles( {
			...attributes,
			gradient: gradientClass,
			customGradient: gradientValue,
		} ),
	} );

	const inspectorControlsProps = {
		...props,
		gradientValue,
		setGradient,
	};

	return (
		<>
			<InspectorControls { ...inspectorControlsProps } />
			<RichText
				tagName="dd"
				value={ text || '' }
				onChange={ ( value ) => setAttributes( { text: value } ) }
				identifier="text"
				placeholder={ __( '説明文', 'ystandard-toolbox' ) }
				{ ...blockProps }
			/>
		</>
	);
}
