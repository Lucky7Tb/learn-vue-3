import { RouteRecordRaw } from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
const MovieList = () => import('../pages/MovieList.vue');
const MoviePreview = () => import('../pages/MoviePreview.vue');

export default [
	{
		path: '/',
		component: AppLayout,
		children: [
			{
				path: '/',
				component: MovieList,
			},
		],
	},
	{
		path: '/:movieId',
		props: true,
		component: MoviePreview,
	},
] as RouteRecordRaw[];
