import { BaseControl } from '@wordpress/components';
import BannerLinkLinkControl from '../../controls/link';

const Link = ( props ) => {
	return (
		<BaseControl>
			<BannerLinkLinkControl { ...props } />
		</BaseControl>
	);
};
export default Link;
