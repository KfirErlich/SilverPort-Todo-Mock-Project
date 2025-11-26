import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getTodos, addTodo, updateTodoCompletion, deleteTodo } from './todoApi';

type MockFetchResponse = {
  ok: boolean;
  statusText: string;
  json: () => Promise<unknown>;
};

const createMockResponse = (data: unknown, ok: boolean = true, statusText: string = 'OK'): MockFetchResponse => ({
  ok,
  statusText,
  json: vi.fn().mockResolvedValue(data),
});

let fetchMock: ReturnType<typeof vi.fn>;
const originalFetch = globalThis.fetch;

beforeEach(() => {
  fetchMock = vi.fn();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).fetch = fetchMock;
});

afterEach(() => {
  vi.restoreAllMocks();
  // Restore original fetch (if it existed)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).fetch = originalFetch;
});

describe('todoApi - getTodos', () => {
  it('returns todos on successful fetch', async () => {
    const todos = [
      { id: '1', description: 'Test todo', isCompleted: false },
      { id: '2', description: 'Another todo', isCompleted: true },
    ];

    fetchMock.mockResolvedValueOnce(createMockResponse(todos, true, 'OK'));

    const result = await getTodos();

    expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/todos');
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(todos);
    }
  });

  it('returns an error when response is not ok', async () => {
    fetchMock.mockResolvedValueOnce(createMockResponse([], false, 'Internal Server Error'));

    const result = await getTodos();

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toContain('Failed to fetch todos');
      expect(result.error).toContain('Internal Server Error');
    }
  });

  it('returns an error on network failure', async () => {
    const errorMessage = 'Network error';
    fetchMock.mockRejectedValueOnce(new Error(errorMessage));

    const result = await getTodos();

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBe(errorMessage);
    }
  });
});

describe('todoApi - addTodo', () => {
  it('sends POST request and returns created todo on success', async () => {
    const description = 'New todo';
    const isCompleted = false;
    const createdTodo = { id: '1', description, isCompleted };

    fetchMock.mockResolvedValueOnce(createMockResponse(createdTodo));

    const result = await addTodo(description, isCompleted);

    expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description, isCompleted }),
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(createdTodo);
    }
  });

  it('returns an error when response is not ok', async () => {
    fetchMock.mockResolvedValueOnce(createMockResponse({}, false, 'Bad Request'));

    const result = await addTodo('Invalid', false);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toContain('Failed to add todo');
      expect(result.error).toContain('Bad Request');
    }
  });

  it('returns an error on network failure', async () => {
    const errorMessage = 'Network error';
    fetchMock.mockRejectedValueOnce(new Error(errorMessage));

    const result = await addTodo('Test', false);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBe(errorMessage);
    }
  });
});

describe('todoApi - updateTodoCompletion', () => {
  it('sends PATCH request with correct payload and returns updated todo on success', async () => {
    const id = '123';
    const isCompleted = true;
    const updatedTodo = { id, description: 'Existing todo', isCompleted };

    fetchMock.mockResolvedValueOnce(createMockResponse(updatedTodo));

    const result = await updateTodoCompletion(id, isCompleted);

    expect(fetchMock).toHaveBeenCalledWith(`http://localhost:3000/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isCompleted }),
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(updatedTodo);
    }
  });

  it('returns an error when response is not ok', async () => {
    const id = '123';

    fetchMock.mockResolvedValueOnce(createMockResponse({}, false, 'Not Found'));

    const result = await updateTodoCompletion(id, false);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toContain('Failed to update todo');
      expect(result.error).toContain('Not Found');
    }
  });

  it('returns an error on network failure', async () => {
    const id = '123';
    const errorMessage = 'Network error';

    fetchMock.mockRejectedValueOnce(new Error(errorMessage));

    const result = await updateTodoCompletion(id, true);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBe(errorMessage);
    }
  });
});

describe('todoApi - deleteTodo', () => {
  it('sends DELETE request and returns success for ok response', async () => {
    const id = '123';

    fetchMock.mockResolvedValueOnce(
      // deleteTodo expects a response with ok + statusText, it doesn't use json()
      {
        ok: true,
        statusText: 'OK',
      } as MockFetchResponse,
    );

    const result = await deleteTodo(id);

    expect(fetchMock).toHaveBeenCalledWith(`http://localhost:3000/todos/${id}`, {
      method: 'DELETE',
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBeUndefined();
    }
  });

  it('returns an error when response is not ok', async () => {
    const id = '123';

    fetchMock.mockResolvedValueOnce(
      {
        ok: false,
        statusText: 'Internal Server Error',
      } as MockFetchResponse,
    );

    const result = await deleteTodo(id);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toContain('Failed to delete todo');
      expect(result.error).toContain('Internal Server Error');
    }
  });

  it('returns an error on network failure', async () => {
    const id = '123';
    const errorMessage = 'Network error';

    fetchMock.mockRejectedValueOnce(new Error(errorMessage));

    const result = await deleteTodo(id);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBe(errorMessage);
    }
  });
});

