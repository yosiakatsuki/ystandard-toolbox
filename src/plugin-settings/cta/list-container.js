import { DragDropContext, Droppable } from 'react-beautiful-dnd';
/**
 * WordPress.
 */
import ListItem from './list-item';

const ListContainer = ( { items, setItems, position } ) => {
	const handleOnDragEnd = ( result ) => {
		const newItems = Array.from( items );
		const [ reorderedItem ] = newItems.splice( result.source.index, 1 );
		newItems.splice( result.destination.index, 0, reorderedItem );
		setItems( newItems );
	};
	return (
		<DragDropContext onDragEnd={ handleOnDragEnd }>
			<Droppable droppableId={ position }>
				{ ( provided ) => (
					<div
						className={ 'ystdtb-settings-cta__list-container' }
						{ ...provided.droppableProps }
						ref={ provided.innerRef }
					>
						{ items.map(
							( { id, label, enable, priority }, index ) => {
								return (
									<ListItem
										key={ id }
										id={ id }
										label={ label }
										enable={ enable }
										priority={ priority }
										index={ index }
									/>
								);
							}
						) }
						{ provided.placeholder }
					</div>
				) }
			</Droppable>
		</DragDropContext>
	);
};
export default ListContainer;
