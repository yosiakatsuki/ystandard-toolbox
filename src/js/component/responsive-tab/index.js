import classnames from 'classnames';
import { Monitor, Tablet, Smartphone } from 'react-feather';
import { TabPanel } from '@wordpress/components';

const ResponsiveTab = ( props ) => {

	const {
		label,
		activeClass,
		onSelect,
		children
	} = props;

	return (
		<div className="ystdtb-responsive-tab">
			{ ( !! label &&
				<div
					className={ classnames(
						'ystdtb-responsive-tab__label',
						{
							'is-bold': true
						}
					) }
				>
					{ label }
				</div>
			) }
			<TabPanel
				className={ "ystdtb-responsive-tab__panel" }
				activeClass={ activeClass }
				onSelect={ onSelect }
				tabs={ [
					{
						name: 'desktop',
						title: ( <Monitor/> ),
						className: classnames( 'ystdtb-responsive-tab__tab-button' )
					},
					{
						name: 'tablet',
						title: ( <Tablet/> ),
						className: classnames( 'ystdtb-responsive-tab__tab-button' )
					},
					{
						name: 'mobile',
						title: ( <Smartphone/> ),
						className: classnames( 'ystdtb-responsive-tab__tab-button' )
					},
				] }
			>
				{ children }
			</TabPanel>
		</div>
	);
}

export default ResponsiveTab;
