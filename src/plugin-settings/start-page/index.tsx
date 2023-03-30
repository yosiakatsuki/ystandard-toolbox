/**
 * WordPress
 */
import { render } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
/**
 * yStandard
 */
import PageBase from '@aktk/plugin-settings/components/page-base';
import featureList from './feature-list';
import GridItem from './grid-item';
/**
 * Page
 */
import './_index.scss';

const StartPage = () => {
	const sections = Object.keys( featureList );
	return (
		<PageBase title={ __( 'Toolbox機能', 'ystandard-toolbox' ) }>
			<div className="aktk-settings-start-page">
				{ sections.map( ( section ) => {
					const sectionTitle = featureList[ section ]?.title;
					const gridItems = featureList[ section ]?.items;
					return (
						<div
							key={ section }
							className="aktk-settings-start-page__section"
						>
							<h2>{ sectionTitle }</h2>
							<div className="aktk-settings-start-page__grid">
								{ gridItems.map( ( item ) => {
									return (
										<GridItem
											key={ item?.name }
											{ ...item }
										/>
									);
								} ) }
							</div>
						</div>
					);
				} ) }
			</div>
		</PageBase>
	);
};

render( <StartPage />, document.getElementById( 'ystdtb-settings-v2' ) );
