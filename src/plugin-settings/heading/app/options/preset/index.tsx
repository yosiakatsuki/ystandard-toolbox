/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect, useContext } from '@wordpress/element';

/**
 * Akatsuki
 */
import {
	PrimaryButton,
	HasElementButton,
} from '@aktk/block-components/components/buttons';
import { Modal } from '@aktk/block-components/components/modal';
import { NoticeWarning } from '@aktk/block-components/components/notice';
import { getIconSvg } from '@aktk/block-components/utils/icon';
/**
 * Plugin Dependencies
 */
import { PluginSettingsPanel } from '@aktk/plugin-settings/components/panel';
/**
 * Types
 */
import type {
	HeadingOption,
	HeadingStyle,
	HeadingPseudoElementsStyle,
} from '@aktk/plugin-settings/heading/types';
// @ts-ignore
import presetStyles from '../../../preset/preset.json';
import PreviewStyle from '@aktk/plugin-settings/heading/app/preview/preview-style';

import { HeadingContext } from '../../index';
import { mergePreset } from './utils';

/**
 * プリセット.
 */
export default function Preset() {
	const [ isModalOpen, setIsModalOpen ] = useState( false );
	// @ts-ignore
	const { headingOption, setHeadingOption, setIsEdit, setShowEditor } =
		useContext( HeadingContext );

	// プリセットが選択されたら値をセット.
	const handleOnSelectPreset = ( value: HeadingOption ) => {
		// initialOpen 対策.
		setShowEditor( false );

		// プリセットの値をマージ.
		const newStyle = mergePreset( value?.style, headingOption?.style );
		const newBefore = mergePreset( value?.before, headingOption?.before );
		const newAfter = mergePreset( value?.after, headingOption?.after );

		setHeadingOption( {
			...headingOption,
			// @ts-expect-error
			style: newStyle,
			before: newBefore,
			after: newAfter,
		} );

		setIsModalOpen( false );
		setIsEdit( true );
		// initialOpen 対策.
		setTimeout( () => {
			setShowEditor( true );
		}, 10 );
	};

	return (
		<PluginSettingsPanel
			title={ __( 'プリセット', 'ystandard-toolbox' ) }
			initialOpen={ true }
		>
			<div>
				<PrimaryButton
					icon={ 'admin-appearance' }
					onClick={ () => {
						setIsModalOpen( ! isModalOpen );
					} }
				>
					{ __( 'プリセットから選択', 'ystandard-toolbox' ) }
				</PrimaryButton>
			</div>
			<Modal
				isOpen={ isModalOpen }
				onCancel={ () => setIsModalOpen( false ) }
			>
				<PresetList onSelect={ handleOnSelectPreset } />
			</Modal>
		</PluginSettingsPanel>
	);
}

type PresetListProps = {
	onSelect: ( value: HeadingOption ) => void;
};

function PresetList( props: PresetListProps ) {
	const { onSelect } = props;
	const [ presetList, setPresetList ] = useState< HeadingOption[] >();

	// プリセットの初期化.
	useEffect( () => {
		const _presetStyles = Object.keys( presetStyles ).map( ( key ) => {
			// @ts-expect-error
			const preset = presetStyles[ key ];
			// enable を true にする.
			if ( preset?.before ) {
				preset.before.enable = true;
			}
			if ( preset?.after ) {
				preset.after.enable = true;
			}
			return preset;
		} );
		setPresetList( _presetStyles );
	}, [] );

	// プリセット選択時の処理.
	const handleOnClick = ( value: HeadingOption ) => {
		console.log( value );
		onSelect( value );
	};

	return (
		<>
			<div
				className={
					'border-b-1 mb-4 border-0 border-b border-dotted border-b-aktk-border-gray pb-4'
				}
			>
				<div>
					{ __(
						'使用する見出しデザインを選択してください。',
						'ystandard-toolbox'
					) }
				</div>
				<div className={ 'text-fz-xs' }>
					{ __(
						'※プリセット選択後に各設定のカスタマイズも可能です。',
						'ystandard-toolbox'
					) }
				</div>
				<NoticeWarning>
					{ __(
						'※プリセット選択時に背景・余白・枠線設定がリセットされ、プリセットの内容で上書きされます。',
						'ystandard-toolbox'
					) }
				</NoticeWarning>
			</div>

			<div
				className={
					'grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-4 lg:grid-cols-4'
				}
			>
				{ presetList &&
					presetList.map( ( preset ) => {
						const selectPreset = createSelectPreset( preset );
						const previewPreset = structuredClone( selectPreset );
						const selector = `ystdtb-setting-heading__preset-preview-${ preset.slug }`;
						return (
							<div key={ preset.slug }>
								<HasElementButton
									className={
										'block w-full !h-full rounded-2xl border border-solid border-aktk-border-light-gray p-4 text-left text-fz-s'
									}
									onClick={ () =>
										handleOnClick( selectPreset )
									}
								>
									<PreviewStyle
										style={ previewPreset?.style }
										before={ previewPreset?.before }
										after={ previewPreset?.after }
										selector={ selector }
									/>
									<div id={ selector } className="text-fz-xs">
										{ preset.label }
									</div>
								</HasElementButton>
							</div>
						);
					} ) }
			</div>
		</>
	);
}

function createSelectPreset( preset: HeadingOption ) {
	const _preset = structuredClone( preset );

	// アイコンの SVG をセット.
	if ( _preset?.before && _preset?.before?.icon ) {
		_preset.before.content = getIconSvg( _preset.before.icon );
	}
	if ( _preset?.after && _preset?.after?.icon ) {
		_preset.after.content = getIconSvg( _preset.after.icon );
	}
	return _preset;
}
