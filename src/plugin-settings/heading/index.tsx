import { render, useState } from '@wordpress/element';

import Migration from './migration';
import PageBase from '@aktk/plugin-settings/components/page-base';
import Buttons from '@aktk/plugin-settings/components/buttons';
import { ToastContainer } from '@aktk/components/toast-message';
import { getHeadingOptions } from './util/setting';

const HeadingCustomize = () => {
	const [ isLoading, setIsLoading ] = useState( false );
	const options = getHeadingOptions();
	return (
		<PageBase title={ '見出しデザイン編集' } loading={ isLoading }>
			{ options.isCompatible ? <Migration /> : <div>APP</div> }
			<ToastContainer />
		</PageBase>
	);
};

render( <HeadingCustomize />, document.getElementById( 'heading-v2' ) );
