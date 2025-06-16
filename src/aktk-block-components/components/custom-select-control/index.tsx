/**
 * WordPress
 */
import { useMemo } from '@wordpress/element';
import { CustomSelectControl as WPCustomSelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export interface CustomSelectControlOption {
	key: string;
	name: string;
	style?: React.CSSProperties;
}

export interface CustomSelectControlProps {
	value: string;
	options: CustomSelectControlOption[];
	onChange: ( value: string ) => void;
	label?: string;
	emptyLabel?: string;
	useEmptyValue?: boolean;
	className?: string;
	disabled?: boolean;
}

export function CustomSelectControl( props: CustomSelectControlProps ) {
	const {
		value,
		options,
		onChange,
		label,
		emptyLabel,
		useEmptyValue = true,
		className = '',
		disabled = false,
	} = props;
	// 選択肢に空の選択肢を追加.
	const selectOptions = useMemo( () => {
		if ( useEmptyValue ) {
			return [
				...[
					{
						key: '',
						name:
							emptyLabel ||
							__( '-- 選択してください --', 'ystandard-toolbox' ),
					},
				],
				...options,
			] as CustomSelectControlOption[];
		}
		return [ ...options ] as CustomSelectControlOption[];
	}, [ options ] );
	// 選択時にキーをリターン.
	const handleOnChange = ( {
		selectedItem,
	}: {
		selectedItem: CustomSelectControlOption;
	} ) => {
		onChange( selectedItem.key );
	};
	// 選択中アイテムを取得.
	const currentItem = selectOptions.find( ( option ) => {
		return option.key === value;
	} );

	return (
		<div
			className={
				'[&_*:disabled]:bg-gray-100 [&_*:disabled]:text-gray-500 [&_.components-custom-select-control__label:empty]:hidden'
			}
		>
			<WPCustomSelectControl
				label={ label }
				options={ selectOptions }
				value={ currentItem }
				onChange={ handleOnChange }
				__nextUnconstrainedWidth={ true }
				className={ className }
				disabled={ disabled }
			/>
		</div>
	);
}
