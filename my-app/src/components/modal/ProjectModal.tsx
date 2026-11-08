import TypewriterText from "../typewriter/TypewriterText";
import styles from "./projectModal.module.css";
import { motion } from "motion/react";

type ProjectModalProps = {
  project: {
    id: string | undefined;
    title: string;
    description: string;
  };
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <motion.div
      className={styles.modalBackdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.section
        layoutId={`project-${project.id}`}
        className={styles.projectModal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className={styles.closeButton}
          type="button"
          aria-label="Projectvenster sluiten"
          onClick={onClose}
        >
          <span aria-hidden="true">×</span>
        </button>

        <h2 id="project-modal-title">{project.title}</h2>
        <p className={styles.projectDescription}>
          <TypewriterText text={project.description} />
        </p>
      </motion.section>
    </motion.div>
  );
}
