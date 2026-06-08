<script setup lang="ts">
defineProps<{
	projectsCompleted: number
	projectsTotal: number
}>()

const emit = defineEmits<{
	(e: 'clearCompleted'): void
}>()
</script>

<template>
	<!-- Footer Stats -->
	<div
		class="mt-6 flex items-center justify-between border-t border-gray-100 pt-4 text-xs font-medium text-gray-400"
	>
		<span>Completed {{ projectsCompleted }}/{{ projectsTotal }} projects</span>
		<button
			class="cursor-pointer transition hover:text-red-500"
			@click="emit('clearCompleted')"
		>
			Clear completed
		</button>
	</div>
</template>

<style scoped></style>
