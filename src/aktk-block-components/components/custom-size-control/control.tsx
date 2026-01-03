import classnames from 'classnames';
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Aktk dependencies
 */
import { IconUnitControl } from '@aktk/block-components/components/icon-control';
import { DestructiveButton } from '@aktk/block-components/components/buttons';
import type { UnitType } from '@aktk/block-components/wp-controls/unit-control';
import { ResponsiveSelectTab } from '@aktk/block-components/components/tab-panel';
import {
	stripUndefined,
	isResponsive,
} from '@aktk/block-components/utils/object';
/**
 * Component Dependencies.
 */
import type {
	CustomSizeControlProps,
	CustomSizeResponsiveValues,
} from './types';

export function CustomSizeControl( props: CustomSizeControlProps ) {
	const {
		value,
		responsiveValue,
		onChange,
		onChangeResponsive,
		responsiveControlStyle = 'vertical',
		useResponsive = true,
		showResetButton = true,
		units = undefined,
		additionalContent,
	} = props;

	const handleOnChange = ( newValue: string | undefined ) => {
		onChange( newValue );
		if ( onChangeResponsive ) {
			onChangeResponsive( undefined );
		}
	};

	const handleOnChangeResponsive = (
		newValue: CustomSizeResponsiveValues
	) => {
		if ( onChangeResponsive ) {
			// @ts-ignore.
			onChangeResponsive( stripUndefined( newValue ) );
			onChange( undefined );
		}
	};

	const handleOnReset = () => {
		onChange( undefined );
		if ( onChangeResponsive ) {
			onChangeResponsive( undefined );
		}
	};

	return (
		<>
			{ useResponsive ? (
				<ResponsiveSelectTab
					isResponsive={ isResponsive( responsiveValue ) }
					defaultTabContent={
						<>
							<NormalSizeEdit
								value={ value }
								onChange={ handleOnChange }
								onReset={
									showResetButton ? handleOnReset : undefined
								}
								units={ units }
							/>
							{ !! additionalContent &&
								additionalContent( false ) }
						</>
					}
					responsiveTabContent={
						<>
							<ResponsiveSizeEdit
								value={ responsiveValue || {} }
								onChange={ handleOnChangeResponsive }
								responsiveControlStyle={
									responsiveControlStyle
								}
								onReset={
									showResetButton ? handleOnReset : undefined
								}
								units={ units }
							/>
							{ !! additionalContent &&
								additionalContent( true ) }
						</>
					}
				/>
			) : (
				<>
					<NormalSizeEdit
						value={ value }
						onChange={ handleOnChange }
						onReset={ showResetButton ? handleOnReset : undefined }
						units={ units }
					/>
					{ !! additionalContent && additionalContent( false ) }
				</>
			) }
		</>
	);
}

export function NormalSizeEdit( props: {
	value: string | undefined;
	onChange: ( newValue: string | undefined ) => void;
	onReset?: () => void;
	units?: UnitType[] | undefined;
} ) {
	const { value, onChange, onReset, units } = props;
	const handleOnChange = ( newValue: string ) => {
		onChange( newValue );
	};
	return (
		<div className={ 'flex items-center gap-2' }>
			<IconUnitControl
				// @ts-ignore.
				className={ '!mb-0 w-full' }
				unitType={ 'size' }
				value={ value }
				onChange={ handleOnChange }
				units={ units }
			/>
			{ onReset && (
				<ResetButton onClick={ onReset } isHorizontal={ true } />
			) }
		</div>
	);
}

export function ResponsiveSizeEdit( props: {
	value: CustomSizeResponsiveValues;
	onChange: ( newValue: CustomSizeResponsiveValues ) => void;
	responsiveControlStyle?: 'vertical' | 'horizontal';
	onReset?: () => void;
	units?: UnitType[] | undefined;
} ) {
	const {
		value,
		onChange,
		responsiveControlStyle = 'vertical',
		onReset,
		units,
	} = props;
	const handleOnChange = ( newValue: CustomSizeResponsiveValues ) => {
		onChange( {
			...value,
			...newValue,
		} );
	};

	const gridClasses = classnames( 'grid grid-cols-1 gap-2', {
		'md:grid-cols-3 md:gap-4': 'horizontal' === responsiveControlStyle,
	} );

	return (
		<div>
			<div className={ gridClasses }>
				<div>
					<IconUnitControl.Desktop
						unitType={ 'size' }
						value={ value?.desktop }
						onChange={ ( newValue ) => {
							handleOnChange( {
								...value,
								desktop: newValue,
							} );
						} }
						units={ units }
					/>
				</div>
				<div>
					<IconUnitControl.Tablet
						unitType={ 'size' }
						value={ value?.tablet }
						onChange={ ( newValue ) => {
							handleOnChange( {
								...value,
								tablet: newValue,
							} );
						} }
						units={ units }
					/>
				</div>
				<div>
					<IconUnitControl.Mobile
						unitType={ 'size' }
						value={ value?.mobile }
						onChange={ ( newValue ) => {
							handleOnChange( {
								...value,
								mobile: newValue,
							} );
						} }
						units={ units }
					/>
				</div>
			</div>
			{ onReset && <ResetButton onClick={ onReset } /> }
		</div>
	);
}

function ResetButton( props: { onClick: () => void; isHorizontal?: boolean } ) {
	const { onClick, isHorizontal = false } = props;

	const buttonClass = classnames(
		'justify-center whitespace-nowrap text-center',
		{
			'mt-2 w-full': ! isHorizontal,
			'w-auto': isHorizontal,
		}
	);

	return (
		<DestructiveButton
			className={ buttonClass }
			onClick={ onClick }
			isSmall
		>
			{ __( 'リセット', 'ystandard-toolbox' ) }
		</DestructiveButton>
	);
}
