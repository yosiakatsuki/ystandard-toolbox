import { DragDropContext, Droppable } from 'react-beautiful-dnd';
/**
 * WordPress.
 */
import ListItem from './list-item';

const ListContainer = ( { items, setItems, position } ) => {
	const setPriority = ( newItems ) => {
		newItems.forEach( ( element, index ) => {
			element.priority = ( index + 1 ) * 10;
		} );
		return newItems;
	};
	const handleOnDragEnd = ( result ) => {
		const newItems = Array.from( items );
		const [ reorderedItem ] = newItems.splice( result.source.index, 1 );
		if ( null !== result.destination ) {
			newItems.splice( result.destination.index, 0, reorderedItem );
			setItems( setPriority( newItems ) );
		}
	};
	const handleOnChangeListItem = ( newValue, index ) => {
		const newItems = Array.from( items );
		newItems[ index ] = {
			...newItems[ index ],
			...newValue,
		};
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
						{ items.map( ( item, index ) => {
							return (
								<ListItem
									key={ item.id }
									item={ item }
									index={ index }
									onChange={ handleOnChangeListItem }
								/>
							);
						} ) }
						{ provided.placeholder }
					</div>
				) }
			</Droppable>
		</DragDropContext>
	);
};
export default ListContainer;
