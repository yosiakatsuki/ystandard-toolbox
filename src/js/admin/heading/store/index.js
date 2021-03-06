import Vue from 'vue';
import Vuex from 'vuex';
import 'es6-promise/auto';
import schema from '../schema.json';
import getDefaultFontSize from '../_getDefaultFontSize.js';
import _getHeadingTypes from '../_getHeadingTypes';

Vue.use( Vuex );

const store = new Vuex.Store( {
	state: {
		options: null,
	},
	getters: {},
	mutations: {
		updateOption( state, data ) {
			const newOptions = { ...state.options };
			newOptions[ data.level ][ data.name ] = data.value;
			state.options = { ...newOptions };
		},
		initOptions( state ) {
			const Options = {};
			const types = _getHeadingTypes();
			for ( let i = 0; i < types.length; i++ ) {
				const level = types[ i ].level;
				Options[ level ] = { ...schema };
				Options[ level ].fontSizePc = getDefaultFontSize( level );
				Options[ level ].fontSizeTablet = getDefaultFontSize( level );
				Options[ level ].fontSizeMobile = getDefaultFontSize( level );
				if ( level in window.ystdtbHeadingData ) {
					Options[ level ] = {
						...Options[ level ],
						...window.ystdtbHeadingData[ level ],
					};
				}
			}
			state.options = Options;
		},
		resetOptions( state, data ) {
			const newOptions = { ...state.options };
			const fontSize = getDefaultFontSize( data.level );
			newOptions[ data.level ] = {
				...schema,
				...{
					fontSizePc: fontSize,
					fontSizeTablet: fontSize,
					fontSizeMobile: fontSize,
				},
			};
			state.options = newOptions;
		},
		resetCustom( state, data ) {
			const newOptions = { ...state.options };
			newOptions[ data.level ] = {
				...schema,
				...{
					useCustomStyle: state.options[ data.level ].useCustomStyle,
					fontSizeResponsive:
						state.options[ data.level ].fontSizeResponsive,
					fontSizePc: state.options[ data.level ].fontSizePc,
					fontSizeTablet: state.options[ data.level ].fontSizeTablet,
					fontSizeMobile: state.options[ data.level ].fontSizeMobile,
					fontColor: state.options[ data.level ].fontColor,
					fontAlign: state.options[ data.level ].fontAlign,
					fontWeight: state.options[ data.level ].fontWeight,
					fontStyle: state.options[ data.level ].fontStyle,
					fontAdvanced: state.options[ data.level ].fontAdvanced,
					fontFamily: state.options[ data.level ].fontFamily,
					lineHeight: state.options[ data.level ].lineHeight,
					letterSpacing: state.options[ data.level ].letterSpacing,
				},
			};
			state.options = newOptions;
		},
	},
	actions: {},
} );

export default store;
