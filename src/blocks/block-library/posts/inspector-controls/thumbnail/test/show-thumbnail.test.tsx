/**
 * WordPress Dependencies
 */
import { render, screen, fireEvent } from '@testing-library/react';

/**
 * Plugin Dependencies
 */
import { ShowThumbnail } from '../show-thumbnail';
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

describe( 'ShowThumbnail', () => {
	it( 'ToggleControl が正しくレンダリングされる', () => {
		const props = createProps();
		render( <ShowThumbnail { ...props } /> );
		expect(
			screen.getByLabelText( '画像を表示する' )
		).toBeInTheDocument();
	} );

	it( 'showImg が true の場合、チェックされている', () => {
		const props = createProps();
		render( <ShowThumbnail { ...props } /> );
		const toggle = screen.getByRole( 'checkbox' );
		expect( toggle ).toBeChecked();
	} );

	it( 'showImg が false の場合、チェックされていない', () => {
		const props = createProps( {
			attributes: {
				...createProps().attributes,
				showImg: false,
			},
		} );
		render( <ShowThumbnail { ...props } /> );
		const toggle = screen.getByRole( 'checkbox' );
		expect( toggle ).not.toBeChecked();
	} );

	it( 'トグルをクリックすると setAttributes が呼ばれる', () => {
		const props = createProps();
		render( <ShowThumbnail { ...props } /> );
		const toggle = screen.getByRole( 'checkbox' );
		fireEvent.click( toggle );
		expect( props.setAttributes ).toHaveBeenCalledWith( {
			showImg: false,
		} );
	} );
} );
