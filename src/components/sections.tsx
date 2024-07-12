import React, { useState } from "react";
import PlusIcon from "./PlusIcon";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import TaskList from "./TaskList";

interface Column {
  id: string;
  title: string;
  tasks: { id: string; title: string; description: string }[];
}

const Sections: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [columnTitle, setColumnTitle] = useState("");
  const [currentColumnId, setCurrentColumnId] = useState<string | null>(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const handleCreateColumn = () => {
    const newColumn: Column = {
      id: Date.now().toString(),
      title: columnTitle,
      tasks: [],
    };
    setColumns([...columns, newColumn]);
    setIsModalOpen(false);
    setColumnTitle("");
  };

  const handleCreateTask = (columnId: string) => {
    const newTask = {
      id: Date.now().toString(),
      title: taskTitle,
      description: taskDescription,
    };
    setColumns(
      columns.map((column) =>
        column.id === columnId
          ? { ...column, tasks: [...column.tasks, newTask] }
          : column
      )
    );
    setIsCreateTaskModalOpen(false);
    setTaskTitle("");
    setTaskDescription("");
  };

  const handleDeleteTask = (columnId: string, taskId: string) => {
    setColumns(
      columns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              tasks: column.tasks.filter((task) => task.id !== taskId),
            }
          : column
      )
    );
  };

  const handleEditTask = (
    columnId: string,
    taskId: string,
    updatedTask: { title: string; description: string }
  ) => {
    setColumns(
      columns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              tasks: column.tasks.map((task) =>
                task.id === taskId ? { ...task, ...updatedTask } : task
              ),
            }
          : column
      )
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {columns.map((column) => (
        <div key={column.id} className="bg-card rounded-lg p-4 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">{column.title}</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCurrentColumnId(column.id);
                setIsCreateTaskModalOpen(true);
              }}
            >
              <PlusIcon className="w-4 h-4 m-2" />
            </Button>
          </div>
          <TaskList
            tasks={column.tasks}
            onDeleteTask={(taskId) => handleDeleteTask(column.id, taskId)}
            onEditTask={(taskId, updatedTask) =>
              handleEditTask(column.id, taskId, updatedTask)
            }
          />
        </div>
      ))}
      <div className="bg-card rounded-lg p-4 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Create New Column</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsModalOpen(true)}
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Create Column
          </Button>
        </div>
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Create New Column</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="column-title">Column Title</Label>
              <Input
                id="column-title"
                placeholder="Enter column title"
                value={columnTitle}
                onChange={(e) => setColumnTitle(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateColumn}>Create Column</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog
        open={isCreateTaskModalOpen}
        onOpenChange={setIsCreateTaskModalOpen}
      >
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="task-title">Task Title</Label>
              <Input
                id="task-title"
                placeholder="Enter task title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="task-description">Task Description</Label>
              <Input
                id="task-description"
                placeholder="Enter task description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateTaskModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => handleCreateTask(currentColumnId!)}>
              Create Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Sections;
