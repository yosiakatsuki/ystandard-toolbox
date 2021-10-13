import { useMemo } from '@wordpress/element';
import { transformStyles } from '@wordpress/block-editor';
import { getBlockConfig } from '@ystdtb/helper/blockConfig';

export default function EditorStyles() {
	const styles = getBlockConfig( 'partsPreviewStyles', [] );
	const transformedStyles = useMemo(
		() => transformStyles( styles, '.ystdtb-parts' ),
		[ styles ]
	);

	return (
		<>
			{ transformedStyles.map( ( css, index ) => (
				<style key={ index }>{ css }</style>
			) ) }
		</>
	);
}
