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
		<div className="text-base relative">
			<div className="bg-aktk-blue p-5">
				<div className="flex justify-between text-white items-end">
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
						'flex items-center justify-center absolute w-full z-10 top-0 left-0'
					}
					style={ loadingPanelStyle }
				>
					<div
						className={
							'opacity-80 bg-white z-10 absolute w-full h-full'
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
