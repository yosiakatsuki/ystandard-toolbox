import { Book, Settings } from 'react-feather';

/**
 * yStandard
 */
import { getSettingPageUrl } from '../function/url';

const GridItem = ( { name, icon, description, manual, settingPage } ) => {
	return (
		<div className="ystdtb-settings-start-page__grid-item">
			<h3>{ name }</h3>
			{ icon && (
				<div className="ystdtb-settings-start-page__grid-icon">
					{ icon() }
				</div>
			) }
			<div className="ystdtb-settings-start-page__grid-text">
				{ description }
			</div>
			<div className="ystdtb-settings-start-page__grid-buttons">
				<a
					href={ manual }
					target={ '_blank' }
					rel={ 'noreferrer noopener nofollow' }
				>
					<Book />
					マニュアル
				</a>
				{ !! settingPage && (
					<a href={ getSettingPageUrl( settingPage ) }>
						<Settings />
						設定画面
					</a>
				) }
			</div>
		</div>
	);
};
export default GridItem;
