import styles from './plot.module.css';

export type PlotContextValue<T> = {
  data?: T;
  schema: { [key in keyof T]: any };
  // dimensions: Dimensions;
  scales: { [key in string /* Scale */]: any };
};

/* eslint-disable-next-line */
export type PlotProps = {};

export function Plot(props: PlotProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Plot!</h1>
    </div>
  );
}

export default Plot;
