<template>
	<select
		:name="name"
		:style="componentStyle"
		:class="className"
		v-model="unit"
	>
		<option value="px">px</option>
		<option value="em">em</option>
		<option value="rem">rem</option>
	</select>
</template>

<script>
	export default {
		name: 'UnitSelect',
		props: [ 'value', 'name', 'className', 'componentStyle' ],
		computed: {
			unit: {
				get() {
					return this.value;
				},
				set( value ) {
					this.$emit( 'input', value );
				}
			},
			selectClass() {
				return [
					'ystdtb-unit-select',
					...className
				]
			}
		},
	}
</script>

<style lang="scss">
	.ystdtb-unit-select {
		width: 5em !important;
	}
</style>
