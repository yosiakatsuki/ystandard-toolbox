/**
 * integration テスト用セットアップ
 *
 * fixture-based test では実際の @wordpress/blocks / @wordpress/block-editor を
 * 使って parse / serialize / validate を動かす。
 *
 * ただし、ystdtb は node_modules 配下に複数バージョンの @wordpress パッケージが
 * 重複インストールされており、それぞれが想定する private-apis の consent 文字列が
 * 異なるため、本物の private-apis を介した opt-in が失敗する。
 * テスト環境では private-apis 自体を簡易実装でモックし、lock/unlock だけが動けば
 * 良いものとする。
 */
import '@testing-library/jest-dom';

global.fetch = jest.fn( () =>
	Promise.resolve( {
		json: () => Promise.resolve( {} ),
	} )
);

jest.mock( '@wordpress/private-apis', () => {
	const lockMap = new WeakMap();
	const lock = ( object, privateData ) => {
		lockMap.set( object, privateData );
	};
	const unlock = ( object ) => lockMap.get( object );
	return {
		__dangerousOptInToUnstableAPIsOnlyForCoreModules: () => ( {
			lock,
			unlock,
		} ),
	};
} );

// @wordpress/editor は register-blocks.js 経由で save.tsx が間接的にロードする
// アクセサリコンポーネント（ColorPalette 等）が要求するため、fixture-based test では
// 実体不要な最小モックで置き換える（virtual: true は実モジュール未インストール環境向け）。
jest.mock(
	'@wordpress/editor',
	() => ( {
		store: { name: 'core/editor' },
	} ),
	{ virtual: true }
);
