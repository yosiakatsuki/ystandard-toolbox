/* External Dependencies */
import { fireEvent, render, screen } from '@testing-library/react';
import type { ComponentType, PropsWithChildren } from 'react';

/* WordPress Dependencies */
import { getBlockType, hasBlockSupport } from '@wordpress/blocks';
import { applyFilters } from '@wordpress/hooks';

/* Block Dependencies */
import type {
	BlockEditProps,
	ExtendedBlockConfiguration,
	HiddenBySizeAttributes,
} from '../types';
import '../index';

// ブロック登録やデータストアを起動せず、設定欄の表示条件を検証する。
jest.mock( '@wordpress/blocks', () => ( {
	getBlockType: jest.fn(),
	hasBlockSupport: jest.fn(),
} ) );

jest.mock( '@wordpress/compose', () => ( {
	createHigherOrderComponent: (
		enhance: (
			component: ComponentType< BlockEditProps >
		) => ComponentType< BlockEditProps >
	) => enhance,
} ) );

// InspectorControlsの出力を通常のDOMに配置して、パネルの有無を確認する。
jest.mock( '@wordpress/block-editor', () => ( {
	InspectorControls: ( { children }: PropsWithChildren ) => <>{ children }</>,
} ) );

jest.mock( '@aktk/components/block-hook-panel', () => ( {
	BlockHookPanel: ( {
		title,
		children,
	}: PropsWithChildren< { title: string } > ) => (
		<section aria-label={ title }>{ children }</section>
	),
} ) );

jest.mock( '@aktk/block-components/components/manual-link', () => ( {
	ManualLink: () => null,
} ) );

const PANEL_TITLE = '非表示設定(画面サイズ)';

/** 元のブロック編集UIと、受け取ったプロパティを確認する。 */
const OriginalBlockEdit = jest.fn( ( { name }: BlockEditProps ) => (
	<div data-testid="original-block-edit">{ name }</div>
) );

/**
 * 登録されたeditor.BlockEditフィルターを通してブロックを描画する。
 *
 * @param name       ブロック名。
 * @param supports   ブロックサポート情報。
 * @param attributes 既存の非表示設定やCSSクラス。
 * @return 描画に使用したプロパティ。
 */
function renderBlock(
	name: string,
	supports: Record< string, boolean > = {},
	attributes: Partial< HiddenBySizeAttributes > = {}
): BlockEditProps {
	jest.mocked( getBlockType ).mockReturnValue( {
		name,
		supports,
	} as ReturnType< typeof getBlockType > );
	jest.mocked( hasBlockSupport ).mockImplementation(
		( _blockType, feature, defaultSupports = false ) =>
			supports[ feature ] ?? defaultSupports
	);

	const props: BlockEditProps = {
		name,
		attributes: {
			ystdtbIsHiddenMobile: false,
			ystdtbIsHiddenTablet: false,
			ystdtbIsHiddenDesktop: false,
			...attributes,
		},
		setAttributes: jest.fn(),
	};
	const BlockEdit = applyFilters(
		'editor.BlockEdit',
		OriginalBlockEdit
	) as ComponentType< BlockEditProps >;

	render( <BlockEdit { ...props } /> );
	return props;
}

describe( '非表示設定パネルの表示判定', () => {
	afterEach( () => {
		jest.clearAllMocks();
	} );

	it.each( [ 'core/legacy-widget', 'core/widget-group' ] )(
		'%sはサポートと既存設定が有効でもパネルを表示せず、元の編集UIと属性を維持する',
		( name ) => {
			const attributes = {
				ystdtbIsHiddenTablet: true,
				ystdtbIsHiddenDesktop: true,
				className:
					'custom-class ystdtb-hidden-tablet ystdtb-hidden-desktop',
			};
			const props = renderBlock(
				name,
				{ customClassName: true, ystdtdHiddenBySize: true },
				attributes
			);

			expect(
				screen.queryByRole( 'region', { name: PANEL_TITLE } )
			).not.toBeInTheDocument();
			expect(
				screen.getByTestId( 'original-block-edit' )
			).toHaveTextContent( name );
			expect( OriginalBlockEdit.mock.calls[ 0 ][ 0 ] ).toEqual( props );
			expect( props.attributes ).toMatchObject( attributes );
			expect( props.setAttributes ).not.toHaveBeenCalled();
		}
	);

	it.each( [ 'customClassName', 'ystdtdHiddenBySize' ] )(
		'%sが無効なブロックにはパネルを表示しない',
		( feature ) => {
			renderBlock( 'core/group', { [ feature ]: false } );

			expect(
				screen.queryByRole( 'region', { name: PANEL_TITLE } )
			).not.toBeInTheDocument();
		}
	);

	it( '許可されていない名前空間にはパネルを表示しない', () => {
		renderBlock( 'example/block' );

		expect(
			screen.queryByRole( 'region', { name: PANEL_TITLE } )
		).not.toBeInTheDocument();
	} );

	it.each( [ 'core/paragraph', 'core/group', 'ystdtb/box' ] )(
		'%sではサポート情報が未指定でも従来どおりパネルを表示する',
		( name ) => {
			renderBlock( name );

			expect(
				screen.getByRole( 'region', { name: PANEL_TITLE } )
			).toBeInTheDocument();
		}
	);

	it( '通常のグループでは既存クラスを保持して非表示設定を変更できる', () => {
		const props = renderBlock(
			'core/group',
			{},
			{
				ystdtbIsHiddenDesktop: true,
				className: 'custom-class ystdtb-hidden-desktop',
			}
		);

		fireEvent.click(
			screen.getByRole( 'checkbox', { name: 'タブレットで非表示' } )
		);

		expect( props.setAttributes ).toHaveBeenCalledWith( {
			ystdtbIsHiddenTablet: true,
			className:
				'custom-class ystdtb-hidden-desktop ystdtb-hidden-tablet',
		} );
	} );

	it.each( [ 'core/legacy-widget', 'core/widget-group' ] )(
		'互換性のため%sにも既存の非表示属性を登録する',
		( name ) => {
			const settings = {
				name,
				attributes: {
					className: { type: 'string' },
				},
			};
			const result = applyFilters(
				'blocks.registerBlockType',
				settings
			) as ExtendedBlockConfiguration;

			expect( result.attributes ).toEqual( {
				className: { type: 'string' },
				ystdtbIsHiddenMobile: { type: 'boolean', default: false },
				ystdtbIsHiddenTablet: { type: 'boolean', default: false },
				ystdtbIsHiddenDesktop: { type: 'boolean', default: false },
			} );
		}
	);
} );
