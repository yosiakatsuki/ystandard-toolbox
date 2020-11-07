<?php
/**
 * Code Menu
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();
?>
<div class="code ystdtb-menu__component">
	<h1 class="ystdtb-menu__title is-no-margin">コード追加</h1>
	<?php echo Utility::manual_link_inline( 'manual/ystdtb-add-code' ); ?>
	<div class="code__normal ystdtb-menu__section">
		<div class="code__section">
			<label for="code-head" class="is-block">&lt;Head&gt;に挿入するコード</label>
			<textarea name="<?php echo Code::OPTION_NAME; ?>[head]" id="code-head" class="widefat code-input" rows="8"><?php echo esc_textarea( Code::get_option( 'head' ) ); ?></textarea>
			<?php if ( Utility::is_amp_enable() ) : ?>
				<div class="ystdtb-menu__subtext">
					入力したコードはAMPページでは出力されません。<br>
					AMPページにも出力したい内容は「AMP用コード追加」にも追記してください。
				</div>
			<?php endif; ?>
		</div>
		<div class="code__section">
			<label for="code-head" class="is-block">&lt;body&gt;直後に挿入するコード</label>
			<textarea name="<?php echo Code::OPTION_NAME; ?>[body_open]" id="code-head" class="widefat code-input" rows="8"><?php echo esc_textarea( Code::get_option( 'body_open' ) ); ?></textarea>
			<?php if ( Utility::is_amp_enable() ) : ?>
				<div class="ystdtb-menu__subtext">
					入力したコードはAMPページでは出力されません。<br>
					AMPページにも出力したい内容は「AMP用コード追加」にも追記してください。
				</div>
			<?php endif; ?>
		</div>
		<div class="code__section">
			<label for="code-head" class="is-block">&lt;/body&gt;直前に挿入するコード</label>
			<textarea name="<?php echo Code::OPTION_NAME; ?>[body_close]" id="code-head" class="widefat code-input" rows="8"><?php echo esc_textarea( Code::get_option( 'body_close' ) ); ?></textarea>
			<?php if ( Utility::is_amp_enable() ) : ?>
				<div class="ystdtb-menu__subtext">
					入力したコードはAMPページでは出力されません。<br>
					AMPページにも出力したい内容は「AMP用コード追加」にも追記してください。
				</div>
			<?php endif; ?>
		</div>
		<div class="ystdtb-menu__section">
			<?php submit_button(); ?>
		</div>
	</div>
	<?php if ( Utility::is_amp_enable() ) : ?>
		<div class="code__amp ystdtb-menu__section">
			<h2>AMP用コード追加</h2>
			<div class="code__section">
				<label for="code-head" class="is-block">&lt;Head&gt;に挿入するコード(AMP)</label>
				<textarea name="<?php echo Code::OPTION_NAME; ?>[head_amp]" id="code-head" class="widefat code-input" rows="8"><?php echo esc_textarea( Code::get_option( 'head_amp' ) ); ?></textarea>
			</div>
			<div class="code__section">
				<label for="code-head" class="is-block">&lt;body&gt;直後に挿入するコード(AMP)</label>
				<textarea name="<?php echo Code::OPTION_NAME; ?>[body_open_amp]" id="code-head" class="widefat code-input" rows="8"><?php echo esc_textarea( Code::get_option( 'body_open_amp' ) ); ?></textarea>
			</div>
			<div class="code__section">
				<label for="code-head" class="is-block">&lt;/body&gt;直前に挿入するコード(AMP)</label>
				<textarea name="<?php echo Code::OPTION_NAME; ?>[body_close_amp]" id="code-head" class="widefat code-input" rows="8"><?php echo esc_textarea( Code::get_option( 'body_close_amp' ) ); ?></textarea>
			</div>
		</div>
		<div class="ystdtb-menu__section">
			<?php submit_button(); ?>
		</div>
	<?php endif; ?>
</div>




















































