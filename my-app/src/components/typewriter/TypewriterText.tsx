import { useEffect, useState } from "react";
import styles from "./TypewriterText.module.css";

type TypewriterTextProps = {
  text: string;
  speed?: number;
};

export default function TypewriterText({
  text,
  speed = 15,
}: TypewriterTextProps) {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    const characters = Array.from(text);
    let index = 0;

    const timer = window.setInterval(() => {
      index += 1;
      setVisibleText(characters.slice(0, index).join(""));

      if (index >= characters.length) {
        window.clearInterval(timer);
      }
    }, speed);

    return () => window.clearInterval(timer);
  }, [text, speed]);

  return (
    <span>
      <span className={styles.screenReaderOnly}>{text}</span>
      <span aria-hidden="true">
        {visibleText}
        <span className={styles.cursor}>▍</span>
      </span>
    </span>
  );
}
