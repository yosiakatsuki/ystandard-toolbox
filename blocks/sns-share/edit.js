import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
} from '@wordpress/block-editor';
import {
	PanelBody,
	BaseControl,
	ToggleControl,
	TextControl,
	Button,
	Disabled,
} from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';

import Notice, { noticeType } from '@ystd/components/notice';
import { shareButtonsDesign } from './config';

const snsShare = ( props ) => {
	const { attributes, setAttributes } = props;
	const {
		buttonType,
		align,
		labelBefore,
		labelAfter,
		useX,
		useTwitter,
		useFacebook,
		useHatenaBookmark,
		usePocket,
		useLINE,
		useBluesky,
		twitterVia,
		twitterRelatedUser,
		twitterHashTags,
	} = attributes;

	const snsSharePreview = () => {
		if (
			!useX &&
			!useTwitter &&
			!useFacebook &&
			!useHatenaBookmark &&
			!usePocket &&
			!useLINE &&
			!useBluesky
		) {
			return (
				<div className="ystdtb-sns-share-edit__no-preview">
					{__(
						'表示できるシェアボタンがありません。',
						'ystandard-toolbox'
					)}
				</div>
			);
		}
		if ( 'official' === buttonType ) {
			return (
				<div className="ystdtb-sns-share-edit__no-preview">
					{__(
						'公式ボタンの確認は「新しいタブでプレビュー」からご確認ください。',
						'ystandard-toolbox'
					)}
				</div>
			);
		}

		return (
			<Disabled>
				<ServerSideRender
					block="ystdtb/sns-share"
					attributes={attributes}
				/>
			</Disabled>
		);
	};

	return (
		<>
			<>
				<BlockControls>
					<AlignmentToolbar
						value={align}
						onChange={( nextAlign ) => {
							setAttributes( { align: nextAlign } );
						}}
					/>
				</BlockControls>
				<InspectorControls>
					<PanelBody
						title={__( 'デザイン', 'ystandard-toolbox' )}
						initialOpen={true}
					>
						<BaseControl>
							<div className="ystdtb__horizon-buttons">
								{shareButtonsDesign.map( ( item ) => {
									return (
										<Button
											key={item.value}
											isSecondary={
												item.value !== buttonType
											}
											isPrimary={
												item.value === buttonType
											}
											onClick={() => {
												setAttributes( {
													buttonType: item.value,
												} );
											}}
										>
											<span>{item.label}</span>
										</Button>
									);
								} )}
							</div>
							{'official' === buttonType && !!useBluesky && (
								<div style={{ marginTop: '10px', fontSize: '10px' }}>
									<Notice type={noticeType.warning}>
										{__(
											'Blueskyの公式ボタンはありません。Blueskyボタンを表示する場合は「公式」以外の設定をご利用ください。',
											'ystandard-toolbox'
										)}
									</Notice>
								</div>
							)}
						</BaseControl>
					</PanelBody>
					<PanelBody
						title={__(
							'シェアボタン ON-OFF',
							'ystandard-toolbox'
						)}
						initialOpen={true}
					>
						<BaseControl>
							<ToggleControl
								label={__( 'X', 'ystandard-toolbox' )}
								onChange={() => {
									setAttributes( {
										useX: !useX,
									} );
								}}
								checked={useX}
							/>
							<ToggleControl
								label={__( 'Twitter', 'ystandard-toolbox' )}
								onChange={() => {
									setAttributes( {
										useTwitter: !useTwitter,
									} );
								}}
								checked={useTwitter}
							/>
							<ToggleControl
								label={__( 'Bluesky', 'ystandard-toolbox' )}
								onChange={() => {
									setAttributes( {
										useBluesky: !useBluesky,
									} );
								}}
								checked={useBluesky}
							/>
							<ToggleControl
								label={__( 'Facebook', 'ystandard-toolbox' )}
								onChange={() => {
									setAttributes( {
										useFacebook: !useFacebook,
									} );
								}}
								checked={useFacebook}
							/>
							<ToggleControl
								label={__(
									'はてなブックマーク',
									'ystandard-toolbox'
								)}
								onChange={() => {
									setAttributes( {
										useHatenaBookmark: !useHatenaBookmark,
									} );
								}}
								checked={useHatenaBookmark}
							/>
							<ToggleControl
								label={__( 'Pocket', 'ystandard-toolbox' )}
								onChange={() => {
									setAttributes( {
										usePocket: !usePocket,
									} );
								}}
								checked={usePocket}
							/>
							<ToggleControl
								label={__( 'LINE', 'ystandard-toolbox' )}
								onChange={() => {
									setAttributes( {
										useLINE: !useLINE,
									} );
								}}
								checked={useLINE}
							/>
						</BaseControl>
					</PanelBody>
					<PanelBody title={__( 'テキスト', 'ystandard-toolbox' )}>
						<BaseControl>
							<TextControl
								label={__(
									'上側テキスト',
									'ystandard-toolbox'
								)}
								value={labelBefore}
								onChange={( value ) => {
									setAttributes( {
										labelBefore: value,
									} );
								}}
							/>
						</BaseControl>
						<BaseControl>
							<TextControl
								label={__(
									'下側テキスト',
									'ystandard-toolbox'
								)}
								value={labelAfter}
								onChange={( value ) => {
									setAttributes( {
										labelAfter: value,
									} );
								}}
							/>
						</BaseControl>
					</PanelBody>
					<PanelBody
						title={__(
							'Twitter用オプション',
							'ystandard-toolbox'
						)}
					>
						<BaseControl>
							<TextControl
								label={__(
									'viaアカウント',
									'ystandard-toolbox'
								)}
								value={twitterVia}
								onChange={( value ) => {
									setAttributes( {
										twitterVia: value,
									} );
								}}
							/>
							<div className="ystdtb-block-dscr">
								{__(
									'「@」なしのTwitterユーザー名を入力して下さい。',
									'ystandard-toolbox'
								)}
							</div>
						</BaseControl>
						<BaseControl>
							<TextControl
								label={__(
									'ツイート後に表示するおすすめアカウント',
									'ystandard-toolbox'
								)}
								value={twitterRelatedUser}
								onChange={( value ) => {
									setAttributes( {
										twitterRelatedUser: value,
									} );
								}}
							/>
							<div className="ystdtb-block-dscr">
								{__(
									'「@」なしのTwitterユーザー名を入力して下さい。',
									'ystandard-toolbox'
								)}
							</div>
						</BaseControl>
						<BaseControl>
							<TextControl
								label={__(
									'ハッシュタグ',
									'ystandard-toolbox'
								)}
								value={twitterHashTags}
								onChange={( value ) => {
									setAttributes( {
										twitterHashTags: value,
									} );
								}}
							/>
							<div className="ystdtb-block-dscr">
								{__(
									'「#」を除いたハッシュタグ名を入力して下さい。',
									'ystandard-toolbox'
								)}
							</div>
						</BaseControl>
					</PanelBody>
				</InspectorControls>
			</>
			<div className={'ystdtb-sns-share-edit'}>
				{snsSharePreview()}
			</div>
		</>
	);
};

export default snsShare;
