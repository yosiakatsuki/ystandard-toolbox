/* Test Dependencies */
import { fireEvent, render, screen, within } from '@testing-library/react';

/* Plugin Dependencies */
import { InspectorControls } from '../inspector-controls';
import { getEditorContainerCSS, getLayoutKey } from '../layout';

jest.mock( '@aktk/block-components/wp-controls/unit-control', () => ( {
	__esModule: true,
	default: ( { label, value, onChange } ) => (
		<input
			aria-label={ label }
			value={ value }
			onChange={ ( event ) => onChange( event.target.value ) }
		/>
	),
} ) );
// プロジェクト共通のWordPressモックに、標準の表示専用ラベルを補う。
jest.requireMock( '@wordpress/components' ).BaseControl.VisualLabel = ( {
	children,
} ) => <span>{ children }</span>;

jest.mock( '@wordpress/block-editor', () => ( {
	InspectorControls: ( { children, group } ) => (
		<div data-group={ group }>{ children }</div>
	),
} ) );

/**
 * 設定値を再表示しながら、操作ごとの更新対象とプレビューを確認する。
 * @param initial 初期状態を上書きする属性。
 */
function renderSettings( initial = {} ) {
	const attributes = {
		reverse: false,
		stickyColumn: 'first',
		style: { color: { text: '#123456' } },
		...initial,
	};
	const setAttributes = jest.fn( ( change ) =>
		Object.assign( attributes, change )
	);
	const result = render(
		<InspectorControls
			attributes={ attributes }
			setAttributes={ setAttributes }
		/>
	);
	// Gutenbergから変更後の属性を受け取る状態を再現する。
	const refresh = () =>
		result.rerender(
			<InspectorControls
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
		);
	return { ...result, attributes, setAttributes, refresh };
}

/**
 * プレビューのカラムを、画面上の並び順で取得する。
 * @param container 描画した設定パネル。
 */
function getPreviewColumns( container ) {
	return Array.from(
		container.querySelectorAll(
			'.ystdtb-sticky-columns-edit__preview-column'
		)
	);
}

