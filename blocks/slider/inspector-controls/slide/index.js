import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ResponsiveTab from "@ystdtb/components/responsive-tab";
import { hasSlidesOption } from "../../function/slider-option";
import SlidesPerView from "./slides-per-view";

const PanelSlide = ( props ) => {

	const { attributes } = props;
	return (
		<>
			{ ( hasSlidesOption( attributes ) &&
				<PanelBody title={ __( 'スライド表示数設定', 'ystandard-toolbox' ) }>
					<ResponsiveTab>
						{ ( tab ) => {
							return (
								<SlidesPerView type={ tab.name } { ...props } />
							);
						} }
					</ResponsiveTab>
				</PanelBody>
			) }
		</>
	);
}
export default PanelSlide;
