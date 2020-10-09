<?php
/**
 * Blocks
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\block_extension;

defined( 'ABSPATH' ) || die();

/**
 * Class Section
 *
 * @package ystandard_toolbox\block_extension
 */
class Section {

	/**
	 * Light Color
	 */
	const PATTERN_IMAGE_LIGHT_COLOR = '255, 255, 255, 0.8';

	/**
	 * Dark Color
	 */
	const PATTERN_IMAGE_DARK_COLOR = '19, 19, 19, 0.6';

	/**
	 * Section constructor.
	 */
	public function __construct() {
		add_filter( 'ystdb_block_config', [ $this, 'add_block_config' ] );
	}

	/**
	 * 背景パターン用パラメーター追加
	 *
	 * @param array $args パラメーター.
	 *
	 * @return array
	 */
	public function add_block_config( $args ) {

		$args['sectionBackgroundPatterns'] = $this->get_background_patterns();

		return $args;
	}

	/**
	 * 背景パターンサンプル画像設定
	 *
	 * @return array
	 */
	private function get_background_patterns() {
		$image_dir = YSTDTB_URL . '/assets/block-extension/section/background-pattern';

		return [
			[
				'name'           => 'stripes-dark',
				'image'          => "${image_dir}/stripes-dark.svg",
				'useDarkPreview' => false,
				'value'          => [
					'backgroundType'                  => 'image',
					'backgroundImageID'               => - 1,
					'focalPoint'                      => null,
					'backgroundImageParallax'         => false,
					'backgroundImageSize'             => 'custom',
					'backgroundImageSizeX'            => '40',
					'backgroundImageSizeUnitX'        => 'px',
					'backgroundImageSizeY'            => '1',
					'backgroundImageSizeUnitY'        => 'px',
					'backgroundImageRepeat'           => 'repeat',
					'backgroundImageOnOverlay'        => false,
					'backgroundImageOnOverlayOpacity' => 80,
				],
				'style'          => [
					'backgroundSize'   => '20px 1px',
					'backgroundRepeat' => 'repeat',
				],
			],
			[
				'name'           => 'stripes-light',
				'image'          => "${image_dir}/stripes-light.svg",
				'useDarkPreview' => true,
				'value'          => [
					'backgroundType'                  => 'image',
					'backgroundImageID'               => - 1,
					'focalPoint'                      => null,
					'backgroundImageParallax'         => false,
					'backgroundImageSize'             => 'custom',
					'backgroundImageSizeX'            => '40',
					'backgroundImageSizeUnitX'        => 'px',
					'backgroundImageSizeY'            => '1',
					'backgroundImageSizeUnitY'        => 'px',
					'backgroundImageRepeat'           => 'repeat',
					'backgroundImageOnOverlay'        => true,
					'backgroundImageOnOverlayOpacity' => 15,
				],
				'style'          => [
					'backgroundSize'   => '20px 1px',
					'backgroundRepeat' => 'repeat',
				],
			],
			[
				'name'           => 'border-dark',
				'image'          => "${image_dir}/border-dark.svg",
				'useDarkPreview' => false,
				'value'          => [
					'backgroundType'                  => 'image',
					'backgroundImageID'               => - 1,
					'focalPoint'                      => null,
					'backgroundImageParallax'         => false,
					'backgroundImageSize'             => 'custom',
					'backgroundImageSizeX'            => '1',
					'backgroundImageSizeUnitX'        => 'px',
					'backgroundImageSizeY'            => '40',
					'backgroundImageSizeUnitY'        => 'px',
					'backgroundImageRepeat'           => 'repeat',
					'backgroundImageOnOverlay'        => false,
					'backgroundImageOnOverlayOpacity' => 80,
				],
				'style'          => [
					'backgroundSize'   => '1px 20px',
					'backgroundRepeat' => 'repeat',
				],
			],
			[
				'name'           => 'border-light',
				'image'          => "${image_dir}/border-light.svg",
				'useDarkPreview' => true,
				'value'          => [
					'backgroundType'                  => 'image',
					'backgroundImageID'               => - 1,
					'focalPoint'                      => null,
					'backgroundImageParallax'         => false,
					'backgroundImageSize'             => 'custom',
					'backgroundImageSizeX'            => '1',
					'backgroundImageSizeUnitX'        => 'px',
					'backgroundImageSizeY'            => '40',
					'backgroundImageSizeUnitY'        => 'px',
					'backgroundImageRepeat'           => 'repeat',
					'backgroundImageOnOverlay'        => true,
					'backgroundImageOnOverlayOpacity' => 15,
				],
				'style'          => [
					'backgroundSize'   => '1px 20px',
					'backgroundRepeat' => 'repeat',
				],
			],
			[
				'name'           => 'diagonal-stripes-dark',
				'image'          => "${image_dir}/diagonal-stripes-dark.svg",
				'useDarkPreview' => false,
				'value'          => [
					'backgroundType'                  => 'image',
					'backgroundImageID'               => - 1,
					'focalPoint'                      => null,
					'backgroundImageParallax'         => false,
					'backgroundImageSize'             => 'custom',
					'backgroundImageSizeX'            => '40',
					'backgroundImageSizeUnitX'        => 'px',
					'backgroundImageSizeY'            => '40',
					'backgroundImageSizeUnitY'        => 'px',
					'backgroundImageRepeat'           => 'repeat',
					'backgroundImageOnOverlay'        => false,
					'backgroundImageOnOverlayOpacity' => 80,
				],
				'style'          => [
					'backgroundSize'   => '20px 20px',
					'backgroundRepeat' => 'repeat',
				],
			],
			[
				'name'           => 'diagonal-stripes-light',
				'image'          => "${image_dir}/diagonal-stripes-light.svg",
				'useDarkPreview' => true,
				'value'          => [
					'backgroundType'                  => 'image',
					'backgroundImageID'               => - 1,
					'focalPoint'                      => null,
					'backgroundImageParallax'         => false,
					'backgroundImageSize'             => 'custom',
					'backgroundImageSizeX'            => '40',
					'backgroundImageSizeUnitX'        => 'px',
					'backgroundImageSizeY'            => '40',
					'backgroundImageSizeUnitY'        => 'px',
					'backgroundImageRepeat'           => 'repeat',
					'backgroundImageOnOverlay'        => true,
					'backgroundImageOnOverlayOpacity' => 15,
				],
				'style'          => [
					'backgroundSize'   => '20px 20px',
					'backgroundRepeat' => 'repeat',
				],
			],
			[
				'name'           => 'texture-dark',
				'image'          => "${image_dir}/texture-dark.svg",
				'useDarkPreview' => false,
				'value'          => [
					'backgroundType'                  => 'image',
					'backgroundImageID'               => - 1,
					'focalPoint'                      => null,
					'backgroundImageParallax'         => false,
					'backgroundImageSize'             => 'custom',
					'backgroundImageSizeX'            => '4',
					'backgroundImageSizeUnitX'        => 'px',
					'backgroundImageSizeY'            => '4',
					'backgroundImageSizeUnitY'        => 'px',
					'backgroundImageRepeat'           => 'repeat',
					'backgroundImageOnOverlay'        => false,
					'backgroundImageOnOverlayOpacity' => 80,
				],
				'style'          => [
					'backgroundSize'   => '4px 4px',
					'backgroundRepeat' => 'repeat',
				],
			],
			[
				'name'           => 'texture-light',
				'image'          => "${image_dir}/texture-light.svg",
				'useDarkPreview' => true,
				'value'          => [
					'backgroundType'                  => 'image',
					'backgroundImageID'               => - 1,
					'focalPoint'                      => null,
					'backgroundImageParallax'         => false,
					'backgroundImageSize'             => 'custom',
					'backgroundImageSizeX'            => '4',
					'backgroundImageSizeUnitX'        => 'px',
					'backgroundImageSizeY'            => '4',
					'backgroundImageSizeUnitY'        => 'px',
					'backgroundImageRepeat'           => 'repeat',
					'backgroundImageOnOverlay'        => true,
					'backgroundImageOnOverlayOpacity' => 50,
				],
				'style'          => [
					'backgroundSize'   => '4px 4px',
					'backgroundRepeat' => 'repeat',
				],
			],
			[
				'name'           => 'jigsaw-dark',
				'image'          => "${image_dir}/jigsaw-dark.svg",
				'useDarkPreview' => false,
				'value'          => [
					'backgroundType'                  => 'image',
					'backgroundImageID'               => - 1,
					'focalPoint'                      => null,
					'backgroundImageParallax'         => false,
					'backgroundImageSize'             => 'custom',
					'backgroundImageSizeX'            => '192',
					'backgroundImageSizeUnitX'        => 'px',
					'backgroundImageSizeY'            => '192',
					'backgroundImageSizeUnitY'        => 'px',
					'backgroundImageRepeat'           => 'repeat',
					'backgroundImageOnOverlay'        => false,
					'backgroundImageOnOverlayOpacity' => 80,
				],
				'style'          => [
					'backgroundSize'   => '48px 48px',
					'backgroundRepeat' => 'repeat',
				],
			],
			[
				'name'           => 'jigsaw-light',
				'image'          => "${image_dir}/jigsaw-light.svg",
				'useDarkPreview' => true,
				'value'          => [
					'backgroundType'                  => 'image',
					'backgroundImageID'               => - 1,
					'focalPoint'                      => null,
					'backgroundImageParallax'         => false,
					'backgroundImageSize'             => 'custom',
					'backgroundImageSizeX'            => '192',
					'backgroundImageSizeUnitX'        => 'px',
					'backgroundImageSizeY'            => '192',
					'backgroundImageSizeUnitY'        => 'px',
					'backgroundImageRepeat'           => 'repeat',
					'backgroundImageOnOverlay'        => true,
					'backgroundImageOnOverlayOpacity' => 50,
				],
				'style'          => [
					'backgroundSize'   => '48px 48px',
					'backgroundRepeat' => 'repeat',
				],
			],
			[
				'name'           => 'hexagons-dark',
				'image'          => "${image_dir}/hexagons-dark.svg",
				'useDarkPreview' => false,
				'value'          => [
					'backgroundType'                  => 'image',
					'backgroundImageID'               => - 1,
					'focalPoint'                      => null,
					'backgroundImageParallax'         => false,
					'backgroundImageSize'             => 'custom',
					'backgroundImageSizeX'            => '28',
					'backgroundImageSizeUnitX'        => 'px',
					'backgroundImageSizeY'            => '49',
					'backgroundImageSizeUnitY'        => 'px',
					'backgroundImageRepeat'           => 'repeat',
					'backgroundImageOnOverlay'        => false,
					'backgroundImageOnOverlayOpacity' => 80,
				],
				'style'          => [
					'backgroundSize'   => '28px 49px',
					'backgroundRepeat' => 'repeat',
				],
			],
			[
				'name'           => 'hexagons-light',
				'image'          => "${image_dir}/hexagons-light.svg",
				'useDarkPreview' => true,
				'value'          => [
					'backgroundType'                  => 'image',
					'backgroundImageID'               => - 1,
					'focalPoint'                      => null,
					'backgroundImageParallax'         => false,
					'backgroundImageSize'             => 'custom',
					'backgroundImageSizeX'            => '28',
					'backgroundImageSizeUnitX'        => 'px',
					'backgroundImageSizeY'            => '49',
					'backgroundImageSizeUnitY'        => 'px',
					'backgroundImageRepeat'           => 'repeat',
					'backgroundImageOnOverlay'        => true,
					'backgroundImageOnOverlayOpacity' => 50,
				],
				'style'          => [
					'backgroundSize'   => '28px 49px',
					'backgroundRepeat' => 'repeat',
				],
			],
			[
				'name'           => 'overlapping-circles-dark',
				'image'          => "${image_dir}/overlapping-circles-dark.svg",
				'useDarkPreview' => false,
				'value'          => [
					'backgroundType'                  => 'image',
					'backgroundImageID'               => - 1,
					'focalPoint'                      => null,
					'backgroundImageParallax'         => false,
					'backgroundImageSize'             => 'custom',
					'backgroundImageSizeX'            => '40',
					'backgroundImageSizeUnitX'        => 'px',
					'backgroundImageSizeY'            => '40',
					'backgroundImageSizeUnitY'        => 'px',
					'backgroundImageRepeat'           => 'repeat',
					'backgroundImageOnOverlay'        => false,
					'backgroundImageOnOverlayOpacity' => 80,
				],
				'style'          => [
					'backgroundSize'   => '20px 20px',
					'backgroundRepeat' => 'repeat',
				],
			],
			[
				'name'           => 'overlapping-circles-light',
				'image'          => "${image_dir}/overlapping-circles-light.svg",
				'useDarkPreview' => true,
				'value'          => [
					'backgroundType'                  => 'image',
					'backgroundImageID'               => - 1,
					'focalPoint'                      => null,
					'backgroundImageParallax'         => false,
					'backgroundImageSize'             => 'custom',
					'backgroundImageSizeX'            => '40',
					'backgroundImageSizeUnitX'        => 'px',
					'backgroundImageSizeY'            => '40',
					'backgroundImageSizeUnitY'        => 'px',
					'backgroundImageRepeat'           => 'repeat',
					'backgroundImageOnOverlay'        => true,
					'backgroundImageOnOverlayOpacity' => 50,
				],
				'style'          => [
					'backgroundSize'   => '20px 20px',
					'backgroundRepeat' => 'repeat',
				],
			],
			[
				'name'           => 'plus-dark',
				'image'          => "${image_dir}/plus-dark.svg",
				'useDarkPreview' => false,
				'value'          => [
					'backgroundType'                  => 'image',
					'backgroundImageID'               => - 1,
					'focalPoint'                      => null,
					'backgroundImageParallax'         => false,
					'backgroundImageSize'             => 'custom',
					'backgroundImageSizeX'            => '30',
					'backgroundImageSizeUnitX'        => 'px',
					'backgroundImageSizeY'            => '30',
					'backgroundImageSizeUnitY'        => 'px',
					'backgroundImageRepeat'           => 'repeat',
					'backgroundImageOnOverlay'        => false,
					'backgroundImageOnOverlayOpacity' => 80,
				],
				'style'          => [
					'backgroundSize'   => '15px 15px',
					'backgroundRepeat' => 'repeat',
				],
			],
			[
				'name'           => 'plus-light',
				'image'          => "${image_dir}/plus-light.svg",
				'useDarkPreview' => true,
				'value'          => [
					'backgroundType'                  => 'image',
					'backgroundImageID'               => - 1,
					'focalPoint'                      => null,
					'backgroundImageParallax'         => false,
					'backgroundImageSize'             => 'custom',
					'backgroundImageSizeX'            => '30',
					'backgroundImageSizeUnitX'        => 'px',
					'backgroundImageSizeY'            => '30',
					'backgroundImageSizeUnitY'        => 'px',
					'backgroundImageRepeat'           => 'repeat',
					'backgroundImageOnOverlay'        => true,
					'backgroundImageOnOverlayOpacity' => 50,
				],
				'style'          => [
					'backgroundSize'   => '15px 15px',
					'backgroundRepeat' => 'repeat',
				],
			],
			[
				'name'           => 'bubbles-dark',
				'image'          => "${image_dir}/bubbles-dark.svg",
				'useDarkPreview' => false,
				'value'          => [
					'backgroundType'                  => 'image',
					'backgroundImageID'               => - 1,
					'focalPoint'                      => null,
					'backgroundImageParallax'         => false,
					'backgroundImageSize'             => 'custom',
					'backgroundImageSizeX'            => '50',
					'backgroundImageSizeUnitX'        => 'px',
					'backgroundImageSizeY'            => '50',
					'backgroundImageSizeUnitY'        => 'px',
					'backgroundImageRepeat'           => 'repeat',
					'backgroundImageOnOverlay'        => false,
					'backgroundImageOnOverlayOpacity' => 80,
				],
				'style'          => [
					'backgroundSize'   => '40px 40px',
					'backgroundRepeat' => 'repeat',
				],
			],
			[
				'name'           => 'bubbles-light',
				'image'          => "${image_dir}/bubbles-light.svg",
				'useDarkPreview' => true,
				'value'          => [
					'backgroundType'                  => 'image',
					'backgroundImageID'               => - 1,
					'focalPoint'                      => null,
					'backgroundImageParallax'         => false,
					'backgroundImageSize'             => 'custom',
					'backgroundImageSizeX'            => '50',
					'backgroundImageSizeUnitX'        => 'px',
					'backgroundImageSizeY'            => '50',
					'backgroundImageSizeUnitY'        => 'px',
					'backgroundImageRepeat'           => 'repeat',
					'backgroundImageOnOverlay'        => true,
					'backgroundImageOnOverlayOpacity' => 50,
				],
				'style'          => [
					'backgroundSize'   => '40px 40px',
					'backgroundRepeat' => 'repeat',
				],
			],
			[
				'name'           => 'sprinkle-dark',
				'image'          => "${image_dir}/sprinkle-dark.svg",
				'useDarkPreview' => false,
				'value'          => [
					'backgroundType'                  => 'image',
					'backgroundImageID'               => - 1,
					'focalPoint'                      => null,
					'backgroundImageParallax'         => false,
					'backgroundImageSize'             => 'cover',
					'backgroundImageRepeat'           => 'no-repeat',
					'backgroundImageOnOverlay'        => false,
					'backgroundImageOnOverlayOpacity' => 80,
				],
				'style'          => [
					'backgroundPosition' => '50% 50%',
					'backgroundSize'     => 'cover',
					'backgroundRepeat'   => 'no-repeat',
				],
			],
			[
				'name'           => 'sprinkle-light',
				'image'          => "${image_dir}/sprinkle-light.svg",
				'useDarkPreview' => true,
				'value'          => [
					'backgroundType'                  => 'image',
					'backgroundImageID'               => - 1,
					'focalPoint'                      => null,
					'backgroundImageParallax'         => false,
					'backgroundImageSize'             => 'cover',
					'backgroundImageRepeat'           => 'no-repeat',
					'backgroundImageOnOverlay'        => true,
					'backgroundImageOnOverlayOpacity' => 50,
				],
				'style'          => [
					'backgroundPosition' => '50% 50%',
					'backgroundSize'     => 'cover',
					'backgroundRepeat'   => 'no-repeat',
				],
			],
			[
				'name'           => 'meteor-up-down-dark',
				'image'          => "${image_dir}/meteor-up-down-dark.svg",
				'useDarkPreview' => false,
				'value'          => [
					'backgroundType'                  => 'image',
					'backgroundImageID'               => - 1,
					'focalPoint'                      => null,
					'backgroundImageParallax'         => false,
					'backgroundImageSize'             => 'cover',
					'backgroundImageRepeat'           => 'no-repeat',
					'backgroundImageOnOverlay'        => false,
					'backgroundImageOnOverlayOpacity' => 80,
				],
				'style'          => [
					'backgroundPosition' => '50% 50%',
					'backgroundSize'     => 'cover',
					'backgroundRepeat'   => 'no-repeat',
				],
			],
			[
				'name'           => 'meteor-up-down-light',
				'image'          => "${image_dir}/meteor-up-down-light.svg",
				'useDarkPreview' => true,
				'value'          => [
					'backgroundType'                  => 'image',
					'backgroundImageID'               => - 1,
					'focalPoint'                      => null,
					'backgroundImageParallax'         => false,
					'backgroundImageSize'             => 'cover',
					'backgroundImageRepeat'           => 'no-repeat',
					'backgroundImageOnOverlay'        => true,
					'backgroundImageOnOverlayOpacity' => 50,
				],
				'style'          => [
					'backgroundPosition' => '50% 50%',
					'backgroundSize'     => 'cover',
					'backgroundRepeat'   => 'no-repeat',
				],
			],
			[
				'name'           => 'meteor-left-right-dark',
				'image'          => "${image_dir}/meteor-left-right-dark.svg",
				'useDarkPreview' => false,
				'value'          => [
					'backgroundType'                  => 'image',
					'backgroundImageID'               => - 1,
					'focalPoint'                      => null,
					'backgroundImageParallax'         => false,
					'backgroundImageSize'             => 'cover',
					'backgroundImageRepeat'           => 'no-repeat',
					'backgroundImageOnOverlay'        => false,
					'backgroundImageOnOverlayOpacity' => 80,
				],
				'style'          => [
					'backgroundPosition' => '50% 50%',
					'backgroundSize'     => 'cover',
					'backgroundRepeat'   => 'no-repeat',
				],
			],
			[
				'name'           => 'meteor-left-right-light',
				'image'          => "${image_dir}/meteor-left-right-light.svg",
				'useDarkPreview' => true,
				'value'          => [
					'backgroundType'                  => 'image',
					'backgroundImageID'               => - 1,
					'focalPoint'                      => null,
					'backgroundImageParallax'         => false,
					'backgroundImageSize'             => 'cover',
					'backgroundImageRepeat'           => 'no-repeat',
					'backgroundImageOnOverlay'        => true,
					'backgroundImageOnOverlayOpacity' => 50,
				],
				'style'          => [
					'backgroundPosition' => '50% 50%',
					'backgroundSize'     => 'cover',
					'backgroundRepeat'   => 'no-repeat',
				],
			],
			[
				'name'           => 'meteor-topleft-bottomright-dark',
				'image'          => "${image_dir}/meteor-topleft-bottomright-dark.svg",
				'useDarkPreview' => false,
				'value'          => [
					'backgroundType'                  => 'image',
					'backgroundImageID'               => - 1,
					'focalPoint'                      => null,
					'backgroundImageParallax'         => false,
					'backgroundImageSize'             => 'cover',
					'backgroundImageRepeat'           => 'no-repeat',
					'backgroundImageOnOverlay'        => false,
					'backgroundImageOnOverlayOpacity' => 80,
				],
				'style'          => [
					'backgroundPosition' => '50% 50%',
					'backgroundSize'     => 'cover',
					'backgroundRepeat'   => 'no-repeat',
				],
			],
			[
				'name'           => 'meteor-topleft-bottomright-light',
				'image'          => "${image_dir}/meteor-topleft-bottomright-light.svg",
				'useDarkPreview' => true,
				'value'          => [
					'backgroundType'                  => 'image',
					'backgroundImageID'               => - 1,
					'focalPoint'                      => null,
					'backgroundImageParallax'         => false,
					'backgroundImageSize'             => 'cover',
					'backgroundImageRepeat'           => 'no-repeat',
					'backgroundImageOnOverlay'        => true,
					'backgroundImageOnOverlayOpacity' => 50,
				],
				'style'          => [
					'backgroundPosition' => '50% 50%',
					'backgroundSize'     => 'cover',
					'backgroundRepeat'   => 'no-repeat',
				],
			],
			[
				'name'           => 'meteor-topright-bottomleft-dark',
				'image'          => "${image_dir}/meteor-topright-bottomleft-dark.svg",
				'useDarkPreview' => false,
				'value'          => [
					'backgroundType'                  => 'image',
					'backgroundImageID'               => - 1,
					'focalPoint'                      => null,
					'backgroundImageParallax'         => false,
					'backgroundImageSize'             => 'cover',
					'backgroundImageRepeat'           => 'no-repeat',
					'backgroundImageOnOverlay'        => false,
					'backgroundImageOnOverlayOpacity' => 80,
				],
				'style'          => [
					'backgroundPosition' => '50% 50%',
					'backgroundSize'     => 'cover',
					'backgroundRepeat'   => 'no-repeat',
				],
			],
			[
				'name'           => 'meteor-topright-bottomleft-light',
				'image'          => "${image_dir}/meteor-topright-bottomleft-light.svg",
				'useDarkPreview' => true,
				'value'          => [
					'backgroundType'                  => 'image',
					'backgroundImageID'               => - 1,
					'focalPoint'                      => null,
					'backgroundImageParallax'         => false,
					'backgroundImageSize'             => 'cover',
					'backgroundImageRepeat'           => 'no-repeat',
					'backgroundImageOnOverlay'        => true,
					'backgroundImageOnOverlayOpacity' => 50,
				],
				'style'          => [
					'backgroundPosition' => '50% 50%',
					'backgroundSize'     => 'cover',
					'backgroundRepeat'   => 'no-repeat',
				],
			],
			[
				'name'           => 'curve-line-topleft-dark',
				'image'          => "${image_dir}/curve-line-topleft-dark.svg",
				'useDarkPreview' => false,
				'value'          => [
					'backgroundType'                  => 'image',
					'backgroundImageID'               => - 1,
					'focalPoint'                      => null,
					'backgroundImageParallax'         => false,
					'backgroundImageSize'             => 'cover',
					'backgroundImageRepeat'           => 'no-repeat',
					'backgroundImageOnOverlay'        => false,
					'backgroundImageOnOverlayOpacity' => 80,
				],
				'style'          => [
					'backgroundPosition' => '50% 50%',
					'backgroundSize'     => 'cover',
					'backgroundRepeat'   => 'no-repeat',
				],
			],
			[
				'name'           => 'curve-line-topleft-light',
				'image'          => "${image_dir}/curve-line-topleft-light.svg",
				'useDarkPreview' => true,
				'value'          => [
					'backgroundType'                  => 'image',
					'backgroundImageID'               => - 1,
					'focalPoint'                      => null,
					'backgroundImageParallax'         => false,
					'backgroundImageSize'             => 'cover',
					'backgroundImageRepeat'           => 'no-repeat',
					'backgroundImageOnOverlay'        => true,
					'backgroundImageOnOverlayOpacity' => 50,
				],
				'style'          => [
					'backgroundPosition' => '50% 50%',
					'backgroundSize'     => 'cover',
					'backgroundRepeat'   => 'no-repeat',
				],
			],
			[
				'name'           => 'curve-line-topright-dark',
				'image'          => "${image_dir}/curve-line-topright-dark.svg",
				'useDarkPreview' => false,
				'value'          => [
					'backgroundType'                  => 'image',
					'backgroundImageID'               => - 1,
					'focalPoint'                      => null,
					'backgroundImageParallax'         => false,
					'backgroundImageSize'             => 'cover',
					'backgroundImageRepeat'           => 'no-repeat',
					'backgroundImageOnOverlay'        => false,
					'backgroundImageOnOverlayOpacity' => 80,
				],
				'style'          => [
					'backgroundPosition' => '50% 50%',
					'backgroundSize'     => 'cover',
					'backgroundRepeat'   => 'no-repeat',
				],
			],
			[
				'name'           => 'curve-line-topright-light',
				'image'          => "${image_dir}/curve-line-topright-light.svg",
				'useDarkPreview' => true,
				'value'          => [
					'backgroundType'                  => 'image',
					'backgroundImageID'               => - 1,
					'focalPoint'                      => null,
					'backgroundImageParallax'         => false,
					'backgroundImageSize'             => 'cover',
					'backgroundImageRepeat'           => 'no-repeat',
					'backgroundImageOnOverlay'        => true,
					'backgroundImageOnOverlayOpacity' => 50,
				],
				'style'          => [
					'backgroundPosition' => '50% 50%',
					'backgroundSize'     => 'cover',
					'backgroundRepeat'   => 'no-repeat',
				],
			],
			[
				'name'           => 'curve-line-bottomleft-dark',
				'image'          => "${image_dir}/curve-line-bottomleft-dark.svg",
				'useDarkPreview' => false,
				'value'          => [
					'backgroundType'                  => 'image',
					'backgroundImageID'               => - 1,
					'focalPoint'                      => null,
					'backgroundImageParallax'         => false,
					'backgroundImageSize'             => 'cover',
					'backgroundImageRepeat'           => 'no-repeat',
					'backgroundImageOnOverlay'        => false,
					'backgroundImageOnOverlayOpacity' => 80,
				],
				'style'          => [
					'backgroundPosition' => '50% 50%',
					'backgroundSize'     => 'cover',
					'backgroundRepeat'   => 'no-repeat',
				],
			],
			[
				'name'           => 'curve-line-bottomleft-light',
				'image'          => "${image_dir}/curve-line-bottomleft-light.svg",
				'useDarkPreview' => true,
				'value'          => [
					'backgroundType'                  => 'image',
					'backgroundImageID'               => - 1,
					'focalPoint'                      => null,
					'backgroundImageParallax'         => false,
					'backgroundImageSize'             => 'cover',
					'backgroundImageRepeat'           => 'no-repeat',
					'backgroundImageOnOverlay'        => true,
					'backgroundImageOnOverlayOpacity' => 50,
				],
				'style'          => [
					'backgroundPosition' => '50% 50%',
					'backgroundSize'     => 'cover',
					'backgroundRepeat'   => 'no-repeat',
				],
			],
			[
				'name'           => 'curve-line-bottomright-dark',
				'image'          => "${image_dir}/curve-line-bottomright-dark.svg",
				'useDarkPreview' => false,
				'value'          => [
					'backgroundType'                  => 'image',
					'backgroundImageID'               => - 1,
					'focalPoint'                      => null,
					'backgroundImageParallax'         => false,
					'backgroundImageSize'             => 'cover',
					'backgroundImageRepeat'           => 'no-repeat',
					'backgroundImageOnOverlay'        => false,
					'backgroundImageOnOverlayOpacity' => 80,
				],
				'style'          => [
					'backgroundPosition' => '50% 50%',
					'backgroundSize'     => 'cover',
					'backgroundRepeat'   => 'no-repeat',
				],
			],
			[
				'name'           => 'curve-line-bottomright-light',
				'image'          => "${image_dir}/curve-line-bottomright-light.svg",
				'useDarkPreview' => true,
				'value'          => [
					'backgroundType'                  => 'image',
					'backgroundImageID'               => - 1,
					'focalPoint'                      => null,
					'backgroundImageParallax'         => false,
					'backgroundImageSize'             => 'cover',
					'backgroundImageRepeat'           => 'no-repeat',
					'backgroundImageOnOverlay'        => true,
					'backgroundImageOnOverlayOpacity' => 50,
				],
				'style'          => [
					'backgroundPosition' => '50% 50%',
					'backgroundSize'     => 'cover',
					'backgroundRepeat'   => 'no-repeat',
				],
			],
			[
				'name'           => 'circuit-board-dark',
				'image'          => "${image_dir}/circuit-board-dark.svg",
				'useDarkPreview' => false,
				'value'          => [
					'backgroundType'                  => 'image',
					'backgroundImageID'               => - 1,
					'focalPoint'                      => null,
					'backgroundImageParallax'         => false,
					'backgroundImageSize'             => 'cover',
					'backgroundImageRepeat'           => 'no-repeat',
					'backgroundImageOnOverlay'        => false,
					'backgroundImageOnOverlayOpacity' => 80,
				],
				'style'          => [
					'backgroundPosition' => '50% 50%',
					'backgroundSize'     => 'cover',
					'backgroundRepeat'   => 'no-repeat',
				],
			],
			[
				'name'           => 'circuit-board-light',
				'image'          => "${image_dir}/circuit-board-light.svg",
				'useDarkPreview' => true,
				'value'          => [
					'backgroundType'                  => 'image',
					'backgroundImageID'               => - 1,
					'focalPoint'                      => null,
					'backgroundImageParallax'         => false,
					'backgroundImageSize'             => 'cover',
					'backgroundImageRepeat'           => 'no-repeat',
					'backgroundImageOnOverlay'        => true,
					'backgroundImageOnOverlayOpacity' => 30,
				],
				'style'          => [
					'backgroundPosition' => '50% 50%',
					'backgroundSize'     => 'cover',
					'backgroundRepeat'   => 'no-repeat',
				],
			],
		];
	}

}

new Section();
