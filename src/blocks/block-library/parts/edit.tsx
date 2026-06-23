import classnames from 'classnames';
/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';

/*
 * Plugin Dependencies
 */
import type { PartsEditProps } from './types';
import * as BlockOption from './inspector-controls';
import EditorStyles from './editor-styles';
import './style-editor.scss';

/**
 * パーツブロックエディターコンポーネント
 *
 * @param {PartsEditProps} props - コンポーネントプロパティ
 */
const PartsEdit = ( props: PartsEditProps ) => {
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
						<EditorStyles />
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

export default PartsEdit;
