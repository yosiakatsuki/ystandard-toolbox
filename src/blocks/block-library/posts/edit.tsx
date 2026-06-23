/**
 * WordPress Dependencies.
 */
import { useBlockProps } from '@wordpress/block-editor';
import { Disabled } from '@wordpress/components';
// @ts-ignore
import ServerSideRender from '@wordpress/server-side-render';

/**
 * Block dependencies.
 */
import type { PostsEditProps } from './types';
import { InspectorControls } from './inspector-controls';
import './style-editor.css';

export default function Edit( props: PostsEditProps ) {
	const { attributes } = props;
	const blockProps = useBlockProps( { className: 'ystdtb-posts' } );

	return (
		<>
			<InspectorControls { ...props } />
			<div { ...blockProps }>
				<Disabled>
					<ServerSideRender
						block="ystdtb/posts"
						attributes={ attributes }
					/>
				</Disabled>
			</div>
		</>
	);
}
