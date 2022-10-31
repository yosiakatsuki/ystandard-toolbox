import { Draggable } from 'react-beautiful-dnd';
/**
 * WordPress.
 */
import { useRef } from '@wordpress/element';

import './_list-item.scss';

export const schema = {
	id: { type: 'string' },
	label: { type: 'string' },
	enable: { type: 'boolean' },
	priority: { type: 'int' },
};

const ListItem = ( { id, label, enable, priority, index } ) => {
	return (
		<Draggable draggableId={ id } index={ index }>
			{ ( provided ) => (
				<div
					className="ystdtb-settings-cta__list-item"
					ref={ provided.innerRef }
					{ ...provided.draggableProps }
					{ ...provided.dragHandleProps }
				>
					<div>{ label }</div>
				</div>
			) }
		</Draggable>
	);
};

export default ListItem;
