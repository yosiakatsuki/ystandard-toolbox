/**
 * WordPress Dependencies
 */
import { useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Aktk Dependencies
 */
import { CustomSelectControl } from '@aktk/block-components/components/custom-select-control';

interface ImageSizeOption {
	slug: string;
	name: string;
}

export interface ImageSizeSelectProps {
	value: string;
	onChange: ( value: string ) => void;
	label?: string;
}

/**
 * 画像サイズ選択コンポーネント
 *
 * WordPressに登録されている画像サイズをドロップダウンで選択する。
 * @param props
 */
export function ImageSizeSelect( props: ImageSizeSelectProps ) {
	const {
		value,
		onChange,
		label = __( '画像サイズ', 'aktk-block-components' ),
	} = props;

	const imageSizes = useSelect( ( select ) => {
		// @ts-ignore
		const settings = select( blockEditorStore ).getSettings();
		return ( settings?.imageSizes ?? [] ) as ImageSizeOption[];
	}, [] );

	const options = useMemo( () => {
		return imageSizes.map( ( size ) => ( {
			key: size.slug,
			name: size.name,
		} ) );
	}, [ imageSizes ] );

	return (
		<CustomSelectControl
			label={ label }
			value={ value }
			options={ options }
			onChange={ onChange }
			useEmptyValue={ false }
		/>
	);
}
