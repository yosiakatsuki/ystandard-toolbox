import './_editor.scss';

const Stack = ( { children, ...props } ) => {
	return (
		<div className="aktk-settings-stack" { ...props }>
			{ children }
		</div>
	);
};
export default Stack;
