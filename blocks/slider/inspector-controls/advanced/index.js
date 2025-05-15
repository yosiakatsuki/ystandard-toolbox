import { PanelBody, BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import SliderId from './slider-id';
import Notice from "../../../../src/js/component/notice";
import SlidesPerViewAuto from "./slides-par-view-auto";

const PanelAdvanced = ( props ) => {
	return (
		<PanelBody
			title={__( '上級者向け設定', 'ystandard-toolbox' )}
			initialOpen={false}
		>
			<BaseControl
				__nextHasNoMarginBottom
			>
				<Notice type={'warning'}>
					{__( 'この設定は上級者向け設定です。CSSスタマイズ等、ブロックの設定以外のカスタマイズを前提とした設定になります。この設定項目の使い方などについてはサポート対象外となります。', 'ystandard-toolbox' )}
				</Notice>
			</BaseControl>
			<SliderId {...props} />
			<SlidesPerViewAuto {...props} />
		</PanelBody>
	);
};
export default PanelAdvanced;
