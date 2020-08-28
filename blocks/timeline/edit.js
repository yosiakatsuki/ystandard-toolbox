import classnames from 'classnames';
import { template, presetLabelTypes } from './config';
import {
	InnerBlocks,
	InspectorControls,
	FontSizePicker,
	__experimentalBlock as Block,
} from '@wordpress/block-editor';
import {
	PanelBody,
	BaseControl,
	RangeControl,
	Button,
	ToggleControl,
	ColorPalette,
} from '@wordpress/components';
import { withState, compose } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { withDispatch, select } from '@wordpress/data';
import { innerMargin } from './item/config';
import { calcContentMarginTop } from './item/function';
import { __ } from '@wordpress/i18n';
import {
	getColorSlug,
	getColorCode,
} from '../../src/js/blocks/function/_getColorSlug';
import {
	getFontSize,
	getFontSlug,
} from '../../src/js/blocks/function/_getFontSlug';

function timeline(props) {
	const {
		className,
		updateChildAttributes,
		updateLabelType,
		contentMarginTop,
		labelType,
		labelBold,
		labelBorderRadius,
		labelFontSize,
		labelBorderSize,
		setState,
	} = props;

	const { colors } = select('core/block-editor').getSettings();

	const classes = classnames('ystdtb-timeline', className, {});

	const selectedMarginTop = calcContentMarginTop(
		labelType,
		contentMarginTop,
		'1'
	);

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody
					title={__('タイムライン一括設定', 'ystandard-toolbox')}
				>
					<BaseControl
						id={'contents-margin'}
						label={__('コンテンツ間の余白', 'ystandard-toolbox')}
					>
						<div className="ystdtb__horizon-buttons">
							{innerMargin.map((item) => {
								return (
									<Button
										key={item.name}
										isSecondary={true}
										onClick={() => {
											updateChildAttributes({
												contentsInnerMargin: item.name,
											});
										}}
									>
										<span>{item.label}</span>
									</Button>
								);
							})}
						</div>
					</BaseControl>
					<BaseControl
						id={'contents-border-color'}
						label={__('線の色', 'ystandard-toolbox')}
					>
						<ColorPalette
							colors={colors}
							disableCustomColors={false}
							onChange={(color) => {
								updateChildAttributes({
									contentsBorderColor: getColorSlug(color),
									customContentsBorderColor: getColorCode(
										color
									),
								});
							}}
						/>
					</BaseControl>
					<BaseControl
						id={'contents-border-color'}
						label={__('コンテンツ上部余白', 'ystandard-toolbox')}
					>
						<RangeControl
							value={selectedMarginTop}
							onChange={(value) => {
								updateChildAttributes({
									contentMarginTop: value,
								});
								setState({ contentMarginTop: value });
							}}
							initialPosition={selectedMarginTop}
							min={-100}
							max={100}
							step={1}
							allowReset={true}
						/>
					</BaseControl>
				</PanelBody>
				<PanelBody title={__('ラベル一括設定', 'ystandard-toolbox')}>
					<BaseControl
						id={'label-contents'}
						label={__('角丸', 'ystandard-toolbox')}
					>
						<RangeControl
							value={labelBorderRadius}
							onChange={(value) => {
								updateChildAttributes({
									labelBorderRadius: value,
								});
								setState({ labelBorderRadius: value });
							}}
							initialPosition={50}
							min={0}
							max={100}
							step={1}
							allowReset={true}
						/>
					</BaseControl>
					<BaseControl
						id={'label-contents'}
						label={__('タイプ', 'ystandard-toolbox')}
					>
						<div className="ystdtb__horizon-buttons">
							{presetLabelTypes.map((item) => {
								return (
									<Button
										key={item.name}
										isSecondary={true}
										onClick={() => {
											const margin = calcContentMarginTop(
												item.name,
												undefined,
												'1'
											);
											updateLabelType(item.name);
											updateChildAttributes({
												contentMarginTop: margin,
											});
											setState({
												labelType: item.name,
												contentMarginTop: margin,
											});
											if ('' === item.name) {
												updateChildAttributes({
													labelFontSize: 14,
													customLabelFontSize: 14,
												});
											}
										}}
									>
										<span>{item.label}</span>
									</Button>
								);
							})}
						</div>
					</BaseControl>
					{'text' === labelType && (
						<BaseControl
							id={'label-contents-weight'}
							label={__('文字の太さ', 'ystandard-toolbox')}
						>
							<ToggleControl
								label={__('太字にする', 'ystandard-toolbox')}
								onChange={() => {
									updateChildAttributes({
										labelBold: !labelBold,
									});
									setState({
										labelBold: !labelBold,
									});
								}}
								checked={labelBold}
							/>
						</BaseControl>
					)}
					{undefined !== labelType && '' !== labelType && (
						<>
							<BaseControl
								id={'label-contents-size'}
								label={__(
									'文字・アイコン サイズ',
									'ystandard-toolbox'
								)}
							>
								<FontSizePicker
									label={__('サイズ', 'ystandard-toolbox')}
									value={labelFontSize}
									onChange={(font) => {
										updateChildAttributes({
											labelFontSize: getFontSlug(font),
											customLabelFontSize: getFontSize(
												font
											),
										});
										setState({ labelFontSize: font });
									}}
								/>
							</BaseControl>
							<BaseControl
								id={'label-contents-color'}
								label={__(
									'文字・アイコン 色',
									'ystandard-toolbox'
								)}
							>
								<ColorPalette
									colors={colors}
									disableCustomColors={false}
									onChange={(color) => {
										updateChildAttributes({
											labelColor: getColorSlug(color),
											customLabelColor: getColorCode(
												color
											),
										});
									}}
								/>
							</BaseControl>
						</>
					)}
					<BaseControl
						id={'label-bg'}
						label={__('背景色', 'ystandard-toolbox')}
					>
						<ColorPalette
							colors={colors}
							disableCustomColors={false}
							onChange={(color) => {
								updateChildAttributes({
									labelBackgroundColor: getColorSlug(color),
									customLabelBackgroundColor: getColorCode(
										color
									),
								});
							}}
						/>
					</BaseControl>
					<BaseControl
						id={'label-border'}
						label={__('枠線の太さ', 'ystandard-toolbox')}
					>
						<RangeControl
							value={labelBorderSize}
							onChange={(value) => {
								updateChildAttributes({
									labelBorderSize: value,
								});
								setState({ labelBorderSize: value });
							}}
							initialPosition={0}
							min={0}
							max={100}
							step={1}
							allowReset={true}
						/>
					</BaseControl>
					<BaseControl
						id={'label-border-color'}
						label={__('枠線の色', 'ystandard-toolbox')}
					>
						<ColorPalette
							colors={colors}
							disableCustomColors={false}
							onChange={(color) => {
								updateChildAttributes({
									labelBorderColor: getColorSlug(color),
									customLabelBorderColor: getColorCode(color),
								});
							}}
						/>
					</BaseControl>
				</PanelBody>
			</InspectorControls>

			<Block.div className={classnames('ystdtb-timeline-wrap')}>
				<div className={classes}>
					<InnerBlocks
						allowedBlocks={['ystdtb/timeline-item']}
						template={template}
						templateLock={false}
					/>
				</div>
			</Block.div>
		</Fragment>
	);
}

