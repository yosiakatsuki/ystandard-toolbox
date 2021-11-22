import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Grid } from 'react-feather';

const PreviewType = ( { attributes, setAttributes } ) => {
	const { previewType } = attributes;
	const handleOnClick = () => {
		const type = 'grid' === previewType ? 'horizontal' : 'grid';
		setAttributes( { previewType: type } );
	};

	return (
		<ToolbarGroup>
			<ToolbarButton
				name="preview-type"
				icon={ <Grid /> }
				title={ __( 'プレビュー', 'ystandard-toolbox' ) }
				onClick={ handleOnClick }
				isActive={ 'grid' === ( previewType || 'grid' ) }
			/>
		</ToolbarGroup>
	);
};
export default PreviewType;
