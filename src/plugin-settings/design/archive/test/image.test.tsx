/**
 * アーカイブ 画像設定パネルのロジックテスト
 *
 * 検証対象:
 *  - 縦横比（デスクトップ / モバイル）の選択 → updateSection の payload
 *  - archiveMobileLayout 未設定時、モバイル縦横比 UI が出ない（条件付き表示）
 *  - archiveMobileLayout 設定時、モバイル縦横比 UI が出る
 */

/* WordPress Dependencies */
import { render, screen, fireEvent } from '@testing-library/react';

/* MediaUpload は実体不要なので軽量モック */
jest.mock( '@aktk/block-components/components/media-upload', () => ( {
	MediaUpload: () => <div data-testid="media-upload" />,
	MediaObject: undefined,
} ) );

/* Plugin Dependencies */
import Image from '../image';

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
		<Image
			updateSection={ props.updateSection }
			// @ts-ignore
			sectionSettings={ props.sectionSettings }
		/>
	);
	return props;
};

describe( 'Archive Image — handleOnChangeRatioDesktop', () => {
	it( '「4:3」を選択 → updateSection({ archiveImageRatio: "4-3" })', () => {
		const { updateSection } = renderPanel();
		// デスクトップ用は label="デスクトップ・タブレット" 付き
		fireEvent.change(
			screen.getByLabelText( 'デスクトップ・タブレット' ),
			{ target: { value: '4-3' } }
		);
		expect( updateSection ).toHaveBeenCalledWith( {
			archiveImageRatio: '4-3',
		} );
	} );
} );

describe( 'Archive Image — handleOnChangeRatioMobile', () => {
	it( 'archiveMobileLayout 設定時、「1:1」を選択 → updateSection({ archiveImageRatioMobile: "1-1" })', () => {
		const { updateSection } = renderPanel( {
			sectionSettings: { archiveMobileLayout: 'list' },
		} );
		fireEvent.change( screen.getByLabelText( 'モバイル' ), {
			target: { value: '1-1' },
		} );
		expect( updateSection ).toHaveBeenCalledWith( {
			archiveImageRatioMobile: '1-1',
		} );
	} );
} );

describe( 'Archive Image — 条件付き表示', () => {
	it( 'archiveMobileLayout 未設定時はモバイル縦横比 UI が出ない', () => {
		renderPanel();
		expect( screen.queryByLabelText( 'モバイル' ) ).toBeNull();
	} );

	it( 'archiveMobileLayout 設定時はモバイル縦横比 UI が出る', () => {
		renderPanel( {
			sectionSettings: { archiveMobileLayout: 'list' },
		} );
		expect( screen.getByLabelText( 'モバイル' ) ).toBeInTheDocument();
	} );
} );
