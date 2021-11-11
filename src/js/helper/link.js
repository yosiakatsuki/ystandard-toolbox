const NEW_TAB_REL = 'noreferrer noopener';
const NEW_LINK_TARGET = '_blank';

export const isOpenInNewTab = ( value ) => {
	return true === value || NEW_LINK_TARGET === value;
}

export const toggleOpenInNewTab = ( value ) => {
	return isOpenInNewTab( value ) ? undefined : NEW_LINK_TARGET;
}

export const getLinkRel = ( linkTarget, rel = undefined ) => {
	if ( rel && NEW_TAB_REL !== rel ) {
		return rel;
	}
	if ( isOpenInNewTab( linkTarget ) ) {
		return NEW_TAB_REL;
	}
	return '';
}
