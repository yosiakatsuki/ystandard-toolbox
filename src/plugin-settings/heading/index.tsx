/**
 * WordPress
 */
import { render, useState, useEffect, createContext } from "@wordpress/element";
/**
 * yStandard
 */
import { apiPost, getEndpoint } from "@aktk/api";
import {
	ToastContainer,
	notifySuccess,
	notifyError,
} from "@aktk/components/toast-message";
import PageBase from "@aktk/plugin-settings/components/page-base";
import Buttons from "@aktk/plugin-settings/components/buttons";
import { getPluginSettings } from "../function/setting";
import WPCustomCss from "../custom-css/wp-custom-css";
import Code from "../custom-css/code";
import { CustomCssContext } from "../custom-css";

export const HeadingContext = createContext();

const HeadingCustomize = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [isUpdate, setIsUpdate] = useState(false);
	const [settings, setSettings] = useState({});
	const initSettings = () => {
		setSettings(getPluginSettings("customCss"));
		setIsLoading(false);
	};
	useEffect(initSettings, []);
	const updateSettings = (value) => {
		setSettings({
			...settings,
			...value,
		});
	};
	const handleOnClickUpdate = () => {
		// setIsUpdate( true );
		// setIsLoading( true );
		// apiPost( {
		// 	endpoint: getEndpoint( 'update_custom_css' ),
		// 	data: settings,
		// 	callback: () => {
		// 		setIsUpdate( false );
		// 		setIsLoading( false );
		// 	},
		// 	messageSuccess: notifySuccess,
		// 	messageError: notifyError,
		// } );
	};
	return (
		<PageBase title={"見出しデザイン編集"} loading={isLoading}>
			<Buttons
				onClickUpdate={handleOnClickUpdate}
				isDisabled={isUpdate}
			/>
			<ToastContainer />
		</PageBase>
	);
};
render(<HeadingCustomize />, document.getElementById("heading-v2"));
