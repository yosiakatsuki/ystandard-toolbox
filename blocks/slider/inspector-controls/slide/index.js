import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ResponsiveTab, { tabType } from "@ystdtb/components/responsive-tab";
import { hasSliderSetting } from "../../function/slider-option";

const PanelSlide = ( props ) => {

	const { attributes } = props;
	const { effect } = attributes;
	return (
		<>
			{ ( hasSliderSetting( effect ) &&
				<PanelBody title={ __( 'スライド表示数設定', 'ystandard-toolbox' ) }>
					<ResponsiveTab>
						{ ( tab ) => {
							return (
								<>
									{ tabType.desktop === tab.name && (
										<></>
									) }
									{ tabType.tablet === tab.name && (
										<></>
									) }
									{ tabType.mobile === tab.name && (
										<></>
									) }
								</>
							);
						} }
					</ResponsiveTab>
				</PanelBody>
			) }
		</>
	);
}
export default PanelSlide;
