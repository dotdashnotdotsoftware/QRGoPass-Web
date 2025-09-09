import { component$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import {
    faGlobe, faLockOpen, faUser, faQuestion, faCopy,
    faUserSecret, faClock, faUserAstronaut, faUserShield,
    faMobileAlt, faArrowAltCircleDown, faPlusCircle,
    faHandPointDown, faQrcode, faCloudDownloadAlt
} from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck, faCloud, faPaperPlane, faPaste } from '@fortawesome/free-regular-svg-icons';
import { icon } from '@fortawesome/fontawesome-svg-core';
import moduleStyles from "./about.module.css";

type IconInput = Record<string, any>;
type SvgMap<T extends IconInput> = {
    [K in keyof T as `${string & K}Svg`]: string;
};

function generateSvgs<T extends IconInput>(input: T): SvgMap<T> {
    const result = {} as SvgMap<T>;
    for (const [key, value] of Object.entries(input)) {
        (result as any)[`${key}Svg`] = icon(value).html.join('');
    }
    return result;
}


const {
    faGlobeSvg,
    faLockOpenSvg,
    faUserSvg,
    faQuestionSvg,
    faCopySvg,
    faUserSecretSvg,
    faClockSvg,
    faUserAstronautSvg,
    faCircleCheckSvg,
    faUserShieldSvg,
    faMobileAltSvg,
    faArrowAltCircleDownSvg,
    faPlusCircleSvg,
    faHandPointDownSvg,
    faCloudSvg,
    faQrcodeSvg,
    faPaperPlaneSvg,
    faCloudDownloadAltSvg,
    faPasteSvg
} = generateSvgs({
    faGlobe, faLockOpen, faUser, faQuestion, faCopy,
    faUserSecret, faClock, faUserAstronaut, faCircleCheck,
    faUserShield, faMobileAlt, faArrowAltCircleDown,
    faPlusCircle, faHandPointDown, faCloud, faQrcode,
    faPaperPlane, faCloudDownloadAlt, faPaste
});

