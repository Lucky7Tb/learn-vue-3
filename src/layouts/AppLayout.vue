<script setup lang="ts">
	import Sidebar from '../components/Sidebar.vue';
	import Navbar from '../components/Navbar.vue';
	import { RouterView } from 'vue-router';
</script>

<template>
	<div class="home">
		<Navbar></Navbar>
		<div id="main-section">
			<Sidebar></Sidebar>
			<RouterView></RouterView>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.home {
		display: flex;
		flex-direction: column;

		#main-section {
			display: flex;
			margin-top: 50px;
		}
	}
</style>
