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
import useSWR from 'swr';

export async function getStaticProps({ params }) {
  const coffeeStoresData = await fetchCoffeeStores();

  const findCoffeeStoresById = coffeeStoresData.find((coffeeStore) => {
    return coffeeStore.id.toString() === params.id;
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
    return { params: { id: coffeeStore.id.toString() } };
  });

  return {
    paths: pathArray,

    fallback: true,
  };
}
const CoffeeStore = (initialProps) => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const router = useRouter();
  const id = router.query.id;
  const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore);
  const [upvote, setUpvote] = useState(0);
  const {
    state: { coffeeStores },
  } = useContext(StoreContext);
  const { data, error } = useSWR(`/api/getCoffeeStoreById?id=${id}`, fetcher);
  const handleCreateCoffeeStore = async (data) => {
    const { id, name, address, neighborhood, imgUrl } = data;
    try {
      const response = await fetch('/api/createCoffeeStore', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          id: `${id}`,
          name: `${name}`,
          address: address || '',
          neighborhood: neighborhood || '',
          upvote,
          imgUrl,
        }),
      });
      const dbCoffeeStore = await response.json();
      return { ...dbCoffeeStore[0] };
    } catch (err) {}
  };
  useEffect(() => {
    (async () => {
      if (coffeeStores.length > 0) {
        const findCoffeeStoresById = coffeeStores.find((coffeeStore) => {
          return coffeeStore.id.toString() === id;
        });
        const coffeeStoreFromDB = await handleCreateCoffeeStore(
          findCoffeeStoresById
        );

        setCoffeeStore({ ...coffeeStoreFromDB });
      }
    })();
  }, [id, initialProps]);

  useEffect(() => {
    if (data) {
      setCoffeeStore({ ...data });
      setUpvote(data.upvote);
    } else {
    }
  }, [data, error]);
  const handleUpVoteButton = async () => {
    setUpvote(upvote + 1);
    try {
      const bello = await fetch('/api/upvoteCoffeeStore', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: `${id}`,
        }),
      });
    } catch (error) {}
  };
  if (router.isFallback) return <div>Loading ...</div>;
  const { address, neighborhood, name, imgUrl } = coffeeStore;

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
            <p className={styles.text}>{address ? address : ''}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/nearMe.svg"
              width={24}
              height={24}
              alt="arrow icon"
            ></Image>
            <p className={styles.text}>{neighborhood ? neighborhood : ''}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              width={24}
              height={24}
              alt="star"
            ></Image>
            <p className={styles.text}>{upvote}</p>
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
