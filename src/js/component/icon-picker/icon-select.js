import { useState, useMemo, useCallback } from '@wordpress/element';
import { Button } from '@wordpress/components';
import classnames from 'classnames';
import { getIcons } from '@ystd/function/icons';
import SVGIcon from '../svg-icon';
import { __ } from '@wordpress/i18n';


export default function IconSelect( props ) {
	const { selectedIcon, onChange, previewIcon } =
		props;
	const [ isOpen, setIsOpen ] = useState( false );
	const isPreview = false === previewIcon ? previewIcon : true;

	const iconOnSelect = useCallback( ( selectIcon ) => {
		if ( selectedIcon === selectIcon ) {
			onChange( '' );
			setIsOpen( false );
		} else {
			onChange( selectIcon );
		}
	}, [ selectedIcon, onChange, setIsOpen ] );

	const iconButtons = useMemo( () => {
		return (
			<>
				{ isOpen && (
					<IconList selectedIcon={ selectedIcon } onChange={ iconOnSelect }/>
				) }
			</>
		);
	}, [ selectedIcon, iconOnSelect, isOpen ] );


	return (
		<div className={ 'ys-icon-picker' }>
			<div className={ 'ys-icon-picker__selected' }>
				{ isPreview && (
					<div className={ 'ys-icon-picker__preview' }>
						{ !! selectedIcon && (
							<SVGIcon name={ selectedIcon }/>
						) }
					</div>
				) }
				<Button
					className={ classnames( {
						'is-open': isOpen,
					} ) }
					isSecondary
					onClick={ () => {
						setIsOpen( ! isOpen );
					} }
					style={ {
						minWidth: '110px',
						textAlign: 'center',
						justifyContent: 'center',
					} }
				>
					{ isOpen && (
						<span>{ __( '閉じる', 'ystandard-blocks' ) }</span>
					) }
					{ ! isOpen && (
						<span>
								{ __( 'アイコン選択', 'ystandard-blocks' ) }
							</span>
					) }
				</Button>
				<Button
					className={ 'ys-icon-picker__remove' }
					disabled={ ! selectedIcon }
					isSmall
					isSecondary
					onClick={ () => {
						onChange( '' );
						setIsOpen( false );
					} }
				>
					{ __( 'リセット', 'ystandard-blocks' ) }
				</Button>
			</div>
			<div
				className={ classnames( 'ys-icon-picker__list', {
					'is-open': isOpen,
				} ) }
			>
				<div className="ys-icon-picker__list-container">
					{ iconButtons }
				</div>
			</div>
		</div>
	);
}


function IconList( props ) {
	const { selectedIcon, onChange } =
		props;
	const iconList = getIcons();

	return (
		<>
			{
				iconList.map( ( icon ) => {
					const iconName = icon.name;
					const isSelected = selectedIcon === iconName;
					const svgIcon = useMemo( () => {
						return (
							<SVGIcon name={ iconName }/>
						);
					}, [ iconName ] );

					return (
						<Button
							key={ iconName }
							className={ classnames(
								`ys-icon-picker__icon`,
								{
									'is-selected':
									isSelected,
								}
							) }
							onClick={ () => {
								onChange( iconName );
							} }
						>
							{ svgIcon }
						</Button>
					);
				} )
			}
		</>
	);
}
