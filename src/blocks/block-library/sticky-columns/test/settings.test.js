/* Test Dependencies */
import { fireEvent, render, screen, within } from '@testing-library/react';

/* Plugin Dependencies */
import { InspectorControls } from '../inspector-controls';

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
	it( '親の設定に2つの選択欄を置き、カラム1を初期表示する', () => {
		const { container, setAttributes } = renderSettings();
		expect(
			container.querySelector( '[data-group="settings"]' )
		).toBeInTheDocument();
		expect( screen.getByText( 'プレビュー' ) ).toBeInTheDocument();
		const controls = screen.getAllByRole( 'combobox' );
		expect( controls ).toHaveLength( 2 );
		expect( controls[ 0 ] ).toHaveAccessibleName( '2列の時の表示順' );
		expect( controls[ 1 ] ).toHaveAccessibleName( '追従させるカラム' );
		expect( controls[ 1 ] ).toHaveValue( 'first' );
		expect(
			within( controls[ 1 ] )
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
} );
