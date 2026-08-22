import {
	act,
	cleanup,
	fireEvent,
	render,
	screen,
} from '@testing-library/react';

/**
 * WordPress Dependencies
 */
import { addFilter, removeFilter } from '@wordpress/hooks';

/**
 * Plugin Dependencies
 */
import PostSettingsModal from '../host/post-settings-modal';
import { ITEM_FILTER, SECTION_FILTER } from '../types';

const SECTION_NAMESPACE = 'ystandard-toolbox-test/section';
const ITEM_NAMESPACE = 'ystandard-toolbox-test/item';
const context = {
	apiVersion: 1 as const,
	postType: 'page',
	postId: 10,
};

function TestSetting() {
	return <div>設定コンポーネント</div>;
}

/**
 * テスト用の投稿設定を共通フックへ登録する.
 */
function registerTestSetting() {
	addFilter( SECTION_FILTER, SECTION_NAMESPACE, ( sections ) => [
		...sections,
		{ id: 'test/section', title: 'テスト設定', order: 10 },
	] );
	addFilter( ITEM_FILTER, ITEM_NAMESPACE, ( items ) => [
		...items,
		{
			id: 'test/item',
			section: 'test/section',
			order: 10,
			Component: TestSetting,
		},
	] );
}

jest.mock( '@aktk/block-components/wp-controls/plugin-more-menu-item', () => ( {
	__esModule: true,
	default: ( {
		children,
		icon,
		onClick,
	}: {
		children: React.ReactNode;
		icon: React.ReactNode;
		onClick: () => void;
	} ) => (
		<button data-testid="more-menu-item" type="button" onClick={ onClick }>
			{ icon }
			{ children }
		</button>
	),
} ) );

jest.mock( '@aktk/block-components/wp-controls/editor-pinned-button', () => ( {
	__esModule: true,
	default: ( {
		icon,
		label,
		onClick,
	}: {
		icon: React.ReactNode;
		label: string;
		onClick: () => void;
	} ) => (
		<button
			data-testid="editor-pinned-button"
			type="button"
			onClick={ onClick }
		>
			{ icon }
			{ label }
		</button>
	),
} ) );

jest.mock( '@aktk/block-components/wp-controls/modal', () => ( {
	__esModule: true,
	default: ( {
		title,
		children,
		onRequestClose,
	}: {
		title: string;
		children: React.ReactNode;
		onRequestClose: () => void;
	} ) => (
		<div role="dialog" aria-label={ title }>
			{ children }
			<button type="button" onClick={ onRequestClose }>
				閉じる
			</button>
		</div>
	),
} ) );

describe( 'PostSettingsModal', () => {
	afterEach( () => {
		cleanup();
		removeFilter( SECTION_FILTER, SECTION_NAMESPACE );
		removeFilter( ITEM_FILTER, ITEM_NAMESPACE );
	} );

	it( 'ヘッダーアイコンとメニュー項目から同じモーダルを開ける', () => {
		registerTestSetting();
		render( <PostSettingsModal context={ context } /> );

		const headerButton = screen.getByTestId( 'editor-pinned-button' );
		const menuItem = screen.getByTestId( 'more-menu-item' );
		expect(
			headerButton.querySelector( '[data-icon-name="ystdtb-panel-icon"]' )
		).toBeInTheDocument();
		expect( menuItem ).toHaveTextContent( '[ys]投稿設定' );
		expect( screen.queryByRole( 'dialog' ) ).not.toBeInTheDocument();

		fireEvent.click( headerButton );
		expect(
			screen.getByRole( 'dialog', { name: '[ys]投稿設定' } )
		).toBeInTheDocument();
		expect( screen.getByText( '設定コンポーネント' ) ).toBeInTheDocument();

		fireEvent.click( screen.getByRole( 'button', { name: '閉じる' } ) );
		expect( screen.queryByRole( 'dialog' ) ).not.toBeInTheDocument();

		fireEvent.click( menuItem );
		expect(
			screen.getByRole( 'dialog', { name: '[ys]投稿設定' } )
		).toBeInTheDocument();
	} );

	it( '設定がない場合は起動UIを表示しない', () => {
		render( <PostSettingsModal context={ context } /> );

		expect(
			screen.queryByTestId( 'editor-pinned-button' )
		).not.toBeInTheDocument();
		expect(
			screen.queryByTestId( 'more-menu-item' )
		).not.toBeInTheDocument();
	} );

	it( '初回描画後に追加された設定を表示する', () => {
		render( <PostSettingsModal context={ context } /> );
		expect(
			screen.queryByTestId( 'editor-pinned-button' )
		).not.toBeInTheDocument();

		act( () => {
			registerTestSetting();
		} );

		expect(
			screen.getByTestId( 'editor-pinned-button' )
		).toBeInTheDocument();
	} );

	it( '設定が解除された場合は起動UIを非表示にする', () => {
		registerTestSetting();
		render( <PostSettingsModal context={ context } /> );
		expect(
			screen.getByTestId( 'editor-pinned-button' )
		).toBeInTheDocument();

		act( () => {
			removeFilter( ITEM_FILTER, ITEM_NAMESPACE );
		} );

		expect(
			screen.queryByTestId( 'editor-pinned-button' )
		).not.toBeInTheDocument();
	} );

	it( '1つの設定で例外が発生してもほかの設定を表示する', () => {
		const consoleError = jest
			.spyOn( console, 'error' )
			.mockImplementation( () => undefined );
		addFilter( SECTION_FILTER, SECTION_NAMESPACE, () => [
			{ id: 'test/section', title: 'テスト設定', order: 10 },
		] );
		addFilter( ITEM_FILTER, ITEM_NAMESPACE, () => [
			{
				id: 'test/error',
				section: 'test/section',
				order: 10,
				Component: () => {
					throw new Error( 'test error' );
				},
			},
			{
				id: 'test/valid',
				section: 'test/section',
				order: 20,
				Component: TestSetting,
			},
		] );
		render( <PostSettingsModal context={ context } /> );

		fireEvent.click( screen.getByTestId( 'editor-pinned-button' ) );

		expect(
			screen.getByText( '設定項目を表示できませんでした。' )
		).toBeInTheDocument();
		expect( screen.getByText( '設定コンポーネント' ) ).toBeInTheDocument();
		consoleError.mockRestore();
	} );
} );
