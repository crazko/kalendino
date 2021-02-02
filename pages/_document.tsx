import Document from 'next/document';
import { setFuego } from '@nandorojo/swr-firestore';

import { fuego } from './_app';

// Access to firestore support for server-rendered pages, see https://github.com/nandorojo/swr-firestore/issues/17
setFuego(fuego);

export default Document;
