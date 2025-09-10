import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

const LegalContentTitle = "Legal Bits";
const LegalContent = component$(({ activeComponent }: { activeComponent: string }) => {
    return (
        <ul style={{ ...(activeComponent === LegalContentTitle ? {} : { display: 'none' }) }}>
            <li>
                <Link href="/privacy">Privacy Policy</Link>
            </li>
            <li>
                <Link href="/terms">Terms of Use</Link>
            </li>
        </ul>
    )
})

const StorageTitle = "How are my passwords stored?";
const StorageContent = component$(({ activeComponent }: { activeComponent: string }) => {
    return (
        <div style={{ ...(activeComponent === StorageTitle ? {} : { display: 'none' }) }}>
            When your logon or backup key is tranferred through the cloud - that information is sent encrypted & deleted approximately every ten minutes.
            <br />
            When saved into your phone, your logon details are stored within your phone's internal per-application private memory &amp; are encrypted using AES (OS support dependant).
        </div>
    )
})

const SpyTitle = "What happens if someone photos or sees my code?";
const SpyContent = component$(({ activeComponent }: { activeComponent: string }) => {
    return (
        <div style={{ ...(activeComponent === SpyTitle ? {} : { display: 'none' }) }}>
            QRGoPass works by only providing the information on screen needed to send information to the browser.
            <br />
            Without the private (non-displayed) information, an attacker is unable to intercept your transferred information in its un-encrypted form.
        </div>
    )
})

const WhyTitle = "Why use QRGoPass instead of Password Manager X?";
const WhyContent = component$(({ activeComponent }: { activeComponent: string }) => {
    return (
        <div style={{ ...(activeComponent === WhyTitle ? {} : { display: 'none' }) }}>
            QRGoPass was designed to let you log onto any device without any installation or accepting risk.
            <br />
            Without the need to install software or log into a cloud based solution (thus exposing your master password when logging into a security compromised device) QRGoPass lets you stay safe while minimising the damage in a worse case scenario.
        </div>
    )
})

export const faqs = {
    [LegalContentTitle]: LegalContent,
    [StorageTitle]: StorageContent,
    [SpyTitle]: SpyContent,
    [WhyTitle]: WhyContent,
}

export const defaultContent = LegalContentTitle;