import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	useBlockProps,
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

import { NoticeWarning } from '@aktk/block-components/components/notice';
import type { SnsShareProps, ShareButtonDesign } from './types';
import { HorizonButtonSelect } from '@aktk/block-components/components/buttons';

const shareButtonsDesign: ShareButtonDesign[] = [
	{ label: __( '円', 'ystandard-toolbox' ), value: 'circle' },
	{ label: __( '四角', 'ystandard-toolbox' ), value: 'square' },
	{ label: __( 'アイコン', 'ystandard-toolbox' ), value: 'icon' },
	{ label: __( '公式', 'ystandard-toolbox' ), value: 'official' },
];

const snsShare: React.FC< SnsShareProps > = ( props ) => {
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

	const blockProps = useBlockProps( { className: 'ystdtb-sns-share-edit' } );

	const snsSharePreview = () => {
		if (
			! useX &&
			! useTwitter &&
			! useFacebook &&
			! useHatenaBookmark &&
			! usePocket &&
			! useLINE &&
			! useBluesky
		) {
			return (
				<div className="ystdtb-sns-share-edit__no-preview">
					{ __(
						'表示できるシェアボタンがありません。',
						'ystandard-toolbox'
					) }
				</div>
			);
		}
		if ( 'official' === buttonType ) {
			return (
				<div className="ystdtb-sns-share-edit__no-preview">
					{ __(
						'公式ボタンの確認は「新しいタブでプレビュー」からご確認ください。',
						'ystandard-toolbox'
					) }
				</div>
			);
		}

		return (
			<Disabled>
				<ServerSideRender
					block="ystdtb/sns-share"
					attributes={ attributes }
				/>
			</Disabled>
		);
	};

	return (
		<>
			<>
				<BlockControls>
					{ 'official' !== buttonType && (
						<AlignmentToolbar
							value={ align }
							onChange={ ( nextAlign ) => {
								setAttributes( { align: nextAlign } );
							} }
						/>
					) }
				</BlockControls>
				<InspectorControls>
					<PanelBody
						title={ __( 'デザイン', 'ystandard-toolbox' ) }
						initialOpen={ true }
					>
						<BaseControl __nextHasNoMarginBottom>
							<HorizonButtonSelect
								value={ buttonType ?? 'circle' }
								onChange={ ( value ) => {
									setAttributes( {
										buttonType:
											value as ShareButtonDesign[ 'value' ],
									} );
								} }
								options={ shareButtonsDesign }
							/>

							{ 'official' === buttonType && useBluesky && (
								<div
									style={ {
										marginTop: '10px',
										fontSize: '10px',
									} }
								>
									<NoticeWarning>
										{ __(
											'Blueskyの公式ボタンはありません。Blueskyボタンを表示する場合は「公式」以外の設定をご利用ください。',
											'ystandard-toolbox'
										) }
									</NoticeWarning>
								</div>
							) }
						</BaseControl>
					</PanelBody>
					<PanelBody
						title={ __(
							'シェアボタン ON-OFF',
							'ystandard-toolbox'
						) }
						initialOpen={ true }
					>
						<BaseControl __nextHasNoMarginBottom>
							<ToggleControl
								label={ __( 'X', 'ystandard-toolbox' ) }
								onChange={ () => {
									setAttributes( {
										useX: ! useX,
									} );
								} }
								checked={ useX }
								__nextHasNoMarginBottom
							/>
							<ToggleControl
								label={ __( 'Twitter', 'ystandard-toolbox' ) }
								onChange={ () => {
									setAttributes( {
										useTwitter: ! useTwitter,
									} );
								} }
								checked={ useTwitter }
								__nextHasNoMarginBottom
							/>
							<ToggleControl
								label={ __( 'Bluesky', 'ystandard-toolbox' ) }
								onChange={ () => {
									setAttributes( {
										useBluesky: ! useBluesky,
									} );
								} }
								checked={ useBluesky }
								__nextHasNoMarginBottom
							/>
							<ToggleControl
								label={ __( 'Facebook', 'ystandard-toolbox' ) }
								onChange={ () => {
									setAttributes( {
										useFacebook: ! useFacebook,
									} );
								} }
								checked={ useFacebook }
								__nextHasNoMarginBottom
							/>
							<ToggleControl
								label={ __(
									'はてなブックマーク',
									'ystandard-toolbox'
								) }
								onChange={ () => {
									setAttributes( {
										useHatenaBookmark: ! useHatenaBookmark,
									} );
								} }
								checked={ useHatenaBookmark }
								__nextHasNoMarginBottom
							/>
							<ToggleControl
								label={ __( 'LINE', 'ystandard-toolbox' ) }
								onChange={ () => {
									setAttributes( {
										useLINE: ! useLINE,
									} );
								} }
								checked={ useLINE }
								__nextHasNoMarginBottom
							/>
						</BaseControl>
					</PanelBody>
					<PanelBody title={ __( 'テキスト', 'ystandard-toolbox' ) }>
						<BaseControl __nextHasNoMarginBottom>
							<TextControl
								label={ __(
									'上側テキスト',
									'ystandard-toolbox'
								) }
								value={ labelBefore }
								onChange={ ( value ) => {
									setAttributes( {
										labelBefore: value,
									} );
								} }
								__next40pxDefaultSize
								__nextHasNoMarginBottom
							/>
						</BaseControl>
						<BaseControl __nextHasNoMarginBottom>
							<TextControl
								label={ __(
									'下側テキスト',
									'ystandard-toolbox'
								) }
								value={ labelAfter }
								onChange={ ( value ) => {
									setAttributes( {
										labelAfter: value,
									} );
								} }
								__next40pxDefaultSize
								__nextHasNoMarginBottom
							/>
						</BaseControl>
					</PanelBody>
					<PanelBody
						title={ __(
							'Twitter用オプション',
							'ystandard-toolbox'
						) }
					>
						<BaseControl __nextHasNoMarginBottom>
							<TextControl
								label={ __(
									'viaアカウント',
									'ystandard-toolbox'
								) }
								value={ twitterVia }
								onChange={ ( value ) => {
									setAttributes( {
										twitterVia: value,
									} );
								} }
								__next40pxDefaultSize
								__nextHasNoMarginBottom
							/>
							<div className="ystdtb-block-dscr">
								{ __(
									'「@」なしのTwitterユーザー名を入力して下さい。',
									'ystandard-toolbox'
								) }
							</div>
						</BaseControl>
						<BaseControl __nextHasNoMarginBottom>
							<TextControl
								label={ __(
									'ツイート後に表示するおすすめアカウント',
									'ystandard-toolbox'
								) }
								value={ twitterRelatedUser }
								onChange={ ( value ) => {
									setAttributes( {
										twitterRelatedUser: value,
									} );
								} }
								__next40pxDefaultSize
								__nextHasNoMarginBottom
							/>
							<div className="ystdtb-block-dscr">
								{ __(
									'「@」なしのTwitterユーザー名を入力して下さい。',
									'ystandard-toolbox'
								) }
							</div>
						</BaseControl>
						<BaseControl __nextHasNoMarginBottom>
							<TextControl
								label={ __(
									'ハッシュタグ',
									'ystandard-toolbox'
								) }
								value={ twitterHashTags }
								onChange={ ( value ) => {
									setAttributes( {
										twitterHashTags: value,
									} );
								} }
								__next40pxDefaultSize
								__nextHasNoMarginBottom
							/>
							<div className="ystdtb-block-dscr">
								{ __(
									'「#」を除いたハッシュタグ名を入力して下さい。',
									'ystandard-toolbox'
								) }
							</div>
						</BaseControl>
					</PanelBody>
				</InspectorControls>
			</>
			<div { ...blockProps }>{ snsSharePreview() }</div>
		</>
	);
};

export default snsShare;
