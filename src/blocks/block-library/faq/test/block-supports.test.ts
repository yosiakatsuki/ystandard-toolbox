import metadata from '../block.json';

describe( 'FAQ Block Supports', () => {
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
