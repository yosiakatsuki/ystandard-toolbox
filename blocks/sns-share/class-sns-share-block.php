<?php
/**
 * SNS Share Block
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\blocks;

use ystandard_toolbox\Dynamic_Block;
use ystandard_toolbox\Utility;

defined( 'ABSPATH' ) || die();

/**
 * Class SNS Share
 *
 * @package ystandard_toolbox\blocks
 */
class SNS_Share_Block extends Dynamic_Block {

	/**
	 * SNS Share constructor.
	 */
	public function __construct() {
		parent::__construct();
		$this->block_name       = 'sns-share';
		$this->block_attributes = [
			'align'              => [
				'type' => 'string',
			],
			'buttonType'         => [
				'type'    => 'string',
				'default' => 'circle',
			],
			'labelBefore'        => [
				'type'    => 'string',
				'default' => '',
			],
			'labelAfter'         => [
				'type'    => 'string',
				'default' => '',
			],
			'useTwitter'         => [
				'type'    => 'boolean',
				'default' => true,
			],
			'useFacebook'        => [
				'type'    => 'boolean',
				'default' => true,
			],
			'useHatenaBookmark'  => [
				'type'    => 'boolean',
				'default' => true,
			],
			'usePocket'          => [
				'type'    => 'boolean',
				'default' => true,
			],
			'useLINE'            => [
				'type'    => 'boolean',
				'default' => true,
			],
			'twitterVia'         => [
				'type'    => 'string',
				'default' => '',
			],
			'twitterRelatedUser' => [
				'type'    => 'string',
				'default' => '',
			],
			'twitterHashTags'    => [
				'type'    => 'string',
				'default' => '',
			],
		];
		add_filter(
			self::REGISTER_DYNAMIC_BLOCK_HOOK . $this->block_name,
			function ( $flag ) {
				return shortcode_exists( 'ys_share_button' );
			}
		);
	}

	/**
	 * Render
	 *
	 * @param array  $attributes block attributes.
	 * @param string $content    innerBlocks.
	 *
	 * @return false|string
	 */
	public function render( $attributes, $content = null ) {
		$classes = 'ystdtb-sns-share';
		if ( isset( $attributes['align'] ) && '' !== $attributes['align'] ) {
			$classes .= ' has-align-' . $attributes['align'];
		}

		$attributes = Utility::parse_shortcode_attributes(
			$this->migration_attributes( $attributes )
		);

		return "<div class=\"${classes}\">" . do_shortcode( "[ys_share_button ${attributes}]" ) . '</div>';
	}

	/**
	 * パラメーターの変換
	 *
	 * @param array $attributes Attributes.
	 *
	 * @return mixed
	 */
	private function migration_attributes( $attributes ) {

		$attributes['type']                 = $attributes['buttonType'];
		$attributes['twitter']              = $attributes['useTwitter'];
		$attributes['facebook']             = $attributes['useFacebook'];
		$attributes['hatenabookmark']       = $attributes['useHatenaBookmark'];
		$attributes['pocket']               = $attributes['usePocket'];
		$attributes['line']                 = $attributes['useLINE'];
		$attributes['twitter_via_user']     = $attributes['twitterVia'];
		$attributes['twitter_related_user'] = $attributes['twitterRelatedUser'];
		$attributes['twitter_hash_tags']    = $attributes['twitterHashTags'];
		$attributes['before']               = $attributes['labelBefore'];
		$attributes['after']                = $attributes['labelAfter'];

		return $attributes;
	}

}

$block = new SNS_Share_Block();
$block->register_block();
