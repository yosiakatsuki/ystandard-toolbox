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

type ColorSetting = {
	label: string;
	colorValue?: string;
	onColorChange: ( value?: string, slug?: string ) => void;
	clearable?: boolean;
	isShownByDefault?: boolean;
};

jest.mock( '@aktk/block-components/hooks/useThemeColors', () => ( {
	__esModule: true,
	default: () => [
		{
			name: 'テーマ',
			colors: [ { name: '赤', slug: 'ys-red', color: '#ff0000' } ],
		},
	],
} ) );

jest.mock( '@aktk/block-components/components/font-family-select', () => ( {
	useFontFamilies: () => [
		{
			name: 'ゴシック',
			slug: 'ys-gothic',
			fontFamily: '"Noto Sans JP", sans-serif',
		},
	],
} ) );

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
		label,
		onDeselect,
	}: {
		children: ReactNode;
		isShownByDefault: boolean;
		label: string;
		onDeselect: () => void;
	} ) => (
		<div
			data-label={ label }
			data-shown-by-default={ String( isShownByDefault ) }
		>
			{ children }
			<button type="button" onClick={ onDeselect }>
				{ label }をリセット
			</button>
		</div>
	),
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
					<button
						type="button"
						onClick={ () => setting.onColorChange() }
					>
						文字色をリセット
					</button>
					<button
						type="button"
						onClick={ () =>
							setting.onColorChange( '#ff0000', 'ys-red' )
						}
					>
						プリセット色
					</button>
				</div>
			);
		},
	} )
);

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

jest.mock(
	'@aktk/block-components/wp-controls/font-appearance-control',
	() => ( {
		FontAppearanceControl: ( { onChange } ) => (
			<button
				type="button"
				onClick={ () =>
					onChange( {
						fontStyle: 'italic',
						fontWeight: '600',
					} )
				}
			>
				外観を変更
			</button>
		),
	} )
);

jest.mock( '@aktk/block-components/wp-controls/font-family-control', () => ( {
	__esModule: true,
	default: ( { onChange } ) => (
		<button
			type="button"
			onClick={ () => onChange( '"Noto Sans JP", sans-serif' ) }
		>
			フォントを変更
		</button>
	),
} ) );

jest.mock( '@aktk/block-components/wp-controls/line-height-control', () => ( {
	__esModule: true,
	default: ( { onChange } ) => (
		<button type="button" onClick={ () => onChange( '1.4' ) }>
			行の高さを変更
		</button>
	),
} ) );

jest.mock(
	'@aktk/block-components/wp-controls/text-transform-control',
	() => ( {
		__esModule: true,
		default: ( { onChange } ) => (
			<button type="button" onClick={ () => onChange( 'lowercase' ) }>
				大文字小文字を変更
			</button>
		),
	} )
);

const createProps = (): FaqItemEditProps => ( {
	attributes: {
		faqType: 'q',
		style: {
			ystdtb: {
				faqItem: {
					label: {
						typography: { fontSize: 'var:preset|font-size|small' },
					},
				},
			},
		},
	},
	setAttributes: jest.fn(),
} );

