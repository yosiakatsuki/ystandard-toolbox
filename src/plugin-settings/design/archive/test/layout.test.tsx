/**
 * アーカイブ レイアウト設定パネルのロジックテスト
 *
 * 検証対象:
 *  - ImageButton クリック → updateSection の payload
 *  - モバイルレイアウトクリア時に archiveImageRatioMobile が undefined にリセットされる副作用
 *  - モバイルレイアウト設定時は既存の archiveImageRatioMobile が保持される
 */

/* WordPress Dependencies */
import { render, screen, fireEvent } from '@testing-library/react';

/* Plugin Dependencies */
import Layout from '../layout';

type SectionSettings = Record< string, unknown >;
type RenderProps = {
	updateSection: jest.Mock;
	sectionSettings: SectionSettings;
};

const renderPanel = ( overrides: Partial< RenderProps > = {} ) => {
	const props: RenderProps = {
		updateSection: jest.fn(),
		// @ts-ignore
		sectionSettings: {},
		...overrides,
	};
	render(
		<Layout
			updateSection={ props.updateSection }
			sectionSettings={ props.sectionSettings as never }
		/>
	);
	return props;
};

describe( 'Archive Layout — handleOnChangeDesktopLayout', () => {
	it( 'デスクトップ「リスト」ボタンクリック → updateSection({ theme_ys_archive_type: "list" })', () => {
		const { updateSection } = renderPanel();
		// ImageButton は alt 属性を持つ画像なので getAllByAltText で取得（[0]=card,[1]=list,[2]=simple は両セクションに 2 セット = 計 6）
		// デスクトップセクションが先に出るので最初の3つがデスクトップ。
		const images = screen.getAllByAltText( 'リスト' );
		fireEvent.click( images[ 0 ] );
		expect( updateSection ).toHaveBeenCalledWith( {
			theme_ys_archive_type: 'list',
		} );
	} );

	it( 'デスクトップ「シンプル」ボタンクリック → updateSection({ theme_ys_archive_type: "simple" })', () => {
		const { updateSection } = renderPanel();
		const images = screen.getAllByAltText( 'シンプル' );
		fireEvent.click( images[ 0 ] );
		expect( updateSection ).toHaveBeenCalledWith( {
			theme_ys_archive_type: 'simple',
		} );
	} );
} );

describe( 'Archive Layout — handleOnChangeMobileLayout', () => {
	it( 'モバイル「カード」ボタンクリック → updateSection({ archiveMobileLayout: "card", archiveImageRatioMobile: 既存値保持 })', () => {
		const { updateSection } = renderPanel( {
			sectionSettings: { archiveImageRatioMobile: '4-3' },
		} );
		const images = screen.getAllByAltText( 'カード' );
		// [1] がモバイル側（[0]=デスクトップ）
		fireEvent.click( images[ 1 ] );
		expect( updateSection ).toHaveBeenCalledWith( {
			archiveMobileLayout: 'card',
			archiveImageRatioMobile: '4-3',
		} );
	} );

	it( 'モバイル「クリア」ボタンクリック → updateSection({ archiveMobileLayout: undefined, archiveImageRatioMobile: undefined }) で副作用クリア', () => {
		const { updateSection } = renderPanel( {
			sectionSettings: {
				archiveMobileLayout: 'list',
				archiveImageRatioMobile: '4-3',
			},
		} );
		fireEvent.click( screen.getByRole( 'button', { name: 'クリア' } ) );
		expect( updateSection ).toHaveBeenCalledWith( {
			archiveMobileLayout: undefined,
			archiveImageRatioMobile: undefined,
		} );
	} );
} );
