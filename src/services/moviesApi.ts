import {
	collection,
	getFirestore,
	doc,
	getDocs,
	addDoc,
	getDoc,
	updateDoc,
	deleteDoc,
} from 'firebase/firestore';
import { IMovie } from '../stores/MovieStore';
import firebase from './firebase';
const db = getFirestore(firebase);

const moviesApi = {
	getMovies: async () => {
		const movieCollection = await getDocs(collection(db, 'movies'));
		const movies = await movieCollection.docs.map((movie) => ({
			...(movie.data() as IMovie),
			id: movie.id,
		}));

		return movies;
	},
	getMovie: async (id: string) => {
		const documentRef = doc(db, 'movies', id);
		const movie = await getDoc(documentRef);
		if (!movie.data()) return null;
		return { ...(movie.data() as IMovie), id: movie.id };
	},
	addMovie: async (movie: IMovie) => {
		const { id } = await addDoc(collection(db, 'movies'), movie);

		return { ...movie, id };
	},
	updateMovie: async (id: string, movie: IMovie) => {
		const documentRef = doc(db, 'movies', id);
		delete movie.id;
		await updateDoc(documentRef, { ...movie });
	},
	deleteMovie: async (id: string) => {
		const documentRef = doc(db, 'movies', id);
		await deleteDoc(documentRef);
	},
};

export default moviesApi;
