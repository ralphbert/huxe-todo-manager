export const todoStatuses = ['all', 'not-done', 'done'] as const;
export type TodoStatus = typeof todoStatuses[number];

export interface User {
  blocked: boolean;
  confirmed: boolean;
  createdAt: string;
  email: string;
  id: number;
  provider: 'local';
  updatedAt: string;
  username: string;
}

export interface AuthResponse {
  jwt: string;
  user: User;
}

export interface AuthPayload {
  identifier: string;
  password: string;
}

export interface TodoListCreatePayload {
  title: string;
}

export interface Todo {
  id: number;
  attributes: {
    createdAt: string;
    done: boolean;
    done_at: string;
    due: string;
    publishedAt: string;
    title: string;
    updatedAt: string;
    xp: number;
  };
}

export interface TodoCreatePayload {
  title: string;
  due?: string;
  list: number;
  xp: number;
}

export interface TodoUpdatePayload {
  title: string;
  due?: string;
  done: boolean;
  xp: number;
}

export interface TodoTogglePayload {
  todo: Todo;
  listId: number;
}

export interface TodoAttributes {
  title: string;
  done: boolean;
  due: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface TodoListItem {
  id: number;
  attributes: TodoListAttributes;
}

export interface TodoListAttributes {
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ListResponse<T> {
  data: T[];
  meta: {
    pagination: PaginationResponse;
  };
}

export interface PatchResponse<T> {
  data: T;
  meta: unknown;
}

export interface PaginationPayload {
  page: number;
  pageSize: number;
}

export interface PaginationResponse {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
