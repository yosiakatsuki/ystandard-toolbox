import Vue from 'vue';
import Vuex from 'vuex';
import 'es6-promise/auto';
import schema from '../schema.json';
import getDefaultFontSize from '../_getDefaultFontSize.js';

Vue.use( Vuex );

const store = new Vuex.Store( {
	state: {
		options: null
	},
	getters: {},
	mutations: {
		updateOption( state, data ) {
			let newOptions = { ...state.options };
			newOptions[ data.level ][ data.name ] = data.value;
			state.options = { ...newOptions };
		},
		initOptions( state ) {
			let defaultOptions = {};
			for ( var i = 1; i <= 6; i++ ) {
				defaultOptions[ `h${ i }` ] = { ...schema };
				defaultOptions[ `h${ i }` ][ 'fontSizePc' ] = getDefaultFontSize( `h${ i }` );
				defaultOptions[ `h${ i }` ][ 'fontSizeTablet' ] = getDefaultFontSize( `h${ i }` );
				defaultOptions[ `h${ i }` ][ 'fontSizeMobile' ] = getDefaultFontSize( `h${ i }` );
			}
			state.options = window.ystdtbHeadingData ? window.ystdtbHeadingData : defaultOptions;
		}

	},
	actions: {}
} );

export default store;
