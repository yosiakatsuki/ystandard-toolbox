/**
 * WordPress
 */
import { useState, createRoot } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Aktk Components.
 */
import { ToastContainer } from '@aktk/components/toast-message';
/**
 * Plugin
 */
import AppContainer from '@aktk/plugin-settings/components/app-container';

/**
 * App
 */
import Migration from './migration';
import { getHeadingOptions } from './util/setting';
import HeadingApp from './app';

import './_edit.scss';

const HeadingCustomize = () => {
	const options = getHeadingOptions();
	const [ isLoading, setIsLoading ] = useState< boolean >( false );
	return (
		<>
			{ /* @ts-ignore */ }
			<AppContainer
				title={ __( '見出しデザイン編集', 'ystandard-toolbox' ) }
				loading={ isLoading }
			>
				{ options.isCompatible ? (
					<>
						{ /* 互換モードの場合、移行ツールを開く */ }
						<Migration />
					</>
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
