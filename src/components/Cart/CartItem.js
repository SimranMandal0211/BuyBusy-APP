import minusIcon from '../../assets/images/remove.png';
import plusIcon from '../../assets/images/add.png';

import styles from '../../styles/cart.module.css';

export default function CartItem(props){
    const {name, image, price, category, quantity} = props.product;

    return(
        <div className={styles.cartItem}>
            <div className={styles.cartItemImgBox}>
                <div className={styles.cartItemImg}>
                    <img src={image} alt={category} />
                </div>
                <div className={styles.qtyBtns}>
                    <span><img src={minusIcon} alt='-' /></span>
                    <span>{quantity}</span>
                    <span><img src={plusIcon} alt='+' /></span>
                </div>
            </div>

            <div className={styles.cartItemDetails}>
                <p>{name}</p>
                <p>Rs. {price}</p>

                <button>Remove From Cart</button>
            </div>

        </div>
    );
}