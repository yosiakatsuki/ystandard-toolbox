import {
	ToastContainer as ReactToastifyContainer,
	toast,
} from 'react-toastify';
import type {
	ToastContainerProps,
	ToastOptions,
} from 'react-toastify/dist/types';
// CSS
import 'react-toastify/dist/ReactToastify.min.css';

/**
 * トーストメッセージコンテナ
 *
 * @param props
 */
export const ToastContainer = ( props: ToastContainerProps ) => {
	return (
		<ReactToastifyContainer
			position="bottom-right"
			autoClose={ 3000 }
			hideProgressBar={ false }
			newestOnTop={ false }
			closeOnClick
			rtl={ false }
			pauseOnFocusLoss
			draggable
			pauseOnHover
			{ ...props }
		/>
	);
};

const option = {
	position: 'bottom-right',
	autoClose: 3000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
} as ToastOptions;

/**
 * @param props
 * @param message
 */
export const notifySuccess = ( message = undefined ) => {
	const showMessage = message ?? '更新しました。';
	toast.success( showMessage, option );
};

/**
 * @param props
 * @param message
 */
export const notifyWarning = ( message = undefined ) => {
	const showMessage = message ?? '問題が発生しました。';
	toast.warn( showMessage, option );
};

/**
 * @param props
 * @param message
 */
export const notifyError = ( message = undefined ) => {
	const showMessage = message ?? '問題が発生しました。';
	toast.error( showMessage, option );
};