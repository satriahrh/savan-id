import Head from 'next/head'
import Header from "./header";
import Content from "./content";
import Footer from "./footer";
// import Footer from "./footer";

export default function Baby() {
  return (
    <>
      <Head>
        <title>Toko Bayi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Content />
      <Footer />
    </>
  )
}
