export function getBlockEditorConfig(
	name: string,
	defaultValue: unknown = undefined
) {
	if (
		! window.ystdtbBlockEditor ||
		'object' !== typeof window.ystdtbBlockEditor
	) {
		return defaultValue;
	}
	if ( ! window.ystdtbBlockEditor.hasOwnProperty( name ) ) {
		return defaultValue;
	}
	return window.ystdtbBlockEditor[ name ];
}
