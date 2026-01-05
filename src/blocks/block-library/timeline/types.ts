export interface TimeLineAttributes {}

export interface TimeLineProps {
	attributes: TimeLineAttributes;
	setAttributes: ( attributes: TimeLineAttributes ) => void;
	className?: string;
	clientId: string;
	isSelected: boolean;
	name?: string;
}
