export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
}

export interface TaskState {
  tasks: Task[];
  filters: {
    status: TaskStatus | 'All';
    search: string;
  };
}
