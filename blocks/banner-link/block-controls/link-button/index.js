import { ToolbarButton, ToolbarGroup, Popover } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { link as linkIcon, linkOff } from '@wordpress/icons';
import BannerLinkLinkControl from '../../controls/link';

const LinkButton = ( props ) => {
	const { attributes, setAttributes, anchorRef } = props;

	const { link } = attributes;
	const [ isURLPickerOpen, setIsURLPickerOpen ] = useState( false );

	const urlIsSet = !! link?.url;

	const openLinkControl = () => {
		setIsURLPickerOpen( true );
		return false;
	};

	const unlinkButton = () => {
		setAttributes( {
			link: undefined,
		} );
	};

	return (
		<ToolbarGroup>
			<ToolbarButton
				name="link"
				icon={ linkIcon }
				title={ __( 'Link' ) }
				onClick={ openLinkControl }
				isActive={ !! urlIsSet }
			/>
			{ urlIsSet && (
				<ToolbarButton
					name="link"
					icon={ linkOff }
					title={ __( 'Unlink' ) }
					onClick={ unlinkButton }
				/>
			) }
			{ isURLPickerOpen && (
				<Popover
					position="bottom center"
					onClose={ () => setIsURLPickerOpen( false ) }
					anchorRef={ anchorRef?.current }
				>
					<BannerLinkLinkControl { ...props } />
				</Popover>
			) }
		</ToolbarGroup>
	);
};
export default LinkButton;
