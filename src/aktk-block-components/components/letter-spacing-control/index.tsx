/**
 * Aktk dependencies.
 */
import UnitControl, {
	useCustomUnits,
} from '@aktk/block-components/wp-controls/unit-control';

interface LetterSpacingControlProps {
	value?: string;
	onChange: ( value: string ) => void;
	inputWidth?: string;
}

export function LetterSpacingControl(
	props: LetterSpacingControlProps
): JSX.Element {
	const { value, onChange, inputWidth = 'min(100%,120px)' } = props;

	// 設定できる単位を制限する.
	const useLetterSpacingCustomUnits = () => {
		const em =
			useCustomUnits( {
				availableUnits: [ 'em' ],
			} ) || [];
		const px =
			useCustomUnits( {
				availableUnits: [ 'px' ],
			} ) || [];
		const rem =
			useCustomUnits( {
				availableUnits: [ 'rem' ],
			} ) || [];
		return [ ...em, ...px, ...rem ];
	};

	return (
		<UnitControl
			value={ value }
			onChange={ onChange }
			units={ useLetterSpacingCustomUnits() }
			inputWidth={ inputWidth }
		/>
	);
}
