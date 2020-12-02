window.overlayTimer = null;

document.addEventListener( 'DOMContentLoaded', () => {
	const header = document.getElementById( 'masthead' );
	if ( document.body.classList.contains( 'has-fixed-header' ) ) {
		if ( document.body.classList.contains( 'is-overlay' ) ) {
			document.addEventListener( 'scroll', () => {
				clearTimeout( window.overlayTimer );
				window.overlayTimer = setTimeout( function () {
					const header = document.getElementById( 'masthead' );
					if ( window.scrollY > header.offsetHeight ) {
						document.body.classList.remove( 'is-transparent' );
					} else {
						if ( ! document.body.classList.contains( 'is-transparent' ) ) {
							document.body.classList.add( 'is-transparent' );
						}
					}
				}, ( 1000 / 60 ) );
			}, { passive: true } );
		} else {
			document.body.style.paddingTop = `${ header.offsetHeight }px`;
		}
	}
} );
