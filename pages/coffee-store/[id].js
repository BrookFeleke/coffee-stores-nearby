import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import cls from 'classnames';

import styles from '../../styles/coffee-store.module.css';
import { fetchCoffeeStores } from '../../lib/coffee-stores.js';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../store/store-context';
import { isEmpty } from '../../utils';
export async function getStaticProps({ params }) {
  const coffeeStoresData = await fetchCoffeeStores();

  const findCoffeeStoresById = coffeeStoresData.find((coffeeStore) => {
    return coffeeStore.fsq_id.toString() === params.id;
  });
  return {
    props: {
      coffeeStore: findCoffeeStoresById ? findCoffeeStoresById : {},
    },
  };
}

export async function getStaticPaths(params) {
  const coffeeStoresData = await fetchCoffeeStores();

  const pathArray = coffeeStoresData.map((coffeeStore) => {
    return { params: { id: coffeeStore.fsq_id.toString() } };
  });

  return {
    paths: pathArray,
    // it should look like this
    // paths: [{ params: { id: '5a3e35f58a6f1771f7cddd9a' } }, { params: { id: '4f433cbee4b05d3b15c7c772' } }],
    fallback: true,
  };
}

const CoffeeStore = (initialProps) => {
  // const imgUrl =
  //   'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80';
  const router = useRouter();

  const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore);
  const id = router.query.id;

  const {
    state: { coffeeStores },
  } = useContext(StoreContext);

  useEffect(() => {
    if (isEmpty(initialProps.coffeeStore)) {
      if (coffeeStores.length > 0) {
        const findCoffeeStoresById = coffeeStores.find((coffeeStore) => {
          return coffeeStore.fsq_id.toString() === id;
        });
        console.log('I am running');
        console.log({ findCoffeeStoresById });
        setCoffeeStore(findCoffeeStoresById);
      }
    }
  }, [id]);
  if (router.isFallback) return <div>Loading ...</div>;
  const { location, name, imgUrl } = coffeeStore;

  console.log({ location });
  const handleUpVoteButton = () => {
    console.log('hangle upvote');
  };
  return (
    <div className={styles.layout}>
      <Head>
        <title key="title">{`Coffee Shop - ${name}`}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/beans.png" />
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <p className={styles.name}>{name}</p>
          </div>
          <Image
            src={imgUrl}
            width={600}
            height={360}
            alt={name}
            className={styles.storeImg}
          ></Image>
        </div>
        <div className={cls('glass', styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/places.svg"
              width={24}
              height={24}
              alt="address icon"
            ></Image>
            <p className={styles.text}>
              {location ? location.address : 'fsfs'}
            </p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/nearMe.svg"
              width={24}
              height={24}
              alt="arrow icon"
            ></Image>
            <p className={styles.text}>
              {location ? location.formatted_address : 'fsfs'}
            </p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              width={24}
              height={24}
              alt="star"
            ></Image>
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpVoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
