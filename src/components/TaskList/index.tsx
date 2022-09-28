import {
  ChangeEvent,
  FormEvent,
  InvalidEvent,
  useEffect,
  useState,
} from "react";

import { PlusCircle } from "phosphor-react";
import { v4 as uuidv4 } from "uuid";

import styles from "./styles.module.css";
import { Task, TaskProps } from "../Task";
import clipboard from "./../../assets/clipboard.svg";

export function TaskList() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    const newTask = { id: uuidv4(), title: newTaskTitle, isComplete: false };
    setTasks((state) => [...state, newTask]);
    setNewTaskTitle("");
  }

  function handleRemoveTask(taskIdToDelete: string) {
    const taskWithotDeletedOne = tasks.filter((task) => {
      return task.id !== taskIdToDelete;
    });
    setTasks(taskWithotDeletedOne);
  }

  function handleCheckTask(taskIdToCheck: string, check: boolean) {
    //imutabilidade
    const allTask = [...tasks];
    const taskAllWithOneUpdate = allTask.map((task) => {
      if (task.id === taskIdToCheck) {
        task.isComplete = check;
      }
      return task;
    });

    setTasks(taskAllWithOneUpdate);
  }

  function handleNewInputTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setNewTaskTitle(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório!");
  }

  const taskAllDone = tasks.reduce((total, task) => {
    if (task.isComplete === true) return (total += 1);
    else return total;
  }, 0);

  return (
    <main className={styles.taskList}>
      <form onSubmit={handleCreateNewTask} className={styles.taskAdd}>
        <input
          type="text"
          name="task"
          placeholder="Adicione uma nova tarefa"
          value={newTaskTitle}
          onChange={handleNewInputTaskChange}
          onInvalid={handleNewTaskInvalid}
          required={true}
        />
        <button>
          Criar <PlusCircle size={16} weight="bold" />
        </button>
      </form>

      <section className={styles.taskStatus}>
        <div className={styles.status}>
          <span className={styles.blue}> Tarefas criadas</span>
          <div className={styles.contagem}>{tasks.length}</div>
        </div>
        <div className={styles.status}>
          <span className={styles.purple}> Concluídas</span>
          <div className={styles.contagem}>
            {tasks.length > 0
              ? `${taskAllDone} de ${tasks.length}`
              : tasks.length}
          </div>
        </div>
      </section>

      <section className={styles.content}>
        {tasks.length == 0 ? (
          <div className={styles.emptyArea}>
            <img src={clipboard} alt="Imagem de uma clipboard" />
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <span>Crie tarefas e organize seus itens a fazer</span>
          </div>
        ) : (
          <div className={styles.fullArea}>
            {tasks.map((task) => {
              return (
                <Task
                  key={task.id}
                  content={task}
                  onDeleteTask={handleRemoveTask}
                  onCheckTask={handleCheckTask}
                />
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
