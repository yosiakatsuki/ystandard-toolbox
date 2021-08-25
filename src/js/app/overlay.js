window.ysOverlayTimer = null;
// eslint-disable-next-line @wordpress/no-global-event-listener
document.addEventListener( 'DOMContentLoaded', () => {
	const bodyClasses = document.body.classList;
	if ( bodyClasses.contains( 'has-fixed-header' ) ) {
		const header = document.getElementById( 'masthead' );
		if ( header ) {
			if ( bodyClasses.contains( 'is-overlay' ) ) {
				// eslint-disable-next-line @wordpress/no-global-event-listener
				document.addEventListener(
					'scroll',
					() => {
						clearTimeout( window.ysOverlayTimer );
						window.ysOverlayTimer = setTimeout( function () {
							if ( window.scrollY > header.getBoundingClientRect().height ) {
								bodyClasses.remove( 'is-transparent' );
							} else if (
								! bodyClasses.contains(
									'is-transparent'
								)
							) {
								bodyClasses.add( 'is-transparent' );
							}
						}, 1000 / 60 );
					},
					{ passive: true }
				);
			} else {
				if ( ! bodyClasses.contains( 'disable-auto-padding' ) ) {
					document.body.style.paddingTop = `${ header.getBoundingClientRect().height }px`;
				}
			}
		}
	}
} );
