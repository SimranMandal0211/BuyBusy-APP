import {useProductContext} from '../productContext';
import CartItem from '../components/Cart/CartItem';

export default function Cart(){
    const {cart} = useProductContext();

    return(
        <div>
            {cart.length === 0 ? 
                <h1>Nothing in your Cart!!!</h1> :
                cart.map((product, i) => 
                            <CartItem key={i} 
                                product={product} />
                        )
            }
        </div>
    );
}