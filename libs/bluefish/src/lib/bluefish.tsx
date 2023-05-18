import styles from './bluefish.module.css';

/* eslint-disable-next-line */
export interface BluefishProps {}

export function Bluefish(props: BluefishProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Bluefish!</h1>
    </div>
  );
}

export default Bluefish;
