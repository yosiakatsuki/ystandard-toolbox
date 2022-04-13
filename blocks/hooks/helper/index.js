import classnames from 'classnames';
import { applyFilters } from '@wordpress/hooks';

export const isEnableHook = ( blockName, hookName, disableBlocks = false ) => {
	const allowedNameSpaces = applyFilters(
		'yStandardToolbox.hooks.allowedNameSpaces',
		[ 'core', 'ystdb', 'ystdtb' ],
		hookName
	);
	const filteredAllowedNameSpaces = allowedNameSpaces.filter(
		( namespace ) => {
			return 0 === blockName.indexOf( namespace );
		}
	);
	if ( 0 >= filteredAllowedNameSpaces.length ) {
		return false;
	}
	if ( disableBlocks && disableBlocks.includes( blockName ) ) {
		return false;
	}

	return true;
};

export const getPanelClassName = ( hookName, isEnabled = false ) => {
	return classnames( 'ystdtb-hook-panel', hookName, {
		'is-enabled': isEnabled,
	} );
};
