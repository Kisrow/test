import { Paper } from "@mantine/core";
import styles from "./Login.module.css";

export function LoginCard({ children }: { children: React.ReactNode }) {
  return (
    <Paper className={styles.outer}>
      <Paper className={styles.inner}>{children}</Paper>
    </Paper>
  );
}
