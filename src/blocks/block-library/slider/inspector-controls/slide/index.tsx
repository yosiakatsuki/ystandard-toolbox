import { Monitor, Tablet } from 'react-feather';
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import { Panel } from '@aktk/block-components/components/panel';
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { ResponsiveSelectTab } from '@aktk/block-components/components/tab-panel';
import { DestructiveButton } from '@aktk/block-components/components/buttons';
import { stripUndefined, isEmpty } from '@aktk/block-components/utils/object';
/**
 * Block dependencies.
 */
import type { ResponsiveSlides, SliderEditProps, Slides } from '../../types';
import { hasSlidesOption } from '../../utils';
import { SlidesPerView } from './slides-per-view';
import { SlidesPerGroup } from './slides-per-group';
import { SpaceBetween } from './space-between';
import { CenteredSlides } from './centered-slides';

// 設定.

export function Slide( props: SliderEditProps ): JSX.Element {
	const { attributes } = props;
	const { effect, responsiveSlides = {} } = attributes;

	if ( ! hasSlidesOption( effect ) ) {
		return <></>;
	}
	return (
		<Panel title={ __( 'スライド表示数', 'ystandard-toolbox' ) }>
			<BaseControl>
				<ResponsiveSelectTab
					isResponsive={
						! isEmpty(
							stripUndefined( responsiveSlides as object ) || {}
						)
					}
					defaultTabContent={ <DefaultTab { ...props } /> }
					responsiveTabContent={ <ResponsiveTab { ...props } /> }
				/>
			</BaseControl>
		</Panel>
	);
}

function DefaultTab( props: SliderEditProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { slides = {} } = attributes;

	const handleOnChange = ( value?: Slides ) => {
		const newValue = {
			...slides,
			...value,
		};
		setAttributes( {
			slides: stripUndefined( newValue as object ),
			responsiveSlides: undefined,
		} );
	};

	return (
		<>
			<SlidesPerView
				type={ 'normal' }
				value={ slides }
				onChange={ handleOnChange }
			/>
			<SlidesPerGroup
				type={ 'normal' }
				value={ slides }
				onChange={ handleOnChange }
			/>
			<SpaceBetween
				type={ 'normal' }
				value={ slides }
				onChange={ handleOnChange }
			/>
			<CenteredSlides
				type={ 'normal' }
				value={ slides }
				onChange={ handleOnChange }
			/>
			<DestructiveButton
				className="w-full justify-center"
				isSmall
				onClick={ () => {
					setAttributes( {
						slides: undefined,
					} );
				} }
			>
				{ __( 'リセット', 'ystandard-toolbox' ) }
			</DestructiveButton>
		</>
	);
}

function ResponsiveTab( props: SliderEditProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { responsiveSlides = {} } = attributes;
	const { desktop = {}, tablet = {}, mobile = {} } = responsiveSlides;
	// 設定更新.
	const setResponsiveSlides = ( value?: ResponsiveSlides ) => {
		const newValue = {
			...responsiveSlides,
			...value,
		};
		setAttributes( {
			responsiveSlides: stripUndefined( newValue as object ),
			slides: undefined,
		} );
	};
	// デスクトップ設定の更新.
	const handleOnChangeDesktop = ( value?: Slides ) => {
		const newValue = {
			...desktop,
			...value,
		};
		setResponsiveSlides( {
			desktop: stripUndefined( newValue as object ),
		} );
	};

	const handleOnChangeTablet = ( value?: Slides ) => {
		const newValue = {
			...tablet,
			...value,
		};
		setResponsiveSlides( {
			tablet: stripUndefined( newValue as object ),
		} );
	};

	const handleOnChangeMobile = ( value?: Slides ) => {
		const newValue = {
			...mobile,
			...value,
		};
		setResponsiveSlides( {
			mobile: stripUndefined( newValue as object ),
		} );
	};

	const DeviceSectionLabel = ( {
		children,
	}: {
		children: React.ReactNode;
	} ) => (
		<span className="flex items-center gap-1 bg-aktk-bg-gray p-1">
			{ children }
		</span>
	);

	return (
		<div className="flex flex-col gap-10">
			<BaseControl
				id={ 'responsive-slide-options--mobile' }
				label={
					<DeviceSectionLabel>
						<span>{ __( '基本設定', 'ystandard-toolbox' ) }</span>
					</DeviceSectionLabel>
				}
			>
				<SlidesPerView
					type={ 'mobile' }
					value={ mobile }
					onChange={ handleOnChangeMobile }
				/>
				<SlidesPerGroup
					type={ 'mobile' }
					value={ mobile }
					onChange={ handleOnChangeMobile }
				/>
				<SpaceBetween
					type={ 'mobile' }
					value={ mobile }
					onChange={ handleOnChangeMobile }
				/>
				<CenteredSlides
					type={ 'mobile' }
					value={ mobile }
					onChange={ handleOnChangeMobile }
				/>
			</BaseControl>
			<BaseControl
				id={ 'responsive-slide-options--tablet' }
				label={
					<DeviceSectionLabel>
						<Tablet size={ 16 } />
						<span>{ __( 'タブレット', 'ystandard-toolbox' ) }</span>
					</DeviceSectionLabel>
				}
			>
				<SlidesPerView
					type={ 'tablet' }
					value={ tablet }
					onChange={ handleOnChangeTablet }
				/>
				<SlidesPerGroup
					type={ 'tablet' }
					value={ tablet }
					onChange={ handleOnChangeTablet }
				/>
				<SpaceBetween
					type={ 'tablet' }
					value={ tablet }
					onChange={ handleOnChangeTablet }
				/>
				<CenteredSlides
					type={ 'tablet' }
					value={ tablet }
					onChange={ handleOnChangeTablet }
				/>
			</BaseControl>
			<BaseControl
				id={ 'responsive-slide-options--desktop' }
				label={
					<DeviceSectionLabel>
						<Monitor size={ 16 } />
						<span>
							{ __( 'デスクトップ', 'ystandard-toolbox' ) }
						</span>
					</DeviceSectionLabel>
				}
			>
				<SlidesPerView
					type={ 'desktop' }
					value={ desktop }
					onChange={ handleOnChangeDesktop }
				/>
				<SlidesPerGroup
					type={ 'desktop' }
					value={ desktop }
					onChange={ handleOnChangeDesktop }
				/>
				<SpaceBetween
					type={ 'desktop' }
					value={ desktop }
					onChange={ handleOnChangeDesktop }
				/>
				<CenteredSlides
					type={ 'desktop' }
					value={ desktop }
					onChange={ handleOnChangeDesktop }
				/>
			</BaseControl>
			<BaseControl>
				<DestructiveButton
					className="w-full justify-center"
					isSmall
					onClick={ () => {
						setAttributes( {
							responsiveSlides: undefined,
						} );
					} }
				>
					{ __( 'リセット', 'ystandard-toolbox' ) }
				</DestructiveButton>
			</BaseControl>
		</div>
	);
}
