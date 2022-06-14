import { PanelBody } from '@wordpress/components';
/**
 * yStandard
 */
import DisableCorePattern from './disable-core-pattern';

const CorePattern = () => {
	return (
		<PanelBody title={ 'WordPress標準パターン' }>
			<DisableCorePattern />
		</PanelBody>
	);
};
export default CorePattern;
