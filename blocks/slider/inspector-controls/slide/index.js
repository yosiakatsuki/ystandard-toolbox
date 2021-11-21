import { BaseControl, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ResponsiveTab from "@ystdtb/components/responsive-tab";
import { hasSlidesOption } from "../../function/slider-option";
import SlidesPerView from "./slides-per-view";
import SpaceBetween from "./space-between";
import SlidesPerGroup from "./slides-per-group";

const PanelSlide = ( props ) => {

	const { attributes } = props;
	return (
		<>
			{ ( hasSlidesOption( attributes ) &&
				<PanelBody title={ __( 'スライド表示数設定', 'ystandard-toolbox' ) }>
					<BaseControl>
						<ResponsiveTab>
							{ ( tab ) => {
								return (
									<>
										<SlidesPerView type={ tab.name } { ...props } />
										<SlidesPerGroup type={ tab.name } { ...props } />
										<SpaceBetween type={ tab.name } { ...props } />
									</>
								);
							} }
						</ResponsiveTab>
					</BaseControl>
				</PanelBody>
			) }
		</>
	);
}
export default PanelSlide;
