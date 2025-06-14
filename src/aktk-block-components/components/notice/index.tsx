import classNames from 'classnames';
import './style-editor.scss';

interface NoticeProps {
	children?: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
}

export function Notice( props: NoticeProps ) {
	const baseClassName = 'aktk-notice';

	const { children, className, style } = props;
	const noticeClass = classNames( baseClassName, className );
	const noticeStyle = {
		...style,
	};

	return (
		<>
			<div className={ noticeClass } style={ noticeStyle }>
				{ children }
			</div>
		</>
	);
}

export function NoticeText( props: NoticeProps ) {
	const baseClassName = 'aktk-notice--text';

	const { children, className, style } = props;
	const noticeClass = classNames( baseClassName, className );
	const noticeStyle = {
		...style,
	};

	return (
		<>
			<div className={ noticeClass } style={ noticeStyle }>
				{ children }
			</div>
		</>
	);
}

export function NoticeInfo( props: NoticeProps ) {
	const { className, ...otherProps } = props;
	return (
		<Notice
			{ ...otherProps }
			className={ classNames( 'bg-aktk-bg-blue text-aktk-text-blue', className ) }
		/>
	);
}

export function NoticeWarning( props: NoticeProps ) {
	const { className, ...otherProps } = props;
	return (
		<Notice
			{ ...otherProps }
			className={ classNames(
				'mt-1 bg-aktk-bg-yellow text-fz-xxs text-aktk-text-yellow',
				className
			) }
		/>
	);
}

export function NoticeSecondary( props: NoticeProps ) {
	const { className, ...otherProps } = props;
	return (
		<Notice
			{ ...otherProps }
			className={ classNames(
				'mt-1 bg-aktk-bg-gray text-fz-xxs text-aktk-text-gray',
				className
			) }
		/>
	);
}

export function NoticeWarningText( props: NoticeProps ) {
	const { className, ...otherProps } = props;
	return (
		<NoticeText
			{ ...otherProps }
			className={ classNames(
				'mt-1 text-fz-xxs text-aktk-text-yellow',
				className
			) }
		/>
	);
}

export function NoticeSecondaryText( props: NoticeProps ) {
	const { className, ...otherProps } = props;
	return (
		<NoticeText
			{ ...otherProps }
			className={ classNames(
				'mt-1 text-fz-xxs text-aktk-text-gray',
				className
			) }
		/>
	);
}
