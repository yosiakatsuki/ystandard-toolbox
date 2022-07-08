import { getPluginSettings } from '../../../function/setting';

export function getOverlayImageId() {
	const imageId = getPluginSettings( 'headerOverlayImageId' );
	return imageId || undefined;
}
