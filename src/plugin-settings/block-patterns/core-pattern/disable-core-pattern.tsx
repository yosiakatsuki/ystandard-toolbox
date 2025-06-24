import { BaseControl } from '@wordpress/components';
import { useContext } from '@wordpress/element';
/**
 * yStandard
 */
import HorizonButtons from '@aktk/components/horizon-buttons';
import { BlockPatternsContext } from '../index';
import { toBool } from '@aktk/block-components/utils/boolean';

const DisableCorePattern = () => {
	const { settings, setSettings, getSetting } =
		useContext( BlockPatternsContext );
	const handleOnChange = ( newValue ) => {
		setSettings( {
			...settings,
			...{
				disable_core_pattern: newValue.name,
			},
		} );
	};
	const items = [
		{
			name: false,
			label: '有効',
		},
		{
			name: true,
			label: '無効',
		},
	];
	const primary = toBool( getSetting( 'disable_core_pattern' ) );
	return (
		<BaseControl
			id={ 'disable_core_pattern' }
			label={ 'WordPress本体のブロックパターンの有効・無効' }
		>
			<HorizonButtons
				onChange={ handleOnChange }
				items={ items }
				primary={ primary }
			/>
		</BaseControl>
	);
};
export default DisableCorePattern;
