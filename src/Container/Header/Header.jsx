import styles from '../Header/Header.module.css'

function Header() {
  

  return (
    <>
    <div className={styles.container_Header}>
        <div className={styles.container_Logo}>API</div>
        <div className={styles.container_Itens}>
            <ul className={styles.itens}>
            <li>ITEM1</li>
            <li>ITEM2</li>
            <li>ITEM3</li>
            <li>ITEM4</li>
            <li>ITEM5</li>
            </ul>
        </div>
    </div>

    </>
  )
}

export default Header
