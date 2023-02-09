import { render } from "@wordpress/element";

import { getPluginSettings } from "@aktk/plugin-settings/function/setting";
import Migration from "./migration";
import PageBase from "@aktk/plugin-settings/components/page-base";
import Buttons from "@aktk/plugin-settings/components/buttons";
import { ToastContainer } from "@aktk/components/toast-message";

const HeadingCustomize = () => {
	return (
		<PageBase title={"見出しデザイン編集"} loading={isLoading}>
			<Migration />
		</PageBase>
	);
};

render(<HeadingCustomize />, document.getElementById("heading-v2"));
