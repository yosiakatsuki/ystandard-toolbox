/**
 * WordPress Dependencies
 */
import { render, screen, fireEvent } from '@testing-library/react';

/**
 * Plugin Dependencies
 */
import { ThumbnailSize } from '../thumbnail-size';
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

describe( 'ThumbnailSize', () => {
	it( '画像サイズの選択肢が正しくレンダリングされる', () => {
		const props = createProps();
		render( <ThumbnailSize { ...props } /> );
		expect( screen.getByText( 'サムネイル' ) ).toBeInTheDocument();
		expect( screen.getByText( '中' ) ).toBeInTheDocument();
		expect( screen.getByText( '大' ) ).toBeInTheDocument();
		expect( screen.getByText( 'フルサイズ' ) ).toBeInTheDocument();
	} );

	it( 'セレクトが正しくレンダリングされる', () => {
		const props = createProps();
		render( <ThumbnailSize { ...props } /> );
		expect( screen.getByRole( 'combobox' ) ).toBeInTheDocument();
	} );

	it( '画像サイズを変更すると setAttributes が呼ばれる', () => {
		const props = createProps();
		render( <ThumbnailSize { ...props } /> );
		const select = screen.getByRole( 'combobox' );
		fireEvent.change( select, { target: { value: 'large' } } );
		expect( props.setAttributes ).toHaveBeenCalledWith( {
			thumbnailSize: 'large',
		} );
	} );
} );
