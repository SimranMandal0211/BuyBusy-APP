import ItemCard from './ItemCard';

import styles from '../../styles/home.module.css';

import { useProductContext } from '../../productContext';

function MainContent(props){
    // product data
    const { data } = useProductContext();
    const { search } = props

    console.log('search: ',search);
    return(
        <div className={styles.itemContainer}>
            {data
                // filter on the basis of search bar
                .filter((item) => {
                    return search.toLocaleLowerCase() === ''
                    ? item : item.name.toLocaleLowerCase().includes(search)
                })
                // map to each item of the array
                .map((item) => 
                    <ItemCard  key={item.id}
                        item={item}
                    />
                )
            }
        </div>   
    )
}

export default MainContent;