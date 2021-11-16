import classnames from 'classnames';
import { Monitor, Tablet, Smartphone } from 'react-feather';
import { TabPanel } from '@wordpress/components';

export const tabType = {
	desktop: 'desktop',
	tablet: 'tablet',
	mobile: 'mobile',
};

const ResponsiveTab = ( { label, activeClass, onSelect, children } ) => {
	return (
		<div className="ystdtb-responsive-tab">
			{ !! label && (
				<div className={ classnames( 'ystdtb-responsive-tab__label' ) }>
					{ label }
				</div>
			) }
			<TabPanel
				className={ 'ystdtb-responsive-tab__panel' }
				activeClass={ activeClass }
				onSelect={ onSelect }
				tabs={ [
					{
						name: tabType.desktop,
						title: <Monitor />,
						className: classnames(
							'ystdtb-responsive-tab__tab-button'
						),
					},
					{
						name: tabType.tablet,
						title: <Tablet />,
						className: classnames(
							'ystdtb-responsive-tab__tab-button'
						),
					},
					{
						name: tabType.mobile,
						title: <Smartphone />,
						className: classnames(
							'ystdtb-responsive-tab__tab-button'
						),
					},
				] }
			>
				{ children }
			</TabPanel>
		</div>
	);
};

export default ResponsiveTab;
