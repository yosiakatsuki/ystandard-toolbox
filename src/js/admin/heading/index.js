import Vue from 'vue';
import App from './app';
import store from './store/index';

new Vue( {
	el: '#app',
	store,
	components: {
		'App': App
	}
} );
