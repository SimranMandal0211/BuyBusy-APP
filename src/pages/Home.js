import { useState } from "react";
import MainContent from "../components/Home/MainContent";

import styles from '../styles/home.module.css';

function Home(){
    const [search, setSearch] = useState('');
    return(
        <div className={styles.homeContainer}>
            <div className={styles.searchInputBox}>
                <input type='text' placeholder='Search Item...'
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <MainContent search={search} />
        </div>
    )
}

export default Home;