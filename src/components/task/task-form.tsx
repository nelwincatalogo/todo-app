'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Task, TaskStatus } from '@/lib/types/todo';
import { useTodoStore } from '@/lib/store/todo-store';
import { useHookstate } from '@hookstate/core';
import { ButtonLoading } from '../ButtonLoading';
import { toast } from 'sonner';

export function TaskForm() {
  const { addTask } = useTodoStore();

  const loading = useHookstate(false);
  const taskForm = useHookstate<Omit<Task, 'id' | 'createdAt'>>({
    title: '',
    description: '',
    status: 'Pending',
    dueDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      loading.set(true);
      const toastId = toast.loading('Creating task...', {
        duration: 900000,
        description: 'Please wait...',
      });

      // simulate api call
      setTimeout(() => {
        addTask(taskForm.get({ noproxy: true }));

        toast.dismiss(toastId);
        toast.success('Task has been created');

        // clean up
        taskForm.set({
          title: '',
          description: '',
          status: 'Pending',
          dueDate: '',
        });
        loading.set(false);
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add New Task</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={taskForm.title.value}
              onChange={(e) => taskForm.title.set(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={taskForm.description.value}
              onChange={(e) => taskForm.description.set(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={taskForm.status.value} onValueChange={(value: TaskStatus) => taskForm.status.set(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="font-sans">
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={taskForm.dueDate.value}
                onChange={(e) => taskForm.dueDate.set(e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          {loading.value ? <ButtonLoading /> : <Button type="submit">Add Task</Button>}
        </CardFooter>
      </form>
    </Card>
  );
}
