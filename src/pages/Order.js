import OrderDetail from '../components/Orders/OrderDetail';
import { Link } from 'react-router-dom';

import { useProductContext } from '../productContext';
import styles from '../styles/order.module.css';

export default function Order(){
    const { myorders } = useProductContext();

    return(
        <div className={styles.orderContainer}>
            <h1>My Order</h1>

            {myorders.length === 0 ? 
                <>
                <h1>You haven't placed any order yet!!</h1>
                <Link to='/' className={styles.shopingMsg}>!!! Start Shopping !!!</Link>
                </>
                :
                // order list container
                <div className={styles.orderListContainer}>
                    {myorders.map((order, i) => <OrderDetail key={i} 
                        order={order}
                    />)}
                </div>
            }
        </div>
    )
}