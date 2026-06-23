/**
 * ボックスブロック型定義
 */

/**
 * ボックススタイル
 */
export type BoxStyle = 'label-none' | 'label-out' | 'label-in' | 'label-wide' | 'label-line';

/**
 * ボーダースタイル
 */
export type BorderStyle = 'solid' | 'dotted' | 'dashed' | 'double';

/**
 * フォントウェイト
 */
export type FontWeight = 'normal' | 'bold';

/**
 * 背景画像リピート
 */
export type BackgroundRepeat = 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y';

/**
 * スペーシングオブジェクト
 */
export interface SpacingObject {
	top?: string;
	right?: string;
	bottom?: string;
	left?: string;
	// レスポンシブ対応
	topTablet?: string;
	rightTablet?: string;
	bottomTablet?: string;
	leftTablet?: string;
	topMobile?: string;
	rightMobile?: string;
	bottomMobile?: string;
	leftMobile?: string;
}

/**
 * メディアオブジェクト
 */
export interface MediaObject {
	id?: number;
	url?: string;
	alt?: string;
	title?: string;
	width?: number;
	height?: number;
}

/**
 * カラーオブジェクト
 */
export interface ColorObject {
	color?: string;
	name?: string;
	slug?: string;
}

/**
 * フォントサイズオブジェクト
 */
export interface FontSizeObject {
	size?: string;
	name?: string;
	slug?: string;
}

/**
 * ボックスブロック属性
 */
export interface BoxAttributes {
	boxStyle: BoxStyle;
	boxBackgroundColor?: string;
	customBoxBackgroundColor?: string;
	boxTextColor?: string;
	customBoxTextColor?: string;
	boxBorderColor?: string;
	customBoxBorderColor?: string;
	boxBorderSize: string;
	boxBorderStyle: BorderStyle;
	boxBorderRadius?: string;
	boxPadding?: SpacingObject;
	isResponsiveBoxPadding: boolean;
	label?: string;
	labelIcon?: string;
	labelFontSize?: string;
	customLabelFontSize: string;
	labelWeight: FontWeight;
	labelBackgroundColor?: string;
	customLabelBackgroundColor?: string;
	labelTextColor?: string;
	customLabelTextColor?: string;
	labelBorderRadius?: string;
	backgroundImage?: MediaObject;
	backgroundImageCoverOpacity: number;
	backgroundImageRepeat: BackgroundRepeat;
}

/**
 * ボックスブロック編集プロパティ
 */
export interface BoxEditProps {
	attributes: BoxAttributes;
	setAttributes: (attributes: Partial<BoxAttributes>) => void;
	className?: string;
	clientId: string;
	isSelected: boolean;
	// HOC由来プロパティ
	boxBackgroundColor: ColorObject;
	setBoxBackgroundColor: (color: string | undefined) => void;
	boxTextColor: ColorObject;
	setBoxTextColor: (color: string | undefined) => void;
	boxBorderColor: ColorObject;
	setBoxBorderColor: (color: string | undefined) => void;
	labelBackgroundColor: ColorObject;
	setLabelBackgroundColor: (color: string | undefined) => void;
	labelTextColor: ColorObject;
	setLabelTextColor: (color: string | undefined) => void;
	fontSize: FontSizeObject;
	setFontSize: (size: string | undefined) => void;
	labelFontSize: FontSizeObject;
	setLabelFontSize: (size: string | undefined) => void;
}

/**
 * ボックスブロック保存プロパティ
 */
export interface BoxSaveProps {
	attributes: BoxAttributes;
}

/**
 * ボックススタイル選択肢
 */
export interface BoxStyleOption {
	value: BoxStyle;
	label: string;
}

/**
 * ボーダースタイル選択肢
 */
export interface BorderStyleOption {
	value: BorderStyle;
	label: string;
}

/**
 * フォントウェイト選択肢
 */
export interface FontWeightOption {
	value: FontWeight;
	label: string;
}

/**
 * 単位選択肢
 */
export interface UnitOption {
	value: string;
	label: string;
}