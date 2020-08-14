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
require_once __DIR__ . '/utility/class-utility.php';
require_once __DIR__ . '/option/class-option.php';
require_once __DIR__ . '/notice/class-notice.php';
require_once __DIR__ . '/init/class-init.php';
require_once __DIR__ . '/enqueue/class-enqueue.php';

// Blocks.
require_once __DIR__ . '/blocks/class-blocks.php';
// Code.
require_once __DIR__ . '/code/class-code.php';
// Heading.
require_once __DIR__ . '/heading/class-heading.php';
// Font.
require_once __DIR__ . '/font/class-font.php';
// Copyright.
require_once __DIR__ . '/copyright/class-copyright.php';

// Admin.
require_once __DIR__ . '/menu-page/class-menu-page.php';
require_once __DIR__ . '/update/class-update.php';
