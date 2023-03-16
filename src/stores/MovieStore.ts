import { defineStore } from 'pinia';
import moviesApi from '../services/moviesApi';

export interface IMovie {
	id?: string | number;
	name: string;
	genre: string;
	rating: number;
	year: number;
	budget: string;
	boxOffice: string;
	poster: string;
	actors: Record<'name', string>[];
	storyline: string;
}

export default defineStore('movieStore', {
	state: () => {
		return {
			movies: [] as IMovie[],
			searchKeyword: '',
			filter: {
				key: '' as 'rating' | 'year' | '',
				order: 'asc',
			},
		};
	},
	getters: {
		getMovies: (state) => {
			if (state.searchKeyword) {
				return state.movies
					.filter(
						(movie) =>
							movie.name
								.toLowerCase()
								.indexOf(state.searchKeyword.toLowerCase()) > -1
					)
					.sort((a, b) => {
						let result = 0;

						if (state.filter.key) {
							if (a[state.filter.key] > b[state.filter.key]) result = 1;
							if (a[state.filter.key] < b[state.filter.key]) result = -1;
						}

						if (state.filter.order === 'asc') return result;
						return result * -1;
					});
			}

			return state.movies.sort((a, b) => {
				let result = 0;

				if (state.filter.key) {
					if (a[state.filter.key] > b[state.filter.key]) result = 1;
					if (a[state.filter.key] < b[state.filter.key]) result = -1;
				}

				if (state.filter.order === 'asc') return result;
				return result * -1;
			});
		},
		getMovieById: (state) => async (id: string) => {
			let movie = state.movies.filter((movie) => movie.id === id)[0];
			if (!movie) {
				return await moviesApi.getMovie(id);
			}
			return movie;
		},
	},
	actions: {
		addMovie(movie: IMovie) {
			return moviesApi
				.addMovie(movie)
				.then((createdMovie) => this.movies.push(createdMovie))
				.catch((err) => console.log(err));
		},
		setMovie(movies: IMovie[]) {
			this.movies = movies;
		},
		updateMovie(id: string, movie: IMovie) {
			return moviesApi.updateMovie(id, movie).catch((err) => console.log(err));
		},
		deleteMovie(id: string) {
			return moviesApi.deleteMovie(id).catch((err) => console.log(err));
		},
		fetchMovie() {
			moviesApi
				.getMovies()
				.then((movies) => this.setMovie(movies))
				.catch((err) => console.log(err));
		},
	},
});
