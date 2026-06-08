<script setup lang="ts">
import { computed, ref } from 'vue'

import Filters from '@/components/Filters.vue'
import Footer from '@/components/Footer.vue'
import Form from '@/components/Form.vue'
import Header from '@/components/Header.vue'
import List from '@/components/List.vue'
import type { Filter, Project } from '@/types/project'

const projects = ref<Project[]>([])
const filter = ref<Filter>('all')

const totalDone = computed(() =>
	projects.value.reduce((total: number, project: Project) => (project.done ? total + 1 : total), 0)
)

const filteredProjects = computed(() => {
	switch (filter.value) {
		case 'all':
			return projects.value
		case 'todo':
			return projects.value.filter((t) => !t.done)
		case 'done':
			return projects.value.filter((t) => t.done)
		default:
			return projects.value
	}
})

const addProject = (newProject: Project) => {
	projects.value.unshift(newProject)
}

const toggleDone = (id: string) => {
	const project = projects.value.find((p) => p.id === id)
	if (project) {
		project.done = !project.done
	}
}

const editProject = (payload: { id: string; title: string }) => {
	const project = projects.value.find((p) => p.id === payload.id)
	if (project && payload.title) {
		project.title = payload.title
	}
}

const deleteProject = (id: string) => {
	const index = projects.value.findIndex((p) => p.id === id)
	if (index !== -1) {
		projects.value.splice(index, 1)
	}
}

const handleClearCompleted = () => {
	for (let i = projects.value.length - 1; i >= 0; i--) {
		if (projects.value[i].done) {
			projects.value.splice(i, 1)
		}
	}
}
</script>

<template>
	<main class="flex min-h-screen justify-center px-6 py-3">
		<section class="w-full max-w-7xl space-y-6 p-8">
			<Header :total-active="projects.length - totalDone" />
			<Form @create-project="addProject" />
			<Filters
				@change-filter="filter = $event"
				:current-filter="filter"
			/>
			<List
				:project-list="filteredProjects"
				@toggle-done="toggleDone"
				@edit-project="editProject"
				@delete-project="deleteProject"
			/>
			<Footer
				:projects-completed="totalDone"
				:projects-total="projects.length"
				@clear-completed="handleClearCompleted"
			/>
		</section>
	</main>
</template>
