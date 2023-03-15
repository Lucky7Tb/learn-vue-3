<script setup lang="ts">
	import { ref, reactive } from 'vue';
	import { useRoute, useRouter } from 'vue-router';
	import Navbar from '../components/Navbar.vue';
	import Modal from '../components/Modal.vue';
	import useMovieStore from '../stores/MovieStore';

	const store = useMovieStore();
	const route = useRoute();
	const router = useRouter();

	function getRatingColor() {
		if (form.rating > 7) return '#5eb85e';
		if (form.rating > 4) return '#ffa809';
		return '#e10505';
	}

	const isShowModal = ref(false);
	const movie = store.getMovieById(parseInt(route.params.movieId as string));
	const movieForm = ref<HTMLFormElement | null>(null);
	const form = reactive({
		...movie,
	});

	function updateMovie() {
		store.updateMovie(form.id, {
			...form,
		});
		toggleModal();
	}

	function deleteMovie() {
		store.deleteMovie(parseInt(route.params.movieId as string));
		router.push('/');
	}

	function toggleModal() {
		isShowModal.value = !isShowModal.value;
	}

	function addActor() {
		form.actors.push({ name: '' });
	}
</script>

<template>
	<div>
		<Navbar></Navbar>
		<div id="movie-preview">
			<div id="movie-container">
				<div id="movie-poster">
					<img :src="form.poster" alt="Movie poster" />
				</div>

				<div id="movie-info">
					<div>
						<h1>{{ form.name }}</h1>
						<h3>{{ form.year }}</h3>
						<h3>{{ form.genre }}</h3>
						<h3>
							<span
								id="movie-rating"
								:style="{ 'background-color': getRatingColor() }"
								>{{ form.rating }}</span
							>
						</h3>
						<h3>Budget {{ form.budget }}</h3>
						<h3>Box Office: {{ form.boxOffice }}</h3>
						<h3>
							Actors:
							<span v-for="(actor, index) in form.actors" :key="index">{{
								actor.name
							}}</span>
						</h3>
						<h3>
							<strong>Story Line</strong>
							{{ form.storyline }}
						</h3>
					</div>
					<div id="options">
						<button class="edit" @click="toggleModal">Edit</button>
						<button class="delete" @click="deleteMovie">Delete</button>
					</div>
				</div>
			</div>
		</div>

		<Modal v-if="isShowModal" v-on:close-modal="toggleModal">
			<template v-slot:header>
				<h3 class="m-0">Create new movie</h3>
			</template>
			<template v-slot:body>
				<form @submit.prevent="updateMovie" ref="movieForm" id="movie-form">
					<p>Fill out the details bellow</p>
					<input required v-model="form.name" type="text" placeholder="Name" />
					<input
						required
						v-model="form.year"
						type="number"
						placeholder="Year" />
					<input
						required
						v-model="form.rating"
						type="number"
						placeholder="Rating" />
					<input
						required
						v-model="form.genre"
						type="text"
						placeholder="Genre" />
					<input
						required
						v-model="form.budget"
						type="text"
						placeholder="Budget" />
					<input
						required
						v-model="form.boxOffice"
						type="text"
						placeholder="Box Office" />
					<input
						required
						v-model="form.poster"
						type="text"
						placeholder="Poster" />
					<hr />
					<div>
						<div id="actor-input">
							<p class="m-0">Actors</p>
							<span @click="addActor" class="add-actor">+</span>
						</div>

						<input
							required
							v-for="(_, index) in form.actors"
							:key="index"
							v-model="form.actors[index].name"
							type="text"
							placeholder="Actor" />
					</div>

					<hr />

					<textarea
						required
						v-model="form.storyline"
						placeholder="storyline"
						rows="6"></textarea>
				</form>
			</template>
			<template v-slot:footer>
				<button id="update-movie" @click="movieForm!.requestSubmit()">
					Update
				</button>
			</template>
		</Modal>
	</div>
</template>

<style lang="scss" scoped>
	#movie-form {
		display: flex;
		flex-direction: column;
		text-align: left;

		& > div {
			display: flex;
			flex-direction: column;

			#actor-input {
				display: flex;
				justify-content: space-between;
			}
		}

		.add-actor {
			background-color: green;
			text-align: center;
			color: white;
			margin-left: 5px;
			height: 100%;
			padding: 2px 10px;
			font-size: 20px;
			padding: 1re;
			align-self: center;
			cursor: pointer;
		}
	}

	#update-movie {
		background-color: #5eb85e;
		border: none;
		padding: 5px;
		width: 70px;
		color: white;
		border-radius: 10px;
		cursor: pointer;
		text-transform: uppercase;
		outline: none;
	}

	#movie-preview {
		display: flex;
		overflow: auto;

		#movie-container {
			display: flex;
			justify-content: center;
			flex-grow: 1;
			margin-top: 90px;
			padding: 0 1rem;

			#movie-poster {
				flex-grow: 1;
				min-width: 400px;

				img {
					max-width: 300px;
					box-shadow: 0 14px 28px rgba(0, 0, 0, 0.473),
						0 10px 10px rgba(0, 0, 0, 0.473);
					margin-bottom: 7px;
					border-radius: 15px;
				}
			}

			#movie-info {
				display: flex;
				flex-grow: 2;
				text-align: left;
				flex-direction: column;
				justify-content: space-between;

				h1 {
					color: white;
					margin-bottom: 2rem;
				}

				h3 {
					color: rgb(143, 143, 143);

					#movie-rating {
						display: flex;
						justify-content: center;
						border-radius: 10px;
						font-size: 20px;
						width: 53px;
						color: white;
					}
				}

				#options {
					max-width: 180px;
					display: flex;
					justify-content: space-between;
					margin-top: 1rem;

					.edit {
						height: 30px;
						width: 80px;
						background-color: #5eb85e;
						border: none;
						text-transform: uppercase;
						font-weight: 600;
						border-radius: 10px;
						outline: none;
						cursor: pointer;
						color: white;
					}

					.delete {
						height: 30px;
						width: 80px;
						background-color: #e10505;
						border: none;
						text-transform: uppercase;
						font-weight: 600;
						border-radius: 10px;
						outline: none;
						cursor: pointer;
						color: white;
					}
				}
			}
		}

		#movie-form {
			display: flex;
			flex-direction: column;
			text-align: left;

			& > div {
				display: flex;
				flex-direction: column;

				#actor-input {
					display: flex;
					justify-content: space-between;
				}
			}

			.add-actor {
				background-color: green;
				text-align: center;
				color: white;
				margin-left: 5px;
				height: 100%;
				padding: 2px 10px;
				font-size: 20px;
				padding: 1re;
				align-self: center;
				cursor: pointer;
			}
		}

		#update-movie {
			background-color: #5eb85e;
			border: none;
			padding: 5px;
			width: 70px;
			color: white;
			border-radius: 10px;
			cursor: pointer;
			text-transform: uppercase;
			outline: none;
		}
	}
</style>
