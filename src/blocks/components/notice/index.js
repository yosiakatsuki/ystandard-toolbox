import classnames from 'classnames';
import './_editor.scss';

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
	isTextSmall,
	...props
} ) => {
	let _noticeType = type || 'info';
	const styles = {};
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
	if ( isTextSmall ) {
		styles.fontSize = '12px';
	}
	const wrapProps = {
		className: classnames(
			'ystd-component-notice',
			className,
			`is-${ _noticeType }`
		),
		style: styles,
		...props,
	};

	return <div { ...wrapProps }>{ children }</div>;
};

export default Notice;
