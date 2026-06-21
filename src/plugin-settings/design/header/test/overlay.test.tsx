/**
 * ヘッダーオーバーレイ設定パネルのロジックテスト
 *
 * 検証対象は「操作 → updateSection の payload」と「enableOverlay による条件付き
 * 表示の出し分け」「overlayPageType の add/remove ロジック」のみ。
 * レンダリングや見た目は対象外。
 */

/* WordPress Dependencies */
import { render, screen, fireEvent } from '@testing-library/react';

/* useSelect は postTypes を返すよう本ファイル専用にモック */
jest.mock( '@wordpress/data', () => ( {
	useSelect: jest.fn( () => ( {
		postTypes: [
			{
				name: '投稿',
				slug: 'post',
				visibility: { show_ui: true },
				viewable: true,
			},
			{
				name: '固定ページ',
				slug: 'page',
				visibility: { show_ui: true },
				viewable: true,
			},
		],
	} ) ),
	useDispatch: jest.fn( () => ( {} ) ),
} ) );

jest.mock(
	'@wordpress/core-data',
	() => ( {
		store: 'core',
	} ),
	{ virtual: true }
);

/* MediaUpload / ColorPalette は実体不要なので空モック */
jest.mock( '@aktk/block-components/components/media-upload', () => ( {
	MediaUpload: ( props: { previewClassName?: string } ) => (
		<div
			data-testid="media-upload"
			data-preview-class-name={ props.previewClassName }
		/>
	),
	MediaObject: undefined,
} ) );

jest.mock( '@aktk/block-components/components/color-pallet-control', () => ( {
	ColorPalette: () => <div data-testid="color-palette" />,
} ) );

/* Plugin Dependencies */
import Overlay from '../overlay';

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
		<Overlay
			updateSection={ props.updateSection }
			sectionSettings={ props.sectionSettings }
		/>
	);
	return props;
};

describe( 'Overlay — handleOnChangeEnable', () => {
	it( '「有効」ボタンクリック → updateSection({ enableOverlay: true })', () => {
		const { updateSection } = renderPanel();
		fireEvent.click( screen.getByRole( 'button', { name: '有効' } ) );
		expect( updateSection ).toHaveBeenCalledWith( { enableOverlay: true } );
	} );

	it( '「無効」ボタンクリック → updateSection({ enableOverlay: false })', () => {
		const { updateSection } = renderPanel( {
			sectionSettings: { enableOverlay: true },
		} );
		fireEvent.click( screen.getByRole( 'button', { name: '無効' } ) );
		expect( updateSection ).toHaveBeenCalledWith( {
			enableOverlay: false,
		} );
	} );
} );

describe( 'Overlay — handleOnChangeTypes（配列の add / remove ロジック）', () => {
	it( '未選択の slug をクリック → 配列に追加して updateSection が呼ばれる', () => {
		const { updateSection } = renderPanel( {
			sectionSettings: {
				enableOverlay: true,
				overlayPageType: [ 'front-page' ],
			},
		} );
		// 「投稿」チェックボックスをクリック
		fireEvent.click( screen.getByLabelText( '投稿' ) );
		expect( updateSection ).toHaveBeenCalledWith( {
			overlayPageType: [ 'front-page', 'post' ],
		} );
	} );

	it( '選択済みの slug をクリック → 配列から除外して updateSection が呼ばれる', () => {
		const { updateSection } = renderPanel( {
			sectionSettings: {
				enableOverlay: true,
				overlayPageType: [ 'front-page', 'post' ],
			},
		} );
		// 「投稿」チェックボックスをクリック（既に選択済み）
		fireEvent.click( screen.getByLabelText( '投稿' ) );
		expect( updateSection ).toHaveBeenCalledWith( {
			overlayPageType: [ 'front-page' ],
		} );
	} );

	it( '空配列に追加 → 単要素配列を渡す', () => {
		const { updateSection } = renderPanel( {
			sectionSettings: { enableOverlay: true },
		} );
		fireEvent.click( screen.getByLabelText( '固定ページ' ) );
		expect( updateSection ).toHaveBeenCalledWith( {
			overlayPageType: [ 'page' ],
		} );
	} );
} );

describe( 'Overlay — 条件付き表示の分岐ロジック', () => {
	it( 'enableOverlay 未設定（false 相当）時はページタイプ / ロゴ / 文字色 UI が出ない', () => {
		renderPanel();
		expect( screen.queryByText( 'ページタイプ' ) ).toBeNull();
		expect( screen.queryByText( 'ロゴ画像' ) ).toBeNull();
		expect( screen.queryByText( '文字色' ) ).toBeNull();
	} );

	it( 'enableOverlay=true 時はページタイプ / ロゴ / 文字色 UI が出る', () => {
		renderPanel( { sectionSettings: { enableOverlay: true } } );
		expect( screen.getByText( 'ページタイプ' ) ).toBeInTheDocument();
		expect( screen.getByText( 'ロゴ画像' ) ).toBeInTheDocument();
		expect( screen.getByText( '文字色' ) ).toBeInTheDocument();
	} );

	it( 'ロゴ画像プレビュー用のクラスを MediaUpload に渡す', () => {
		renderPanel( { sectionSettings: { enableOverlay: true } } );
		expect( screen.getByTestId( 'media-upload' ) ).toHaveAttribute(
			'data-preview-class-name',
			'ystdtb-plugin-settings__header-overlay__logo-preview'
		);
	} );
} );
