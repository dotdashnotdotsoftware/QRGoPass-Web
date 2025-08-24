import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

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
