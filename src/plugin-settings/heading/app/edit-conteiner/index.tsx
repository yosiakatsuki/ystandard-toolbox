/**
 * WordPress
 */
import { useContext } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
/**
 * Component.
 */
import { HeadingContext } from '../index';
import Preview from '@aktk/plugin-settings/heading/app/preview';

export default function EditContainer() {
	// @ts-ignore
	const { selectedStyle } = useContext( HeadingContext );
	return (
		<>
			<div className={ 'border border-slate-400 p-3 mt-5' }>
				<h2 className={ 'font-bold text-slate-500 mb-3' }>
					{ __( 'スタイル編集', 'ystandard-toolbox' ) }
				</h2>
				<>
					{ selectedStyle ? (
						<div
							className={
								'flex flex-col-reverse md:flex-row gap-5'
							}
						>
							<div className={ 'w-full relative' }>
								えでぃっと
							</div>
							<div className={ 'w-full relative' }>
								<div className={ 'pb-5 sticky top-5 w-full' }>
									<div className={ 'font-bold mb-3' }>
										プレビュー
									</div>
									<Preview />
								</div>
							</div>
						</div>
					) : (
						<p className={ 'text-gray-400 text-xs' }>
							{ __(
								'スタイルを選択してください。',
								'ystandard-toolbox'
							) }
						</p>
					) }
				</>
			</div>
		</>
	);
}
