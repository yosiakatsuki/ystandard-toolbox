/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import { Panel } from '@aktk/block-components/components/panel';
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import Button from '@aktk/block-components/wp-controls/button';

/**
 * Plugin Dependencies
 */
import { designPreset } from '../../utils';

// @ts-ignore.
export function Design( props ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { faqType } = attributes;
	const applyPreset = ( preset: ( typeof designPreset )[ 0 ] ) => {
		setAttributes( {
			...preset.attributes,
			accordionArrowColor: preset.attributes.labelColor,
		} );
	};
	return (
		<Panel title={ __( 'デザインサンプル', 'ystandard-toolbox' ) }>
			<BaseControl>
				<div className="grid grid-cols-1 gap-4">
					{ designPreset.map( ( item ) => (
						<Button
							key={ item.name }
							className="!h-auto shadow"
							onClick={ () => applyPreset( item ) }
						>
							<span
								className="flex w-full items-center py-2"
								style={ {
									...item.itemStyles,
								} }
							>
								<span
									className="mr-4 uppercase"
									style={ {
										...item.labelStyles,
									} }
								>
									{ faqType }
								</span>
								<span className="grow text-left text-[#222]">
									FAQ FAQ FAQ...
								</span>
							</span>
						</Button>
					) ) }
				</div>
			</BaseControl>
		</Panel>
	);
}
