export interface Project {
	id: string
	title: string
	done: boolean
}

export type Filter = 'all' | 'done' | 'todo'
