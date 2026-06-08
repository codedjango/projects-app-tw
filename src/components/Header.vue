<script setup lang="ts">
defineProps<{
	totalActive: number
}>()
</script>

<template>
	<!-- Header -->
	<div class="mb-6 flex items-center justify-between">
		<h1 class="text-2xl font-bold text-gray-800">Projects</h1>
		<span class="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-600"
			>{{ totalActive }} Active</span
		>
	</div>
</template>
