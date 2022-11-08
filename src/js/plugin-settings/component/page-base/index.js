import classnames from 'classnames';
import { Spinner } from '@wordpress/components';
import { useMemo } from '@wordpress/element';

import ManualLink from '@aktk/components/manual-link';
import './_index.scss';

const PageBase = ( { title, manual, loading = false, children } ) => {
	const isLoading = useMemo( () => {
		return loading;
	}, [ loading ] );
	const loadingPanelProps = {
		className: classnames( 'aktk-settings__base-loading-panel', {
			'is-loading': isLoading,
		} ),
	};
	return (
		<div className="aktk-settings__base">
			<div className="aktk-settings__header">
				<h1 className="aktk-settings__title">{ title }</h1>
				<div className="aktk-settings__header-sub">
					{ manual && <ManualLink path={ manual } /> }
					<div className="aktk-settings__brand">
						yStandard Toolbox
					</div>
				</div>
			</div>
			<div className="aktk-settings__content">{ children }</div>
			<div { ...loadingPanelProps }>
				<Spinner />
			</div>
		</div>
	);
};

export default PageBase;
