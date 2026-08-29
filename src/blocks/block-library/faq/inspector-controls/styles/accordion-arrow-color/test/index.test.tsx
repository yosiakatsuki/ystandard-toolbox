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
			screen.queryByRole( 'region', { name: '開閉ボタン色' } )
		).not.toBeInTheDocument();
	} );

	it( '色設定を初期非表示かつリセット可能にする', () => {
		render( <AccordionArrowColor { ...createProps() } /> );

		const setting = screen.getByTestId( 'color-setting' );
		expect( setting ).toHaveAttribute( 'data-clearable', 'true' );
		expect( setting ).toHaveAttribute( 'data-shown-by-default', 'false' );
	} );

	it( 'リセット時に親子の色属性を削除する', () => {
		const props = createProps( {
			accordionArrowColor: 'ys-red',
		} );
		render( <AccordionArrowColor { ...props } /> );
		expect( screen.getByTestId( 'color-setting' ) ).toHaveAttribute(
			'data-color-value',
			'#ff0000'
		);

		fireEvent.click( screen.getByRole( 'button', { name: 'リセット' } ) );

		expect( props.setAttributes ).toHaveBeenCalledWith( {
			accordionArrowColor: undefined,
			customAccordionArrowColor: undefined,
		} );
		expect( props.updateChildAttributes ).toHaveBeenCalledWith( {
			accordionArrowColor: undefined,
			customAccordionArrowColor: undefined,
		} );
	} );

	it( 'プリセット色はslugとして親子へ保存する', () => {
		const props = createProps();
		render( <AccordionArrowColor { ...props } /> );

		fireEvent.click(
			screen.getByRole( 'button', { name: 'プリセット色' } )
		);

		expect( props.setAttributes ).toHaveBeenCalledWith( {
			accordionArrowColor: 'ys-red',
			customAccordionArrowColor: undefined,
		} );
		expect( props.updateChildAttributes ).toHaveBeenCalledWith( {
			accordionArrowColor: 'ys-red',
			customAccordionArrowColor: undefined,
		} );
	} );
} );
