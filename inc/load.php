<?php
/**
 * File Load
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

defined( 'ABSPATH' ) || die();

require_once __DIR__ . '/config/class-config.php';
require_once __DIR__ . '/helper/load.php';
require_once __DIR__ . '/util/index.php';
require_once __DIR__ . '/utility/class-filesystem.php';
require_once __DIR__ . '/utility/class-utility.php';
require_once __DIR__ . '/option/class-option.php';
require_once __DIR__ . '/notice/class-notice.php';
require_once __DIR__ . '/init/class-init.php';
// ビルドファイルチェック.
if ( ! \ystandard_toolbox\Init::check_build_files() ) {
	return;
}
require_once __DIR__ . '/api/class-api.php';
require_once __DIR__ . '/meta-box/class-meta-box.php';
require_once __DIR__ . '/enqueue/class-enqueue.php';
// Blocks.
require_once __DIR__ . '/blocks/class-blocks.php';
// Code.
require_once __DIR__ . '/code/class-code.php';
// Heading.
require_once __DIR__ . '/heading/class-heading.php';
// Icon.
require_once __DIR__ . '/icon/class-icon.php';
// Font.
require_once __DIR__ . '/font/class-font.php';
require_once __DIR__ . '/font/class-icon-font.php';
// Copyright.
require_once __DIR__ . '/copyright/class-copyright.php';
// Block Patterns.
require_once __DIR__ . '/block-patterns/class-block-patterns.php';
// Header Design.
require_once __DIR__ . '/header/class-header-design.php';
// Navigation.
require_once __DIR__ . '/navigation/class-navigation.php';
// Post Meta.
require_once __DIR__ . '/post-meta/class-post-meta.php';
// Archive.
require_once __DIR__ . '/archive/class-archive.php';
// Taxonomy.
require_once __DIR__ . '/taxonomy/class-taxonomy.php';
// SEO.
require_once __DIR__ . '/seo/class-seo.php';
// widget.
require_once __DIR__ . '/widget/class-accordion.php';
// CTA.
require_once __DIR__ . '/cta/class-cta.php';
// LP.
require_once __DIR__ . '/lp/class-lp.php';
// Custom CSS.
require_once __DIR__ . '/custom-css/class-custom-css.php';
// Polyfill.
require_once __DIR__ . '/polyfill/class-polyfill.php';

// Admin.
require_once __DIR__ . '/admin/class-admin-utility.php';
require_once __DIR__ . '/menu-page/class-menu-page.php';
require_once __DIR__ . '/admin/class-plugin-menu.php';
if ( file_exists( __DIR__ . '/update/class-update.php' ) ) {
	require_once __DIR__ . '/update/class-update.php';
}
require_once __DIR__ . '/plugin-settings/class-plugin-settings.php';
