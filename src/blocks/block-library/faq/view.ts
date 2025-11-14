/**
 * FAQブロック フロントエンド用JavaScript
 * アコーディオン機能の実装
 */
document.addEventListener( 'DOMContentLoaded', () => {
	// アコーディオン形式のFAQブロック内のQ要素を取得
	const faqQuestions = document.querySelectorAll<HTMLElement>(
		'.ystdtb-faq.is-accordion .is-faq--q'
	);

	// 各Q要素にクリックイベントを設定
	faqQuestions.forEach( ( element ) => {
		element.addEventListener( 'click', () => {
			// is-openクラスをトグル
			element.classList.toggle( 'is-open' );
		} );
	} );
} );
