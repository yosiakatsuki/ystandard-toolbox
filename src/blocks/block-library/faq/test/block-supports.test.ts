import metadata from '../block.json';

describe( 'FAQ Block Supports', () => {
	it( 'タイポグラフィ設定を初期表示しない', () => {
		expect(
			metadata.supports.typography.__experimentalDefaultControls
		).toEqual( {
			fontSize: false,
		} );
	} );

	it( '背景色とグラデーション設定を初期表示しない', () => {
		expect( metadata.supports.color.__experimentalDefaultControls ).toEqual(
			{
				background: false,
			}
		);
	} );

	it( '余白設定を初期表示しない', () => {
		expect(
			metadata.supports.spacing.__experimentalDefaultControls
		).toEqual( {
			margin: false,
			padding: false,
		} );
	} );

	it( '枠線の色・角丸・スタイル・幅を有効にする', () => {
		expect( metadata.supports.__experimentalBorder ).toEqual( {
			color: true,
			radius: true,
			style: true,
			width: true,
			__experimentalDefaultControls: {
				color: false,
				radius: false,
				style: false,
				width: false,
			},
		} );
	} );
} );
