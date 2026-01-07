export interface TimeLineAttributes {}

export interface TimeLineProps {
	attributes: TimeLineAttributes;
	setAttributes: ( attributes: TimeLineAttributes ) => void;
	className?: string;
	clientId: string;
	isSelected: boolean;
	name?: string;
}

export interface TimeLineInspectorProps extends TimeLineProps {
	updateChildAttributes: ( childAttributes: Record< string, any > ) => void;
	firstChildAttributes?: Record< string, any >;
}
