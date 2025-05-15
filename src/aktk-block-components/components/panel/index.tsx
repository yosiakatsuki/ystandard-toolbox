/**
 * WordPress
 */
import { PanelBody } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

interface PanelProps {
	title: string;
	initialOpen?: ( () => boolean ) | boolean;
	children: React.ReactNode;
	className?: string;
}

export function Panel( props: PanelProps ) {
	const { title, initialOpen, children, className } = props;
	// 初期開閉状態が関数の時とそれ以外でちょっと動きが違う.
	const isInitialOpenFunction = 'function' === typeof initialOpen;
	const _initialOpen = isInitialOpenFunction ? false : initialOpen;
	// パネルの初期状態セット.
	const [ panelOpen, setPanelOpen ] = useState( _initialOpen );

	// 初期状態をセット.
	useEffect( () => {
		if ( isInitialOpenFunction ) {
			setPanelOpen( initialOpen() );
		}
	}, [] );

	const togglePanel = () => {
		setPanelOpen( ! panelOpen );
	};

	return (
		<PanelBody
			title={ title }
			initialOpen={ panelOpen }
			onToggle={ togglePanel }
			className={ className }
		>
			{ children }
		</PanelBody>
	);
}

export function OpenPanel( props: PanelProps ) {
	const { title, initialOpen, children } = props;
	return (
		<Panel title={ title } initialOpen={ initialOpen ?? true }>
			{ children }
		</Panel>
	);
}
