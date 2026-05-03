/**
 * アーカイブ 並び順設定パネルのロジックテスト
 *
 * 検証対象: CustomSelectControl の選択肢クリック → updateSection({ archiveOrder: 値 })
 */

/* WordPress Dependencies */
import { render, screen, fireEvent } from '@testing-library/react';

/* Plugin Dependencies */
import Sort from '../sort';

type SectionSettings = Record< string, unknown >;
type RenderProps = {
	updateSection: jest.Mock;
	sectionSettings: SectionSettings;
};

const renderPanel = ( overrides: Partial< RenderProps > = {} ) => {
	const props: RenderProps = {
		updateSection: jest.fn(),
		sectionSettings: {},
		...overrides,
	};
	render(
		<Sort
			updateSection={ props.updateSection }
			// @ts-ignore
			sectionSettings={ props.sectionSettings }
		/>
	);
	return props;
};

describe( 'Archive Sort — handleOnChangeOrder', () => {
	it( 'CustomSelectControl で「公開日/昇順」を選択 → updateSection({ archiveOrder: "date/ASC" })', () => {
		const { updateSection } = renderPanel();
		fireEvent.change( screen.getByLabelText( '選択' ), {
			target: { value: 'date/ASC' },
		} );
		expect( updateSection ).toHaveBeenCalledWith( {
			archiveOrder: 'date/ASC',
		} );
	} );

	it( '「タイトル/A-Z」を選択 → updateSection({ archiveOrder: "title/ASC" })', () => {
		const { updateSection } = renderPanel();
		fireEvent.change( screen.getByLabelText( '選択' ), {
			target: { value: 'title/ASC' },
		} );
		expect( updateSection ).toHaveBeenCalledWith( {
			archiveOrder: 'title/ASC',
		} );
	} );

	it( '「ランダム」を選択 → updateSection({ archiveOrder: "rand/ASC" })', () => {
		const { updateSection } = renderPanel();
		fireEvent.change( screen.getByLabelText( '選択' ), {
			target: { value: 'rand/ASC' },
		} );
		expect( updateSection ).toHaveBeenCalledWith( {
			archiveOrder: 'rand/ASC',
		} );
	} );
} );
