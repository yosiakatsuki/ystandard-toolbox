import classnames from 'classnames';
import './_editor.scss';

const COLORS = {
	main: '#4190be',
	child: '#A64276',
	deprecated: '#be4141',
	beta: '#9CADBC',
};

const BlockIcon = ( { Icon, type = 'main', ...props } ) => {
	const color = COLORS.hasOwnProperty( type ) ? COLORS[ type ] : COLORS.main;
	const iconProps = {
		className: classnames( 'aktk-block-icon', props?.className ),
		stroke: color,
		fill: 'none',
		...props,
	};
	return <Icon { ...iconProps } />;
};
export default BlockIcon;
