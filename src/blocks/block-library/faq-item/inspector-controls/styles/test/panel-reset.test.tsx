/* WordPress Dependencies */
import { fireEvent, render, screen } from '@testing-library/react';
/* Block Dependencies */
import { ResponsiveSpacing } from '../responsive-spacing';
import { LabelSpacing } from '../label-spacing';
import { ResponsiveLabelSpacing } from '../responsive-label-spacing';
import { ResponsiveSize } from '../responsive-size';
import { ResponsiveTypography } from '../responsive-typography';
import { ResponsiveLabelTypography } from '../responsive-label-typography';
import { LabelSize } from '../label-size/size-control';
import { LabelSizePanel } from '../label-size';
import { LabelBorder } from '../label-border';
import { LabelBackground } from '../label-background';

jest.mock( '@aktk/block-components/wp-controls/tools-panel', () => ( {
	ToolsPanel: ( { children, resetAll } ) => (
		<section>
			{ children }
			<button onClick={ resetAll }>全解除</button>
		</section>
	),
	ToolsPanelItem: ( { children, label, onDeselect } ) => (
		<div>
			{ children }
			<button onClick={ onDeselect }>{ label }を解除</button>
		</div>
	),
} ) );
jest.mock( '@aktk/block-components/hooks/useThemeColors', () => ( {
	__esModule: true,
	default: () => [],
} ) );
jest.mock( '@aktk/block-components/wp-controls/border-control', () => ( {
	__esModule: true,
	default: ( { value, onChange } ) => (
		<button onClick={ () => onChange( { ...value, width: '4px' } ) }>
			枠線の幅を変更
		</button>
	),
} ) );
jest.mock(
	'@aktk/block-components/wp-controls/color-gradient-settings-dropdown',
	() => ( {
		__esModule: true,
		default: ( { settings } ) => (
			<button onClick={ () => settings[ 0 ].onColorChange() }>
				色を解除
			</button>
		),
	} )
);
jest.mock( '@aktk/block-components/wp-controls/unit-control', () => ( {
	__esModule: true,
	default: ( { label, value, onChange, ...props } ) => (
		<input
			aria-label={ props[ 'aria-label' ] ?? label }
			value={ value ?? '' }
			onChange={ ( e ) => onChange( e.target.value ) }
		/>
	),
} ) );
jest.mock( '@aktk/block-components/wp-controls/spacing-size-control', () => ( {
	__esModule: true,
	default: () => <div />,
} ) );
jest.mock(
	'@aktk/block-components/components/responsive-spacing-control',
	() => ( {
		...jest.requireActual(
			'@aktk/block-components/components/responsive-spacing-control'
		),
		ResponsiveSpacingControl: () => <div />,
	} )
);
jest.mock(
	'@aktk/block-components/components/responsive-font-size-control',
	() => ( { ResponsiveFontSizeControl: () => <div /> } )
);

/** 他要素や通常値の保持を検証するための属性を用意する。 */
function createProps() {
	return {
		attributes: {
			faqType: 'q' as const,
			style: {
				color: { background: '#fff' },
				spacing: { padding: { top: '20px' } },
				ystdtb: {
					faqItem: {
						item: {
							layout: { alignItems: 'flex-start' },
							spacing: { gap: '16px' },
							responsive: { spacing: { gap: { mobile: '8px' } } },
						},
						contents: {
							responsive: {
								typography: { fontSize: { mobile: '15px' } },
								spacing: {
									padding: { mobile: { top: '8px' } },
								},
							},
						},
						label: {
							color: { text: '#123456', background: '#fedcba' },
							border: {
								width: '2px',
								color: '#112233',
								style: 'dashed',
								radius: '8px',
							},
							typography: { fontSize: '24px' },
							dimensions: { size: '40px' },
							spacing: { margin: { top: '-2px' } },
							responsive: {
								typography: { fontSize: { mobile: '18px' } },
								dimensions: { size: { tablet: '36px' } },
								spacing: { margin: { mobile: { top: '0' } } },
							},
						},
						arrow: { spacing: { margin: { left: '5px' } } },
					},
				},
			},
		},
		setAttributes: jest.fn(),
	};
}

const cases = [
	[
		'ラベルサイズ',
		LabelSizePanel,
		[ 'label.dimensions.size' ],
		[ [ 'ラベルサイズ', 'label.dimensions.size' ] ],
	],
	[
		'ラベル枠線',
		LabelBorder,
		[
			'label.border.width',
			'label.border.color',
			'label.border.style',
			'label.border.radius',
		],
		[ [ '角丸', 'label.border.radius' ] ],
	],
	[
		'ラベル背景',
		LabelBackground,
		[ 'label.color.background' ],
		[ [ '色', 'label.color.background' ] ],
	],
	[
		'レスポンシブ余白',
		ResponsiveSpacing,
		[ 'contents.responsive.spacing.padding' ],
		[ [ 'パディング', 'contents.responsive.spacing.padding' ] ],
	],
	[
		'ラベル余白',
		LabelSpacing,
		[ 'label.spacing.margin', 'item.spacing.gap' ],
		[
			[ 'マージン', 'label.spacing.margin' ],
			[ 'ラベルと本文の間隔', 'item.spacing.gap' ],
		],
	],
	[
		'レスポンシブラベル余白',
		ResponsiveLabelSpacing,
		[ 'label.responsive.spacing.margin', 'item.responsive.spacing.gap' ],
		[
			[ 'マージン', 'label.responsive.spacing.margin' ],
			[ 'ラベルと本文の間隔', 'item.responsive.spacing.gap' ],
		],
	],
	[
		'レスポンシブサイズ',
		ResponsiveSize,
		[ 'label.responsive.dimensions.size' ],
		[ [ 'ラベルサイズ', 'label.responsive.dimensions.size' ] ],
	],
	[
		'レスポンシブ文字設定',
		ResponsiveTypography,
		[ 'contents.responsive.typography.fontSize' ],
		[ [ 'フォントサイズ', 'contents.responsive.typography.fontSize' ] ],
	],
	[
		'レスポンシブラベル文字設定',
		ResponsiveLabelTypography,
		[ 'label.responsive.typography.fontSize' ],
		[ [ 'フォントサイズ', 'label.responsive.typography.fontSize' ] ],
	],
] as const;
const paths = [
	'item.layout',
	'item.spacing.gap',
	'item.responsive.spacing.gap',
	'contents.responsive.typography.fontSize',
	'contents.responsive.spacing.padding',
	'label.color.text',
	'label.color.background',
	'label.border.width',
	'label.border.color',
	'label.border.style',
	'label.border.radius',
	'label.typography',
	'label.dimensions.size',
	'label.spacing.margin',
	'label.responsive.typography.fontSize',
	'label.responsive.dimensions.size',
	'label.responsive.spacing.margin',
	'arrow',
];
/**
 * 指定した設定を取得する。
 * @param value
 * @param path
 */
