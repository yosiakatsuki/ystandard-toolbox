<?php
/**
 * 記事一覧ブロック シンプルテンプレート
 *
 * テンプレートの上書き:
 *   テーマの ystdtb-templates/posts/posts-simple.php にコピーして編集してください。
 *
 * 利用可能な変数（$args）:
 *
 * @var WP_Query $query           投稿クエリ
 * @var string   $list_type       表示タイプ（'simple'）
 * @var bool     $show_date       日付表示
 * @var bool     $show_category   カテゴリー表示
 * @var string   $taxonomy        表示するタクソノミースラッグ（空の場合はデフォルト）
 * @var bool     $show_excerpt    概要表示
 * @var int      $excerpt_lines  概要の行数
 * @var string   $wrapper_class  ラッパー要素のCSSクラス
 *
 * @package ystandard-toolbox
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

// テンプレート変数の展開.
$query         = $args['query'];
$show_date     = $args['show_date'];
$show_category = $args['show_category'];
$taxonomy      = $args['taxonomy'];
$show_excerpt  = $args['show_excerpt'];
$excerpt_lines = $args['excerpt_lines'];
$wrapper_class = $args['wrapper_class'];
?>
<div class="<?php echo esc_attr( $wrapper_class ); ?>">
	<ul class="ystdtb-posts__list">
		<?php while ( $query->have_posts() ) : ?>
			<?php $query->the_post(); ?>
			<li class="ystdtb-posts__item">
				<a class="ystdtb-posts__link" href="<?php the_permalink(); ?>">

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
										<?php
										// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- SVG出力のため
										echo Posts_Block::get_calendar_icon();
										?>
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
										<?php
										// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- SVG出力のため
										echo Posts_Block::get_taxonomy_icon( $display_taxonomy );
										?>
										<?php echo esc_html( $term_data->name ); ?>
									</span>
								<?php endif; ?>
							</div>
						<?php endif; ?>

						<p class="ystdtb-posts__title"><?php the_title(); ?></p>

						<?php if ( $show_excerpt ) : ?>
							<p class="ystdtb-posts__excerpt" style="<?php echo esc_attr( "-webkit-line-clamp: {$excerpt_lines};" ); ?>">
								<?php echo esc_html( get_the_excerpt() ); ?>
							</p>
						<?php endif; ?>
					</div>

				</a>
			</li>
		<?php endwhile; ?>
	</ul>
</div>
