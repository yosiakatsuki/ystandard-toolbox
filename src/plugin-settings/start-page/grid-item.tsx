import { Book, Settings } from 'react-feather';

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
		<div className="aktk-settings-start-page__grid-item">
			<div className="aktk-settings-start-page__grid-heading">
				<h3>{ name }</h3>
				{ requireYStandard && (
					<span className="aktk-settings-start-page__badge-ystandard">
						{ __( 'yStandard連携', 'ystandard-toolbox' ) }
					</span>
				) }
			</div>
			{ icon && (
				<div className="flex justify-center text-4xl text-aktk-blue">
					{ icon() }
				</div>
			) }
			<div className="aktk-settings-start-page__grid-text">
				{ description }
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
};

