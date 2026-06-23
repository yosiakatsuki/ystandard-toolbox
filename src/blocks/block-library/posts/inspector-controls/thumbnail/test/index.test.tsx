/**
 * WordPress Dependencies
 */
import { render, screen } from '@testing-library/react';

/**
 * Plugin Dependencies
 */
import { Thumbnail } from '../index';
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

describe( 'Thumbnail', () => {
	it( 'カードデザインの場合、画像設定コントロールが表示される', () => {
		const props = createProps();
		render( <Thumbnail { ...props } /> );
		expect(
			screen.getByLabelText( '画像を表示する' )
		).toBeInTheDocument();
	} );

	it( 'PC・モバイル両方がシンプルデザインの場合、説明文が表示される', () => {
		const props = createProps( {
			attributes: {
				...createProps().attributes,
				listType: 'simple',
				listTypeMobile: 'simple',
			},
		} );
		render( <Thumbnail { ...props } /> );
		expect(
			screen.getByText(
				'シンプルデザインではアイキャッチ画像は表示されません。'
			)
		).toBeInTheDocument();
	} );

	it( 'PCがシンプルでモバイル未設定の場合、説明文が表示される', () => {
		const props = createProps( {
			attributes: {
				...createProps().attributes,
				listType: 'simple',
				listTypeMobile: undefined,
			},
		} );
		render( <Thumbnail { ...props } /> );
		expect(
			screen.getByText(
				'シンプルデザインではアイキャッチ画像は表示されません。'
			)
		).toBeInTheDocument();
	} );

	it( 'PCがシンプルでモバイルがカードの場合、画像設定コントロールが表示される', () => {
		const props = createProps( {
			attributes: {
				...createProps().attributes,
				listType: 'simple',
				listTypeMobile: 'card',
			},
		} );
		render( <Thumbnail { ...props } /> );
		expect(
			screen.getByLabelText( '画像を表示する' )
		).toBeInTheDocument();
	} );
} );
