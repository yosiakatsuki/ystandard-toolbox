/**
 * アイコン - インラインフォーマット共通
 */

/* Plugin Dependencies */
import { YsIconPaths } from '@aktk/components/ystandard-icon';

/**
 * インラインフォーマット用アイコン
 *
 * 左上に管理画面メニューと同じ yStandard Toolbox のマーク、
 * 右下に yStandard の ys マークを組み合わせたアイコン.
 * Toolboxマークは六角形で右下が空くため、ysマークと重ならずに収まる.
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
			{ /* Toolboxマーク(assets/menu/toolbox.svg): 高さ42.34 -> 18 に縮小 */ }
			<g transform="scale(0.4251)">
				<path d="M19.35,42.34A3,3,0,0,1,17.94,42L1.47,32.83A2.91,2.91,0,0,1,0,30.34V12.07A2.92,2.92,0,0,1,1.46,9.58L17.93.35h0a3,3,0,0,1,2.82,0L37.24,9.58a2.94,2.94,0,0,1,1.46,2.49V30.34a3,3,0,0,1-1.47,2.5L20.76,42A3,3,0,0,1,19.35,42.34ZM4,29.67l15.35,8.52L34.7,29.67V12.74L19.35,4.15,4,12.74Zm31.29-.33h0Zm-31.89,0h0ZM19.89,3.84h0Z" />
				<path d="M19.35,31.77A10.61,10.61,0,1,1,30,21.17,10.61,10.61,0,0,1,19.35,31.77Zm0-17.21A6.61,6.61,0,1,0,26,21.17,6.62,6.62,0,0,0,19.35,14.56Z" />
			</g>
			{ /* ysマーク: 幅11.2でアイコン右下に配置 */ }
			<g transform="translate(12.11 13.53) scale(0.5013)">
				<YsIconPaths />
			</g>
		</svg>
	);
}
