import LinkControl from '@aktk/components/link-control';
import {
	isOpenInNewTab,
	toggleOpenInNewTab,
	getLinkRel,
} from '@aktk/helper/link';

const BannerLinkLinkControl = ( props ) => {
	const { attributes, setAttributes } = props;

	const { link } = attributes;

	const handleOnChange = ( value ) => {
		const { url: newURL = '', opensInNewTab: newOpensInNewTab } = value;
		if ( ! newURL ) {
			setAttributes( { link: undefined } );
			return;
		}
		let target = link?.linkTarget;
		if ( isOpenInNewTab( target ) !== isOpenInNewTab( newOpensInNewTab ) ) {
			target = toggleOpenInNewTab( target );
		}
		const newLink = {
			url: newURL,
			linkTarget: target,
			rel: getLinkRel( target, link?.rel ),
		};

		setAttributes( {
			link: newLink,
		} );
	};
	return (
		<LinkControl
			value={ {
				url: link?.url,
				opensInNewTab: isOpenInNewTab( link?.linkTarget ),
			} }
			onChange={ handleOnChange }
		/>
	);
};
export default BannerLinkLinkControl;
