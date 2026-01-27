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
import {
	stripUndefined,
	isResponsive,
} from '@aktk/block-components/utils/object';
/**
 * Block dependencies.
 */
import type { SliderEditProps, Slides } from '../../types';
import { hasSlidesOption } from '../../utils';
import { SlidesPerView } from './slides-per-view';
import { SlidesPerGroup } from './slides-per-group';
import { SpaceBetween } from './space-between';
import { CenteredSlides } from './centered-slides';

// 設定.

export function Slide( props: SliderEditProps ): JSX.Element {
	const { attributes } = props;
	const { effect, slides } = attributes;

	if ( ! hasSlidesOption( effect ) ) {
		return <></>;
	}
	return (
		<Panel title={ __( 'スライド表示数', 'ystandard-toolbox' ) }>
			<BaseControl>
				<ResponsiveSelectTab
					isResponsive={ isResponsive( slides ) }
					defaultTabContent={ <DefaultTab { ...props } /> }
					responsiveTabContent={ <></> }
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
