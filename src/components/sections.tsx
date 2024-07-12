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

// Definición de tipos para columnas y tareas
interface Column {
  id: string;
  title: string;
  tasks: { id: string; title: string; description: string }[];
}

const Sections: React.FC = () => {
  // Estados para manejar las columnas y los modales
  const [columns, setColumns] = useState<Column[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [columnTitle, setColumnTitle] = useState("");
  const [currentColumnId, setCurrentColumnId] = useState<string | null>(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  // Función para crear una nueva columna
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

  // Función para crear una nueva tarea en una columna específica
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

  // Función para eliminar una tarea
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

  // Función para editar una tarea
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
          <h2 className="text-lg font-medium">Crear Nueva Columna</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsModalOpen(true)}
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Crear Columna
          </Button>
        </div>
      </div>
      {/* Modal para crear nueva columna */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Crear Nueva Columna</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="column-title">Título de la Columna</Label>
              <Input
                id="column-title"
                placeholder="Ingrese el título de la columna"
                value={columnTitle}
                onChange={(e) => setColumnTitle(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateColumn}>Crear Columna</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Modal para crear nueva tarea */}
      <Dialog
        open={isCreateTaskModalOpen}
        onOpenChange={setIsCreateTaskModalOpen}
      >
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Crear Nueva Tarea</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="task-title">Título de la Tarea</Label>
              <Input
                id="task-title"
                placeholder="Ingrese el título de la tarea"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="task-description">Descripción de la Tarea</Label>
              <Input
                id="task-description"
                placeholder="Ingrese la descripción de la tarea"
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
              Cancelar
            </Button>
            <Button onClick={() => handleCreateTask(currentColumnId!)}>
              Crear Tarea
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Sections;
    