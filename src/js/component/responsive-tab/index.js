import classnames from 'classnames';
import { Monitor, Tablet, Smartphone } from 'react-feather';
import { TabPanel } from '@wordpress/components';

export const tabType = {
	desktop: 'desktop',
	tablet: 'tablet',
	mobile: 'mobile',
};

const ResponsiveTab = ( {
	label,
	activeClass,
	onSelect,
	children,
	hasDesktop = true,
	hasTablet = true,
	hasMobile = true,
} ) => {
	let tabs = [];
	if ( hasDesktop ) {
		tabs = [
			...tabs,
			...[
				{
					name: tabType.desktop,
					title: <Monitor />,
					className: classnames(
						'ystdtb-responsive-tab__tab-button'
					),
				},
			],
		];
	}
	if ( hasTablet ) {
		tabs = [
			...tabs,
			...[
				{
					name: tabType.tablet,
					title: <Tablet />,
					className: classnames(
						'ystdtb-responsive-tab__tab-button'
					),
				},
			],
		];
	}
	if ( hasMobile ) {
		tabs = [
			...tabs,
			...[
				{
					name: tabType.mobile,
					title: <Smartphone />,
					className: classnames(
						'ystdtb-responsive-tab__tab-button'
					),
				},
			],
		];
	}
	return (
		<div className="ystdtb-responsive-tab">
			{ !! label && (
				<div className={ classnames( 'ystdtb-responsive-tab__label' ) }>
					{ label }
				</div>
			) }
			<TabPanel
				className={ classnames( 'ystdtb-responsive-tab__panel', {
					'has-label': !! label,
				} ) }
				activeClass={ activeClass }
				onSelect={ onSelect }
				tabs={ tabs }
			>
				{ children }
			</TabPanel>
		</div>
	);
};

export default ResponsiveTab;
