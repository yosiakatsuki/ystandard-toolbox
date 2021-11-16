import classnames from "classnames";

export const getRatioClassName = ( ratio ) => {
	if ( ! ratio ) {
		return undefined;
	}
	return classnames(
		'ystdtb-ratio',
		`is-${ ratio }`
	);
}

export const getRatioInnerClassName = ( ratio ) => {
	return ! ratio ? undefined : 'ystdtb-ratio__inner';
}
