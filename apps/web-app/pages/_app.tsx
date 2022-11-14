import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
    fetch('http://localhost:3333/graphql', { method: 'POST', body: '{users:findManyUsers()}' })
        .then((x) => x.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));

    return (
        <>
            <Head>
                <title>Welcome to web-app!</title>
            </Head>
            <main className="app">
                <Component {...pageProps} />
            </main>
        </>
    );
}

export default CustomApp;
