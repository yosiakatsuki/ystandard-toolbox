import classnames from 'classnames';
/**
 * WordPress dependencies.
 */
import {
	RichText,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Block Dependencies.
 */
import { blockClassName } from './index';

// @ts-ignore.
function Edit( props ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { content } = attributes;
	const blockProps = useBlockProps( {
		className: classnames( blockClassName ),
	} );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		renderAppender: false,
		__unstableDisableDropZone: true,
	} );

	return (
		<>
			<li { ...innerBlocksProps }>
				<RichText
					identifier="content"
					tagName="div"
					onChange={ ( nextContent ) =>
						setAttributes( { content: nextContent } )
					}
					value={ content }
					placeholder={ __( 'テキストを入力…', 'ystandard-toolbox' ) }
					aria-label={ __( 'List text' ) }
				/>
				{ innerBlocksProps.children }
			</li>
		</>
	);
}

export default Edit;
