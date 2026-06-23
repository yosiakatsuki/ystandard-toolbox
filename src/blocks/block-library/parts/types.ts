/**
 * パーツブロック属性
 */
export interface PartsAttributes {
	partsId: string;
}

/**
 * パーツブロックEditコンポーネントのプロパティ
 */
export interface PartsEditProps {
	attributes: PartsAttributes;
	setAttributes: ( attrs: Partial< PartsAttributes > ) => void;
	clientId: string;
}

/**
 * パーツ選択肢の型
 */
export interface PartsOption {
	label: string;
	value: string | number;
}
