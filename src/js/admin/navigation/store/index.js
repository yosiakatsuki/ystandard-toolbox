import Vue from 'vue';
import Vuex from 'vuex';
import 'es6-promise/auto';
import options from './options.json';

Vue.use( Vuex );

// PHPから受け取るデータ.
const localizeScriptData = window.ystdtbNavigationData;

const store = new Vuex.Store( {
	state: {
		options: null,
		config: null,
	},
	getters: {
		options: ( state ) => state.options,
		getOption: ( state ) => ( name ) => {
			return state.options[ name ];
		},
		config: ( state ) => state.config,
		getConfig: ( state ) => ( name ) => {
			return state.config[ name ];
		},
	},
	mutations: {
		updateOption( state, data ) {
			const newOptions = { ...state.options };
			newOptions[ data.name ] = data.value;
			state.options = { ...newOptions };
		},
		initOptions( state ) {
			state.options = {
				...options,
				...localizeScriptData.options,
			};
		},
		initConfig( state ) {
			state.config = {
				...localizeScriptData.config,
			};
		},
	},
	actions: {},
} );

export default store;
