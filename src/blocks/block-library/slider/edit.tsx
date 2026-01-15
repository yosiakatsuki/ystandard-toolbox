/**
 * Block dependencies.
 */
import { InspectorControls } from './inspector-controls';
import type { SliderEditProps } from './types';
import './style-editor.scss';

export default function Edit( props: SliderEditProps ): JSX.Element {
	return (
		<>
			<InspectorControls { ...props } />
			<div>Slider Block Edit Component</div>
		</>
	);
}
