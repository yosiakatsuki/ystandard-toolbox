/**
 * WordPress dependencies
 */
// @ts-ignore
import { useSettings } from '@wordpress/block-editor';

/**
 * 余白設定を取得する（設定画面用）
 */
const useThemeSpacingSizes = () => {
	const [ themeSpacingSizes ] = useSettings( 'spacing.spacingSizes.theme' );

	return themeSpacingSizes ?? getDefaultSpacingSizes();
};

function getDefaultSpacingSizes() {
	return [
		{
			name: '5px',
			size: '5px',
			slug: '5px',
		},
		{
			name: '10px',
			size: '10px',
			slug: '10px',
		},
		{
			name: '15px',
			size: '15px',
			slug: '15px',
		},
		{
			name: '20px',
			size: '20px',
			slug: '20px',
		},
		{
			name: '25px',
			size: '25px',
			slug: '25px',
		},
		{
			name: '30px',
			size: '30px',
			slug: '30px',
		},
		{
			name: '35px',
			size: '35px',
			slug: '35px',
		},
		{
			name: '40px',
			size: '40px',
			slug: '40px',
		},
		{
			name: '45px',
			size: '45px',
			slug: '45px',
		},
		{
			name: '50px',
			size: '50px',
			slug: '50px',
		},
		{
			name: '55px',
			size: '55px',
			slug: '55px',
		},
		{
			name: '60px',
			size: '60px',
			slug: '60px',
		},
		{
			name: '65px',
			size: '65px',
			slug: '65px',
		},
		{
			name: '70px',
			size: '70px',
			slug: '70px',
		},
		{
			name: '75px',
			size: '75px',
			slug: '75px',
		},
		{
			name: '80px',
			size: '80px',
			slug: '80px',
		},
	];
}

export default useThemeSpacingSizes;
