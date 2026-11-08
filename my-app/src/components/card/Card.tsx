import styles from "./card.module.css";
import { motion } from "motion/react";

export type ProjectStatus = "completed" | "in-progress" | "on-hold";

type CardProps = {
  id: string;
  title: string;
  summary: string;
  logo?: string;
  status: ProjectStatus;
  onClick: () => void;
};

const statusLabels: Record<ProjectStatus, string> = {
  completed: "Completed",
  "in-progress": "In-progress",
  "on-hold": "On-hold",
};

const statusClasses: Record<ProjectStatus, string> = {
  completed: styles.completed,
  "in-progress": styles.inProgress,
  "on-hold": styles.onHold,
};
export default function Card({
  id,
  title,
  summary,
  logo,
  status,
  onClick,
}: CardProps) {
  return (
    <motion.button
      layoutId={`project-${id}`}
      className={styles.card}
      type="button"
      onClick={onClick}
    >
      <span className={styles.logo}>{logo && <img src={logo} alt="" />}</span>

      <span className={styles.text}>
        <span className={`${styles.status} ${statusClasses[status]}`}>
          <span className={styles.statusDot} aria-hidden="true" />
          {statusLabels[status]}
        </span>
        <span className={styles.title}>{title}</span>
        <span className={styles.description}>{summary}</span>
      </span>
    </motion.button>
  );
}
