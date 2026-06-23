import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import classnames from 'classnames';
import './_index.scss';
export { css } from './lang-css';

const CodeEditor = ( { value, onChange, extensions, ...props } ) => {
	const wrapProps = {
		className: classnames( 'aktk-control-code-editor' ),
	};
	const codeMirrorProps = {
		value,
		onChange,
		extensions: extensions || [ html() ],
		height: props?.height || 'min(50vh,500px)',
		...props,
	};

	return (
		<div { ...wrapProps }>
			<CodeMirror { ...codeMirrorProps } />
		</div>
	);
};
export default CodeEditor;
