import { BaseControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { iconTypes } from '../config';
import { getBlockConfig } from '@aktk/helper/blockConfig';
import classnames from 'classnames';

const ListIcon = ( { attributes, setAttributes } ) => {
	const { iconType } = attributes;

	const config = getBlockConfig( 'listIcons', [] );

	let options = iconTypes;
	if ( config ) {
		options = [ ...iconTypes, ...config ];
	}

	return (
		<BaseControl
			id={ 'list-icon' }
			label={ __( 'リストアイコン', 'ystandard-toolbox' ) }
		>
			<div className="ystdtb__icon-list-buttons">
				{ options.map( ( item ) => {
					return (
						<Button
							key={ item.name }
							isSecondary={ iconType !== item.name }
							isPrimary={ iconType === item.name }
							onClick={ () => {
								setAttributes( {
									iconType: item.name,
									customIconClass: item.class,
								} );
							} }
						>
							<ul
								className={ classnames(
									'ystdtb-icon-list',
									'ystdtb-icon-list-edit',
									`icon--${ item.name }`,
									{
										[ item.class ]: item.class,
									}
								) }
							>
								<li />
							</ul>
						</Button>
					);
				} ) }
			</div>
		</BaseControl>
	);
};

export default ListIcon;
