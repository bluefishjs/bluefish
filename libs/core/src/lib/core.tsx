import styles from './core.module.css';

/* eslint-disable-next-line */
export interface CoreProps {}

export function Core(props: CoreProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Core!</h1>
    </div>
  );
}

export default Core;
