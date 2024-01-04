import classnames from 'classnames';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { blockClassName } from './config';

export default function save( { attributes } ) {
	const { content } = attributes;

	const listClassName = classnames( blockClassName );

	return (
		<RichText.Content
			{ ...useBlockProps.save( {
				className: listClassName,
			} ) }
			tagName="li"
			value={ content }
		/>
	);
}
