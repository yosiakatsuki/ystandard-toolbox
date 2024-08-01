import { addFilter } from '@wordpress/hooks';

export function filterSpacingSizes( sizes: object[] ) {
	addFilter(
		'blockEditor.useSetting.before',
		'ystandard-toolbox/plugin-settings/heading/spacingSizes',
		( settingValue, settingName ) => {
			// テーマの余白設定かつ設定がない場合はプラグイン側で用意した余白設定をセット.
			if (
				'spacing.spacingSizes.theme' === settingName &&
				! settingValue
			) {
				settingValue = sizes;
			}
			return settingValue;
		}
	);
}
