/**
 * WordPress dependencies.
 */
import { useContext, useEffect, useState, useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Aktk dependencies
 */
import CustomSelectControl, {
	CustomSelectControlOption,
} from '@aktk/block-components/wp-controls/custom-select-control';
import { PrimaryButton } from '@aktk/block-components/components/buttons';

/**
 * Plugin Component.
 */
import { HeadingContext } from '../index';
import { updateHeadingLevel } from '@aktk/plugin-settings/heading/app/api';

export function LevelEditContainer() {
	// @ts-ignore
	const { levelList, levelKeys, headingStyles, isEdit, setIsEdit } =
		useContext( HeadingContext );

	const [ editLevelList, setEditLevelList ] = useState( levelList );

	// レベルリストの更新.
	useEffect( () => {
		setEditLevelList( levelList );
	}, [ levelList ] );

	// セレクトボックスの選択肢.
	const selectOptions = useMemo( () => {
		// @ts-ignore
		return Object.keys( headingStyles ).map( ( key: string ) => {
			// @ts-ignore
			const style = headingStyles[ key ];
			return {
				key: style?.slug,
				name: style?.label,
			};
		} );
	}, [ headingStyles ] );

	// レベルリストの変更処理.
	const handleOnChange = ( level: string, value: string ) => {
		const newLevelList = { ...editLevelList };
		// @ts-ignore
		newLevelList[ level ] = value;
		setEditLevelList( newLevelList );
		setIsEdit( true );
	};

	// 更新成功時の処理.
	const onUpdateSuccess = () => {
		setIsEdit( false );
	};

	// 保存処理.
	const handleOnSave = async () => {
		if ( ! editLevelList ) {
			return;
		}
		await updateHeadingLevel( {
			levelList: editLevelList,
			onSuccess: onUpdateSuccess,
		} );
	};

	return (
		<div
			className={
				'relative mt-5 min-h-[300px] border border-solid border-aktk-border-gray px-4 py-8'
			}
		>
			<h2 className={ 'mb-3 mt-0 font-bold text-aktk-text-gray' }>
				{ __( '見出しレベル割り当て', 'ystandard-toolbox' ) }
			</h2>
			<table className="mt-4">
				<tbody>
					{ Object.keys( levelKeys ).map( ( key ) => {
						// @ts-ignore
						const label = levelKeys[ key ];
						// @ts-ignore
						const value = editLevelList[ key ];
						return (
							<tr key={ key } className="[&>*]:py-2">
								<th>
									<span className="flex w-full items-center gap-2 text-fz-s font-normal after:h-px after:min-w-5 after:grow after:bg-gray-200 after:content-['']">
										{ label }
									</span>
								</th>
								<td className="pl-2">
									<LevelSelect
										value={ value }
										level={ key }
										options={ selectOptions }
										onChange={ handleOnChange }
									/>
								</td>
							</tr>
						);
					} ) }
				</tbody>
			</table>
			<div className="mt-4">
				<PrimaryButton icon={ 'cloud-upload' } onClick={ handleOnSave }>
					{ __( '割り当て設定を更新', 'ystandard-toolbox' ) }
				</PrimaryButton>
			</div>
		</div>
	);
}

type LevelSelectProps = {
	value: string;
	level: string;
	options: CustomSelectControlOption[];
	onChange: ( level: string, value: string ) => void;
};

function LevelSelect( props: LevelSelectProps ) {
	const { value, level, options, onChange } = props;

	const handleOnChange = ( selectedValue: string ) => {
		onChange( level, selectedValue );
	};

	return (
		<CustomSelectControl
			value={ value }
			options={ options }
			onChange={ handleOnChange }
			emptyLabel={ __( '-- 割り当てなし --', 'ystandard-toolbox' ) }
		/>
	);
}
