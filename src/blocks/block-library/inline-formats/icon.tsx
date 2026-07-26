/**
 * アイコン - インラインフォーマット共通
 */

/* Plugin Dependencies */
import { YsIconPaths } from '@aktk/components/ystandard-icon';

/**
 * ysマークの切り抜き用マスクID
 */
const YS_MASK_ID = 'ystdtb-inline-format-icon-mask';

/**
 * Toolboxマークの拡大率(高さ 42.34 -> 23)
 */
const TOOLBOX_SCALE = 0.5432;

/**
 * ysマークの配置(幅 22.34 -> 11 でアイコン右下に配置)
 */
const YS_TRANSFORM = 'translate(12.22 13.61) scale(0.4924)';

/**
 * インラインフォーマット用アイコン
 *
 * yStandard Toolboxのマークの右下に、yStandardのysマークを重ねたアイコン.
 * 重なる部分はマスクでToolboxマーク側を抜き、ysマークの周囲に余白を作る.
 *
 * @return インラインフォーマット用アイコン.
 */
export function InlineFormatIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="24"
			height="24"
			fill="currentColor"
			role="img"
			focusable="false"
			aria-hidden="true"
			data-icon-name="ystdtb-inline-format-icon"
		>
			<mask
				id={ YS_MASK_ID }
				maskUnits="userSpaceOnUse"
				x="0"
				y="0"
				width="24"
				height="24"
			>
				<rect width="24" height="24" fill="#fff" />
				{ /* 太いstrokeでysマークを膨らませ、字形に沿った余白を抜く */ }
				<g
					transform={ YS_TRANSFORM }
					fill="#000"
					stroke="#000"
					strokeWidth="2.6"
					strokeLinejoin="round"
				>
					<YsIconPaths />
				</g>
			</mask>
			{ /* Toolboxマーク(assets/menu/toolbox.svg).
			     maskは変換後の座標系で解釈されるため、拡大は内側のgで行う */ }
			<g mask={ `url(#${ YS_MASK_ID })` }>
				<g transform={ `scale(${ TOOLBOX_SCALE })` }>
					<path d="M19.35,42.34A3,3,0,0,1,17.94,42L1.47,32.83A2.91,2.91,0,0,1,0,30.34V12.07A2.92,2.92,0,0,1,1.46,9.58L17.93.35h0a3,3,0,0,1,2.82,0L37.24,9.58a2.94,2.94,0,0,1,1.46,2.49V30.34a3,3,0,0,1-1.47,2.5L20.76,42A3,3,0,0,1,19.35,42.34ZM4,29.67l15.35,8.52L34.7,29.67V12.74L19.35,4.15,4,12.74Zm31.29-.33h0Zm-31.89,0h0ZM19.89,3.84h0Z" />
					<path d="M19.35,31.77A10.61,10.61,0,1,1,30,21.17,10.61,10.61,0,0,1,19.35,31.77Zm0-17.21A6.61,6.61,0,1,0,26,21.17,6.62,6.62,0,0,0,19.35,14.56Z" />
				</g>
			</g>
			{ /* ysマーク */ }
			<g transform={ YS_TRANSFORM }>
				<YsIconPaths />
			</g>
		</svg>
	);
}
