const PageBase = ( { title, children } ) => {
	return (
		<div className="ystdtb-settings__base">
			<div className="ystdtb-settings__header">
				<h1 className="ystdtb-settings__title">{ title }</h1>
				<div className="ystdtb-settings__brand">yStandard Toolbox</div>
			</div>
			<div className="ystdtb-settings__content">{ children }</div>
		</div>
	);
};

export default PageBase;
