'use client';

import { TaskForm } from '@/components/task/task-form';
import { TaskList } from '@/components/task/task-list';

export default function Home() {
  return (
    <div className="container py-8">
      <div className="py-4">
        <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">Todo App</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-[400px,1fr]">
        <TaskForm />
        <TaskList />
      </div>
    </div>
  );
}
