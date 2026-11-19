import { updateNavigationStyle } from '../navigation-style';

describe( 'updateNavigationStyle', () => {
	it( '矢印の項目だけを更新し、標準サポートの値と他の項目を保持する', () => {
		expect(
			updateNavigationStyle(
				{
					spacing: { margin: { top: '0' } },
					ystdtb: {
						slider: {
							navigation: {
								design: 'circle',
								responsive: { size: { mobile: '32px' } },
							},
						},
					},
				},
				{ size: '56px' }
			)
		).toEqual( {
			spacing: { margin: { top: '0' } },
			ystdtb: {
				slider: {
					navigation: {
						design: 'circle',
						size: '56px',
						responsive: { size: { mobile: '32px' } },
					},
				},
			},
		} );
	} );

	it( '最後の項目を解除したら、空になった独自スタイルの階層を除く', () => {
		expect(
			updateNavigationStyle(
				{
					spacing: { margin: { top: '0' } },
					ystdtb: { slider: { navigation: { design: 'square' } } },
				},
				{ design: undefined }
			)
		).toEqual( { spacing: { margin: { top: '0' } } } );
	} );

	it( '端末別の大きさを解除しても、通常の大きさは保持する', () => {
		expect(
			updateNavigationStyle(
				{
					ystdtb: {
						slider: {
							navigation: {
								size: '56px',
								responsive: { size: { tablet: '40px' } },
							},
						},
					},
				},
				{ responsive: { size: undefined } }
			)
		).toEqual( {
			ystdtb: { slider: { navigation: { size: '56px' } } },
		} );
	} );
} );