const timelineEdit = withDispatch((dispatch, ownProps, registry) => ({
	updateChildAttributes(attributes) {
		const { clientId } = ownProps;
		const { updateBlockAttributes } = dispatch('core/block-editor');
		const { getBlockOrder } = registry.select('core/block-editor');
		const innerBlockClientIds = getBlockOrder(clientId);
		innerBlockClientIds.forEach((innerBlockClientId) => {
			updateBlockAttributes(innerBlockClientId, attributes);
		});
	},
	updateLabelType(type) {
		const { clientId } = ownProps;
		const { updateBlockAttributes } = dispatch('core/block-editor');
		const { getBlockOrder } = registry.select('core/block-editor');

		let contents = '';
		if ('icon' === type) {
			contents = 'bookmark';
		}

		const innerBlockClientIds = getBlockOrder(clientId);
		let i = 0;
		innerBlockClientIds.forEach((innerBlockClientId) => {
			if ('text' === type) {
				i++;
				contents = i.toString();
			}
			updateBlockAttributes(innerBlockClientId, {
				labelType: type,
				labelContents: contents,
			});
		});
	},
}))(timeline);

export default compose([
	withState({
		contentMarginTop: 0,
		labelType: 'none',
		labelBold: false,
		labelBorderRadius: 50,
		labelFontSize: 14,
		labelBorderSize: 0,
	}),
])(timelineEdit);
