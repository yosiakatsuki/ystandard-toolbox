// @ts-ignore
import { Draggable } from 'react-beautiful-dnd';
/**
 * WordPress Dependencies
 */
import { Icon, menu } from '@wordpress/icons';
import { ToggleControl } from '@wordpress/components';

/**
 * Styles
 */
import './_list-item.scss';

/**
 * CTAアイテムのスキーマ定義
 * 各プロパティの型情報を定義
 */
export const schema = {
	id: { type: 'string' },
	label: { type: 'string' },
	enable: { type: 'boolean' },
	priority: { type: 'int' },
};

/**
 * CTAアイテムの型定義
 */
interface CTAItem {
	id: string;
	label: string;
	enable: boolean;
	priority: number;
}

/**
 * ListItemコンポーネントのプロパティ型定義
 */
interface ListItemProps {
	item: CTAItem;
	index: number;
	onChange: ( value: { enable: boolean }, index: number ) => void;
}

/**
 * CTAリストアイテムコンポーネント
 * ドラッグ可能なCTAアイテムを表示し、有効/無効の切り替えが可能
 */
export default function ListItem( {
	item,
	index,
	onChange,
}: ListItemProps ): JSX.Element {
	const { id, label, enable } = item;

	/**
	 * 有効/無効切り替え時の処理
	 * ToggleControlの値変更を親コンポーネントに通知
	 */
	const handleOnChangeEnable = ( newValue: boolean ) => {
		onChange( { enable: newValue }, index );
	};
	return (
		<Draggable draggableId={ id } index={ index }>
			{ /* @ts-ignore */ }
			{ ( provided ) => (
				<div
					className="ystdtb-settings-cta__list-item"
					ref={ provided.innerRef }
					{ ...provided.draggableProps }
					{ ...provided.dragHandleProps }
				>
					<div className="ystdtb-settings-cta__list-item-content">
						<Icon
							className={
								'ystdtb-settings-cta__list-item-handle'
							}
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
}
