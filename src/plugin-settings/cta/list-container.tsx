// @ts-ignore
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

/**
 * Components
 */
import ListItem from './list-item';

interface ListContainerProps {
	items: any[];
	setItems: ( items: any[] ) => void;
	position: string;
}

/**
 * CTAアイテムリストコンテナコンポーネント
 * ドラッグ＆ドロップで順序変更可能なCTAアイテムの一覧を表示
 * @param root0
 * @param root0.items
 * @param root0.setItems
 * @param root0.position
 */
export default function ListContainer( {
	items,
	setItems,
	position,
}: ListContainerProps ): JSX.Element {
	/**
	 * アイテムの優先度を設定する関数
	 * インデックスに基づいてpriority値を更新（10間隔で設定）
	 * @param newItems
	 */
	const setPriority = ( newItems: any[] ) => {
		newItems.forEach( ( element, index ) => {
			element.priority = ( index + 1 ) * 10;
		} );
		return newItems;
	};

	/**
	 * ドラッグ＆ドロップ終了時の処理
	 * アイテムの順序を変更し、優先度を再設定する
	 * @param result
	 */
	const handleOnDragEnd = ( result: any ) => {
		const newItems = Array.from( items );
		const [ reorderedItem ] = newItems.splice( result.source.index, 1 );
		if ( null !== result.destination ) {
			newItems.splice( result.destination.index, 0, reorderedItem );
			setItems( setPriority( newItems ) );
		}
	};

	/**
	 * リストアイテム変更時の処理
	 * 指定されたインデックスのアイテムを更新する
	 * @param newValue
	 * @param index
	 */
	const handleOnChangeListItem = ( newValue: any, index: number ) => {
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
				{ /* @ts-ignore */ }
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
}
