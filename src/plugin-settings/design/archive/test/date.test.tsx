/**
 * アーカイブ 日付情報設定パネルのロジックテスト
 *
 * 検証対象: CustomSelectControl の選択肢クリック → updateSection({ archiveDisplayDate: 値 })
 */

/* WordPress Dependencies */
import { render, screen, fireEvent } from '@testing-library/react';

/* Plugin Dependencies */
import Date from '../date';

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
		<Date
			updateSection={ props.updateSection }
			// @ts-ignore
			sectionSettings={ props.sectionSettings }
		/>
	);
	return props;
};

describe( 'Archive Date — handleOnChangeDisplayDate', () => {
	it( '「更新日」を選択 → updateSection({ archiveDisplayDate: "modified" })', () => {
		const { updateSection } = renderPanel();
		fireEvent.change( screen.getByLabelText( '選択' ), {
			target: { value: 'modified' },
		} );
		expect( updateSection ).toHaveBeenCalledWith( {
			archiveDisplayDate: 'modified',
		} );
	} );

	it( '「公開日」を選択 → updateSection({ archiveDisplayDate: "" }) でデフォルトに戻す', () => {
		const { updateSection } = renderPanel( {
			sectionSettings: { archiveDisplayDate: 'modified' },
		} );
		fireEvent.change( screen.getByLabelText( '選択' ), {
			target: { value: '' },
		} );
		expect( updateSection ).toHaveBeenCalledWith( {
			archiveDisplayDate: '',
		} );
	} );
} );
