<script setup lang="ts">
import { ref } from 'vue'

import type { Project } from '@/types/project'

defineProps<{
	projectList: Project[]
}>()

const emit = defineEmits<{
	(e: 'toggleDone', id: string): void
	(e: 'editProject', payload: { id: string; title: string }): void
	(e: 'deleteProject', id: string): void
}>()

const editingId = ref<string | null>(null)

const vFocus = {
	mounted: (el: HTMLInputElement) => el.focus(),
}

const startEdit = (id: string) => {
	editingId.value = id
}

const handleEdit = (payload: { id: string; title: string }) => {
	emit('editProject', { id: payload.id, title: payload.title })
	editingId.value = null
}
</script>

<template>
	<!-- Todo List Items -->
	<ul class="space-y-3">
		<li
			class="group flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-3.5 transition hover:bg-gray-100/70"
			v-for="project in projectList"
			:key="project.id"
		>
			<div class="flex min-w-0 flex-1 items-center gap-3">
				<input
					type="checkbox"
					class="h-5 w-5 shrink-0 cursor-pointer rounded-md border-gray-300 text-indigo-600 focus:ring-indigo-500"
					:checked="project.done"
					@change="emit('toggleDone', project.id)"
					@click.stop
				/>
				<input
					type="text"
					class="rounded-md border border-gray-300 px-2 py-1.5 text-sm font-medium text-gray-700 focus:ring-1 focus:ring-blue-500 focus:outline-none"
					v-if="editingId === project.id"
					@keydown.enter.prevent="() => handleEdit(project)"
					@blur="() => handleEdit(project)"
					v-model="project.title"
					v-focus
				/>
				<span
					class="truncate text-sm font-medium text-gray-700"
					v-else
				>
					{{ project.title }}
				</span>
			</div>
			<div
				class="flex shrink-0 items-center gap-4 pl-2 opacity-0 transition duration-150 group-hover:opacity-100"
			>
				<button
					class="cursor-pointer rounded-md p-1 text-gray-400 transition hover:bg-white hover:text-indigo-600"
					title="Edit task"
					@click="startEdit(project.id)"
				>
					<svg
						class="h-4 w-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
						></path>
					</svg>
				</button>
				<button
					class="cursor-pointer rounded-md p-1 text-gray-400 transition hover:bg-white hover:text-red-500"
					title="Delete task"
					@click="emit('deleteProject', project.id)"
				>
					<svg
						class="h-4 w-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
						></path>
					</svg>
				</button>
			</div>
		</li>
	</ul>
</template>

<style scoped></style>
