import styles from "./Button.module.css"

const Button = (props) => {
  return (<input className={styles.button} type={props.type} value={props.value} />)
}

export default Button
