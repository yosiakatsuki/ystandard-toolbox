import { Fragment } from '@wordpress/element';
import { Book, Settings, Zap } from 'react-feather';

/* WordPress Dependencies */
import { __ } from '@wordpress/i18n';

/* Plugin Dependencies */
import { getSettingPageUrl } from '../function/url';
import { getAdminConfig } from '../function/config';

export default function GridItem( {
	name,
	icon,
	description,
	manual,
	settingPage,
	requireYStandard,
} ) {
	const isYStandard = getAdminConfig( 'isYStandard', false );
	const showSettingPage =
		!! settingPage && ( ! requireYStandard || isYStandard );

	return (
		<div
			className={ `aktk-settings-start-page__grid-item${
				requireYStandard && ! isYStandard
					? ' aktk-settings-start-page__grid-item--disabled'
					: ''
			}` }
		>
			{ requireYStandard && (
				<span className="aktk-settings-start-page__badge-ystandard">
					<Zap />
					{ __( 'yStandard連携', 'ystandard-toolbox' ) }
				</span>
			) }
			<h3>{ name }</h3>
			{ icon && (
				<div className="flex justify-center text-4xl text-aktk-blue">
					{ icon() }
				</div>
			) }
			<div className="aktk-settings-start-page__grid-text">
				{ description.split( /<br\s*\/?>/ ).map( ( text, i, arr ) => (
					<Fragment key={ i }>
						{ text }
						{ i < arr.length - 1 && <br /> }
					</Fragment>
				) ) }
			</div>
			<div className="aktk-settings-start-page__grid-buttons">
				{ !! manual && (
					<a
						href={ manual }
						target={ '_blank' }
						rel={ 'noreferrer noopener nofollow' }
					>
						<Book />
						{ __( 'マニュアル', 'ystandard-toolbox' ) }
					</a>
				) }
				{ showSettingPage && (
					<a href={ getSettingPageUrl( settingPage ) }>
						<Settings />
						{ __( '設定画面', 'ystandard-toolbox' ) }
					</a>
				) }
			</div>
		</div>
	);
}
