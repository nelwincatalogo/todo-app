'use client';

import { useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TaskStatus } from '@/lib/types/todo';
import { useTodoStore } from '@/lib/store/todo-store';
import { AutoSizer, List } from 'react-virtualized';
import { Pencil, Trash } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TaskList() {
  const { filteredTasks, filters, updateTask, deleteTask, tasks } = useTodoStore();

  const renderRow = useCallback(
    ({ index, style }) => {
      const task = filteredTasks[index].get({ noproxy: true });
      const isPastDue = new Date(task.dueDate) < new Date() && task.status !== 'Completed';

      return (
        <div key={task.id} style={style} className="p-2">
          <Card className={cn({ 'border-red-500': isPastDue })}>
            <CardContent className="relative p-4">
              <div className="space-y-2">
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-sm text-muted-foreground">{task.description}</p>
                <div className="flex gap-2 text-xs">
                  <span
                    className={cn(
                      'rounded-full px-2 py-1 min-w-max',
                      task.status === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : task.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-yellow-100 text-yellow-700',
                    )}
                  >
                    {task.status}
                  </span>
                  <span
                    className={cn(
                      'rounded-full px-2 py-1 min-w-max',
                      isPastDue ? 'bg-red-100 text-red-700' : 'bg-gray-100',
                    )}
                  >
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="absolute right-4 top-4 flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8"
                  onClick={() => {
                    const newStatus =
                      task.status === 'Pending'
                        ? 'In Progress'
                        : task.status === 'In Progress'
                          ? 'Completed'
                          : 'Pending';
                    updateTask(task.id, { status: newStatus });
                  }}
                >
                  <Pencil className="size-3" />
                </Button>
                <Button variant="destructive" size="icon" className="size-8" onClick={() => deleteTask(task.id)}>
                  <Trash className="size-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    },
    [filteredTasks, updateTask, deleteTask],
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
        <div className="grid grid-cols-2 gap-4 pt-2">
          <Select value={filters.status.value} onValueChange={(value: TaskStatus | 'All') => filters.status.set(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="font-sans">
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Search tasks..."
            value={filters.search.value}
            onChange={(e) => filters.search.set(e.target.value)}
            className=""
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[470px] w-full">
          {filteredTasks.length === 0 && (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-muted-foreground">No tasks found</p>
            </div>
          )}

          <AutoSizer>
            {({ height, width }) => (
              <List
                height={height}
                width={width}
                rowCount={filteredTasks.length}
                rowHeight={150}
                rowRenderer={renderRow}
              />
            )}
          </AutoSizer>
        </div>
      </CardContent>
    </Card>
  );
}
