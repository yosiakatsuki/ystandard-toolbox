// widget accordion/
// eslint-disable-next-line @wordpress/no-global-event-listener
document.addEventListener( 'DOMContentLoaded', () => {
	const list = [ '.children', '.sub-menu' ];
	list.forEach( ( target ) => {
		const children = document.querySelectorAll(
			'.ystdtb-is-accordion ' + target
		);
		const data = Array.prototype.slice.call( children, 0 );
		const classOpen = 'is-open';
		data.forEach( ( el ) => {
			const button = document.createElement( 'button' );
			button.classList.add( 'ystdtb-accordion__toggle' );
			button.setAttribute( 'type', 'button' );
			const text = document.createElement( 'span' );
			text.classList.add( 'screen-reader-text' );
			text.textContent = 'open';
			button.appendChild( text );

			button.addEventListener( 'click', ( e ) => {
				e.preventDefault();
				const childrenElement = e.target.nextElementSibling;
				let childrenHeight = 0;
				let buttonText = 'open';
				if ( ! e.target.classList.contains( classOpen ) ) {
					const childList = Array.prototype.slice.call(
						childrenElement.childNodes,
						0
					);
					let height = 0;
					childList.forEach( ( childElement ) => {
						if ( childElement.clientHeight ) {
							height += childElement.clientHeight;
						}
					} );
					childrenHeight = `${ height }px`;
					buttonText = 'close';
					setTimeout( () => {
						childrenElement.style.height = 'auto';
					}, 300 );
				}
				childrenElement.style.minHeight = childrenHeight;
				childrenElement.style.height = childrenHeight;
				e.target.classList.toggle( classOpen );
				childrenElement.classList.toggle( classOpen );
				e.target.firstElementChild.textContent = buttonText;
			} );
			el.parentNode.insertBefore( button, el );
		} );
	} );
} );
