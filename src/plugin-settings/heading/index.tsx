import { useState, createRoot } from '@wordpress/element';

import Migration from './migration';
import { ToastContainer } from '@aktk/components/toast-message';
import { getHeadingOptions } from './util/setting';
import HeadingApp from './app';
import AppContainer from '@aktk/plugin-settings/components/app-container';

import './_edit.scss';

const HeadingCustomize = () => {
	const options = getHeadingOptions();
	const [ isLoading, setIsLoading ] = useState< boolean >( false );
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

const container = document.getElementById( 'heading-v2' );
const root = createRoot( container! );
root.render( <HeadingCustomize /> );
