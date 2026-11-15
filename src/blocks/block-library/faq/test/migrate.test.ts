import { migrateDeprecated1341Faq } from '../deprecated/1.34.1';
import {
	migrateFaqAttributes,
	migrateFaqBackgroundColor,
	migrateFaqBorder,
} from '../deprecated/migrate';

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
				borderType: 'bottom',
				borderSize: 1,
				customBorderColor: '#c2410c',
			} )
		).toEqual( {
			style: {
				border: {
					bottom: {
						color: '#c2410c',
						style: 'solid',
						width: '1px',
					},
				},
				color: {
					background: '#fff7ed',
				},
			},
		} );
	} );
} );

describe( 'FAQ親ブロックの枠線移行', () => {
	it( '全周のプリセット枠線を標準のborderColor属性へ移行する', () => {
		expect(
			migrateFaqBorder( {
				borderType: 'all',
				borderSize: '2px',
				borderColor: 'ys-black',
				customBorderColor: '#0284c7',
			} )
		).toEqual( {
			borderColor: 'ys-black',
			style: {
				border: {
					style: 'solid',
					width: '2px',
				},
			},
		} );
	} );

	it( '下のみのプリセット枠線色をstyle.border.bottomへ移行する', () => {
		expect(
			migrateFaqBorder( {
				borderType: 'bottom',
				borderSize: '1px',
				borderColor: 'ys-red',
			} )
		).toEqual( {
			style: {
				border: {
					bottom: {
						color: 'var:preset|color|ys-red',
						style: 'solid',
						width: '1px',
					},
				},
			},
		} );
	} );

	it( '下のみのカスタム枠線を既存styleとマージする', () => {
		expect(
			migrateFaqBorder( {
				borderType: 'bottom',
				borderSize: 3,
				customBorderColor: '#c2410c',
				style: {
					color: {
						background: '#fff7ed',
					},
				},
			} )
		).toEqual( {
			style: {
				border: {
					bottom: {
						color: '#c2410c',
						style: 'solid',
						width: '3px',
					},
				},
				color: {
					background: '#fff7ed',
				},
			},
		} );
	} );

	it( '移行先に枠線がある場合は旧属性で上書きしない', () => {
		expect(
			migrateFaqBorder( {
				borderType: 'all',
				borderSize: '1px',
				customBorderColor: '#0284c7',
				style: {
					border: {
						color: '#7c3aed',
						style: 'dashed',
						width: '3px',
					},
				},
			} )
		).toEqual( {
			style: {
				border: {
					color: '#7c3aed',
					style: 'dashed',
					width: '3px',
				},
			},
		} );
	} );

	it( '移行先の全周枠線にあるプリセット色属性を保持する', () => {
		expect(
			migrateFaqBorder( {
				borderColor: 'ys-black',
				style: {
					border: {
						style: 'solid',
						width: '1px',
					},
				},
			} )
		).toEqual( {
			borderColor: 'ys-black',
			style: {
				border: {
					style: 'solid',
					width: '1px',
				},
			},
		} );
	} );

	it( '移行先が辺別指定の場合は全周の旧プリセット色を残さない', () => {
		expect(
			migrateFaqBorder( {
				borderColor: 'ys-black',
				style: {
					border: {
						bottom: {
							style: 'solid',
							width: '1px',
						},
					},
				},
			} )
		).toEqual( {
			style: {
				border: {
					bottom: {
						style: 'solid',
						width: '1px',
					},
				},
			},
		} );
	} );

	it( '枠線タイプが空の場合は見えない旧設定を移行しない', () => {
		expect(
			migrateFaqBorder( {
				borderType: '',
				borderSize: '1px',
				customBorderColor: '#0284c7',
			} )
		).toEqual( {} );
	} );

	it( '幅0の枠線を既定幅の枠線へ変換しない', () => {
		expect(
			migrateFaqBorder( {
				borderType: 'all',
				borderSize: '0px',
				customBorderColor: '#0284c7',
			} )
		).toEqual( {} );
	} );

	it( '背景色と枠線を1回のmigrateで現行形式へ移行する', () => {
		expect(
			migrateFaqAttributes( {
				customBackgroundColor: '#fff7ed',
				borderType: 'all',
				borderSize: '1px',
				customBorderColor: '#0284c7',
			} )
		).toEqual( {
			style: {
				border: {
					color: '#0284c7',
					style: 'solid',
					width: '1px',
				},
				color: {
					background: '#fff7ed',
				},
			},
		} );
	} );
} );
