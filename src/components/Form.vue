<script setup lang="ts">
import { ref } from 'vue'

import type { Project } from '@/types/project'

const title = ref('')

const emits = defineEmits<{
	(e: 'createProject', project: Project): void
}>()

const handleSubmit = (e: Event) => {
	if (title.value.trim()) {
		emits('createProject', {
			id: crypto.randomUUID(),
			title: title.value.trim(),
			done: false,
		})
		const form = e.target as HTMLFormElement
		form.reset()
	}
}
</script>

<template>
	<div>
		<!-- Input Form -->
		<form
			class="mb-6 flex gap-2"
			@submit.prevent="handleSubmit"
		>
			<input
				type="text"
				placeholder="Add a new task..."
				class="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none"
				required
				v-model="title"
			/>
			<button
				type="submit"
				class="flex items-center gap-1 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-100 transition hover:bg-indigo-700"
			>
				Add
			</button>
		</form>
	</div>
</template>

<style scoped></style>
