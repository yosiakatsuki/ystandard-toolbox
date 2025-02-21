import SpacingSizesControl, {
	getCustomValueFromPreset,
	type SpacingSizeControlProps,
	type SpacingSizeValues,
} from '@aktk/block-components/wp-controls/spacing-size-control';
import { isObject } from '@aktk/block-components/utils/object';

export * from './types';

type CustomSpacingSelectProps = SpacingSizeControlProps;

export default function CustomSpacingSelect( props: CustomSpacingSelectProps ) {
	const { values, onChange, label, sides, minimumCustomValue = 0 } = props;
	return (
		<>
			<SpacingSizesControl
				values={ values }
				onChange={ onChange }
				label={ label }
				sides={ sides }
				minimumCustomValue={ minimumCustomValue }
			/>
		</>
	);
}

interface CustomSpacingSelectWithCustomValueProps
	extends CustomSpacingSelectProps {
	spacingSizes: object[];
}

export function CustomSpacingSelectWithCustomValue(
	props: CustomSpacingSelectWithCustomValueProps
) {
	const {
		values,
		onChange,
		label,
		sides,
		spacingSizes,
		minimumCustomValue = 0,
	} = props;

	const handleOnChange = ( newValue: SpacingSizeValues ) => {
		// プリセットから値を取得して返す.
		if ( !! newValue && isObject( newValue ) ) {
			Object.keys( newValue ).forEach( ( key ) => {
				// @ts-expect-error
				newValue[ key ] = getCustomValueFromPreset(
					// @ts-expect-error
					newValue[ key ],
					spacingSizes
				) as unknown as string;
			} );
			onChange( newValue );
		} else {
			onChange( newValue );
		}
	};
	return (
		<>
			<SpacingSizesControl
				values={ values }
				onChange={ handleOnChange }
				label={ label }
				sides={ sides }
				minimumCustomValue={ minimumCustomValue }
			/>
		</>
	);
}

CustomSpacingSelect.CustomValue = CustomSpacingSelectWithCustomValue;
