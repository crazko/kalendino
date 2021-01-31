require('dotenv').config({ path: '.env.local' });
require('firebase/firestore');
require('firebase/auth');

const firebase = require('firebase/app');
const faker = require('faker');

const randomize = () => Math.random() > 0.5;
const capitalize = ([f, ...rest]) => `${f.toUpperCase()}${rest.join('')}`;

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const db = firebase.initializeApp(config).firestore();

const writeData = async (length) => {
  await Promise.all(
    Array.from({ length }).map(async (_, i) => {
      const event = {
        name: capitalize(faker.company.bs()),
        summary: faker.lorem.paragraph(),

        // Date
        ...(randomize()
          ? // Future
            (() => {
              const refDate = faker.date.future();

              return {
                dateStart: refDate,
                dateEnd: faker.date.soon(5, refDate),
              };
            })()
          : // Past
            (() => {
              const refDate = faker.date.past();

              return {
                dateStart: faker.date.recent(5, refDate),
                dateEnd: refDate,
              };
            })()),

        // Location / Online event
        ...(randomize()
          ? { online: faker.internet.url() }
          : {
              location: new firebase.firestore.GeoPoint(faker.address.latitude(), faker.address.longitude()),
            }),
      };

      const response = await db.collection('events').add(event);

      console.log(response.id, event);
    })
  );

  console.log(`Created "${length}" dummy events.`);

  process.exit();
};

writeData(10);
