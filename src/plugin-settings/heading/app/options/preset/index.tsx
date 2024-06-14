import classnames from 'classnames';
/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect, useContext } from '@wordpress/element';

/**
 * Akatsuki
 */
import { OpenPanel } from '@aktk/block-components/components/panel';
import {
	PrimaryButton,
	HasElementButton,
} from '@aktk/block-components/components/buttons';
import { Modal } from '@aktk/block-components/components/modal';
import { NoticeWarning } from '@aktk/block-components/components/notice';
/**
 * Types
 */
import type { HeadingOption } from '@aktk/plugin-settings/heading/types';
// @ts-ignore
import presetStyles from '../../../preset/preset.json';
import PreviewStyle from '@aktk/plugin-settings/heading/app/preview/preview-style';

import { HeadingContext } from '../../index';
import { mergePreset } from './utils';

export default function Preset() {
	const [ isModalOpen, setIsModalOpen ] = useState( false );
	// @ts-ignore
	const { headingOption, setHeadingOption, setIsEdit } =
		useContext( HeadingContext );

	// プリセットが選択されたら値をセット.
	const handleOnSelectPreset = ( value: HeadingOption ) => {
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
	};

	return (
		<OpenPanel title={ __( 'プリセット', 'ystandard-toolbox' ) }>
			<div>
				<PrimaryButton
					icon={ 'admin-appearance' }
					onClick={ () => setIsModalOpen( ! isModalOpen ) }
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
		</OpenPanel>
	);
}

type PresetListProps = {
	onSelect: ( value: HeadingOption ) => void;
};

function PresetList( props: PresetListProps ) {
	const { onSelect } = props;
	const [ presetList, setPresetList ] = useState< HeadingOption[] >();

	useEffect( () => {
		const _presetStyles = Object.keys( presetStyles ).map( ( key ) => {
			// @ts-expect-error
			return presetStyles[ key ];
		} );
		setPresetList( _presetStyles );
	}, [] );

	const handleOnClick = ( value: HeadingOption ) => {
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
				<div className={ 'text-fz-xxs' }>
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
						const selector = classnames(
							`ystdtb-setting-heading__preset-preview-${ preset.slug }`
						);
						return (
							<div key={ preset.slug }>
								<HasElementButton
									className={
										'block w-full rounded-2xl border border-solid border-aktk-border-light-gray p-4 text-left text-fz-s'
									}
									onClick={ () => handleOnClick( preset ) }
								>
									<PreviewStyle
										style={ preset?.style }
										before={ preset?.before }
										after={ preset?.after }
										selector={ selector }
									/>
									<div className={ selector }>
										プリセット : { preset.label }
									</div>
								</HasElementButton>
							</div>
						);
					} ) }
			</div>
		</>
	);
}
