import '@testing-library/jest-dom';

// @ts-ignore
global.fetch = jest.fn( () =>
	Promise.resolve( {
		json: () => Promise.resolve( {} ),
	} )
);

// __() のモック.
jest.mock( '@wordpress/i18n', () => ( {
	// @ts-ignore
	__: ( str ) => str,
} ) );

jest.mock( '@wordpress/element', () => ( {
	...jest.requireActual( 'react' ),
} ) );

jest.mock( '@wordpress/data', () => ( {
	useSelect: jest.fn( ( callback ) =>
		callback( () => ( {
			getSettings: () => ( {
				imageSizes: [
					{ slug: 'thumbnail', name: 'サムネイル' },
					{ slug: 'medium', name: '中' },
					{ slug: 'large', name: '大' },
					{ slug: 'full', name: 'フルサイズ' },
				],
			} ),
		} ) )
	),
	useDispatch: jest.fn( () => ( {} ) ),
} ) );

jest.mock( '@wordpress/block-editor', () => ( {
	// @ts-ignore
	getFontSizeClass: ( fontSize ) => fontSize,
	// @ts-ignore
	getColorClassName: ( colorContextName, colorSlug ) => {
		if ( ! colorContextName || ! colorSlug ) {
			return undefined;
		}
		return `has-${ colorSlug }-${ colorContextName }`;
	},
	store: 'core/block-editor',
} ) );

jest.mock( '@wordpress/components', () => ( {
	// @ts-ignore
	FontSizePicker: ( { value, onChange, fontSizes } ) => (
		<select
			value={ value }
			onChange={ ( e ) =>
				onChange(
					parseInt( e.target.value ) ?? e.target.value,
					fontSizes.find(
						// @ts-ignore
						( size ) => size.size === parseInt( e.target.value )
					)
				)
			}
		>
			{
				// @ts-ignore
				fontSizes.map( ( fontSize ) => (
					<option key={ fontSize.slug } value={ fontSize.size }>
						{ fontSize.name }
					</option>
				) )
			}
		</select>
	),
	// @ts-ignore
	TabPanel: ( { tabs, initialTabName, children } ) => {
		return (
			<div>
				<div>
					{
						// @ts-ignore
						tabs.map( ( tab ) => (
							<div key={ tab.name }>
								<button onClick={ () => {} }>
									{ tab.title }
								</button>
								<div>{ children( { name: tab.name } ) }</div>
							</div>
						) )
					}
				</div>
			</div>
		);
	},
	// @ts-ignore
	Button: ( { onClick, children } ) => (
		<button onClick={ onClick }>{ children }</button>
	),
	// @ts-ignore
	// eslint-disable-next-line no-unused-vars
	__experimentalNumberControl: ( { label, value, onChange, __next40pxDefaultSize, ...rest } ) => (
		<div>
			{ label && <label>{ label }</label> }
			<input
				type="number"
				aria-label={ label }
				value={ value ?? '' }
				onChange={ ( e ) => onChange( e.target.value ) }
				{ ...rest }
			/>
		</div>
	),
	// @ts-ignore
	CustomSelectControl: ( { label, options, value, onChange } ) => (
		<div>
			{ label && <label>{ label }</label> }
			<select
				aria-label={ label || '選択' }
				value={ value?.key ?? '' }
				onChange={ ( e ) => {
					// @ts-ignore
					const selectedItem = options.find(
						// @ts-ignore
						( opt ) => opt.key === e.target.value
					);
					if ( selectedItem ) {
						onChange( { selectedItem } );
					}
				} }
			>
				{
					// @ts-ignore
					options.map( ( opt ) => (
						<option key={ opt.key } value={ opt.key }>
							{ opt.name }
						</option>
					) )
				}
			</select>
		</div>
	),
	// @ts-ignore
	BaseControl: ( { id, label, children } ) => (
		<div>
			{ label && <label htmlFor={ id }>{ label }</label> }
			{ children }
		</div>
	),
	// @ts-ignore
	ToggleControl: ( { label, checked, onChange, __nextHasNoMarginBottom, ...rest } ) => (
		<div>
			<label>
				<input
					type="checkbox"
					checked={ checked }
					onChange={ ( e ) => onChange( e.target.checked ) }
					{ ...rest }
				/>
				{ label }
			</label>
		</div>
	),
	// @ts-ignore
	CheckboxControl: ( { label, checked, onChange, ...rest } ) => (
		<label>
			<input
				type="checkbox"
				checked={ checked }
				onChange={ ( e ) => onChange( e.target.checked ) }
				{ ...rest }
			/>
			{ label }
		</label>
	),
	// @ts-ignore
	PanelBody: ( { title, children } ) => (
		<div>
			<h2>{ title }</h2>
			{ children }
		</div>
	),
} ) );

