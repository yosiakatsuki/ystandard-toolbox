import { __ } from '@wordpress/i18n';

import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';
import * as BlockOption from './inspector-controls';
import classnames from 'classnames';

const Parts = ( props ) => {
	const { attributes } = props;
	const { partsId } = attributes;

	const blockProps = useBlockProps( {
		className: classnames( 'ystdtb-parts', {
			'has-parts': !! partsId,
		} ),
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( '基本設定', 'ystandard-toolbox' ) }>
					<BlockOption.PartsId { ...props } />
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ !! partsId && (
					<div className="ystdtb-parts__edit-parts-preview">
						<ServerSideRender
							block="ystdtb/parts"
							attributes={ attributes }
						/>
					</div>
				) }
				{ ! partsId && (
					<div className="ystdtb-parts__edit-parts-select">
						<BlockOption.PartsId { ...props } />
					</div>
				) }
			</div>
		</>
	);
};
export default Parts;
