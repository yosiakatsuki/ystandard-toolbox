import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import FontSize from "./font-size";
import Color from "./color";
import HtmlTag from "./html-tag";
import LineHeight from "./line-height";
import LetterSpacing from "./letter-spacing";
import Margin from "./margin";

const PanelSubText = ( props ) => {
	return (
		<PanelBody
			title={ __( 'テキスト（下段）', 'ystandard-toolbox' ) }
			initialOpen={ false }
		>
			<FontSize { ...props } />
			<Color { ...props } />
			<LineHeight { ...props } />
			<LetterSpacing { ...props } />
			<HtmlTag { ...props } />
			<Margin { ...props } />
		</PanelBody>
	);
}
export default PanelSubText;
