document.addEventListener( 'DOMContentLoaded', () => {
	const faq = document.querySelectorAll( '.ystdtb-faq.is-accordion .is-faq--q' );
	if ( faq ) {
		faq.forEach( ( element ) => {
			element.addEventListener( 'click', () => {
				element.classList.toggle( 'is-open' );
			} );
		} );
	}
} );
