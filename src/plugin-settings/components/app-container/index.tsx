/**
 * WordPress.
 */
import { Spinner } from '@wordpress/components';
/**
 * Plugin.
 */
import ManualLink from '@aktk/components/manual-link';
/**
 * Component.
 */
import './_edit.scss';

export interface AppContainerProps {
	title: string;
	children: React.ReactNode;
	manual?: string;
	loading?: boolean;
}

export default function AppContainer( props: AppContainerProps ) {
	const { title, children, manual, loading = false } = props;
	const loadingPanelStyle = {
		height: 'calc(100vh - var(--wp-admin--admin-bar--height, 32px))',
	};
	return (
		<div className="relative text-base">
			<div className="bg-aktk-blue p-5">
				<div className="ystdtb-app-container__title flex items-end justify-between text-white">
					<h1 className="text-2xl text-white">
						<span className="font-bold">{ title }</span>
					</h1>
					<div className="">
						{ manual && <ManualLink path={ manual } /> }
						<div className="font-orbitron text-sm">
							yStandard Toolbox
						</div>
					</div>
				</div>
			</div>
			<div className={ 'px-5 py-8' }>{ children }</div>
			{ loading && (
				<div
					className={
						'absolute left-0 top-0 z-10 flex w-full items-center justify-center'
					}
					style={ loadingPanelStyle }
				>
					<div
						className={
							'absolute z-10 size-full bg-white opacity-80'
						}
					/>
					<div className={ 'relative z-20' }>
						{ /* @ts-ignore */ }
						<Spinner className={ 'scale-150' } />
					</div>
				</div>
			) }
		</div>
	);
}
