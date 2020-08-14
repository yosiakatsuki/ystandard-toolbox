import feather from 'feather-icons';

export default function _getFeatherIcon(name, option) {
	if (!feather.icons[name]) {
		return '';
	}
	return feather.icons[name].toSvg(option);
}
