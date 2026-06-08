<script setup lang="ts">
import type { Filter } from '@/types/project'

defineProps<{
	currentFilter: string
}>()

const emit = defineEmits<{
	(e: 'changeFilter', filter: Filter): void
}>()

const allFilters: Filter[] = ['all', 'done', 'todo']
</script>

<template>
	<!-- Filters -->
	<div class="mb-4 flex gap-2 text-xs font-medium text-gray-500">
		<button
			v-for="(filter, index) in allFilters"
			:key="index"
			@click="emit('changeFilter', filter)"
			class="cursor-pointer rounded-lg px-4 py-1.5 text-sm font-medium transition"
			:class="currentFilter === filter ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'"
		>
			<!-- {{ filter ? filter.charAt(0).toUpperCase() + filter.slice(1) : filter }} -->
			{{ filter }}
		</button>
	</div>
</template>

<style scoped></style>
