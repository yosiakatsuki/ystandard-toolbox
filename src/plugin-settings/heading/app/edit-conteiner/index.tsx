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
import Editor from './editor';

export default function EditContainer() {
	// @ts-ignore
	const { selectedStyle } = useContext( HeadingContext );
	return (
		<>
			<div
				className={
					'mt-5 border border-solid border-aktk-border-gray px-4 py-8'
				}
			>
				<h2 className={ 'mb-3 mt-0 font-bold text-aktk-text-gray' }>
					{ __( 'スタイル編集', 'ystandard-toolbox' ) }
				</h2>
				<>
					{ selectedStyle ? (
						<div
							className={
								'grid grid-cols-1 gap-5 md:grid-cols-2'
							}
						>
							<div className={ 'relative w-full' }>
								<Editor />
							</div>
							<div
								className={
									'relative w-full md:border-0 md:border-l md:border-solid md:border-l-gray-200 md:pl-5'
								}
							>
								<div className={ 'sticky top-5 w-full pb-5' }>
									<div
										className={
											'mb-3 font-bold text-aktk-text-gray'
										}
									>
										プレビュー
									</div>
									<Preview />
								</div>
							</div>
						</div>
					) : (
						<p className={ 'text-xs text-aktk-text-gray' }>
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
