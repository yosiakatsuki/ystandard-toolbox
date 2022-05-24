/**
 * WordPress.
 */
import { __ } from '@wordpress/i18n';
import { BaseControl } from '@wordpress/components';
import ResponsiveTab, { tabType } from '@ystd/components/responsive-tab';
import Notice, { noticeType } from '@ystd/components/notice';
import NumberControl from '@ystd/components/number-control';
import { toInt } from '@ystd/helper/number';

const Offset = ( { attributes, setAttributes } ) => {
	const { offset, offsetMobile } = attributes;
	const sanitize = ( value ) => {
		const _value = toInt( value, 0 );
		return 0 < _value ? _value : undefined;
	};
	return (
		<BaseControl>
			<ResponsiveTab
				label={ __( '表示開始位置', 'ystandard-toolbox' ) }
				hasTablet={ false }
			>
				{ ( tab ) => {
					return (
						<>
							{ tabType.desktop === tab.name && (
								<NumberControl
									value={ offset }
									onChange={ ( value ) => {
										setAttributes( {
											offset: sanitize( value ),
										} );
									} }
								/>
							) }
							{ tabType.mobile === tab.name && (
								<NumberControl
									value={ offsetMobile }
									onChange={ ( value ) => {
										setAttributes( {
											offsetMobile: sanitize( value ),
										} );
									} }
								/>
							) }
						</>
					);
				} }
			</ResponsiveTab>
			<Notice type={ noticeType.help }>
				{ __(
					'表示する投稿の開始位置をずらすための設定です(offset)。例えば、「3」を設定すると開始位置が3つ後の投稿から表示されます。',
					'ystandard-toolbox'
				) }
			</Notice>
		</BaseControl>
	);
};
export default Offset;
