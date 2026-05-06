/**
 * サブヘッダー設定パネルのロジックテスト
 *
 * 検証対象は「操作 → updateSection の payload」と
 * 旧 (subHeaderFontSizeDesktop / Unit) → 新 (subHeaderFontSize) のフォールバック表示ロジック。
 * レンダリングや見た目は対象外。
 */

/* WordPress Dependencies */
import { render, screen, fireEvent } from '@testing-library/react';

/* ColorPalette / UnitControl は実体不要なので軽量モックに置き換える */
jest.mock( '@aktk/block-components/components/color-pallet-control', () => ( {
	ColorPalette: ( {
		// eslint-disable-next-line react/prop-types
		label,
		// eslint-disable-next-line react/prop-types
		value,
		// eslint-disable-next-line react/prop-types
		onChange,
	}: {
		label: string;
		value: string | undefined;
		onChange: ( newValue?: string ) => void;
	} ) => (
		<input
			aria-label={ label }
			value={ value ?? '' }
			onChange={ ( e ) => onChange( e.target.value ) }
		/>
	),
} ) );

jest.mock( '@aktk/block-components/wp-controls/unit-control', () => ( {
	__esModule: true,
	default: ( {
		// eslint-disable-next-line react/prop-types
		value,
		// eslint-disable-next-line react/prop-types
		onChange,
	}: {
		value: string;
		onChange: ( newValue: string ) => void;
	} ) => (
		<input
			aria-label="font-size"
			value={ value ?? '' }
			onChange={ ( e ) => onChange( e.target.value ) }
		/>
	),
} ) );

/* Plugin Dependencies */
import SubHeader from '../sub-header';

type SectionSettings = Record< string, unknown >;
type RenderProps = {
	updateSection: jest.Mock;
	sectionSettings: SectionSettings;
};

const renderPanel = ( overrides: Partial< RenderProps > = {} ) => {
	const props: RenderProps = {
		updateSection: jest.fn(),
		sectionSettings: {},
		...overrides,
	};
	render(
		<SubHeader
			updateSection={ props.updateSection }
			sectionSettings={ props.sectionSettings }
		/>
	);
	return props;
};

describe( 'SubHeader — handleOnChange*', () => {
	it( '背景色を変更 → updateSection({ subHeaderBackgroundColorDesktop }) が呼ばれる', () => {
		const { updateSection } = renderPanel();
		fireEvent.change( screen.getByLabelText( '背景色' ), {
			target: { value: '#ff0000' },
		} );
		expect( updateSection ).toHaveBeenCalledWith( {
			subHeaderBackgroundColorDesktop: '#ff0000',
		} );
	} );

	it( '文字色を変更 → updateSection({ subHeaderColorDesktop }) が呼ばれる', () => {
		const { updateSection } = renderPanel();
		fireEvent.change( screen.getByLabelText( '文字色' ), {
			target: { value: '#00ff00' },
		} );
		expect( updateSection ).toHaveBeenCalledWith( {
			subHeaderColorDesktop: '#00ff00',
		} );
	} );

	it( '表示位置「左揃え」クリック → updateSection({ subHeaderAlignDesktop: "left" }) が呼ばれる', () => {
		const { updateSection } = renderPanel();
		fireEvent.click( screen.getByRole( 'button', { name: '左揃え' } ) );
		expect( updateSection ).toHaveBeenCalledWith( {
			subHeaderAlignDesktop: 'left',
		} );
	} );

	it( '表示位置「中央揃え」クリック → updateSection({ subHeaderAlignDesktop: "center" }) が呼ばれる', () => {
		const { updateSection } = renderPanel();
		fireEvent.click( screen.getByRole( 'button', { name: '中央揃え' } ) );
		expect( updateSection ).toHaveBeenCalledWith( {
			subHeaderAlignDesktop: 'center',
		} );
	} );

	it( '表示位置「右揃え」クリック → updateSection({ subHeaderAlignDesktop: "right" }) が呼ばれる', () => {
		const { updateSection } = renderPanel();
		fireEvent.click( screen.getByRole( 'button', { name: '右揃え' } ) );
		expect( updateSection ).toHaveBeenCalledWith( {
			subHeaderAlignDesktop: 'right',
		} );
	} );

	it( '文字サイズを変更 → updateSection({ subHeaderFontSize }) が呼ばれる', () => {
		const { updateSection } = renderPanel();
		fireEvent.change( screen.getByLabelText( 'font-size' ), {
			target: { value: '1.2em' },
		} );
		expect( updateSection ).toHaveBeenCalledWith( {
			subHeaderFontSize: '1.2em',
		} );
	} );
} );

describe( 'SubHeader — 旧フォントサイズ設定からの migrate 表示', () => {
	it( '新 subHeaderFontSize 未設定 + 旧 (Desktop / Unit) あり → migrate 結果が UnitControl に表示される', () => {
		renderPanel( {
			sectionSettings: {
				subHeaderFontSizeDesktop: 14,
				subHeaderFontSizeUnitDesktop: 'px',
			},
		} );
		expect( screen.getByLabelText( 'font-size' ) ).toHaveValue( '14px' );
	} );

	it( '新 subHeaderFontSize あり → 旧設定があっても新設定が優先表示される', () => {
		renderPanel( {
			sectionSettings: {
				subHeaderFontSize: '0.5em',
				subHeaderFontSizeDesktop: 14,
				subHeaderFontSizeUnitDesktop: 'px',
			},
		} );
		expect( screen.getByLabelText( 'font-size' ) ).toHaveValue( '0.5em' );
	} );

	it( '新旧どちらも未設定 → デフォルト 0.7em が表示される', () => {
		renderPanel();
		expect( screen.getByLabelText( 'font-size' ) ).toHaveValue( '0.7em' );
	} );
} );
