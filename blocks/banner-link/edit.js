import classnames from 'classnames';
import {
	RichText,
	withColors,
	useBlockProps,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { blockClassName, blockControlClasses } from "./config";
import { BannerLinkInspectorControls as InspectorControls } from './inspector-controls';
import { BannerLinkBlockControls as BlockControls } from './block-controls';
import { getBoxShadowStyle } from "@ystdtb/components/box-shadow-control";

const BannerLink = ( props ) => {

	const {
		attributes,
		setAttributes,
	} = props;

	const {
		mainText,
		mainTextFontSize,
		subText,
		subTextFontSize,
		boxShadow,
	} = attributes;

	const blockWrapProps = useBlockProps( {} );

	const blockProps = {
		className: classnames( blockClassName, {} ),
		style: {
			...getBoxShadowStyle( boxShadow )
		}
	}
	const mainTextClass = classnames(
		blockControlClasses.mainText,
	);
	const mainTextStyles = {
		fontSize: mainTextFontSize?.desktop?.size,
	};
	const subTextClass = classnames(
		blockControlClasses.subText,
	);
	const subTextStyles = {
		fontSize: subTextFontSize?.desktop?.size,
	};

	return (
		<>
			<BlockControls
				{ ...{
					anchorRef: blockWrapProps.ref,
					...props,
				} }
			/>
			<InspectorControls { ...props } />

			<div { ...blockWrapProps }>
				<div { ...blockProps }>
					<p>---</p>
					<RichText
						className={ mainTextClass }
						style={ mainTextStyles }
						value={ mainText }
						onChange={ ( value ) => setAttributes( { mainText: value } ) }
						identifier="mainText"
						placeholder={ __( 'メインテキスト', 'ystandard-toolbox' ) }
						withoutInteractiveFormatting
					/>
					<p>---</p>
					<RichText
						className={ subTextClass }
						style={ subTextStyles }
						value={ subText }
						onChange={ ( value ) => setAttributes( { subText: value } ) }
						identifier="subText"
						placeholder={ __( 'サブテキスト', 'ystandard-toolbox' ) }
						withoutInteractiveFormatting
					/>
				</div>
			</div>
		</>
	);
};

export default compose( [
	withColors( {
		backgroundColor: 'background-color',
		mainTextColor: 'color',
		subTextColor: 'color',
	} ),
] )( BannerLink );
