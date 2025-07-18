import { LinkControl } from '@aktk/block-components/components/link-control';

const BannerLinkLinkControl = ( props ) => {
	const { attributes, setAttributes } = props;

	const { link } = attributes;

	const handleOnChange = ( value ) => {
		const { url, linkTarget, rel } = value;
		if ( ! url ) {
			setAttributes( { link: undefined } );
			return;
		}

		setAttributes( {
			link: {
				url,
				linkTarget,
				rel,
			},
		} );
	};

	return (
		<LinkControl
			value={ {
				url: link?.url || '',
				linkTarget: link?.linkTarget,
				rel: link?.rel,
			} }
			onChange={ handleOnChange }
		/>
	);
};
export default BannerLinkLinkControl;
