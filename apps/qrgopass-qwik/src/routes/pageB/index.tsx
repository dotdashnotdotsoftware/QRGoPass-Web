import { component$ } from '@builder.io/qwik';
import { DocumentHead, Link } from '@builder.io/qwik-city';

export default component$(() => {
    return (
        <><nav>
            <Link href="/pageA">Page A</Link>
            <Link href="/pageB">Page B</Link>
            <Link href="/pageC">Page C</Link>
        </nav>
            <div>This is Page B</div>
        </>
    );
});

export const head: DocumentHead = {
    title: "Welcome to Qwik",
    meta: [
        {
            name: "description",
            content: "Qwik site description",
        },
    ],
};
