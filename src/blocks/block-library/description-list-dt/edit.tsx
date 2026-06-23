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
import type { DtBlockProps } from './types';
import { getDtBlockClasses, getDtBlockStyles } from './utils';
import { InspectorControls } from './inspector-controls';
import './style-editor.scss';

export default function Edit( props: DtBlockProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { text } = attributes;
	const { gradientClass, gradientValue, setGradient } = useGradient();

	const blockProps = useBlockProps( {
		className: getDtBlockClasses( {
			...attributes,
			gradient: gradientClass,
			customGradient: gradientValue,
		} ),
		style: getDtBlockStyles( {
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
				tagName="dt"
				value={ text || '' }
				onChange={ ( value ) => setAttributes( { text: value } ) }
				identifier="text"
				placeholder={ __( '説明タイトル', 'ystandard-toolbox' ) }
				{ ...blockProps }
			/>
		</>
	);
}
