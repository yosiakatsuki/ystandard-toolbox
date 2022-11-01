import { Draggable } from 'react-beautiful-dnd';
/**
 * WordPress.
 */
import { Icon, menu } from '@wordpress/icons';
import { useContext, useRef } from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';

import './_list-item.scss';

export const schema = {
	id: { type: 'string' },
	label: { type: 'string' },
	enable: { type: 'boolean' },
	priority: { type: 'int' },
};

const ListItem = ( { item, index, onChange } ) => {
	const { id, label, enable, priority } = item;
	const handleOnChangeEnable = ( newValue ) => {
		onChange( { enable: newValue }, index );
	};
	return (
		<Draggable draggableId={ id } index={ index }>
			{ ( provided ) => (
				<div
					className="ystdtb-settings-cta__list-item"
					ref={ provided.innerRef }
					{ ...provided.draggableProps }
					{ ...provided.dragHandleProps }
				>
					<div className="ystdtb-settings-cta__list-item-content">
						<Icon
							class={ 'ystdtb-settings-cta__list-item-handle' }
							icon={ menu }
						/>
						<div
							className={ 'ystdtb-settings-cta__list-item-name' }
						>
							{ label }
						</div>
						<div className="ystdtb-settings-cta__list-item-show">
							<div
								className={
									'ystdtb-settings-cta__list-item-show-toggle-label'
								}
							>
								表示 / 非表示
							</div>
							<ToggleControl
								className={
									'ystdtb-settings-cta__list-item-show-toggle'
								}
								checked={ enable }
								onChange={ handleOnChangeEnable }
							/>
						</div>
					</div>
				</div>
			) }
		</Draggable>
	);
};

export default ListItem;
