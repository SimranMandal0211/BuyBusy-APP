import styles from '../../styles/home.module.css';

function ItemCard(props){
    const {name, image, price, category} = props.item;

    return(
       <div className={styles.cardContainer}>
            <div className={styles.imgBox}>
                <img src={image} alt={category} 
                    className={styles.productImg}
                />
            </div>

            <div className={styles.itemDetailBox}>
                <p>{name}</p>
                <p>Rs. {price}</p>
            </div>

            <button>Add To Cart</button>
       </div>
    )
}

export default ItemCard;