/**
 * WordPress Dependencies
 */
import { render, screen, fireEvent } from '@testing-library/react';

/**
 * Plugin Dependencies
 */
import { ThumbnailRatio } from '../thumbnail-ratio';
import type { PostsEditProps } from '../../../types';

const createProps = (
	overrides: Partial< PostsEditProps > = {}
): PostsEditProps => ( {
	attributes: {
		count: 6,
		orderby: 'date',
		order: 'DESC',
		listType: 'card',
		colMobile: 1,
		colTablet: 2,
		colPc: 3,
		showImg: true,
		thumbnailSize: 'medium',
		thumbnailRatio: '16-9',
		thumbnailRatioMobile: '16-9',
		showDate: true,
		showCategory: true,
		showExcerpt: false,
		postType: 'post',
	},
	setAttributes: jest.fn(),
	clientId: 'test-client-id',
	isSelected: true,
	...overrides,
} );

describe( 'ThumbnailRatio', () => {
	it( 'デスクトップとモバイルの2つのセレクトが存在する', () => {
		const props = createProps();
		render( <ThumbnailRatio { ...props } /> );
		const selects = screen.getAllByRole( 'combobox' );
		expect( selects ).toHaveLength( 2 );
	} );

	it( '縦横比の選択肢が正しくレンダリングされる', () => {
		const props = createProps();
		render( <ThumbnailRatio { ...props } /> );
		expect( screen.getAllByText( '16:9' ).length ).toBeGreaterThanOrEqual(
			1
		);
		expect( screen.getAllByText( '4:3' ).length ).toBeGreaterThanOrEqual(
			1
		);
		expect( screen.getAllByText( '1:1' ).length ).toBeGreaterThanOrEqual(
			1
		);
	} );

	it( 'デスクトップのセレクトを変更すると setAttributes が呼ばれる', () => {
		const props = createProps();
		render( <ThumbnailRatio { ...props } /> );
		const selects = screen.getAllByRole( 'combobox' );
		fireEvent.change( selects[ 0 ], { target: { value: '4-3' } } );
		expect( props.setAttributes ).toHaveBeenCalledWith( {
			thumbnailRatio: '4-3',
		} );
	} );

	it( 'モバイルのセレクトを変更すると setAttributes が呼ばれる', () => {
		const props = createProps();
		render( <ThumbnailRatio { ...props } /> );
		const selects = screen.getAllByRole( 'combobox' );
		fireEvent.change( selects[ 1 ], { target: { value: '1-1' } } );
		expect( props.setAttributes ).toHaveBeenCalledWith( {
			thumbnailRatioMobile: '1-1',
		} );
	} );

	it( 'デスクトップがシンプルデザインの場合、デスクトップに注意文が表示される', () => {
		const props = createProps( {
			attributes: {
				...createProps().attributes,
				listType: 'simple',
				listTypeMobile: 'card',
			},
		} );
		render( <ThumbnailRatio { ...props } /> );
		expect(
			screen.getByText( '「シンプル」では画像は表示されません。' )
		).toBeInTheDocument();
	} );

	it( 'モバイルがシンプルデザインの場合、モバイルに注意文が表示される', () => {
		const props = createProps( {
			attributes: {
				...createProps().attributes,
				listTypeMobile: 'simple',
			},
		} );
		render( <ThumbnailRatio { ...props } /> );
		expect(
			screen.getByText( '「シンプル」では画像は表示されません。' )
		).toBeInTheDocument();
	} );

	it( 'デスクトップがシンプルの場合、セレクトは1つだけ表示される', () => {
		const props = createProps( {
			attributes: {
				...createProps().attributes,
				listType: 'simple',
				listTypeMobile: 'card',
			},
		} );
		render( <ThumbnailRatio { ...props } /> );
		const selects = screen.getAllByRole( 'combobox' );
		// モバイル側のセレクトのみ.
		expect( selects ).toHaveLength( 1 );
	} );
} );
