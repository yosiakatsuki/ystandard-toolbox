import classnames from 'classnames';
/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect, useContext } from '@wordpress/element';

/**
 * Akatsuki
 */
import {
	DestructiveButton,
	PrimaryButton,
} from '@aktk/block-components/buttons';

/**
 * Plugin.
 */

import { HeadingContext } from '../index';

export default function UpdateHeadingOption() {
	// @ts-ignore
	const { headingOption, setHeadingOption, setIsEdit } =
		useContext( HeadingContext );

	const handleOnClickSave = () => {
		console.log( { headingOption } );
	};

	return (
		<>
			<div className="flex justify-between">
				<PrimaryButton
					icon={ 'cloud-upload' }
					onClick={ handleOnClickSave }
				>
					{ __( '更新', 'ystandard-toolbox' ) }
				</PrimaryButton>
				<DestructiveButton>
					{ __( '削除', 'ystandard-toolbox' ) }
				</DestructiveButton>
			</div>
		</>
	);
}
