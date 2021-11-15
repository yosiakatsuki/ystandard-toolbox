import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import FontSize from "./font-size";
import Color from "./color";
import LineHeight from "./line-height";
import LetterSpacing from "./letter-spacing";
import HtmlTag from "./html-tag";

const PanelMainText = ( props ) => {
	return (
		<PanelBody
			title={ __( 'テキスト（上段）', 'ystandard-toolbox' ) }
			initialOpen={ false }
		>
			<FontSize { ...props } />
			<Color { ...props } />
			<LineHeight  { ...props } />
			<LetterSpacing { ...props } />
			<HtmlTag  { ...props } />
		</PanelBody>
	);
}
export default PanelMainText;
