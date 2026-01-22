import { Grid, Columns } from 'react-feather';
/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
/**
 * Block dependencies.
 */
import type { previewType, SliderEditProps } from '../types';

export function PreviewType( props: SliderEditProps ) {
	const { attributes, setAttributes } = props;
	const { previewType = 'grid' } = attributes;

	const handleOnClick = ( value: previewType ) => {
		setAttributes( { previewType: value } );
	};

	return (
		<ToolbarGroup className="ystdtb-slider-edit__block-control-preview-type">
			<ToolbarButton
				icon={ <Grid /> }
				title={ __( 'プレビュー:グリッド', 'ystandard-toolbox' ) }
				onClick={ () => {
					handleOnClick( 'grid' );
				} }
				isActive={ 'grid' === previewType }
			/>
			<ToolbarButton
				icon={ <Columns /> }
				title={ __( 'プレビュー:横並び', 'ystandard-toolbox' ) }
				onClick={ () => {
					handleOnClick( 'horizontal' );
				} }
				isActive={ 'horizontal' === previewType }
			/>
		</ToolbarGroup>
	);
}
