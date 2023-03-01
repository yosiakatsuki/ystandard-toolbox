import { render } from '@wordpress/element';

import Migration from './migration';
import PageBase from '@aktk/plugin-settings/components/page-base';
import { ToastContainer } from '@aktk/components/toast-message';
import { getHeadingOptions } from './util/setting';

const HeadingCustomize = () => {
	const options = getHeadingOptions();
	return (
		<>
			{ /* @ts-ignore */ }
			<PageBase title={ '見出しデザイン編集' } loading={ false }>
				{ options.isCompatible ? <Migration /> : <div>APP</div> }
				<ToastContainer />
			</PageBase>
		</>
	);
};

render( <HeadingCustomize />, document.getElementById( 'heading-v2' ) );
