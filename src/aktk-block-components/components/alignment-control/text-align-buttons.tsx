/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Aktk dependencies
 */
import {
	ToggleGroupControl,
	ToggleGroupControlOptionIcon,
} from '@aktk/block-components/wp-controls/toggle-group-control';

import { TEXT_ALIGNMENT_OPTIONS } from './const';

interface TextAlignButtonsProps {
	onChange: ( align: string | undefined ) => void;
	value: string | undefined;
}

export function TextAlignButtons( props: TextAlignButtonsProps ) {
	const { onChange, value } = props;
	return (
		<ToggleGroupControl
			label={ __( 'テキスト揃え', 'ystandard-toolbox' ) }
			hideLabelFromVision
			value={ value }
			onChange={ ( newValue ) =>
				onChange( newValue as string | undefined )
			}
			isBlock
			isDeselectable
			className='aktk-components__text-align-buttons'
		>
			{ TEXT_ALIGNMENT_OPTIONS.map( ( { icon, title, align } ) => (
				<ToggleGroupControlOptionIcon
					key={ align }
					value={ align }
					icon={ icon }
					label={ title }
				/>
			) ) }
		</ToggleGroupControl>
	);
}
