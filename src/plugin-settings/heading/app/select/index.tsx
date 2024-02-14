/**
 * WordPress
 */
import { useContext, useState, useEffect, useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
/**
 * Plugin
 */
import CustomSelectControl, {
	CustomSelectControlOption,
} from '@aktk/components/custom-select-control';
import { AddButton } from '@aktk/block-components/buttons';
/**
 * Component.
 */
import { HeadingContext } from '../index';
import ConfirmSelect from './confirm-select';
import AddStyle from './add-style';

export default function LevelSelect() {
	const [ levelSelect, setLevelSelect ] = useState( [] );
	const [ isConfirmModalOpen, setIsConfirmModalOpen ] = useState( false );
	const [ tempSelectedStyle, setTempSelectedStyle ] = useState( '' );

	const {
		selectedStyle,
		setSelectedStyle,
		headingStyles,
		setAppMode,
		appMode,
		isEdit,
		setIsEdit,
		// @ts-ignore
	} = useContext( HeadingContext );

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

	const initLevel = () => {
		// @ts-ignore.
		setLevelSelect( selectOptions );
	};
	useEffect( () => {
		initLevel();
	}, [ headingStyles ] );

	const changeSelectedStyle = (
		value: string,
		checkEdit: boolean = true
	) => {
		if ( checkEdit && isEdit ) {
			return;
		}
		setSelectedStyle( value );
		setAppMode( value ? 'update' : 'select' );
		setTempSelectedStyle( '' );
	};

	const handleOnChange = ( value: string ) => {
		if ( isEdit ) {
			setTempSelectedStyle( value );
			setIsConfirmModalOpen( true );
			return;
		}
		changeSelectedStyle( value );
	};

	const handleOnAddButtonClick = () => {
		setAppMode( 'add' );
	};

	return (
		<>
			<div
				className={ 'border border-solid border-aktk-border-gray p-5' }
			>
				<div className={ 'flex justify-between' }>
					<div className={ 'flex items-end justify-between gap-3' }>
						<CustomSelectControl
							value={ selectedStyle || '' }
							options={
								levelSelect as CustomSelectControlOption[]
							}
							onChange={ handleOnChange }
							label={ __( 'スタイル選択', 'ystandard-toolbox' ) }
							className={ 'whitespace-nowrap' }
						/>
						<AddButton
							className={ 'ml-3' }
							onClick={ handleOnAddButtonClick }
							isSmall={ true }
							disabled={ !! selectedStyle }
						>
							<>{ __( 'スタイル追加', 'ystandard-toolbox' ) }</>
						</AddButton>
					</div>
				</div>
			</div>
			<ConfirmSelect
				isOpen={ isConfirmModalOpen }
				onCancel={ () => {
					setIsConfirmModalOpen( false );
					setTempSelectedStyle( '' );
				} }
				onSuccess={ () => {
					changeSelectedStyle( tempSelectedStyle, false );
					setIsConfirmModalOpen( false );
					setIsEdit( false );
				} }
			/>
			<AddStyle
				isOpen={ 'add' === appMode }
				onCancel={ () => setAppMode( 'select' ) }
				onSuccess={ () => setAppMode( 'select' ) }
			/>
		</>
	);
}
