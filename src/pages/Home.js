import { useState } from "react";
import MainContent from "../components/Home/MainContent";
import FilterBar from '../components/Home/FilterBar';

import styles from '../styles/home.module.css';

function Home(){
    const [search, setSearch] = useState('');
    const [price, setPrice] = useState(5000);
    const [category, setCategory] = useState('none');


    return(
        <div className={styles.homeContainer}>
            <div className={styles.searchInputBox}>
                <input type='text' placeholder='Search Item...'
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className={styles.filterMainContainer}>
                <FilterBar price={price}
                    setPrice={setPrice}
                    setCategory={setCategory}
                />
                <MainContent search={search} 
                    price={price}
                    category={category}
                />
            </div>
        </div>
    )
}

export default Home;