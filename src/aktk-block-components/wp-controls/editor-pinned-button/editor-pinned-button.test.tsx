import { fireEvent, render, screen } from '@testing-library/react';

/**
 * Aktk Dependencies
 */
import EditorPinnedButton from './index';

jest.mock( '@wordpress/components', () => ( {
	Fill: ( {
		children,
		name,
	}: {
		children: React.ReactNode;
		name: string;
	} ) => <div data-fill-name={ name }>{ children }</div>,
} ) );

jest.mock( '@aktk/block-components/wp-controls/button', () => ( {
	__esModule: true,
	default: ( {
		children,
		label,
		onClick,
	}: {
		children: React.ReactNode;
		label: string;
		onClick: () => void;
	} ) => (
		<button type="button" aria-label={ label } onClick={ onClick }>
			{ children }
		</button>
	),
} ) );

describe( 'EditorPinnedButton', () => {
	it( 'エディターヘッダーの固定領域にボタンを追加する', () => {
		const onClick = jest.fn();

		render(
			<EditorPinnedButton
				label="投稿設定"
				icon={ <span>ys</span> }
				onClick={ onClick }
			/>
		);

		const button = screen.getByRole( 'button', { name: '投稿設定' } );
		expect( button.closest( '[data-fill-name]' ) ).toHaveAttribute(
			'data-fill-name',
			'PinnedItems/core'
		);

		fireEvent.click( button );
		expect( onClick ).toHaveBeenCalledTimes( 1 );
	} );
} );
