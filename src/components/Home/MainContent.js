import ItemCard from './ItemCard';

import styles from '../../styles/home.module.css';

import { useProductContext } from '../../productContext';

function MainContent(){
    // product data
    const { data } = useProductContext();

    return(
        <div className={styles.itemContainer}>
            {data.map((item) => 
                <ItemCard  key={item.id}
                    item={item}
                />
            )}
        </div>   
    )
}

export default MainContent;