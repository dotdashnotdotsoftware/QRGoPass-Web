import { component$, Slot, useStylesScoped$ } from '@builder.io/qwik';
import styles from "./header.css?inline";
import moduleStyles from "./header.module.css";
import { Link, useLocation } from '@builder.io/qwik-city';

const HomeLink = component$(() => {
    const location = useLocation();
    const isHome = location.url.pathname === '/';

    return isHome ?
        <a href={"/"} class={moduleStyles["nav-link"]}>
            <Slot />
        </a> :
        <Link href={"/"} class={moduleStyles["nav-link"]}>
            <Slot />
        </Link>
})

export const Header = component$(() => {
    useStylesScoped$(styles);

    return (
        <header>
            <div class="left-links">
                <HomeLink>{/* eslint-disable-next-line qwik/jsx-img */}
                    <img src="/logo_32.png" width={32} height={32} />
                    QRGoPass
                </HomeLink>
            </div>
            <div class="right-links">
                <Link href="/about" class={moduleStyles["nav-link"]}>What is this?</Link>
                <Link href="/information" class={moduleStyles["nav-link"]}>FAQs</Link>
                <a href="https://play.google.com/store/apps/details?id=com.qrgopass.qrgopass.live&hl=en-GB">
                    <img src="/GetItOnGooglePlay_Badge_Web_color_English.png" width={108} height={32} />
                </a>
            </div>
        </header>
    );
});