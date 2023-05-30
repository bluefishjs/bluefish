import styles from './plot.module.css';

/* eslint-disable-next-line */
export interface PlotProps {}

export function Plot(props: PlotProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Plot!</h1>
    </div>
  );
}

export default Plot;
