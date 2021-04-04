import Vue from 'vue';
import App from './app';
import store from './store/index';
import Toasted from 'vue-toasted';

Vue.use( Toasted );

new Vue( {
	el: '#app',
	store,
	components: {
		App,
	},
} );
