import Image from './github-mark.png?w=240&h=240&jsx';
import { component$ } from '@builder.io/qwik';

export const GitHubIcon = component$(() => {
    return <a href="https://github.com/dotdashnotdotsoftware/QRGoPass-Web">
        <Image alt="Follow us on GitHub" style={{
          width: '32px',
          height: '32px',
          objectFit: 'contain',
        }}/>
    </a>
});