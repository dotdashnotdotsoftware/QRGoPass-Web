import { component$, useSignal, useStylesScoped$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import styles from './information.css?inline';
import stylesModule from './information.module.css';
import { defaultContent, faqs } from './faqs';

export const Information = component$(() => {
    useStylesScoped$(styles);

    const activeComponent = useSignal(defaultContent);

    return (
        <>
            <article class={stylesModule["info-article"]}>
                <h1>Information</h1>
                <h2>For any extra details, please don't hesitate to contact us on dotdashnotdotsoftware (at) gmail.com!</h2>
                {
                    Object.entries(faqs).map(
                        ([title, FaqComponent]) => {
                            return <FaqComponent
                                key={title}
                                activeComponent={activeComponent.value}
                            />
                        })
                }
            </article>

            <div class="button-grid">
                {
                    Object.entries(faqs).map(
                        ([title]) => (
                            <button
                                key={title}
                                class="blue-button"
                                onClick$={() => (activeComponent.value = title)}
                            >
                                {title}
                            </button>
                        )
                    )
                }
            </div>
        </>
    );
});

export const head: DocumentHead = {
    title: "FAQs - QRGoPass",
    meta: [
        {
            name: "FAQs about QRGoPass",
            content: "Answers to frequently asked questions about QRGoPass, including security, storage, and usage.",
        },
    ],
};