describe( 'LabelTypography', () => {
	it( 'FAQラベルの文字設定をすべて追加メニュー式にする', () => {
		render( <LabelTypography { ...createProps() } /> );

		const colorSetting = screen.getByTestId( 'color-setting' );
		expect( colorSetting ).toHaveAttribute( 'data-clearable', 'true' );
		expect( colorSetting ).toHaveAttribute(
			'data-shown-by-default',
			'false'
		);
		expect(
			screen.getByRole( 'button', {
				name: 'フォントサイズをリセット',
			} ).parentElement
		).toHaveAttribute( 'data-shown-by-default', 'false' );
		expect(
			screen.getByRole( 'button', { name: '外観をリセット' } )
				.parentElement
		).toHaveAttribute( 'data-shown-by-default', 'false' );
		[ 'フォント', '行の高さ', '大文字小文字' ].forEach( ( label ) => {
			expect(
				screen.getByRole( 'button', {
					name: `${ label }をリセット`,
				} ).parentElement
			).toHaveAttribute( 'data-shown-by-default', 'false' );
		} );
	} );

	it( 'プリセット文字色をラベル専用スタイルへ保存する', () => {
		const props = createProps();
		props.attributes.style = {
			ystdtb: {
				faqItem: {
					arrow: { spacing: { margin: { top: '8px' } } },
				},
			},
		};
		render( <LabelTypography { ...props } /> );

		fireEvent.click(
			screen.getByRole( 'button', { name: 'プリセット色' } )
		);

		expect( props.setAttributes ).toHaveBeenCalledWith( {
			style: {
				ystdtb: {
					faqItem: {
						arrow: { spacing: { margin: { top: '8px' } } },
						label: {
							color: { text: 'var:preset|color|ys-red' },
						},
					},
				},
			},
		} );
	} );

	it( '文字色のリセット時にラベルの他の設定を保持する', () => {
		const props = createProps();
		props.attributes.style = {
			ystdtb: {
				faqItem: {
					arrow: { spacing: { margin: { top: '8px' } } },
					label: {
						color: { text: '#0f766e' },
						typography: { fontWeight: '600' },
					},
				},
			},
		};
		render( <LabelTypography { ...props } /> );

		fireEvent.click(
			screen.getByRole( 'button', { name: '文字色をリセット' } )
		);

		expect( props.setAttributes ).toHaveBeenCalledWith( {
			style: {
				ystdtb: {
					faqItem: {
						arrow: { spacing: { margin: { top: '8px' } } },
						label: { typography: { fontWeight: '600' } },
					},
				},
			},
		} );
	} );

	it( 'プリセット変更時にラベル文字サイズ属性だけを更新する', () => {
		const props = createProps();
		render( <LabelTypography { ...props } /> );

		fireEvent.click(
			screen.getByRole( 'button', { name: '文字サイズを変更' } )
		);

		expect( props.setAttributes ).toHaveBeenCalledWith( {
			style: {
				ystdtb: {
					faqItem: {
						label: {
							typography: {
								fontSize: 'var:preset|font-size|large',
							},
						},
					},
				},
			},
		} );
	} );

	it.each( [
		[ 'フォントを変更', 'fontFamily', 'var:preset|font-family|ys-gothic' ],
		[ '行の高さを変更', 'lineHeight', '1.4' ],
		[ '大文字小文字を変更', 'textTransform', 'lowercase' ],
	] )( '%sでラベルの文字設定だけを更新する', ( button, key, value ) => {
		const props = createProps();
		props.attributes.style = {
			ystdtb: {
				faqItem: {
					arrow: { spacing: { margin: { top: '8px' } } },
				},
			},
		};
		render( <LabelTypography { ...props } /> );

		fireEvent.click( screen.getByRole( 'button', { name: button } ) );

		expect( props.setAttributes ).toHaveBeenCalledWith( {
			style: {
				ystdtb: {
					faqItem: {
						arrow: { spacing: { margin: { top: '8px' } } },
						label: { typography: { [ key ]: value } },
					},
				},
			},
		} );
	} );

	it.each( [
		[ 'フォント', { lineHeight: '1.4', textTransform: 'lowercase' } ],
		[
			'行の高さ',
			{
				fontFamily: 'var:preset|font-family|ys-gothic',
				textTransform: 'lowercase',
			},
		],
		[
			'大文字小文字',
			{
				fontFamily: 'var:preset|font-family|ys-gothic',
				lineHeight: '1.4',
			},
		],
	] )( '%sのリセットで他の文字設定を保持する', ( label, expected ) => {
		const props = createProps();
		props.attributes.style = {
			ystdtb: {
				faqItem: {
					label: {
						typography: {
							fontFamily: 'var:preset|font-family|ys-gothic',
							lineHeight: '1.4',
							textTransform: 'lowercase',
						},
					},
				},
			},
		};
		render( <LabelTypography { ...props } /> );

		fireEvent.click(
			screen.getByRole( 'button', { name: `${ label }をリセット` } )
		);

		expect( props.setAttributes ).toHaveBeenCalledWith( {
			style: {
				ystdtb: {
					faqItem: {
						label: { typography: expected },
					},
				},
			},
		} );
	} );

	it( '項目リセットでラベル文字サイズ属性だけを削除する', () => {
		const props = createProps();
		render( <LabelTypography { ...props } /> );

		fireEvent.click(
			screen.getByRole( 'button', {
				name: 'フォントサイズをリセット',
			} )
		);

		expect( props.setAttributes ).toHaveBeenCalledWith( {
			style: undefined,
		} );
	} );

	it( '外観変更時にラベルの文字スタイルだけを更新する', () => {
		const props = createProps();
		props.attributes.style = {
			ystdtb: {
				faqItem: {
					arrow: { spacing: { margin: { top: '8px' } } },
				},
			},
		};
		render( <LabelTypography { ...props } /> );

		fireEvent.click( screen.getByRole( 'button', { name: '外観を変更' } ) );

		expect( props.setAttributes ).toHaveBeenCalledWith( {
			style: {
				ystdtb: {
					faqItem: {
						arrow: { spacing: { margin: { top: '8px' } } },
						label: {
							typography: {
								fontStyle: 'italic',
								fontWeight: '600',
							},
						},
					},
				},
			},
		} );
	} );

	it( '外観リセット時にラベルの文字スタイルだけを削除する', () => {
		const props = createProps();
		props.attributes.style = {
			ystdtb: {
				faqItem: {
					label: {
						typography: {
							fontStyle: 'italic',
							fontWeight: '600',
							lineHeight: '1.4',
						},
					},
					arrow: { spacing: { margin: { top: '8px' } } },
				},
			},
		};
		render( <LabelTypography { ...props } /> );

		fireEvent.click(
			screen.getByRole( 'button', { name: '外観をリセット' } )
		);

		expect( props.setAttributes ).toHaveBeenCalledWith( {
			style: {
				ystdtb: {
					faqItem: {
						arrow: { spacing: { margin: { top: '8px' } } },
						label: { typography: { lineHeight: '1.4' } },
					},
				},
			},
		} );
	} );
} );
