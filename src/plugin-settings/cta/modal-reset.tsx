/**
 * WordPress
 */
import { Modal } from '@wordpress/components';
import { useContext } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';

/**
 * yStandard
 */
import { Flex, FlexItem } from '@aktk/components/flex';
import Buttons from '@aktk/plugin-settings/components/buttons';

/**
 * Settings.
 */
import { CtaContext } from './index';
import { getPluginSetting } from '../function/setting';

/**
 * Plugin
 */
import { getTabName, getCtaDefault } from './tab';

/**
 * Type
 */
interface ModalResetProps {
	onClickUpdate: ( value: object ) => void;
}

const ModalReset = ( { onClickUpdate }: ModalResetProps ) => {
	const {
		ctaItems,
		setCtaItems,
		selectPostType,
		selectedTab,
		setIsResetModalOpen,
	} = useContext( CtaContext );

	const getPostTypeName = () => {
		const settings = getPluginSetting( 'ctaSelectPostType' );
		if ( ! Array.isArray( settings ) ) {
			return '';
		}
		const selected = settings.filter( ( item ) => {
			return item?.key === selectPostType;
		} );
		if ( selected.length === 0 ) {
			return '';
		}
		return selected[ 0 ]?.name || '';
	};

	const handleResetOnClick = () => {
		const defaultCta = getCtaDefault( selectPostType );
		const newCtaItems = {
			...ctaItems,
			...{
				[ selectPostType ]: defaultCta,
			},
		};
		setCtaItems( newCtaItems );
		onClickUpdate( newCtaItems );
		handleCloseModal();
	};

	const handleCloseModal = () => {
		setIsResetModalOpen( false );
	};
	return (
		<Modal
			title={ __( 'リセット', 'ystandard-toolbox' ) }
			onRequestClose={ handleCloseModal }
			shouldCloseOnClickOutside={ true }
			isDismissible={ false }
		>
			<Flex gap="2em" style={ { flexDirection: 'column' } }>
				<FlexItem>
					{ sprintf(
						/* translators: %1$s post type, %2$s section. */
						__(
							'「%1$s」の%2$s設定をリセットしますか？',
							'ystandard-toolbox'
						),
						getPostTypeName(),
						getTabName( selectedTab )
					) }
				</FlexItem>
				<FlexItem>
					<Flex
						className="ystdtb-settings-cta__reset-buttons"
						justifyBetween
						gap="1em"
					>
						<Buttons.Delete
							text={ __( 'リセット', 'ystandard-toolbox' ) }
							onClick={ handleResetOnClick }
						/>
						<Buttons.Cancel
							text={ __( 'キャンセル', 'ystandard-toolbox' ) }
							onClick={ handleCloseModal }
						/>
					</Flex>
				</FlexItem>
			</Flex>
		</Modal>
	);
};
export default ModalReset;
