<?php
/**
 * Plugin Name: yStandard Toolbox
 * Plugin URI: https://wp-ystandard.com/
 * Description: 無料WordPressテーマ「yStandard」用機能拡張プラグイン.
 * Version: 1.2.1
 * Author: yosiakatsuki
 * Author URI: https://yosiakatsuki.net
 * License: GPL-2.0 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: ystandard-toolbox
 * Domain Path: /languages
 * Requires PHP: 7.3.0
 *
 * @package yStandard_toolbox
 */

/*
	Copyright (c) 2020 Yoshiaki Ogata (https://yosiakatsuki.net/)
	This program is free software; you can redistribute it and/or modify
	it under the terms of the GNU General Public License, version 2, as
	published by the Free Software Foundation.
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.
	You should have received a copy of the GNU General Public License
	along with this program; if not, write to the Free Software
	Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

defined( 'ABSPATH' ) || die();

define( 'YSTDTB_PATH', untrailingslashit( plugin_dir_path( __FILE__ ) ) );
define( 'YSTDTB_URL', untrailingslashit( plugin_dir_url( __FILE__ ) ) );
define( 'YSTDTB_NAME', plugin_basename( __FILE__ ) );

require_once __DIR__ . '/inc/load.php';
