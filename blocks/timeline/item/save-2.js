import classnames from 'classnames';
import {
	InnerBlocks,
	getColorClassName,
	getFontSizeClass,
	useBlockProps,
} from '@wordpress/block-editor';
import SVGIcon from '../../../src/js/component/svg-icon';

export default function ( { attributes } ) {
	const { labelType, labelContents } = attributes;

	const selectLabelType = undefined === labelType ? '' : labelType;

	const getLabelContents = () => {
		if ( 'text' === selectLabelType ) {
			return (
				<span className={ labelContentsClasses }>
					{ labelContents }
				</span>
			);
		}
		if ( 'icon' === selectLabelType ) {
			return (
				<span className={ labelContentsClasses }>
					<SVGIcon name={ labelContents } />
				</span>
			);
		}
	};

	const blockProps = useBlockProps.save( {
		className: classes,
		style: timelineStyle,
	} );

	return (
		<div { ...blockProps }>
			<div className={ labelClasses } style={ labelStyles }>
				{ getLabelContents() }
			</div>
			<div className={ contentsClass } style={ contentsStyle }>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
