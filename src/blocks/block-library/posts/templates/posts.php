<?php
/**
 * 記事一覧ブロック メインテンプレート（リスト・カード共通）
 *
 * テンプレートの上書き:
 *   テーマの ystdtb-templates/posts/posts.php にコピーして編集してください。
 *
 * 利用可能な変数（$args）:
 *
 * @var WP_Query $query 投稿クエリ
 * @var string $list_type 表示タイプ（'card' | 'list'）
 * @var bool $show_img 画像表示
 * @var string $thumbnail_size 画像サイズ（'thumbnail' | 'medium' | 'large' | 'full'）
 * @var string $thumbnail_ratio アスペクト比（'16-9' | '4-3' | '1-1' 等）
 * @var bool $show_date 日付表示
 * @var bool $show_category カテゴリー表示
 * @var string $taxonomy 表示するタクソノミースラッグ（空の場合はデフォルト）
 * @var bool $show_excerpt 概要表示
 * @var string $excerpt_styles 概要のstyle属性
 * @var string $col_class カラム用CSSクラス（例: 'col-sp--1 col-tablet--3 col-pc--3'）
 * @var string $wrapper_class ラッパー要素のCSSクラス
 *
 * @package ystandard-toolbox
 */

defined( 'ABSPATH' ) || die();

// テンプレート変数の展開.
$query           = $args['query'];
$list_type       = $args['list_type'];
$show_img        = $args['show_img'];
$thumbnail_size  = $args['thumbnail_size'];
$thumbnail_ratio = $args['thumbnail_ratio'];
$default_image   = $args['default_image'];
$show_date       = $args['show_date'];
$show_category   = $args['show_category'];
$taxonomy        = $args['taxonomy'];
$show_excerpt    = $args['show_excerpt'];
$excerpt_styles  = $args['excerpt_styles'];
$col_class       = $args['col_class'];
$wrapper_class   = $args['wrapper_class'];
$calendar_icon   = $args['calendar_icon'];
$taxonomy_icon   = $args['taxonomy_icon'];
?>
<div class="<?php echo esc_attr( $wrapper_class ); ?>">
	<ul class="ystdtb-posts__list <?php echo esc_attr( $col_class ); ?>">
		<?php while ( $query->have_posts() ) : ?>
			<?php $query->the_post(); ?>
			<li class="ystdtb-posts__item">
				<a class="ystdtb-posts__link" href="<?php the_permalink(); ?>">

					<?php if ( $show_img ) : ?>
						<figure class="ystdtb-posts__thumbnail is-<?php echo esc_attr( $thumbnail_ratio ); ?>">
							<?php if ( has_post_thumbnail() ) : ?>
								<?php the_post_thumbnail( $thumbnail_size, [ 'class' => 'ystdtb-posts__image' ] ); ?>
							<?php else : ?>
								<?php echo wp_kses_post( $default_image ); ?>
							<?php endif; ?>
						</figure>
					<?php endif; ?>

					<div class="ystdtb-posts__text">
						<?php
						// メタ情報の表示判定.
						$term_data = false;
						if ( $show_category ) {
							$display_taxonomy = ! empty( $taxonomy ) ? $taxonomy : 'category';
							$terms            = get_the_terms( get_the_ID(), $display_taxonomy );
							if ( ! is_wp_error( $terms ) && ! empty( $terms ) ) {
								$term_data = $terms[0];
							}
						}
						?>
						<?php if ( $show_date || $term_data ) : ?>
							<div class="ystdtb-posts__meta">
								<?php if ( $show_date ) : ?>
									<span class="ystdtb-posts__date">
										<?php echo wp_kses_post( $calendar_icon ); ?>
										<time datetime="<?php echo esc_attr( get_the_date( 'Y-m-d' ) ); ?>">
											<?php echo esc_html( get_the_date() ); ?>
										</time>
									</span>
								<?php endif; ?>
								<?php if ( $term_data ) : ?>
									<?php
									$cat_class = esc_attr( $display_taxonomy . '--' . $term_data->slug );
									?>
									<span class="ystdtb-posts__cat <?php echo $cat_class; ?>">
										<?php echo wp_kses_post( $taxonomy_icon ); ?>
										<?php echo esc_html( $term_data->name ); ?>
									</span>
								<?php endif; ?>
							</div>
						<?php endif; ?>

						<p class="ystdtb-posts__title"><?php the_title(); ?></p>

						<?php if ( $show_excerpt ) : ?>
							<p class="ystdtb-posts__excerpt" style="<?php echo esc_attr( $excerpt_styles ); ?>">
								<?php echo esc_html( get_the_excerpt() ); ?>
							</p>
						<?php endif; ?>
					</div>
				</a>
			</li>
		<?php endwhile; ?>
	</ul>
</div>
