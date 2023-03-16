<script setup lang="ts">
	import { onBeforeMount } from 'vue';
	import { useRouter } from 'vue-router';
	import useMovieStore from '../stores/MovieStore';
	import Movie from '../components/Movie.vue';

	const router = useRouter();
	const store = useMovieStore();

	onBeforeMount(() => {
		store.fetchMovie();
	});
</script>

<template>
	<div id="movie-container">
		<Movie
			v-for="movie in store.getMovies"
			:key="movie.id"
			:movie="movie"
			@click="router.push(`/${movie.id}`)"></Movie>
	</div>
</template>

<style lang="scss" scoped>
	#movie-container {
		padding-top: 1rem;
		display: flex;
		flex-wrap: wrap;
		flex-grow: 2;
		justify-content: center;
	}
</style>
