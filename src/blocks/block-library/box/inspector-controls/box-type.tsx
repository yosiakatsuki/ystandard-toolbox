/*
 * WordPress Dependencies
 */
import classnames from 'classnames';

/*
 * Aktk Dependencies
 */
import Button from '@aktk/block-components/wp-controls/button';

/*
 * Plugin Dependencies
 */
import type { BoxAttributes } from '../types';
import { boxStyleList } from '../utils';

interface BoxTypeProps {
	attributes: BoxAttributes;
	setAttributes: ( attributes: Partial< BoxAttributes > ) => void;
}

/**
 * ボックススタイル選択コントロール
 * @param props
 */
const BoxType = ( props: BoxTypeProps ): React.ReactElement => {
	const { attributes, setAttributes } = props;
	const { boxStyle } = attributes;

	return (
		<div className="ystdtb-box__type-select">
			{ boxStyleList.map( ( item ) => {
				return (
					<Button
						className={ classnames(
							'ystdtb-box__type-button',
							'ystdtb__shadow-button',
							{
								'is-selected': boxStyle === item.value,
							}
						) }
						key={ item.value }
						variant={ boxStyle === item.value ? 'primary' : 'secondary' }
						onClick={ () => {
							setAttributes( {
								boxStyle: item.value as BoxAttributes['boxStyle'],
							} );
						} }
					>
						<span
							className={ classnames(
								'ystdtb-box__type-wrap',
								`is-${ item.value }`
							) }
						>
							<span
								className="ystdtb-box__type-label"
								aria-hidden="true"
							/>
							<span className="ystdtb-box__type-box">
								<span className="ystdtb-box__type-name">
									{ item.label }
								</span>
							</span>
						</span>
					</Button>
				);
			} ) }
		</div>
	);
};

export default BoxType;
