/* External Dependencies */
import fs from 'fs';
import path from 'path';
import { icons } from 'feather-icons';
import { parse as grammarParse } from '@wordpress/block-serialization-default-parser';
/* WordPress Dependencies */
import {
	createBlock,
	parse,
	serialize,
	registerBlockType,
} from '@wordpress/blocks';
/* Block Dependencies */
import { registerFaqTestBlocks } from '../../helpers/register-blocks';
import { migrateFaqItemAttributes } from '../../../../src/blocks/block-library/faq-item/deprecated/2.3.0/migrate';
import { deprecated1341 } from '../../../../src/blocks/block-library/faq-item/deprecated/1.34.1';

registerFaqTestBlocks();
registerBlockType( 'core/paragraph', {
	title: '段落',
	category: 'text',
	supports: { className: false },
	attributes: { content: { type: 'string', source: 'html', selector: 'p' } },
	save: ( { attributes } ) => <p>{ attributes.content }</p>,
} );

describe( 'FAQラベルとレスポンシブ設定', () => {
	it( 'v2.3実サイトのラベル設定・段落・矢印を有効なブロックとして移行する', () => {
		const base = path.join(
			__dirname,
			'../../fixtures/live/faq/ystdtb__faq__deprecated-2-3-0-label-styles-real'
		);
		const input = fs.readFileSync( `${ base }.html`, 'utf8' ).trim();
		const previousIcons = window.ystdtbIconList;
		window.ystdtbIconList = [
			...previousIcons,
			{ name: 'chevron-down', icon: icons[ 'chevron-down' ].toSvg() },
		];
		try {
			const blocks = parse( input );
			// 全階層の有効性と段落数を先に検証し、不正な状態を期待値に採用しない。
			const flatten = ( items ) =>
				items.flatMap( ( b ) => [ b, ...flatten( b.innerBlocks ) ] );
			const all = flatten( blocks );
			expect( all.every( ( b ) => b.isValid ) ).toBe( true );
			// 有効なdeprecated変換に伴うWordPressの更新通知だけを消去する。
			// eslint-disable-next-line no-console
			console.info.mockClear();
			expect(
				all.filter( ( b ) => b.name === 'core/paragraph' )
			).toHaveLength( 4 );
			for ( const block of all.filter(
				( b ) => b.name === 'ystdtb/faq-item'
			) ) {
				expect(
					Object.keys( block.attributes ).some( ( key ) =>
						/^(label|customLabel)/.test( key )
					)
				).toBe( false );
			}
			// クライアントIDなど環境依存値を除いて移行結果を比較する。
			const normalize = ( items ) =>
				items.map( ( b ) => ( {
					name: b.name,
					isValid: b.isValid,
					attributes: JSON.parse( JSON.stringify( b.attributes ) ),
					innerBlocks: normalize( b.innerBlocks ),
				} ) );
			const expected = {
				'parsed.json': grammarParse( input ),
				json: normalize( blocks ),
				'serialized.html': serialize( blocks ) + '\n',
			};
			for ( const [ ext, value ] of Object.entries( expected ) ) {
				const filename = `${ base }.${ ext }`;
				if (
					process.env.GENERATE_MISSING_FIXTURES &&
					! fs.existsSync( filename )
				) {
					fs.writeFileSync(
						filename,
						typeof value === 'string'
							? value
							: JSON.stringify( value, null, '\t' ) + '\n'
					);
				}
				const stored = fs.readFileSync( filename, 'utf8' );
				expect( value ).toEqual(
					typeof value === 'string' ? stored : JSON.parse( stored )
				);
			}
			expect(
				flatten( parse( serialize( blocks ) ) ).every(
					( b ) => b.isValid
				)
			).toBe( true );
		} finally {
			window.ystdtbIconList = previousIcons;
		}
	} );

	it( '旧ラベル属性を取り除き、プリセット・0・配置をstyleへ移す', () => {
		const migrated = migrateFaqItemAttributes( {
			faqType: 'q',
			labelPosition: 'flex-start',
			labelSize: 'large',
			customLabelSize: '19px',
			labelBold: true,
			labelBackgroundColor: 'ys-red',
			customLabelBackgroundColor: '#123456',
			labelBorderColor: 'ys-blue',
			customLabelBorderColor: '#abcdef',
			labelBorderSize: '0',
			labelBorderRadius: '0',
		} );
		expect( Object.keys( migrated ) ).toEqual( [ 'faqType', 'style' ] );
		expect( migrated.style.ystdtb.faqItem ).toEqual( {
			item: { layout: { alignItems: 'flex-start' } },
			label: {
				typography: { fontSize: 'var:preset|font-size|large' },
				color: { background: 'var:preset|color|ys-red' },
				border: {
					color: 'var:preset|color|ys-blue',
					width: '0',
					radius: '0',
				},
			},
		} );
	} );
	it( '移行先の設定を優先し、旧値は未設定項目だけに補う', () => {
		const migrated = migrateFaqItemAttributes( {
			faqType: 'a',
			labelPosition: 'flex-end',
			customLabelSize: '20px',
			customLabelBackgroundColor: '#123456',
			labelBorderSize: '2px',
			labelBorderRadius: '8px',
			style: {
				ystdtb: {
					faqItem: {
						item: { layout: { alignItems: 'center' } },
						label: {
							typography: { fontSize: '1rem' },
							color: { background: '#fff' },
							border: { width: '0' },
							dimensions: { size: '48px' },
						},
						arrow: { color: { text: '#000' } },
					},
				},
			},
		} );
		expect( migrated.style.ystdtb.faqItem ).toEqual( {
			item: { layout: { alignItems: 'center' } },
			label: {
				typography: { fontSize: '1rem' },
				color: { background: '#fff' },
				border: { width: '0', radius: '8px' },
				dimensions: { size: '48px' },
			},
			arrow: { color: { text: '#000' } },
		} );
	} );
	it( 'v1の数値枠線に単位を補い、最終形式へ直接変換する', () => {
		const migrated = deprecated1341[ 0 ].migrate( {
			faqType: 'a',
			labelBorderSize: 2,
			labelBorderRadius: 12,
			labelBold: false,
		} );
		expect( migrated.style.ystdtb.faqItem.label ).toEqual( {
			border: { width: '2px', radius: '12px' },
			typography: { fontStyle: 'normal', fontWeight: '400' },
		} );
		expect( migrated ).not.toHaveProperty( 'labelBorderSize' );
	} );
	it( '通常値と端末別値・子ブロックを保存して再読込できる', () => {
		const attributes = {
			faqType: 'a',
			style: {
				typography: { fontSize: '18px' },
				spacing: { padding: { top: '12px' } },
				ystdtb: {
					faqItem: {
						item: {
							layout: { alignItems: 'flex-start' },
							spacing: { gap: '16px' },
							responsive: {
								spacing: {
									gap: { tablet: '8px', mobile: '0' },
								},
							},
						},
						label: {
							typography: { fontSize: '24px' },
							dimensions: { size: '48px' },
							spacing: { margin: { top: '-2px', bottom: '0' } },
							responsive: {
								typography: { fontSize: { mobile: '16px' } },
								dimensions: { size: { mobile: '32px' } },
								spacing: { margin: { mobile: { top: '4px' } } },
							},
						},
						contents: {
							responsive: {
								spacing: {
									padding: {
										mobile: { top: '0', bottom: '4px' },
									},
								},
								typography: {
									fontSize: {
										tablet: '16px',
										mobile: '14px',
									},
								},
							},
						},
						arrow: { spacing: { margin: { left: '5px' } } },
					},
				},
			},
		};
		const original = createBlock( 'ystdtb/faq-item', attributes, [
			createBlock( 'core/paragraph', { content: '回答を保持' } ),
		] );
		const html = serialize( original );
		const [ parsed ] = parse( html );
		expect( parsed.isValid ).toBe( true );
		expect( parsed.attributes ).toEqual( attributes );
		expect( parsed.innerBlocks[ 0 ].attributes.content ).toBe(
			'回答を保持'
		);
		expect( serialize( parsed ) ).toBe( html );
		const container = document.createElement( 'div' );
		container.innerHTML = html;
		const label = container.querySelector( '.ystdtb-faq-item__label' );
		const contents = container.querySelector(
			'.ystdtb-faq-item__contents'
		);
		expect( contents.style.paddingTop ).toBe( '12px' );
		expect(
			contents.style.getPropertyValue(
				'--ystdtb--mobile--faq-item--contents-padding-top'
			)
		).toBe( '0' );
		expect(
			container.querySelector( '.ystdtb-faq-item' ).style.paddingTop
		).toBe( '' );
		expect( label.style.paddingTop ).toBe( '' );
		expect(
			label.style.getPropertyValue( '--ystdtb--faq-item--label-size' )
		).toBe( '48px' );
		expect(
			label.style.getPropertyValue(
				'--ystdtb--mobile--faq-item--label-size'
			)
		).toBe( '32px' );
		expect(
			label.style.getPropertyValue(
				'--ystdtb--desktop--faq-item--label-size'
			)
		).toBe( '' );
		expect( label.style.marginTop ).toBe( '-2px' );
		expect( container.querySelector( '.ystdtb-faq-item' ).style.gap ).toBe(
			''
		);
	} );
} );
