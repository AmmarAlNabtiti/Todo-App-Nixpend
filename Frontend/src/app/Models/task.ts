import { Subtask } from './substask';

export interface Task {
  _id?: string;
  title: string;
  description: string;
  subtasks?: Subtask[];
  status: string;
}
