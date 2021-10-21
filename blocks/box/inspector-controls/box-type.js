import classnames from "classnames";
import {
	Button,
} from '@wordpress/components';

import { boxStyleList } from "../config";

const BoxType = ( props ) => {

	const {
		attributes,
		setAttributes
	} = props;
	const {
		boxStyle
	} = attributes;
	return (
		<>
			<div className="ystdtb-box__type-select">
				{ boxStyleList.map( ( item ) => {
					return (
						<Button
							className={ classnames(
								'ystdtb-box__type-button',
								'ystdtb__shadow-button',
								{
									'is-selected':
										boxStyle === item.value,
								}
							) }
							key={ item.value }
							isPrimary={ boxStyle === item.value }
							onClick={ () => {
								setAttributes( {
									boxStyle: item.value,
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
										>
											　
										</span>
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
		</>
	);
}

export default BoxType;
