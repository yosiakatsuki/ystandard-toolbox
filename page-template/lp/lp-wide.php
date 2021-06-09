<?php
/**
 * Template Name:LP(ワイド) [Toolbox]
 * Template Post Type:post,page
 * Description:LP用テンプレート
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

defined( 'ABSPATH' ) || die();

if ( ! function_exists( 'ystdtb_the_head_attr' ) ) {
	/**
	 * Headタグattr
	 */
	function ystdtb_the_head_attr() {
		if ( function_exists( 'ys_the_head_attr' ) ) {
			ys_the_head_attr();
		}
	}
}

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head <?php ystdtb_the_head_attr(); ?>>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="format-detection" content="telephone=no"/>
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<?php do_action( 'ys_body_prepend' ); ?>
<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content' ); ?></a>
<div id="content" class="site-content">
	<div class="container">
		<div class="content__wrap">
			<?php
			while ( have_posts() ) :
				the_post();
				?>
				<main id="main" class="content__main site-main">
					<article id="post-<?php the_ID(); ?>" <?php post_class( [ 'singular-article' ] ); ?>>
						<div class="entry-content">
							<?php the_content(); ?>
						</div>
					</article>
				</main>
			<?php endwhile; ?>
		</div>
	</div>
</div>
<?php
wp_footer();
do_action( 'ys_body_append' );
?>
</body>
</html>
