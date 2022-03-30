import classnames from "classnames/dedupe";
/**
 * WordPress.
 */
import { hasBlockSupport, getBlockType } from '@wordpress/blocks';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
/**
 * yStandard.
 */
import { panelIcon } from '@ystd/components/ystandard-icon';

/**
 * Hook
 */
import { getPanelClassName, isEnableHook } from '../helper';
import hookAttributes from './attributes.json';
import ManualLink from "@ystd/components/manual-link";

const HOOK_NAME = 'hidden-by-size';

const addBlockAttributes = ( settings ) => {
	const isEnable = isEnableHook(
		settings.name,
		HOOK_NAME
	);
	if ( ! isEnable ) {
		return settings;
	}

	settings.attributes = {
		...settings.attributes,
		...hookAttributes,
	};
	return settings;
};

addFilter(
	'blocks.registerBlockType',
	'ystandard-toolbox/hidden-by-size/attributes',
	addBlockAttributes
);

const addBlockControl = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const { attributes, setAttributes, name } = props;

		const {
			ystdtbIsHiddenMobile,
			ystdtbIsHiddenTablet,
			ystdtbIsHiddenDesktop,
			className,
		} = attributes;

		const isEnable = isEnableHook( name, HOOK_NAME );
		if ( ! isEnable ) {
			return <BlockEdit { ...props } />;
		}

		if (
			'undefined' === typeof ystdtbIsHiddenMobile ||
			'undefined' === typeof ystdtbIsHiddenTablet ||
			'undefined' === typeof ystdtbIsHiddenDesktop
		) {
			return <BlockEdit { ...props } />;
		}

		const blockType = getBlockType( name );
		if ( ! blockType ) {
			return <BlockEdit { ...props } />;
		}

		if ( ! hasBlockSupport( blockType, 'customClassName', true ) ) {
			return <BlockEdit { ...props } />;
		}
		if ( ! hasBlockSupport( blockType, 'ystdtdHiddenBySize', true ) ) {
			return <BlockEdit { ...props } />;
		}

		const panelClassName = getPanelClassName(
			HOOK_NAME,
			ystdtbIsHiddenMobile || ystdtbIsHiddenTablet || ystdtbIsHiddenDesktop
		);

		const handleOnChangeIsHiddenMobile = ( value ) => {
			setAttributes( {
				ystdtbIsHiddenMobile: value,
				className: classnames( className, {
					'ystdtb-hidden-mobile': value,
				} ),
			} );
		};

		const handleOnChangeIsHiddenTablet = ( value ) => {
			setAttributes( {
				ystdtbIsHiddenTablet: value,
				className: classnames( className, {
					'ystdtb-hidden-tablet': value,
				} ),
			} );
		};

		const handleOnChangeIsHiddenDesktop = ( value ) => {
			setAttributes( {
				ystdtbIsHiddenDesktop: value,
				className: classnames( className, {
					'ystdtb-hidden-desktop': value,
				} ),
			} );
		};

		return (
			<>
				<BlockEdit { ...props } />

				<InspectorControls>
					<PanelBody
						title={ __(
							'非表示設定(画面サイズ)',
							'ystandard-toolbox'
						) }
						initialOpen={ false }
						icon={ panelIcon }
						className={ panelClassName }
					>
						<ManualLink path={ '/ystdtb-block-option-hidden-by-size/' } />
						<ToggleControl
							label={ __(
								'モバイルで非表示',
								'ystandard-toolbox'
							) }
							checked={ ystdtbIsHiddenMobile }
							onChange={ handleOnChangeIsHiddenMobile }
						/>

						<ToggleControl
							label={ __(
								'タブレットで非表示',
								'ystandard-toolbox'
							) }
							checked={ ystdtbIsHiddenTablet }
							onChange={ handleOnChangeIsHiddenTablet }
						/>

						<ToggleControl
							label={ __(
								'PCで非表示',
								'ystandard-toolbox'
							) }
							checked={ ystdtbIsHiddenDesktop }
							onChange={ handleOnChangeIsHiddenDesktop }
						/>
					</PanelBody>
				</InspectorControls>
			</>
		);
	};
}, 'withYstandardToolboxHiddenBySizeBlockEdit' );

addFilter(
	'editor.BlockEdit',
	'ystandard-toolbox/hidden-by-size/block-edit',
	addBlockControl,
	Number.MAX_SAFE_INTEGER
);