function at( value, path: string ) {
	return path
		.split( '.' )
		.reduce( ( current, key ) => current?.[ key ], value );
}
/**
 * 解除対象と、それ以外の設定の保持を確認する。
 * @param props
 * @param cleared
 */
function assertReset(
	props: ReturnType< typeof createProps >,
	cleared: readonly string[]
) {
	expect( props.setAttributes ).toHaveBeenCalledTimes( 1 );
	const style = props.setAttributes.mock.calls[ 0 ][ 0 ].style;
	expect( style.color ).toEqual( props.attributes.style.color );
	expect( style.spacing ).toEqual( props.attributes.style.spacing );
	for ( const path of paths ) {
		expect( at( style.ystdtb.faqItem, path ) ).toEqual(
			cleared.includes( path )
				? undefined
				: at( props.attributes.style.ystdtb.faqItem, path )
		);
	}
}

describe.each( cases )( '%sのリセット範囲', ( name, Panel, cleared, items ) => {
	it( '全解除で対象設定だけを削除し、通常値・端末別値・別要素を保持する', () => {
		const props = createProps();
		render( <Panel { ...props } /> );
		fireEvent.click( screen.getByText( '全解除' ) );
		assertReset( props, cleared );
	} );
	it.each( items )(
		'%sの個別解除で同じパネル内の別項目も保持する',
		( label, path ) => {
			const props = createProps();
			render( <Panel { ...props } /> );
			fireEvent.click( screen.getByText( `${ label }を解除` ) );
			assertReset( props, [ path ] );
		}
	);
} );

describe( 'ラベルの通常・端末別サイズ', () => {
	it( '通常サイズの変更・解除で端末別値を保持する', () => {
		const props = createProps();
		render( <LabelSize { ...props } /> );
		const input = screen.getByRole( 'textbox', { name: 'ラベルサイズ' } );
		fireEvent.change( input, { target: { value: '52px' } } );
		fireEvent.change( input, { target: { value: '' } } );
		const first =
			props.setAttributes.mock.calls[ 0 ][ 0 ].style.ystdtb.faqItem.label;
		const second =
			props.setAttributes.mock.calls[ 1 ][ 0 ].style.ystdtb.faqItem.label;
		expect( first.dimensions.size ).toBe( '52px' );
		expect( second.dimensions ).toBeUndefined();
		expect( first.responsive ).toEqual(
			props.attributes.style.ystdtb.faqItem.label.responsive
		);
		expect( second.responsive ).toEqual( first.responsive );
	} );
	it( '端末別入力に通常入力を含めず、別端末と通常値を保持する', () => {
		const props = createProps();
		render( <ResponsiveSize { ...props } /> );
		expect( screen.getAllByRole( 'textbox' ) ).toHaveLength( 3 );
		fireEvent.change(
			screen.getByRole( 'textbox', { name: 'ラベルサイズ（モバイル）' } ),
			{ target: { value: '32px' } }
		);
		const value =
			props.setAttributes.mock.calls[ 0 ][ 0 ].style.ystdtb.faqItem;
		expect( value.label.dimensions.size ).toBe( '40px' );
		expect( value.label.responsive.dimensions.size ).toEqual( {
			tablet: '36px',
			mobile: '32px',
		} );
		expect( value.label.typography ).toEqual(
			props.attributes.style.ystdtb.faqItem.label.typography
		);
		expect( value.label.spacing ).toEqual(
			props.attributes.style.ystdtb.faqItem.label.spacing
		);
	} );
} );

describe( 'ラベル枠線の独立した操作', () => {
	it( '枠線だけの解除では角丸と他パネルを保持する', () => {
		const props = createProps();
		render( <LabelBorder { ...props } /> );
		fireEvent.click( screen.getByText( '枠線を解除' ) );
		assertReset( props, [
			'label.border.width',
			'label.border.color',
			'label.border.style',
		] );
	} );
	it( '幅の変更では色・線種・角丸と端末別設定を保持する', () => {
		const props = createProps();
		render( <LabelBorder { ...props } /> );
		fireEvent.click( screen.getByText( '枠線の幅を変更' ) );
		const label =
			props.setAttributes.mock.calls[ 0 ][ 0 ].style.ystdtb.faqItem.label;
		expect( label.border ).toEqual( {
			...props.attributes.style.ystdtb.faqItem.label.border,
			width: '4px',
		} );
		expect( label.responsive ).toEqual(
			props.attributes.style.ystdtb.faqItem.label.responsive
		);
	} );
} );
