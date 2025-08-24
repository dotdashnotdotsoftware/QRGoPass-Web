import { component$, Slot, useStylesScoped$ } from '@builder.io/qwik';
// import { Footer } from '~/components/footer';
import { Header } from '~/components/header';
import styles from "./layout.css?inline";


export default component$(() => {
    useStylesScoped$(styles);

    return (
        <div class="page-container">
            <Header />

            <main class="main-content">
                <Slot /> {/* <== This is where the route will be inserted */}
            </main>
            {/* <Footer /> */}
        </div>
    );
});