describe( '追従カラムの設定UI', () => {
	it( '設定タブに初期値1remを表示し、明示した0pxと解除を区別する', () => {
		const { attributes, refresh } = renderSettings();
		const field = screen.getByLabelText( '画面上端からの距離' );
		expect( field.closest( '[data-group="settings"]' ) ).not.toBeNull();
		expect( field ).toHaveValue( '1rem' );
		fireEvent.change( field, { target: { value: '0px' } } );
		refresh();
		expect( field ).toHaveValue( '0px' );
		expect( attributes.style.ystdtb.stickyColumns.stickyOffset ).toBe(
			'0px'
		);
		fireEvent.change( field, { target: { value: '' } } );
		refresh();
		expect( field ).toHaveValue( '1rem' );
		expect( attributes.style ).toEqual( { color: { text: '#123456' } } );
	} );

	it( '保存済みの距離を表示し、追従対象を切り替えても保持する', () => {
		const { refresh } = renderSettings( {
			style: { ystdtb: { stickyColumns: { stickyOffset: '72px' } } },
		} );
		const field = screen.getByLabelText( '画面上端からの距離' );
		expect( field ).toHaveValue( '72px' );
		fireEvent.change( screen.getByLabelText( '追従させるカラム' ), {
			target: { value: 'second' },
		} );
		refresh();
		expect( field ).toHaveValue( '72px' );
	} );
	it( '設定タブの3つのパネルに対応する項目と初期値を表示する', () => {
		const { container, setAttributes } = renderSettings();
		const settings = within(
			container.querySelector( '[data-group="settings"]' )
		);
		const headings = settings.getAllByRole( 'heading' );
		expect( headings.map( ( heading ) => heading.textContent ) ).toEqual( [
			'2列表示の設定',
			'追従するカラムの設定',
			'1列にするタイミング',
		] );
		const [ display, sticky, collapse ] = headings.map( ( heading ) =>
			within( heading.parentElement )
		);
		expect( display.getByText( 'プレビュー' ) ).toBeInTheDocument();
		expect( display.getByLabelText( '2列の時の表示順' ) ).toHaveValue(
			'normal'
		);
		const stickyColumn = sticky.getByLabelText( '追従させるカラム' );
		expect( stickyColumn ).toHaveValue( 'first' );
		expect( sticky.getByLabelText( '画面上端からの距離' ) ).toHaveValue(
			'1rem'
		);
		expect( collapse.getByLabelText( '切り替わりタイミング' ) ).toHaveValue(
			'mobile'
		);
		expect( screen.queryByLabelText( 'コンテナサイズ' ) ).toBeNull();
		expect(
			within( stickyColumn )
				.getAllByRole( 'option' )
				.map( ( item ) => item.textContent )
		).toEqual( [ '追従なし', 'カラム1', 'カラム2' ] );
		expect(
			getPreviewColumns( container ).map( ( item ) => item.textContent )
		).toEqual( [ 'カラム1(追従)', 'カラム2' ] );
		expect( screen.queryByRole( 'checkbox' ) ).not.toBeInTheDocument();
		expect( setAttributes ).not.toHaveBeenCalled();
	} );

	it( '表示順と追従対象を独立して変更し、同じカラムに追従表示を付ける', () => {
		const { container, attributes, setAttributes, refresh } =
			renderSettings();
		fireEvent.change( screen.getByLabelText( '追従させるカラム' ), {
			target: { value: 'second' },
		} );
		expect( setAttributes ).toHaveBeenLastCalledWith( {
			stickyColumn: 'second',
		} );
		refresh();
		expect(
			getPreviewColumns( container ).map( ( item ) => item.textContent )
		).toEqual( [ 'カラム1', 'カラム2(追従)' ] );
		fireEvent.change( screen.getByLabelText( '2列の時の表示順' ), {
			target: { value: 'reverse' },
		} );
		expect( setAttributes ).toHaveBeenLastCalledWith( { reverse: true } );
		refresh();
		expect(
			getPreviewColumns( container ).map( ( item ) => item.textContent )
		).toEqual( [ 'カラム2(追従)', 'カラム1' ] );
		expect( attributes ).toEqual( {
			reverse: true,
			stickyColumn: 'second',
			style: { color: { text: '#123456' } },
		} );
		fireEvent.change( screen.getByLabelText( '2列の時の表示順' ), {
			target: { value: 'normal' },
		} );
		refresh();
		expect(
			getPreviewColumns( container ).map( ( item ) => item.textContent )
		).toEqual( [ 'カラム1', 'カラム2(追従)' ] );
		expect( attributes.stickyColumn ).toBe( 'second' );
	} );

	it( '追従なしで表示を消し、カラム1へ戻しても逆順と装飾を維持する', () => {
		const { container, attributes, setAttributes, refresh } =
			renderSettings( { reverse: true, stickyColumn: 'second' } );
		fireEvent.change( screen.getByLabelText( '追従させるカラム' ), {
			target: { value: 'none' },
		} );
		expect( setAttributes ).toHaveBeenLastCalledWith( {
			stickyColumn: 'none',
		} );
		refresh();
		expect( screen.queryByText( '(追従)' ) ).not.toBeInTheDocument();
		expect(
			getPreviewColumns( container ).map( ( item ) => item.textContent )
		).toEqual( [ 'カラム2', 'カラム1' ] );
		fireEvent.change( screen.getByLabelText( '追従させるカラム' ), {
			target: { value: 'first' },
		} );
		refresh();
		expect(
			getPreviewColumns( container ).map( ( item ) => item.textContent )
		).toEqual( [ 'カラム2', 'カラム1(追従)' ] );
		expect( attributes ).toEqual( {
			reverse: true,
			stickyColumn: 'first',
			style: { color: { text: '#123456' } },
		} );
	} );

	it( '保存済みの追従なしやUndo後の属性を、初期値で上書きしない', () => {
		const { container, attributes, setAttributes, refresh } =
			renderSettings( { reverse: true, stickyColumn: 'none' } );
		expect( screen.getByLabelText( '追従させるカラム' ) ).toHaveValue(
			'none'
		);
		expect( screen.queryByText( '(追従)' ) ).not.toBeInTheDocument();
		attributes.reverse = false;
		attributes.stickyColumn = 'second';
		refresh();
		expect(
			getPreviewColumns( container ).map( ( item ) => item.textContent )
		).toEqual( [ 'カラム1', 'カラム2(追従)' ] );
		expect( setAttributes ).not.toHaveBeenCalled();
	} );
	it.each( [ 'mobile', 'tablet' ] )(
		'端末条件%sへ変えるとコンテナサイズを消去する',
		( mode ) => {
			const { attributes, refresh } = renderSettings( {
				collapseAt: 'container',
				containerSize: '48rem',
			} );
			expect( screen.getByLabelText( 'コンテナサイズ' ) ).toHaveValue(
				'48rem'
			);
			fireEvent.change( screen.getByLabelText( '切り替わりタイミング' ), {
				target: { value: mode },
			} );
			refresh();
			expect( attributes.containerSize ).toBeUndefined();
			expect( screen.queryByLabelText( 'コンテナサイズ' ) ).toBeNull();
			fireEvent.change( screen.getByLabelText( '切り替わりタイミング' ), {
				target: { value: 'container' },
			} );
			refresh();
			expect( screen.getByLabelText( 'コンテナサイズ' ) ).toHaveValue(
				''
			);
		}
	);
	it( 'コンテナサイズを消すと編集用クエリを外し、属性に初期値を補わない', () => {
		const { attributes, refresh } = renderSettings( {
			collapseAt: 'container',
		} );
		const field = screen.getByLabelText( 'コンテナサイズ' );
		fireEvent.change( field, { target: { value: '50rem' } } );
		refresh();
		expect(
			getEditorContainerCSS(
				getLayoutKey( attributes ),
				'(min-width: CONTAINER_SIZE)'
			)
		).toBe( '(min-width: 50rem)' );
		fireEvent.change( field, { target: { value: '' } } );
		refresh();
		expect( attributes.containerSize ).toBeUndefined();
		expect( getLayoutKey( attributes ) ).toBeUndefined();
		expect(
			getEditorContainerCSS(
				getLayoutKey( attributes ),
				'CONTAINER_SIZE'
			)
		).toBe( '' );
		expect( getLayoutKey( {} ) ).toBe( 'mobile' );
	} );
} );
