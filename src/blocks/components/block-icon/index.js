import classnames from 'classnames';
import './_editor.scss';

export const blockIconColor = {
	main: '#4190be',
	child: '#A64276',
	deprecated: '#be4141',
	beta: '#9CADBC',
};

const BlockIcon = ( { Icon, color = '#4190be', ...props } ) => {
	const iconProps = {
		className: classnames( 'aktk-block-icon', props?.className ),
		stroke: color,
		fill: 'none',
		...props,
	};
	return <Icon { ...iconProps } />;
};
export default BlockIcon;
