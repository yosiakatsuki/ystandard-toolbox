export interface SnsShareAttributes {
	align: string;
	buttonType: 'circle' | 'square' | 'icon' | 'official';
	labelBefore: string;
	labelAfter: string;
	useX: boolean;
	useTwitter: boolean;
	useFacebook: boolean;
	useHatenaBookmark: boolean;
	usePocket: boolean;
	useLINE: boolean;
	useBluesky: boolean;
	twitterVia: string;
	twitterRelatedUser: string;
	twitterHashTags: string;
}

export interface SnsShareProps {
	attributes: SnsShareAttributes;
	setAttributes: ( attrs: Partial< SnsShareAttributes > ) => void;
}

export interface ShareButtonDesign {
	label: string;
	value: 'circle' | 'square' | 'icon' | 'official';
}