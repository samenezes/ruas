import styles from '../Footer/Footer.module.css'

function Footer() {
  

  return (
    <>
    <div className={styles.container_Footer}>
        <div className={styles.container_Direitos}>Direitos Autorais</div>
        <div className={styles.container_Itens}>
            <ul className={styles.itens_Footer}>
            <li>item1</li>
            <li>item2</li>
            <li>item3</li>
            <li>item4</li>
            <li>item5</li>
            </ul>
        </div>
    </div>

    </>
  )
}

export default Footer