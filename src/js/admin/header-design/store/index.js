import Vue from 'vue';
import Vuex from 'vuex';
import 'es6-promise/auto';
import options from './options.json';

Vue.use( Vuex );

const store = new Vuex.Store( {
	state: {
		options: null,
	},
	getters: {},
	mutations: {
		updateOption( state, data ) {
			const newOptions = { ...state.options };
			newOptions[ data.name ] = data.value;
			state.options = { ...newOptions };
		},
		initOptions( state ) {
			state.options = {
				...options,
				...window.ystdtbHeaderDesignData,
			};
		},
	},
	actions: {},
} );

export default store;
