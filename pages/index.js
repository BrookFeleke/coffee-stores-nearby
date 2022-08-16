import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Banner from '../components/banner';
import Card from '../components/card';
import coffeeStores from '../data/coffee-stores.json';
export default function Home() {
  const handleOnBannerBtnClick = () => {
    console.count('Button clicker');
  };
console.log(coffeeStores);
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/beans.png" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText="View nearby Coffee shops"
          handleOnClick={handleOnBannerBtnClick}
        ></Banner>
        <div className={styles.heroImage}>
          <Image
            src="/static/hero-image.png"
            width={700}
            height={400}
            alt="Banner image of lady holding coffee"
          />
        </div>
        <div className={styles.cardLayout}>
          {coffeeStores.map((store) => {
            return <Card key={store.id}
              name={store.name}
              imgUrl={store.imgUrl}
              href={`/coffee-store/${store.id}`}
              className={styles.card}
            />;
          })}
        </div>
      </main>
    </div>
  );
}
