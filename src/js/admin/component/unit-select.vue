<template>
	<select
		:name="name"
		:id="id"
		:style="style"
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
		props: [ 'value', 'name', 'id', 'style', 'class' ],
		data() {
		},
		computed: {
			unit: {
				get() {
					return this.value;
				},
				set( value ) {
					this.$emit( 'input', value );
				}
			},
			className() {
				return [
					'ystdtb-unit-select'
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
