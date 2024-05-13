import styles from './index.module.less'

export default function Welcome() {
  return (
    <div className={styles.welcome}>
      <div className={styles.content}>
        <div className={styles.subTitle}>欢迎体验</div>
        <div className={styles.title}>React18通用后台管理系统</div>
        <div className={styles.desc}>React18+ReactRouter+TypeScript+Vite实现通用后台</div>
      </div>
      <div className={styles.img}></div>
    </div>
  )
}
