import { Extension } from '@codemirror/state';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';

/**
 * Components Dependencies
 */
import './style-editor.scss';

/**
 * CodeInput コンポーネントのプロパティ型定義
 */
interface CodeInputProps {
	value: string;
	minHeight?: string;
	maxHeight?: string;
	onChange: ( value: string ) => void;
	extensions?: Extension[];
	[ key: string ]: any;
}

/**
 * CodeInput コンポーネント
 */
export function CodeInput( {
	value,
	minHeight,
	maxHeight,
	onChange,
	extensions,
	...props
}: CodeInputProps ): JSX.Element {
	const _minHeight = minHeight || '200px';
	const _maxHeight = maxHeight || '500px';
	const _extensions = extensions || [ html() ];

	const handleOnChange = ( newValue: string ): void => {
		onChange( newValue );
	};

	return (
		<div className={ 'aktk-code-input' }>
			{ /* @ts-ignore */ }
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
}
