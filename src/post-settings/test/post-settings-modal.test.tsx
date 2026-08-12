import { fireEvent, render, screen } from '@testing-library/react';

/**
 * Plugin Dependencies
 */
import PostSettingsModal from '../post-settings-modal';

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
	it( 'ヘッダーアイコンとメニュー項目から同じモーダルを開ける', () => {
		render( <PostSettingsModal /> );

		const headerButton = screen.getByTestId( 'editor-pinned-button' );
		const menuItem = screen.getByTestId( 'more-menu-item' );
		expect(
			headerButton.querySelector( '[data-icon-name="ystdtb-panel-icon"]' )
		).toBeInTheDocument();
		expect( menuItem ).toHaveTextContent( '[Toolbox] 投稿設定' );
		expect( screen.queryByRole( 'dialog' ) ).not.toBeInTheDocument();

		fireEvent.click( headerButton );
		expect(
			screen.getByRole( 'dialog', { name: '[Toolbox] 投稿設定' } )
		).toBeInTheDocument();
		expect(
			screen.getByText( '投稿設定はここに追加されます。' )
		).toBeInTheDocument();

		fireEvent.click( screen.getByRole( 'button', { name: '閉じる' } ) );
		expect( screen.queryByRole( 'dialog' ) ).not.toBeInTheDocument();

		fireEvent.click( menuItem );
		expect(
			screen.getByRole( 'dialog', { name: '[Toolbox] 投稿設定' } )
		).toBeInTheDocument();
	} );
} );
