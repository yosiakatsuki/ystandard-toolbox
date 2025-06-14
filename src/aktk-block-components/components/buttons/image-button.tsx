import classNames from 'classnames';
import { Button } from '@wordpress/components';
import './image-button.scss';

interface ImageButtonProps {
	onClick: () => void;
	imageUrl: string;
	alt: string;
	isPrimary?: boolean;
	className?: string;
}

export function ImageButton( {
	onClick,
	imageUrl,
	alt,
	isPrimary = false,
	className,
	...props
}: ImageButtonProps ): JSX.Element {
	const buttonClass = classNames(
		'aktk-image-button',
		{
			'is-primary': isPrimary,
		},
		className
	);

	return (
		<Button
			className={ buttonClass }
			onClick={ onClick }
			{ ...props }
		>
			<img src={ imageUrl } alt={ alt } />
		</Button>
	);
}