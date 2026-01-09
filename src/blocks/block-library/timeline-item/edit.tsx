/**
 * Block dependencies.
 */
import { InspectorControls } from './inspector-controls';
import type { TimeLineItemProps } from './types';
import './style-editor.scss';

export default function Edit( props: TimeLineItemProps ) {
	return (
		<>
			<InspectorControls { ...props } />
			<div>タイムラインItem</div>
		</>
	);
}
