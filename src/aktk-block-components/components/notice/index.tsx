import classnames from 'classnames';
import './style-editor.scss';

interface NoticeProps {
	children?: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
}

const baseClassName = 'aktk-notice';

export function Notice( props: NoticeProps ) {
	const { children, className, style } = props;
	const noticeClass = classnames( baseClassName, className );
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
	return (
		<Notice
			{ ...props }
			className={ 'bg-aktk-bg-blue text-aktk-bg-blue' }
		/>
	);
}
export function NoticeWarning( props: NoticeProps ) {
	return (
		<Notice
			{ ...props }
			className={
				'mt-1 bg-aktk-bg-yellow text-fz-xxs text-aktk-text-yellow'
			}
		/>
	);
}
