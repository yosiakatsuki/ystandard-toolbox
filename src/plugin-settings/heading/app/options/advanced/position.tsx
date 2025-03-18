/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';

/**
 * Aktk Dependencies
 */
import CustomSelectControl from '@aktk/block-components/wp-controls/custom-select-control';
import { IconUnitControl } from '@aktk/block-components/components/icon-control';
import InputControl from '@aktk/block-components/wp-controls/input-control';
/**
 * Plugin Dependencies
 */
import BaseControl from '@aktk/plugin-settings/components/base-control';

interface PositionProps {
	value: string | undefined;
	onChange: ( newValue: {
		position?: string;
		top?: string;
		right?: string;
		bottom?: string;
		left?: string;
		zIndex?: string;
	} ) => void;
	position?: string;
}

const SELECT_OPTIONS = [
	{
		key: 'relative',
		name: __( 'relative', 'ystandard-toolbox' ),
	},
	{
		key: 'absolute',
		name: __( 'absolute', 'ystandard-toolbox' ),
	},
	{
		key: 'static',
		name: __( 'static', 'ystandard-toolbox' ),
	},
	{
		key: 'fixed',
		name: __( 'fixed', 'ystandard-toolbox' ),
	},
	{
		key: 'sticky',
		name: __( 'sticky', 'ystandard-toolbox' ),
	},
];

export function Position( props: PositionProps ) {
	const { value, onChange } = props;
	const handleOnChange = ( newValue: string ) => {
		// 何も選択されていなければ上下左右の設定もクリア.
		if ( ! newValue || 'static' === newValue ) {
			onChange( {
				top: undefined,
				right: undefined,
				bottom: undefined,
				left: undefined,
				zIndex: undefined,
			} );
		}
		onChange( { position: newValue } );
	};
	return (
		<BaseControl
			label={ __( 'position', 'ystandard-toolbox' ) }
			id="position"
			isFullWidth={ true }
		>
			<CustomSelectControl
				value={ value || '' }
				onChange={ handleOnChange }
				options={ SELECT_OPTIONS }
			/>
		</BaseControl>
	);
}

export function PositionTop( props: PositionProps ) {
	const { value, onChange, position = '' } = props;
	if ( ! position || 'static' === position ) {
		return <></>;
	}
	const handleOnChange = ( newValue: string ) => {
		onChange( { top: newValue } );
	};

	return (
		<BaseControl
			label={ __( 'top', 'ystandard-toolbox' ) }
			id="position-top"
			isFullWidth={ true }
		>
			<IconUnitControl
				value={ value || '' }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}

export function PositionRight( props: PositionProps ) {
	const { value, onChange, position = '' } = props;
	if ( ! position || 'static' === position ) {
		return <></>;
	}
	const handleOnChange = ( newValue: string ) => {
		onChange( { right: newValue } );
	};
	return (
		<BaseControl
			label={ __( 'right', 'ystandard-toolbox' ) }
			id="position-right"
			isFullWidth={ true }
		>
			<IconUnitControl
				value={ value || '' }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}

export function PositionBottom( props: PositionProps ) {
	const { value, onChange, position = '' } = props;
	if ( ! position || 'static' === position ) {
		return <></>;
	}
	const handleOnChange = ( newValue: string ) => {
		onChange( { bottom: newValue } );
	};
	return (
		<BaseControl
			label={ __( 'bottom', 'ystandard-toolbox' ) }
			id="position-bottom"
			isFullWidth={ true }
		>
			<IconUnitControl
				value={ value || '' }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}

export function PositionLeft( props: PositionProps ) {
	const { value, onChange, position = '' } = props;
	if ( ! position || 'static' === position ) {
		return <></>;
	}
	const handleOnChange = ( newValue: string ) => {
		onChange( { left: newValue } );
	};
	return (
		<BaseControl
			label={ __( 'left', 'ystandard-toolbox' ) }
			id="position-left"
			isFullWidth={ true }
		>
			<IconUnitControl
				value={ value || '' }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}

export function ZIndex( props: PositionProps ) {
	const { value, onChange, position = '' } = props;
	if ( ! position || 'static' === position ) {
		return <></>;
	}
	const handleOnChange = ( newValue: string | undefined ) => {
		onChange( { zIndex: newValue } );
	};
	return (
		<BaseControl
			label={ __( 'z-index', 'ystandard-toolbox' ) }
			id="z-index"
			isFullWidth={ true }
		>
			<InputControl value={ value || '' } onChange={ handleOnChange } />
		</BaseControl>
	);
}
