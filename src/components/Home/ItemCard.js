import styles from '../../styles/home.module.css';

function MainContent(){
    return(
       <div className={styles.cardContainer}>
            <div className={styles.imgBox}>
                <img src='https://3.bp.blogspot.com/-WSxpb-jWNFQ/UTHBTiDE2yI/AAAAAAAAA9g/KGNwUll7uOc/s1600/latest+dresses7.jpg' alt='product-Image' 
                    className={styles.productImg}
                />
            </div>

            <div className={styles.itemDetailBox}>
                <p>Floral Multicolor Organza Dress </p>
                <p>Rs. 500</p>
            </div>

            <button>Add To Cart</button>
       </div>
    )
}

export default MainContent;