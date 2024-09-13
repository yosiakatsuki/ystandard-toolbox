import { useContext } from '@wordpress/element';
/**
 * Component.
 */
import { HeadingContext } from '../index';
import PreviewStyle from '@aktk/plugin-settings/heading/app/preview/preview-style';

const PREVIEW_ELEMENT_ID = 'ystdtb-setting-heading__preview-text';

export default function Preview() {
	// @ts-ignore
	const { previewText, headingOption } = useContext( HeadingContext );
	// eslint-disable-next-line no-console
	console.log( { PreviewStyles: headingOption } );
	return (
		<div>
			<PreviewStyle
				style={ { ...headingOption?.style } }
				before={ { ...headingOption?.before } }
				after={ { ...headingOption?.after } }
			/>
			<div className={ '-m-px p-px' }>
				<div id={ PREVIEW_ELEMENT_ID } className={ PREVIEW_ELEMENT_ID }>
					{ previewText }
				</div>
			</div>
		</div>
	);
}
