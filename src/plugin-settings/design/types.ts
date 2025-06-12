// 自動生成: サイトデザイン拡張 設定項目型

export interface HeaderSettings {
	subHeaderFontSize?: string;
	subHeaderFontSizeDesktop?: string;
	subHeaderFontSizeUnitDesktop?: string;
	subHeaderBackgroundColorDesktop?: string;
	subHeaderColorDesktop?: string;
	subHeaderAlignDesktop?: 'left' | 'center' | 'right';
	enableOverlay?: boolean;
	overlayPageType?: string[];
	overlayImage?: string;
	overlayImageId?: number;
	overlayTextColor?: string;
}

export interface MenuSettings {
	mobileMenuEnable?: boolean;
	mobileMenuHideGlobalMenu?: boolean;
	mobileMenuHideSearch?: boolean;
}

export interface ArchiveSettings {
	archiveOrder?: string;
	archiveDisplayDate?: string;
	archiveDefaultImage?: string;
	archiveDefaultImageId?: number;
	archiveImageRatio?: string;
	archiveImageRatioMobile?: string;
	archiveMobileLayout?: string;
	theme_ys_archive_type?: string;
}

export interface CopyrightSettings {
	copyright?: string;
	disable_theme_info?: boolean;
}

export type DesignSettings = HeaderSettings &
	MenuSettings &
	ArchiveSettings &
	CopyrightSettings;
