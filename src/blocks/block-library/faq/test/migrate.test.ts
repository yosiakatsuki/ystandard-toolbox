import { migrateDeprecated1341Faq } from '../deprecated/1.34.1';
import { migrateFaqBackgroundColor } from '../deprecated/migrate';

describe( 'FAQ親ブロックの背景色移行', () => {
	it( 'カスタム背景色をstyle.color.backgroundへ移行する', () => {
		expect(
			migrateFaqBackgroundColor( {
				customBackgroundColor: '#fff7ed',
				style: {
					typography: {
						lineHeight: 1.8,
					},
					ystdtb: {
						faq: {
							responsive: {
								typography: {
									fontSize: {
										mobile: '18px',
									},
								},
							},
						},
					},
				},
			} )
		).toEqual( {
			style: {
				color: {
					background: '#fff7ed',
				},
				typography: {
					lineHeight: 1.8,
				},
				ystdtb: {
					faq: {
						responsive: {
							typography: {
								fontSize: {
									mobile: '18px',
								},
							},
						},
					},
				},
			},
		} );
	} );

	it( 'プリセット背景色がある場合は旧カスタム背景色を移行しない', () => {
		expect(
			migrateFaqBackgroundColor( {
				backgroundColor: 'ys-light-orange',
				customBackgroundColor: '#fff7ed',
			} )
		).toEqual( {
			backgroundColor: 'ys-light-orange',
		} );
	} );

	it( '移行先に背景色がある場合は上書きしない', () => {
		expect(
			migrateFaqBackgroundColor( {
				customBackgroundColor: '#fff7ed',
				style: {
					color: {
						background: '#fef3c7',
					},
				},
			} )
		).toEqual( {
			style: {
				color: {
					background: '#fef3c7',
				},
			},
		} );
	} );

	it( 'v1.34.1以前の枠線幅とカスタム背景色を一度に移行する', () => {
		expect(
			migrateDeprecated1341Faq( {
				customBackgroundColor: '#fff7ed',
				borderSize: 1,
			} )
		).toEqual( {
			borderSize: '1px',
			style: {
				color: {
					background: '#fff7ed',
				},
			},
		} );
	} );
} );
