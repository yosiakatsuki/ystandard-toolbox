import Vue from 'vue';
import Vuex from 'vuex';
import 'es6-promise/auto';
import schema from '../schema.json';
import getDefaultFontSize from '../_getDefaultFontSize.js';
import _getHeadingTypes from "../_getHeadingTypes";

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
			const types = _getHeadingTypes();
			for ( var i = 0; i < types.length; i++ ) {
				let level = types[ i ].level;
				Options[ level ] = { ...schema };
				Options[ level ][ 'fontSizePc' ] = getDefaultFontSize( level );
				Options[ level ][ 'fontSizeTablet' ] = getDefaultFontSize( level );
				Options[ level ][ 'fontSizeMobile' ] = getDefaultFontSize( level );
				if ( level in window.ystdtbHeadingData ) {
					Options[ level ] = {
						...Options[ level ],
						...window.ystdtbHeadingData[ level ]
					}
				}
			}
			state.options = Options;
		},
		resetOptions( state, data ) {
			let newOptions = { ...state.options };
			const fontSize = getDefaultFontSize( data.level );
			newOptions[ data.level ] = {
				...schema,
				...{
					fontSizePc: fontSize,
					fontSizeTablet: fontSize,
					fontSizeMobile: fontSize,
				}
			};
			state.options = newOptions;
		}

	},
	actions: {}
} );

export default store;
