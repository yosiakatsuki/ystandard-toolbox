// slider-item ブロックの utils.ts 純関数テスト
import { getSliderItemOverflow, updateSliderItemOverflow } from '../utils';

describe( 'getSliderItemOverflow', () => {
	it( '未指定では overflow を出力しない', () => {
		expect( getSliderItemOverflow( {} ).overflow ).toBeUndefined();
	} );

	it( 'はみ出した部分を隠す指定で overflow: hidden を返す', () => {
		expect(
			getSliderItemOverflow( {
				style: { ystdtb: { sliderItem: { overflow: 'hidden' } } },
			} )
		).toEqual( { overflow: 'hidden' } );
	} );
} );

describe( 'updateSliderItemOverflow', () => {
	it( 'ほかのスタイルを保持して overflow を保存する', () => {
		expect(
			updateSliderItemOverflow(
				{ border: { radius: '8px' }, dimensions: { height: '300px' } },
				'hidden'
			)
		).toEqual( {
			border: { radius: '8px' },
			dimensions: { height: '300px' },
			ystdtb: { sliderItem: { overflow: 'hidden' } },
		} );
	} );

	it( '解除すると空になった独自スタイルの階層を消す', () => {
		expect(
			updateSliderItemOverflow(
				{
					border: { radius: '8px' },
					ystdtb: { sliderItem: { overflow: 'hidden' } },
				},
				undefined
			)
		).toEqual( { border: { radius: '8px' } } );
	} );

	it( 'ほかのスタイルがない状態で解除すると style 自体を消す', () => {
		expect(
			updateSliderItemOverflow(
				{ ystdtb: { sliderItem: { overflow: 'hidden' } } },
				undefined
			)
		).toBeUndefined();
	} );
} );
