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
import type { FaqEditProps } from '../../../../types';
import { AccordionArrowColor } from '..';

type ColorSetting = {
	label: string;
	colorValue?: string;
	onColorChange: ( value?: string ) => void;
	clearable?: boolean;
	isShownByDefault?: boolean;
};

jest.mock( '@aktk/block-components/hooks/useThemeColors', () => ( {
	__esModule: true,
	default: () => [
		{
			name: 'テーマ',
			colors: [
				{
					name: '赤',
					slug: 'ys-red',
					color: '#ff0000',
				},
			],
		},
	],
} ) );

jest.mock( '@aktk/block-components/wp-controls/tools-panel', () => ( {
	ToolsPanel: ( {
		children,
		label,
	}: {
		children: ReactNode;
		label: string;
	} ) => <section aria-label={ label }>{ children }</section>,
} ) );

jest.mock(
	'@aktk/block-components/wp-controls/color-gradient-settings-dropdown',
	() => ( {
		__esModule: true,
		default: ( { settings }: { settings: ColorSetting[] } ) => {
			const setting = settings[ 0 ];
			return (
				<div
					data-testid="color-setting"
					data-clearable={ String( setting.clearable ) }
					data-color-value={ setting.colorValue }
					data-shown-by-default={ String( setting.isShownByDefault ) }
				>
					<span>{ setting.label }</span>
					<button
						type="button"
						onClick={ () => setting.onColorChange( '#123456' ) }
					>
						カスタム色
					</button>
					<button
						type="button"
						onClick={ () => setting.onColorChange() }
					>
						リセット
					</button>
					<button
						type="button"
						onClick={ () => setting.onColorChange( '#ff0000' ) }
					>
						プリセット色
					</button>
				</div>
			);
		},
	} )
);

const createProps = (
	attributes: Partial< FaqEditProps[ 'attributes' ] > = {}
): FaqEditProps => ( {
	attributes: {
		isAccordion: true,
		...attributes,
	},
	setAttributes: jest.fn(),
	clientId: 'test-client-id',
	updateChildAttributes: jest.fn(),
} );

describe( 'AccordionArrowColor', () => {
	it( '開閉式でない場合はパネルを表示しない', () => {
		render(
			<AccordionArrowColor { ...createProps( { isAccordion: false } ) } />
		);

		expect(
			screen.queryByRole( 'region', { name: '開閉ボタン（色）' } )
		).not.toBeInTheDocument();
	} );

	it( '色設定を初期非表示かつリセット可能にする', () => {
		render( <AccordionArrowColor { ...createProps() } /> );

		const setting = screen.getByTestId( 'color-setting' );
		expect( setting ).toHaveAttribute( 'data-clearable', 'true' );
		expect( setting ).toHaveAttribute( 'data-shown-by-default', 'false' );
	} );

	it.each( [
		[ 'プリセット色', 'var:preset|color|ys-red' ],
		[ 'カスタム色', '#123456' ],
		[ 'リセット', undefined ],
	] )( '%sを親子へ反映し他の設定を保持する', ( button, text ) => {
		const props = createProps( {
			style: {
				color: { background: '#eeeeee' },
				ystdtb: {
					faq: {
						arrow: {
							color: { text: 'var:preset|color|ys-red' },
							spacing: { margin: { top: '8px' } },
						},
					},
				},
			},
		} );
		render( <AccordionArrowColor { ...props } /> );
		expect( screen.getByTestId( 'color-setting' ) ).toHaveAttribute(
			'data-color-value',
			'#ff0000'
		);
		fireEvent.click( screen.getByRole( 'button', { name: button } ) );
		const updated = ( props.setAttributes as jest.Mock ).mock
			.calls[ 0 ][ 0 ];
		expect( updated.style.color.background ).toBe( '#eeeeee' );
		expect( updated.style.ystdtb.faq.arrow.color?.text ).toBe( text );
		expect( updated.style.ystdtb.faq.arrow.spacing.margin.top ).toBe(
			'8px'
		);
		const sync = ( props.updateChildAttributes as jest.Mock ).mock
			.calls[ 0 ][ 0 ];
		const childStyle = {
			color: { text: '#333333' },
			ystdtb: {
				faqItem: {
					label: { color: { text: '#777777' } },
					arrow: {
						color: { text: '#abcdef' },
						spacing: { margin: { left: '4px' } },
					},
				},
			},
		};
		for ( const faqType of [ 'q', 'a' ] ) {
			// Q/Aそれぞれのスタイルを維持して色だけを同期する。
			const child = sync( { faqType, style: childStyle } );
			expect( child.style.color ).toEqual( childStyle.color );
			expect( child.style.ystdtb.faqItem.label ).toEqual(
				childStyle.ystdtb.faqItem.label
			);
			expect( child.style.ystdtb.faqItem.arrow.color?.text ).toBe( text );
			expect( child.style.ystdtb.faqItem.arrow.spacing.margin.left ).toBe(
				'4px'
			);
		}
		expect( childStyle.ystdtb.faqItem.arrow.color.text ).toBe( '#abcdef' );
	} );
	it( '最後の色をリセットすると空のstyleを残さない', () => {
		const props = createProps( {
			style: {
				ystdtb: { faq: { arrow: { color: { text: '#123456' } } } },
			},
		} );
		render( <AccordionArrowColor { ...props } /> );
		fireEvent.click( screen.getByRole( 'button', { name: 'リセット' } ) );
		expect( props.setAttributes ).toHaveBeenCalledWith( {
			style: undefined,
		} );
	} );
} );
