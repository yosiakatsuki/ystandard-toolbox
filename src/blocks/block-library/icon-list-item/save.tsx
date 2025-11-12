/**
 * WordPress dependencies.
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
/**
 * Block dependencies.
 */
import { blockClassName } from './index';

// @ts-ignore.
function Save( { attributes } ): JSX.Element {
	const { content } = attributes;
	return (
		<RichText.Content
			{ ...useBlockProps.save( {
				className: blockClassName,
			} ) }
			tagName="li"
			value={ content }
		/>
	);
}

export default Save;
