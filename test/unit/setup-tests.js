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
} ) );

jest.mock( '@wordpress/block-editor', () => ( {
	// @ts-ignore
	getFontSizeClass: ( fontSize ) => fontSize,
} ) );
