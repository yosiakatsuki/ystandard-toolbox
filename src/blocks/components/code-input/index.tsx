import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import './style-editor.scss';

const CodeInput = ( {
	value,
	minHeight,
	maxHeight,
	onChange,
	extensions,
	...props
} ) => {
	const _minHeight = minHeight || '200px';
	const _maxHeight = maxHeight || '500px';
	const _extensions = extensions || [ html() ];
	const handleOnChange = ( newValue ) => {
		onChange( newValue );
	};
	return (
		<div className={ 'aktk-code-input' }>
			<CodeMirror
				value={ value }
				minHeight={ _minHeight }
				maxHeight={ _maxHeight }
				onChange={ handleOnChange }
				extensions={ _extensions }
				{ ...props }
			/>
		</div>
	);
};
export default CodeInput;
