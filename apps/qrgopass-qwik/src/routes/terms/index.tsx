import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import styles from './terms.css?inline';

const currentYear = new Date().getFullYear();


export default component$(() => {
    useStylesScoped$(styles);

    return (
        <article>
            <h1>Terms of Service</h1>

            <div class="textFull">
                <h2>By using QRGoPass you agree that:</h2>
                <ul>
                    <li>We will not be liable for any loss of income, loss of profits, loss of markets, loss of reputation, loss of customers, loss of use, loss of an opportunity even if we had knowledge that such damages or loss might arise or for any indirect, incidental, special or consequential damages or loss howsoever arising including without limitation breach of contract, negligence, wilful act or default.</li>
                    <li>Not to access the site through automated means (except for indexing purposes).</li>
                    <li>Make use of QRGoPass's for anything other than it's original intention - transferring logon details.</li>
                </ul>

                If you have any questions feel free to make contact via e-mail.<br />
                Copyright {currentYear}, all rights reserved.
            </div>
        </article>
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
