import { useContext } from '@wordpress/element';
/**
 * Component.
 */
import { HeadingContext } from '../index';
import PreviewStyle from '@aktk/plugin-settings/heading/app/preview/preview-style';

export default function Preview() {
	// @ts-ignore
	const { previewText, headingOption } = useContext( HeadingContext );

	console.log( { headingOption } );
	return (
		<div className={ 'sticky top-[3em]' }>
			<PreviewStyle
				style={ headingOption?.style }
				before={ headingOption?.before }
				after={ headingOption?.after }
			/>
			<div>
				<div className={ 'ystdtb-setting-heading__preview-text' }>
					{ previewText }
				</div>
			</div>
		</div>
	);
}