export const About = component$(() => {
    return (
        <article class={moduleStyles.article}>
            <h1>The Problem</h1>

            <div class={moduleStyles.infoRow}>
                <div class={moduleStyles.text}>
                    Let's be honest.<br />
                    You're terrible at managing passwords.
                </div>
            </div>

            <div class={moduleStyles.infoRow}>
                <div class={moduleStyles.text}>Everyone is.</div>
                <div class={moduleStyles.icon} dangerouslySetInnerHTML={faGlobeSvg} />
            </div>

            <div class={moduleStyles.infoRow}>
                <div class={moduleStyles.icon} style="color: #FF2400;" dangerouslySetInnerHTML={faLockOpenSvg} />
                <div class={moduleStyles.text}>We choose insecure passwords.</div>
            </div>

            <div class={moduleStyles.infoRow}>
                <div class={moduleStyles.text}>
                    Because nobody wants to remember a password like:<br />.TR;gfx-N\5._];:
                </div>
                <div class={moduleStyles.icon}>
                    <div class={moduleStyles.icon} style="height: 70%; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);" dangerouslySetInnerHTML={faUserSvg} />
                    <div class={moduleStyles.icon} style="height: 25%; color: red; position: absolute; top: 25%; left: 25%; transform: translateX(-50%);" dangerouslySetInnerHTML={faQuestionSvg} />
                    <div class={moduleStyles.icon} style="height: 25%; color: green; position: absolute; top: 0; left: 50%; transform: translateX(-50%);" dangerouslySetInnerHTML={faQuestionSvg} />
                    <div class={moduleStyles.icon} style="height: 25%; color: blue; position: absolute; top: 25%; right: 25%; transform: translateX(50%);" dangerouslySetInnerHTML={faQuestionSvg} />
                </div>
            </div>

            <div class={moduleStyles.infoRow}>
                <div class={moduleStyles.icon} dangerouslySetInnerHTML={faCopySvg} />
                <div class={moduleStyles.text}>And we use the same password in multiple places.</div>
            </div>

            <div class={moduleStyles.infoRow}>
                <div class={moduleStyles.text}>So when one account is hacked...</div>
                <div class={moduleStyles.icon} dangerouslySetInnerHTML={faUserSecretSvg} />
            </div>

            <div class={moduleStyles.infoRow}>
                <div class={moduleStyles.icon} style="color: red;" dangerouslySetInnerHTML={faClockSvg} />
                <div class={moduleStyles.text}>
                    Hours get wasted changing the password everywhere!
                </div>
            </div>

            <div class={moduleStyles.infoRow}>
                <div class={moduleStyles.text}>Surely there must be a better way?</div>
                <div class={moduleStyles.icon} dangerouslySetInnerHTML={faQuestionSvg} />
            </div>

            <div class={moduleStyles.infoRow}>
                <div class={moduleStyles.text}>
                    There is.<br />
                    It's called QRGoPass.
                </div>
            </div>

            <h1>So how can QRGoPass help?</h1>

            <div class={moduleStyles.infoRow}>
                <div class={moduleStyles.icon} style="color: green;" dangerouslySetInnerHTML={faCircleCheckSvg} />
                <div class={moduleStyles.text}>By letting you store strong passwords.</div>
            </div>

            <div class={moduleStyles.infoRow}>
                <div class={moduleStyles.text}>
                    And making everything simple to use so that you don't need to be a rocket scientist.
                </div>
                <div class={moduleStyles.icon} style="color: silver;" dangerouslySetInnerHTML={faUserAstronautSvg} />
            </div>

            <div class={moduleStyles.infoRow}>
                <div class={moduleStyles.icon} style="color: gold;" dangerouslySetInnerHTML={faUserShieldSvg} />
                <div class={moduleStyles.text}>
                    You can secure your online presence with ease.
                </div>
            </div>

            <h1>How do I get started?</h1>

            <div class={moduleStyles.infoRow}>
                <div class={moduleStyles.icon} style="color: black;" dangerouslySetInnerHTML={faMobileAltSvg} />
                <div class={moduleStyles.text}>Let's setup your mobile.</div>
            </div>

            <div class={moduleStyles.infoRow}>
                <div class={moduleStyles.text}>First, download the app.</div>
                <div class={moduleStyles.icon} style="color: #006400;" dangerouslySetInnerHTML={faArrowAltCircleDownSvg} />
            </div>

            <div class={moduleStyles.infoRow}>
                <div class={moduleStyles.icon} dangerouslySetInnerHTML={faPlusCircleSvg} />
                <div class={moduleStyles.text}>
                    Second, save your logon details in the app.<br />
                    As many as you want.
                </div>
            </div>

            <div class={moduleStyles.infoRow}>
                <div class={moduleStyles.text}>
                    Done.<br />
                    It's that easy.
                </div>
            </div>

            <div class={moduleStyles.infoRow}>
                <div class={moduleStyles.text}>Okay then, let's get you logged in!</div>
                <div class={moduleStyles.icon} dangerouslySetInnerHTML={faHandPointDownSvg} />
            </div>

            <h1>Putting it all together</h1>

            <div class={moduleStyles.infoRow}>
                <div class={moduleStyles.icon} dangerouslySetInnerHTML={faCloudSvg} />
                <div class={moduleStyles.text}>Open QRGoPass.com in your browser.</div>
            </div>

            <div class={moduleStyles.infoRow}>
                <div class={moduleStyles.text}>
                    Select the account you want to log into with the app and scan the code.
                </div>
                <div class={moduleStyles.icon} style="color: black;" dangerouslySetInnerHTML={faQrcodeSvg} />
            </div>

            <div class={moduleStyles.infoRow}>
                <div class={moduleStyles.icon} style="color: gray;" dangerouslySetInnerHTML={faPaperPlaneSvg} />
                <div class={moduleStyles.text}>
                    The app encrypts your details and then sends them securely via HTTPS to the cloud.
                </div>
            </div>

            <div class={moduleStyles.infoRow}>
                <div class={moduleStyles.text}>
                    Your browser downloads your details and decrypts them ready for you to use.
                </div>
                <div class={moduleStyles.icon} dangerouslySetInnerHTML={faCloudDownloadAltSvg} />
            </div>

            <div class={moduleStyles.infoRow}>
                <div class={moduleStyles.icon} dangerouslySetInnerHTML={faPasteSvg} />
                <div class={moduleStyles.text}>
                    Finally, just copy and paste your logon details where they're needed.
                </div>
            </div>

            <div class={moduleStyles.infoRow}>
                <div class={moduleStyles.text}>
                    And that's it, you've just securely logged in using QRGoPass!
                </div>
            </div>
        </article>
    );
});

export const head: DocumentHead = {
    title: "QRGoPass Explained",
    meta: [
        {
            name: "QRGoPass Explained",
            content: "How to use the QRGoPass web application and mobile application.",
        },
    ],
};
