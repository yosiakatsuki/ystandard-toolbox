/**
 * WordPress dependencies.
 */
import {
	useInnerBlocksProps,
	useBlockProps,
	// @ts-ignore.
	__experimentalUseGradient as useGradient,
} from '@wordpress/block-editor';

/**
 * Block Dependencies.
 */
import type { DdBoxBlockProps } from './types';
import { getDdBoxBlockClasses, getDdBoxBlockStyles } from './utils';
import { InspectorControls } from './inspector-controls';
import './style-editor.scss';

export default function Edit( props: DdBoxBlockProps ): JSX.Element {
	const { attributes } = props;
	const { gradientClass, gradientValue, setGradient } = useGradient();

	const blockProps = useBlockProps( {
		className: getDdBoxBlockClasses( {
			...attributes,
			gradient: gradientClass,
			customGradient: gradientValue,
		} ),
		style: getDdBoxBlockStyles( {
			...attributes,
			gradient: gradientClass,
			customGradient: gradientValue,
		} ),
	} );

	// InnerBlocks Props.
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		template: [ [ 'core/paragraph' ] ],
	} );

	const inspectorControlsProps = {
		...props,
		gradientValue,
		setGradient,
	};

	return (
		<>
			<InspectorControls { ...inspectorControlsProps } />
			<dd { ...innerBlocksProps } />
		</>
	);
}
