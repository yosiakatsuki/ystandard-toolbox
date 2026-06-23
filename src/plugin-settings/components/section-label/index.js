import './_editor.scss';

const SectionLabel = ( { tag, children } ) => {
	const Tag = tag || 'label';
	return <Tag className={ 'aktk-settings-section-label' }>{ children }</Tag>;
};

export default SectionLabel;
