document.addEventListener( 'DOMContentLoaded', () => {
	const faq = document.querySelectorAll(
		'.ystdtb-faq.is-accordion .is-faq--q'
	);
	const faqItems = Array.prototype.slice.call( faq, 0 );
	if ( faqItems ) {
		faqItems.forEach( ( element ) => {
			element.addEventListener( 'click', () => {
				element.classList.toggle( 'is-open' );
			} );
		} );
	}
} );
