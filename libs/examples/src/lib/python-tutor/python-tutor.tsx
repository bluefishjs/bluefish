import styles from './python-tutor.module.css';

/* eslint-disable-next-line */
export interface PythonTutorProps {}

export function PythonTutor(props: PythonTutorProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to PythonTutor!</h1>
    </div>
  );
}

export default PythonTutor;
