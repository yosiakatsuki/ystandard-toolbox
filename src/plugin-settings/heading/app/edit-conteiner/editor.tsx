/**
 * 設定項目
 */
import Preset from '../preset';
import Typography from '../typography';
import UpdateHeadingOption from '../update';

import './style-editor.scss';

export default function Editor() {
	return (
		<div className="ystdtb-heading-v2__editor">
			<Preset />
			<Typography />
			<UpdateHeadingOption />
		</div>
	);
}
