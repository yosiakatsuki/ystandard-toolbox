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
			let Options = {};
			for ( var i = 1; i <= 6; i++ ) {
				Options[ `h${ i }` ] = { ...schema };
				Options[ `h${ i }` ][ 'fontSizePc' ] = getDefaultFontSize( `h${ i }` );
				Options[ `h${ i }` ][ 'fontSizeTablet' ] = getDefaultFontSize( `h${ i }` );
				Options[ `h${ i }` ][ 'fontSizeMobile' ] = getDefaultFontSize( `h${ i }` );
				if ( `h${ i }` in window.ystdtbHeadingData ) {
					Options[ `h${ i }` ] = {
						...Options[ `h${ i }` ],
						...window.ystdtbHeadingData[ `h${ i }` ]
					}
				}
			}
			state.options = Options;
		},
		resetOptions( state, data ) {
			let newOptions = { ...state.options };
			newOptions[ data.level ] = { ...schema };
			state.options = newOptions;
		}

	},
	actions: {}
} );

export default store;
