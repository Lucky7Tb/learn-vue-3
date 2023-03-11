<script setup lang="ts">
	import useMovieStore from '../stores/MovieStore';
	import { useRoute } from 'vue-router';
	import { ref } from 'vue';
	const store = useMovieStore();
	const route = useRoute();
	const searchKeyword = ref('');

	function searchMovie() {
		store.searchKeyword = searchKeyword.value;
	}
</script>

<template>
	<div id="navbar-wrap" class="card-shadow">
		<div id="navbar">
			<h2>Movei.io</h2>
			<div v-if="route.path === '/'">
				<input
					v-model="searchKeyword"
					@keyup.enter="searchMovie"
					type="text"
					placeholder="Find Movie..." />
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	#navbar-wrap {
		position: fixed;
		width: 100%;
		z-index: 9999;

		#navbar {
			display: flex;
			padding: 15px;
			justify-content: space-between;
			background-color: #a34c01;

			h2 {
				margin: 0 1rem 0 0;
				color: white;
				cursor: pointer;
			}

			& > div {
				display: flex;
				flex-grow: 2;
				justify-content: flex-end;

				input {
					width: 20%;
					border: none;
					height: 25px;
					border-radius: 10px;
					box-sizing: border-box;
					outline: none;
					padding: 5px;
				}
			}
		}
	}
</style>
