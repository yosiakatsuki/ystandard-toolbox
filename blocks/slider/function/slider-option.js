import { parseObject, parseObjectAll } from "@ystdtb/helper/object";

const secToMs = ( value, defaultValue = undefined ) => {
	if ( ! value || Number.isNaN( parseFloat( value ) ) ) {
		return defaultValue;
	}

	return parseFloat( value ) * 1000;
}

export const hasSliderSetting = ( attributes ) => {
	const list = [ 'slide', 'coverflow' ];
	const effect = list.includes( attributes?.effect ?? 'slide' );
	const loop = false === attributes?.loop;
	return effect && loop;
}

export const getSliderOptions = ( attributes ) => {

	let options = {};

	const addOptions = ( name, value, defaultValue = undefined ) => {
		if ( undefined === value && undefined === defaultValue ) {
			return;
		}
		options = {
			...options,
			[ name ]: value ?? defaultValue,
		}
	}
	/**
	 * 基本設定
	 */
	// エフェクト.
	addOptions( 'effect', attributes?.effect );
	// 速さ.
	addOptions( 'speed', secToMs( attributes?.speed, 300 ) );
	// ループ再生.
	addOptions( 'loop', attributes?.loop, true );
	/**
	 * オートプレイ
	 */
	// 自動再生.
	if ( false !== attributes?.autoplay ) {
		const autoplayOptions = {
			delay: secToMs( attributes?.autoplayDelay || 3, 3000 ),
			pauseOnMouseEnter: attributes?.autoplayPauseOnMouse || undefined,
			disableOnInteraction: true === attributes?.autoplayDisableOnInteraction ? undefined : attributes?.autoplayDisableOnInteraction,
		};
		addOptions( 'autoplay', autoplayOptions );
	}


	return JSON.stringify( options );
}
