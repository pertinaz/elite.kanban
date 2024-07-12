import React from "react";
import TaskCard from "./CreateTaskModal";

interface Task {
  id: string;
  title: string;
  description: string;
}

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (taskId: string) => void;
  onEditTask: (
    taskId: string,
    updatedTask: { title: string; description: string }
  ) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDeleteTask,
  onEditTask,
}) => {
  return (
    <div className="flex flex-col space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
