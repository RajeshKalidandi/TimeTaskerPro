import React, { useState } from 'react';
import { Clock, Tag, CheckSquare } from 'lucide-react';

interface TaskFormProps {
  onSubmit: (task: {
    name: string;
    duration: number;
    criteria: string;
    tags: string[];
  }) => void;
}

export function TaskForm({ onSubmit }: TaskFormProps) {
  const [task, setTask] = useState({
    name: '',
    duration: 25,
    criteria: '',
    tags: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(task);
    setTask({ name: '', duration: 25, criteria: '', tags: [] });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div>
        <label className="block text-sm font-medium text-gray-700">Task Name</label>
        <input
          type="text"
          value={task.name}
          onChange={(e) => setTask({ ...task, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="What needs to be done?"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          <Clock className="inline-block w-4 h-4 mr-2" />
          Duration (minutes)
        </label>
        <input
          type="range"
          min="5"
          max="120"
          step="5"
          value={task.duration}
          onChange={(e) => setTask({ ...task, duration: Number(e.target.value) })}
          className="mt-1 block w-full"
        />
        <span className="text-sm text-gray-500">{task.duration} minutes</span>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          <CheckSquare className="inline-block w-4 h-4 mr-2" />
          Completion Criteria
        </label>
        <textarea
          value={task.criteria}
          onChange={(e) => setTask({ ...task, criteria: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
          placeholder="What defines this task as complete?"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          <Tag className="inline-block w-4 h-4 mr-2" />
          Tags
        </label>
        <input
          type="text"
          placeholder="Add tags (comma separated)"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              const newTags = (e.target as HTMLInputElement).value
                .split(',')
                .map((tag) => tag.trim())
                .filter(Boolean);
              setTask({ ...task, tags: [...task.tags, ...newTags] });
              (e.target as HTMLInputElement).value = '';
            }
          }}
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {task.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {tag}
              <button
                type="button"
                onClick={() => setTask({
                  ...task,
                  tags: task.tags.filter((_, i) => i !== index),
                })}
                className="ml-1 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Create Task
      </button>
    </form>
  );
}