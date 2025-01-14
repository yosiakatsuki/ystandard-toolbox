import { CgSpinner } from 'react-icons/cg';
/**
 * WordPress
 */
import { useContext, useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
/**
 * Component.
 */
import { HeadingContext } from '../index';
import { StylePanel } from './panel';
import UpdateHeadingOption from '../update';
import Preview from '@aktk/plugin-settings/heading/app/preview';
import {
	AfterPanel,
	BeforePanel,
} from '@aktk/plugin-settings/heading/app/editor/panel/pseudo-elements';
import LevelSelect from '@aktk/plugin-settings/heading/app/style-select';

export function EditContainer() {
	// @ts-ignore
	const { selectedStyle } = useContext( HeadingContext );
	const [ showEditor, setShowEditor ] = useState( !! selectedStyle );
	const [ isLoading, setIsLoading ] = useState( false );

	// エディター表示の更新
	useEffect( () => {
		setShowEditor( false );
		setIsLoading( true );
		setTimeout( () => {
			setShowEditor( !! selectedStyle );
			setIsLoading( false );
		}, 300 );
	}, [ selectedStyle ] );

	return (
		<>
			<div
				className={
					'relative mt-5 min-h-[300px] border border-solid border-aktk-border-gray px-4 py-8'
				}
			>
				<h2 className={ 'mb-3 mt-0 font-bold text-aktk-text-gray' }>
					{ __( 'スタイル編集', 'ystandard-toolbox' ) }
				</h2>
				<LevelSelect />
				<>
					{ selectedStyle ? (
						<div className={ 'mt-4' }>
							{ isLoading && (
								<div
									className={
										'absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-90'
									}
								>
									<CgSpinner
										size={ 36 }
										className={ 'animate-spin' }
									/>
								</div>
							) }
							{ showEditor && (
								<div
									className={
										'grid grid-cols-1 gap-5 md:grid-cols-2'
									}
								>
									<div className={ 'relative w-full' }>
										<StylePanel />
										<BeforePanel />
										<AfterPanel />
										<UpdateHeadingOption />
									</div>
									<div
										className={
											'relative w-full md:border-0 md:border-l md:border-solid md:border-l-gray-200 md:pl-5'
										}
									>
										<div
											className={
												'sticky top-14 w-full pb-5'
											}
										>
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
							) }
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
