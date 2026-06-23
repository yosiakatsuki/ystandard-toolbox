import classnames from 'classnames';
/**
 * Aktk dependencies.
 */
import Button from '@aktk/block-components/wp-controls/button';

export function HorizonButtons( {
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
} ): React.ReactElement {
	const buttonClass = classnames(
		'aktk-components__horizon-buttons',
		className
	);
	return <div className={ buttonClass }>{ children }</div>;
}

interface HorizonButtonSelectProps {
	className?: string;
	onChange?: ( value: string | number | boolean ) => void;
	value?: string | number | boolean;
	options: { label: string; value: string | number | boolean }[];
	buttonSize?: 'small' | 'default' | 'compact';
}

export function HorizonButtonSelect(
	props: HorizonButtonSelectProps
): React.ReactElement {
	const { className, onChange, value, options, buttonSize } = props;

	return (
		<HorizonButtons className={ className }>
			<>
				{ options?.map( ( option, index ) => (
					<Button
						key={ option.value ? `${ option.value }` : index }
						variant={
							option.value === value ? 'primary' : 'secondary'
						}
						size={ buttonSize }
						onClick={ () => onChange?.( option.value ) }
					>
						{ option.label }
					</Button>
				) ) }
			</>
		</HorizonButtons>
	);
}
