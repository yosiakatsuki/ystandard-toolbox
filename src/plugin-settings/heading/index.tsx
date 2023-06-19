import { render, useState } from '@wordpress/element';

import Migration from './migration';
import { ToastContainer } from '@aktk/components/toast-message';
import { getHeadingOptions } from './util/setting';
import HeadingApp from './app';
import AppContainer from '@aktk/plugin-settings/components/app-container';

import './_edit.scss';

const HeadingCustomize = () => {
	const options = getHeadingOptions();
	const [ isLoading, setIsLoading ] = useState< boolean >( false );
	options.isCompatible = true;
	return (
		<>
			{ /* @ts-ignore */ }
			<AppContainer title={ '見出しデザイン編集' } loading={ isLoading }>
				{ options.isCompatible ? (
					<Migration />
				) : (
					<HeadingApp setIsLoading={ setIsLoading } />
				) }
				<ToastContainer />
			</AppContainer>
		</>
	);
};

render( <HeadingCustomize />, document.getElementById( 'heading-v2' ) );
