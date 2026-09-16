/**
 * External dependencies.
 */
import type { ReactNode } from 'react';

/**
 * WordPress dependencies.
 */
import { fireEvent, render, screen } from '@testing-library/react';

/**
 * Block dependencies.
 */
import type { FaqItemEditProps } from '../../../../types';
import { LabelTypography } from '..';

jest.mock( '@aktk/block-components/wp-controls/tools-panel', () => ( {
	ToolsPanel: ( {
		children,
		label,
		resetAll,
	}: {
		children: ReactNode;
		label: string;
		resetAll: () => void;
	} ) => (
		<section aria-label={ label }>
			{ children }
			<button type="button" onClick={ resetAll }>
				パネルをリセット
			</button>
		</section>
	),
	ToolsPanelItem: ( {
		children,
		isShownByDefault,
		onDeselect,
	}: {
		children: ReactNode;
		isShownByDefault: boolean;
		onDeselect: () => void;
	} ) => (
		<div data-shown-by-default={ String( isShownByDefault ) }>
			{ children }
			<button type="button" onClick={ onDeselect }>
				文字サイズをリセット
			</button>
		</div>
	),
} ) );

jest.mock(
	'@aktk/block-components/components/custom-font-size-picker',
	() => ( {
		CustomFontSizePicker: ( { onChange } ) => (
			<button
				type="button"
				onClick={ () =>
					onChange( {
						fontSize: { slug: 'large', size: '36px' },
					} )
				}
			>
				文字サイズを変更
			</button>
		),
	} )
);

const createProps = (): FaqItemEditProps => ( {
	attributes: {
		faqType: 'q',
		labelPosition: 'center',
		labelBold: true,
		labelSize: 'small',
		customLabelSize: '14px',
	},
	setAttributes: jest.fn(),
	labelColor: {},
	labelBackgroundColor: {},
	labelBorderColor: {},
	accordionArrowColor: {},
} );

describe( 'LabelTypography', () => {
	it( 'FAQラベル専用パネルで文字サイズを初期表示する', () => {
		render( <LabelTypography { ...createProps() } /> );

		const panel = screen.getByRole( 'region', {
			name: 'FAQラベル（文字）',
		} );
		expect( panel.firstElementChild ).toHaveAttribute(
			'data-shown-by-default',
			'true'
		);
	} );

	it( 'プリセット変更時にラベル文字サイズ属性だけを更新する', () => {
		const props = createProps();
		render( <LabelTypography { ...props } /> );

		fireEvent.click(
			screen.getByRole( 'button', { name: '文字サイズを変更' } )
		);

		expect( props.setAttributes ).toHaveBeenCalledWith( {
			labelSize: 'large',
			customLabelSize: undefined,
		} );
	} );

	it( '項目リセットでラベル文字サイズ属性だけを削除する', () => {
		const props = createProps();
		render( <LabelTypography { ...props } /> );

		fireEvent.click(
			screen.getByRole( 'button', { name: '文字サイズをリセット' } )
		);

		expect( props.setAttributes ).toHaveBeenCalledWith( {
			labelSize: undefined,
			customLabelSize: undefined,
		} );
	} );
} );
