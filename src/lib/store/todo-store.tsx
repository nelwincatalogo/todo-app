'use client';

import { hookstate, none, State, useHookstate } from '@hookstate/core';
import { Task, TaskState } from '@/lib/types/todo';
import { devtools } from '@hookstate/devtools';
import { useEffect } from 'react';

const initialState: TaskState = {
  tasks: [],
  filters: {
    status: 'All',
    search: '',
  },
};

export const todoState = hookstate<TaskState>(initialState, devtools({ key: 'todo-state' }));

export const useTodoStore = () => {
  const state = todoState;

  const tasks = useHookstate(state.tasks);
  const filters = useHookstate(state.filters);
  const filteredTasks = useHookstate([] as Task[]);

  // filter tasks
  useEffect(() => {
    triggerFilter();
  }, [tasks, filters.status, filters.search]);

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    state.tasks.merge([
      {
        ...task,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    const index = state.tasks.value.findIndex((task) => task.id === id);
    if (index !== -1) {
      state.tasks[index].merge(updates);
    }
    triggerFilter();
  };

  const deleteTask = (id: string) => {
    const index = state.tasks.value.findIndex((task) => task.id === id);
    if (index !== -1) {
      state.tasks[index].set(none);
    }
    triggerFilter();
  };

  const triggerFilter = () => {
    const _tasks = state.tasks.get({ noproxy: true });
    let filtered = _tasks;

    if (filters.status.value !== 'All') {
      filtered = filtered.filter((task) => task.status === filters.status.value);
    }

    if (filters.search.value) {
      const search = filters.search.value.toLowerCase();
      filtered = filtered.filter((task) => task.title.toLowerCase().includes(search));
    }

    console.log('filtered: ', filtered);
    filteredTasks.set(filtered);
  };

  return {
    tasks,
    filters,
    filteredTasks,
    addTask,
    updateTask,
    deleteTask,
  };
};
