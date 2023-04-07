/**
 * WordPress
 */
import { useContext, useState, useEffect, useMemo } from '@wordpress/element';
/**
 * Plugin
 */
import CustomSelectControl, {
	CustomSelectControlOption,
} from '@aktk/components/custom-select-control';
/**
 * Component.
 */
import { HeadingContext } from '../index';

export default function LevelSelect() {
	const [ levelSelect, setLevelSelect ] = useState( [] );
	// @ts-ignore
	const { selectedLevel, setSelectedLevel, headingStyles } =
		useContext( HeadingContext );

	const selectOptions = useMemo( () => {
		return Object.keys( headingStyles ).map( ( key ) => {
			const style = headingStyles[ key ];
			return {
				key: style?.slug,
				name: style?.label,
			};
		} );
	}, [ headingStyles ] );

	const initLevel = () => {
		// @ts-ignore.
		setLevelSelect( selectOptions );
	};
	useEffect( () => {
		initLevel();
	}, [ headingStyles ] );

	const handleOnChange = ( value: string ) => {
		setSelectedLevel( value );
	};

	const handleOnClear = () => {
		setSelectedLevel( '' );
	};

	return (
		<div className={ 'border border-slate-400 p-5' }>
			<div className={ 'flex justify-between' }>
				<div className={ 'flex justify-between items-end gap-3' }>
					<CustomSelectControl
						value={ selectedLevel }
						options={ levelSelect as CustomSelectControlOption[] }
						onChange={ handleOnChange }
						label={ 'レベル選択' }
					/>
					<button
						className={ 'border-0 text-slate-400 text-xs py-1' }
						onClick={ handleOnClear }
					>
						クリア
					</button>
				</div>
			</div>
		</div>
	);
}
