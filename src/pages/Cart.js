import {useProductContext} from '../productContext';
import CartItem from '../components/Cart/CartItem';

import styles from '../styles/cart.module.css';

export default function Cart(){
    const {cart} = useProductContext();

    return(
        <div className={styles.cartPageBox}>
            <div className={styles.cartItemsBox}>
                {cart.length === 0 ? 
                    <h1>Nothing in your Cart!!!</h1> :
                    cart.map((product, i) => 
                                <CartItem key={i} 
                                    product={product} />
                            )
                }
            </div>
            <div className={styles.cartPurchaseSection}>
                <p> Total - Rs. 500</p>
                <button>Buy Now</button>
            </div>
        </div>
    );
}