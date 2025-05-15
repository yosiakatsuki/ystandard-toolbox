import classnames from 'classnames';
import {
	ColorIndicator,
	Dropdown,
	FlexItem,
	__experimentalHStack as HStack,
	__experimentalItem as Item,
	__experimentalItemGroup as ItemGroup,
} from '@wordpress/components';

/**
 *
 * @param  key.key
 * @param  key
 * @param  value
 * @param  label
 * @param  renderContent
 * @param  key.value
 * @param  key.label
 * @param  key.renderContent
 * @return {JSX.Element}
 * @class
 * @deprecated
 */
const ColorDropdown = ( { key, value, label, renderContent } ) => {
	const _buttonLabel = label ?? '色';

	return (
		<ItemGroup
			isBordered
			isSeparated
			className="block-editor-panel-color-gradient-settings__item-group"
		>
			<Dropdown
				key={ key }
				popoverProps={ {
					placement: 'bottom-start',
				} }
				className="block-editor-panel-color-gradient-settings__dropdown"
				contentClassName="block-editor-panel-color-gradient-settings__dropdown-content"
				style={ { display: 'block' } }
				renderToggle={ ( { isOpen, onToggle } ) => (
					<Item
						onClick={ onToggle }
						className={ classnames(
							'block-editor-panel-color-gradient-settings__item',
							{ 'is-open': isOpen }
						) }
					>
						<HStack justify="flex-start">
							<ColorIndicator
								className="block-editor-panel-color-gradient-settings__color-indicator"
								colorValue={ value }
							/>
							<FlexItem>{ _buttonLabel }</FlexItem>
						</HStack>
					</Item>
				) }
				renderContent={ renderContent }
			/>
		</ItemGroup>
	);
};
export default ColorDropdown;
