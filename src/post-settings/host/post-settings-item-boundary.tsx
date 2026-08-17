/**
 * WordPress Dependencies
 */
import { Component, type ReactNode } from '@wordpress/element';

interface PostSettingsItemBoundaryProps {
	children: ReactNode;
	fallback: ReactNode;
}

interface PostSettingsItemBoundaryState {
	hasError: boolean;
}

/**
 * 設定項目単位で描画エラーを隔離する.
 */
export default class PostSettingsItemBoundary extends Component<
	PostSettingsItemBoundaryProps,
	PostSettingsItemBoundaryState
> {
	public state = { hasError: false };

	/**
	 * 描画エラーを表示状態へ反映する.
	 */
	public static getDerivedStateFromError() {
		return { hasError: true };
	}

	/**
	 * 設定項目またはエラー表示を描画する.
	 */
	public render() {
		if ( this.state.hasError ) {
			return this.props.fallback;
		}
		return this.props.children;
	}
}
