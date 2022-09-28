import styles from "./styles.module.css";

import * as Checkbox from "@radix-ui/react-checkbox";
import { Trash, Check } from "phosphor-react";

export interface TaskProps {
  id: string;
  title: string;
  isComplete: boolean;
}
//entendendo que x, y, z poderia ser qualquer coisa... quebrando a regra do clean code soh para entender
interface TaskAtributeProps {
  content: TaskProps;
  onDeleteTask: (x: string) => void;
  onCheckTask: (y: string, z: boolean) => void;
}

export function Task({
  content,
  onDeleteTask,
  onCheckTask,
}: TaskAtributeProps) {
  function handleDeleteTask() {
    onDeleteTask(content.id);
  }
  function handleCheckTask(check: boolean) {
    onCheckTask(content.id, check);
  }
  return (
    <div className={styles.task}>
      <Checkbox.Root
        className={styles.rootCheckbox}
        checked={content.isComplete}
        onCheckedChange={(checked) => {
          if (checked === true) {
            handleCheckTask(true);
          } else {
            handleCheckTask(false);
          }
        }}
      >
        <Checkbox.Indicator className={styles.indicator}>
          <Check className={styles.check} weight="bold" />
        </Checkbox.Indicator>
      </Checkbox.Root>

      <div className={styles.title}>
        <p className={content.isComplete ? styles.tached : ""}>
          {content.title}
        </p>
      </div>

      <button onClick={handleDeleteTask} title="Deletar tarefa">
        <Trash size={16} />
      </button>
    </div>
  );
}
