<script setup lang="ts">
	import useMovieStore from '../stores/MovieStore';
	const store = useMovieStore();

	function filter(key: 'rating' | 'year', order: 'asc' | 'desc') {
		store.filter.key = key;
		store.filter.order = order;
	}
</script>

<template>
	<div id="filters">
		<h3>Filters</h3>
		<p
			@click="filter('rating', 'desc')"
			:style="{
				color:
					store.filter.key === 'rating' && store.filter.order === 'desc'
						? 'white'
						: 'rgb(143, 143, 143)',
			}">
			Rating highest
		</p>
		<p
			@click="filter('rating', 'asc')"
			:style="{
				color:
					store.filter.key === 'rating' && store.filter.order === 'asc'
						? 'white'
						: 'rgb(143, 143, 143)',
			}">
			Rating lowest
		</p>
		<p
			@click="filter('year', 'desc')"
			:style="{
				color:
					store.filter.key === 'year' && store.filter.order === 'desc'
						? 'white'
						: 'rgb(143, 143, 143)',
			}">
			Year newest
		</p>
		<p
			@click="filter('year', 'asc')"
			:style="{
				color:
					store.filter.key === 'year' && store.filter.order === 'asc'
						? 'white'
						: 'rgb(143, 143, 143)',
			}">
			Year oldest
		</p>
	</div>
</template>

<style lang="scss" scoped>
	#filters {
		text-align: left;
		color: rgb(143, 143, 143);
		cursor: pointer;

		p {
			margin-left: 10px;
		}
	}
</style>
