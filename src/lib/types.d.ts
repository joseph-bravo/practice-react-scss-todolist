export interface Todo {
  content: string;
  done: boolean;
  id?: string;
  color?: 'red' | 'green' | 'blue' | null;
}
export type TodosView = 'all' | 'active' | 'completed';
