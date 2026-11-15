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
import { AccordionArrowSpacing } from '..';

type Spacing = {
	top?: string;
	right?: string;
	bottom?: string;
	left?: string;
};

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
		<div data-shown-by-default={ String( isShownByDefault ) }>
			<span>{ label }</span>
			{ children }
			<button type="button" onClick={ onDeselect }>
				マージンをリセット
			</button>
		</div>
	),
} ) );

jest.mock( '@aktk/block-components/wp-controls/spacing-size-control', () => ( {
	__esModule: true,
	default: ( {
		label,
		minimumCustomValue,
		onChange,
		sides,
		values,
	}: {
		label: string;
		minimumCustomValue: number;
		onChange: ( value: Spacing ) => void;
		sides: string[];
		values?: Spacing;
	} ) => (
		<div
			data-testid="spacing-control"
			data-label={ label }
			data-minimum={ String( minimumCustomValue ) }
			data-sides={ sides.join( ',' ) }
			data-values={ JSON.stringify( values ) }
		>
			<button
				type="button"
				onClick={ () =>
					onChange( {
						top: 'var:preset|spacing|20',
						right: '8px',
						bottom: 'var:preset|spacing|40',
						left: '4px',
					} )
				}
			>
				余白を変更
			</button>
		</div>
	),
} ) );

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

describe( 'AccordionArrowSpacing', () => {
	it( '開閉式でない場合はパネルを表示しない', () => {
		render(
			<AccordionArrowSpacing
				{ ...createProps( { isAccordion: false } ) }
			/>
		);

		expect(
			screen.queryByRole( 'region', { name: '開閉ボタン（余白）' } )
		).not.toBeInTheDocument();
	} );

	it( '上下左右のmargin設定を初期非表示にする', () => {
		render( <AccordionArrowSpacing { ...createProps() } /> );

		const panel = screen.getByRole( 'region', {
			name: '開閉ボタン（余白）',
		} );
		const control = screen.getByTestId( 'spacing-control' );
		expect( panel.firstElementChild ).toHaveAttribute(
			'data-shown-by-default',
			'false'
		);
		expect( control ).toHaveAttribute(
			'data-sides',
			'top,right,bottom,left'
		);
		expect( control ).toHaveAttribute( 'data-minimum', '-9999' );
	} );

	it( '余白変更時に親子のstyleを安全に更新する', () => {
		const props = createProps( {
			style: {
				typography: {
					lineHeight: 1.8,
				},
			},
		} );
		render( <AccordionArrowSpacing { ...props } /> );

		fireEvent.click( screen.getByRole( 'button', { name: '余白を変更' } ) );

		expect( props.setAttributes ).toHaveBeenCalledWith( {
			style: {
				typography: {
					lineHeight: 1.8,
				},
				ystdtb: {
					faq: {
						arrow: {
							spacing: {
								margin: {
									top: 'var:preset|spacing|20',
									right: '8px',
									bottom: 'var:preset|spacing|40',
									left: '4px',
								},
							},
						},
					},
				},
			},
		} );

		expect( props.updateChildAttributes ).toHaveBeenCalledTimes( 1 );
		const updateChild = ( props.updateChildAttributes as jest.Mock ).mock
			.calls[ 0 ][ 0 ];
		expect(
			updateChild( {
				style: {
					ystdtb: {
						faqItem: {
							arrow: {
								color: {
									text: '#222222',
								},
							},
						},
					},
				},
			} )
		).toEqual( {
			style: {
				ystdtb: {
					faqItem: {
						arrow: {
							color: {
								text: '#222222',
							},
							spacing: {
								margin: {
									top: 'var:preset|spacing|20',
									right: '8px',
									bottom: 'var:preset|spacing|40',
									left: '4px',
								},
							},
						},
					},
				},
			},
		} );
	} );

	it( 'リセット時に親子のmarginだけを削除する', () => {
		const props = createProps( {
			style: {
				typography: {
					lineHeight: 1.8,
				},
				ystdtb: {
					faq: {
						arrow: {
							spacing: {
								margin: { top: '8px' },
							},
						},
					},
				},
			},
		} );
		render( <AccordionArrowSpacing { ...props } /> );

		fireEvent.click(
			screen.getByRole( 'button', { name: 'マージンをリセット' } )
		);

		expect( props.setAttributes ).toHaveBeenCalledWith( {
			style: {
				typography: {
					lineHeight: 1.8,
				},
			},
		} );
	} );
} );
