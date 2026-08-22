/**
 * Plugin Dependencies
 */
import type { PostSettingsProviderConfig } from '../types';

/**
 * PHPから渡されたToolbox設定プロバイダーの初期データを取得する.
 */
export function getProviderConfig(): PostSettingsProviderConfig | undefined {
	const config = window.ystdtbPostSettingsProvider;
	return config?.apiVersion === 1 ? config : undefined;
}
