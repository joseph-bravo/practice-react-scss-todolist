export interface Todo {
  content: string;
  done: boolean;
  color: string | 'red' | 'green' | 'blue' | 'neutral';
  id?: string;
}
export type TodosView = 'all' | 'active' | 'completed';
