import classnames from 'classnames';

export const noticeType = {
	info: 'info',
	warning: 'warning',
	error: 'error',
	help: 'help',
};

const Notice = ( {
	children,
	type,
	className,
	isInfo,
	isWarning,
	isError,
	isHelp,
	...props
} ) => {
	let _noticeType = type || 'info';
	if ( isInfo ) {
		_noticeType = 'info';
	}
	if ( isWarning ) {
		_noticeType = 'warning';
	}
	if ( isError ) {
		_noticeType = 'error';
	}
	if ( isHelp ) {
		_noticeType = 'help';
	}
	const wrapProps = {
		className: classnames(
			'ystd-component-notice',
			className,
			`is-${ _noticeType }`
		),
		...props,
	};

	return <div { ...wrapProps }>{ children }</div>;
};

export default Notice;
