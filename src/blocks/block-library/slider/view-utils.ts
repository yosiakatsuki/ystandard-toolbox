import type { SwiperOptions } from 'swiper/types';

export type SliderRuntimeSettings = {
	breakpoints?: {
		tablet?: number;
		desktop?: number;
	};
};

const KNOWN_TABLET_BREAKPOINTS = [ 640, 600 ];
const KNOWN_DESKTOP_BREAKPOINTS = [ 1024, 769 ];

/**
 * PHP側のブレークポイント設定に合わせてSwiperオプションを補正.
 *
 * @param options  Swiperオプション
 * @param settings runtime設定
 */
export function normalizeSliderOptions(
	options: SwiperOptions,
	settings?: SliderRuntimeSettings
): SwiperOptions {
	const runtimeBreakpoints = settings?.breakpoints;
	if ( ! runtimeBreakpoints || ! options.breakpoints ) {
		return options;
	}

	return {
		...options,
		breakpoints: normalizeBreakpoints(
			options.breakpoints,
			runtimeBreakpoints
		),
	};
}

/**
 * 保存済みの既知ブレークポイントキーをruntime設定に差し替える.
 *
 * @param breakpoints        Swiper breakpoint設定
 * @param runtimeBreakpoints runtime breakpoint設定
 */
function normalizeBreakpoints(
	breakpoints: NonNullable< SwiperOptions[ 'breakpoints' ] >,
	runtimeBreakpoints: NonNullable< SliderRuntimeSettings[ 'breakpoints' ] >
) {
	const normalized = { ...breakpoints };

	moveBreakpoint(
		normalized,
		KNOWN_TABLET_BREAKPOINTS,
		runtimeBreakpoints.tablet
	);
	moveBreakpoint(
		normalized,
		KNOWN_DESKTOP_BREAKPOINTS,
		runtimeBreakpoints.desktop
	);

	return normalized;
}

/**
 * breakpointキーを差し替える.
 *
 * @param breakpoints breakpoint設定
 * @param knownKeys   既知の保存済みキー
 * @param targetKey   runtime側のキー
 */
function moveBreakpoint(
	breakpoints: NonNullable< SwiperOptions[ 'breakpoints' ] >,
	knownKeys: number[],
	targetKey?: number
) {
	if ( ! targetKey ) {
		return;
	}

	const target = `${ targetKey }`;
	const source = [ target, ...knownKeys.map( ( key ) => `${ key }` ) ].find(
		( key ) => Object.prototype.hasOwnProperty.call( breakpoints, key )
	);
	if ( ! source ) {
		return;
	}

	breakpoints[ target ] = breakpoints[ source ];
	knownKeys.forEach( ( key ) => {
		const sourceKey = `${ key }`;
		if ( sourceKey !== target ) {
			delete breakpoints[ sourceKey ];
		}
	} );
}
