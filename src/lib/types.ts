export type Todo = {
  content: string;
  id: string;
  checked: boolean;
};

export type TodoList = {
  [userId: string]: Todo[];
};
