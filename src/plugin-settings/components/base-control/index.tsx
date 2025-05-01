import classnames from 'classnames';
/**
 * WordPress dependencies
 */
import { BaseControl as WPBaseControl } from '@wordpress/components';
// @ts-expect-error
import type { BaseControlProps as WPBaseControlProps } from '@wordpress/components';

/**
 * CSS
 */
import './style-editor.scss';

type BaseControlProps = WPBaseControlProps & {
	isFullWidth?: boolean;
};

const PluginSettingsBaseControl = ( {
	label,
	id,
	children,
	isFullWidth = false,
	...props
}: BaseControlProps ) => {
	const className = classnames(
		'aktk-plugin-settings-base-control__base-control',
		{
			'is-full-width': isFullWidth,
		}
	);
	return (
		<div
			className={
				'aktk-plugin-settings-base-control [&_label]:!normal-case'
			}
		>
			<WPBaseControl
				{ ...{
					label,
					id,
					...props,
				} }
				__nextHasNoMarginBottom
			>
				<div className={ className }>{ children }</div>
			</WPBaseControl>
		</div>
	);
};
export default PluginSettingsBaseControl;
