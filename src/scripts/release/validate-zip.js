const fs = require( 'node:fs' );
const { execFileSync } = require( 'node:child_process' );

const archivePath = process.argv[ 2 ] || 'ystandard-toolbox.zip';
const archiveRoot = 'ystandard-toolbox';

const requiredEntries = [
	`${ archiveRoot }/ystandard-toolbox.php`,
	`${ archiveRoot }/css/ystandard-toolbox-admin.css`,
	`${ archiveRoot }/build/plugin-settings/plugin-settings.js`,
	`${ archiveRoot }/assets/heading-compatible/schema.json`,
	`${ archiveRoot }/assets/heading-compatible/preset.json`,
];

const forbiddenRules = [
	{
		label: 'TypeScriptビルドキャッシュ',
		test: ( entry ) => entry.endsWith( '.tsbuildinfo' ),
	},
	{
		label: 'ルートのビルド設定',
		test: ( entry ) =>
			new RegExp(
				`^${ archiveRoot }/[^/]+\\.config\\.(?:js|cjs|mjs)$`
			).test( entry ),
	},
	{
		label: 'TypeScript設定',
		test: ( entry ) => entry === `${ archiveRoot }/tsconfig.json`,
	},
	{
		label: '旧管理画面アセット',
		test: ( entry ) => entry.startsWith( `${ archiveRoot }/js/admin/` ),
	},
	{
		label: '旧重複画像',
		test: ( entry ) =>
			entry.startsWith( `${ archiveRoot }/assets/menu-page/` ),
	},
	{
		label: '開発ディレクトリ',
		test: ( entry ) =>
			new RegExp(
				`^${ archiveRoot }/(?:src|test|phpunit|docs|bin|node_modules|vendor)/`
			).test( entry ),
	},
	{
		label: 'ルートの開発ファイル',
		test: ( entry ) =>
			[
				`${ archiveRoot }/package.json`,
				`${ archiveRoot }/package-lock.json`,
				`${ archiveRoot }/composer.json`,
				`${ archiveRoot }/composer.lock`,
				`${ archiveRoot }/AGENTS.md`,
				`${ archiveRoot }/CLAUDE.md`,
			].includes( entry ),
	},
];

/**
 * ZIP内のファイル一覧を取得する.
 *
 * @return {string[]} ZIP内のファイル一覧.
 */
function getArchiveEntries() {
	return execFileSync( 'unzip', [ '-Z1', archivePath ], {
		encoding: 'utf8',
	} )
		.trim()
		.split( /\r?\n/u )
		.filter( Boolean );
}

// ZIPが存在しない場合は配布処理を停止する.
if ( ! fs.existsSync( archivePath ) ) {
	process.stderr.write( `配布ZIPが見つかりません: ${ archivePath }\n` );
	process.exit( 1 );
}

const entries = getArchiveEntries();
const entrySet = new Set( entries );
const missingEntries = requiredEntries.filter(
	( entry ) => ! entrySet.has( entry )
);
const forbiddenEntries = forbiddenRules.flatMap( ( rule ) =>
	entries
		.filter( rule.test )
		.map( ( entry ) => `${ rule.label }: ${ entry }` )
);

// 必須ファイルの欠落や不要ファイルの混入がある場合は配布処理を停止する.
if ( 0 < missingEntries.length || 0 < forbiddenEntries.length ) {
	// 互換機能などの実行に必要なファイルを具体的に報告する.
	if ( 0 < missingEntries.length ) {
		process.stderr.write( '必須ファイルが不足しています:\n' );
		missingEntries.forEach( ( entry ) => {
			process.stderr.write( `- ${ entry }\n` );
		} );
	}

	// 開発用ファイルの混入箇所を具体的に報告する.
	if ( 0 < forbiddenEntries.length ) {
		process.stderr.write( '不要なファイルが含まれています:\n' );
		forbiddenEntries.forEach( ( entry ) => {
			process.stderr.write( `- ${ entry }\n` );
		} );
	}

	process.exit( 1 );
}

process.stdout.write(
	`配布ZIP検証OK: ${ archivePath } (${ entries.length } entries)\n`
);
