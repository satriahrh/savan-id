const firebase = require('firebase')
require('firebase/firestore')

const firebaseConfigJson = process.env.FIREBASE_CONFIG_JSON;
const firebaseConfig = JSON.parse(firebaseConfigJson);
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
if (process.env.NODE_ENV === 'development') {
  if(typeof window === 'undefined' || !window['_init']) {
    firestore.useEmulator(process.env.FIRESTORE_EMULATOR_HOST, process.env.FIRESTORE_EMULATOR_PORT);
    if(typeof window !== 'undefined') {
      window['_init'] = true;
    }
  }
}

let productsRef = firestore.collection("products")
productsRef.doc('savan-0').set({
  name: "Jumper Solid",
  variants: {
    main: ['Putih', 'Polos', 'Strip', 'Strap'],
    secondary: ['NB', '3-6m', '6-9m', '9-12m', '1y', '2y', '3y'],
  },
  brandName: 'Savan Baby Store',
  brandColor: '#FFD770',
  price: 21300,
  photos: {
    thumbnails: [`https://via.placeholder.com/200x200/8f8e94/FFFFFF?text=Jumper Nahkoda Abu`],
    main: [
      'https://via.placeholder.com/600x600/FFFFFF/8f8e94?text=FotoUtamaPolos',
      'https://via.placeholder.com/600x600/8f8e94/FFFFFF?text=FotoKedua',
    ],
    'Putih': [
      'https://via.placeholder.com/600x600/8f8e94/FFFFFF?text=FotoUtamaPutih',
      'https://via.placeholder.com/600x600/8f8e94/FFFFFF?text=FotoKeduaPutih',
      'https://via.placeholder.com/600x600/8f8e94/FFFFFF?text=FotoKetigaPutih',
      'https://via.placeholder.com/600x600/8f8e94/FFFFFF?text=FotoKeempatPutih',
      'https://via.placeholder.com/600x600/8f8e94/FFFFFF?text=FotoKelimaPutih',
    ],
    'Polos': [
      'https://via.placeholder.com/600x600/8f8e94/FFFFFF?text=FotoUtamaPolos',
      'https://via.placeholder.com/600x600/8f8e94/FFFFFF?text=FotoKeduaPolos',
      'https://via.placeholder.com/600x600/8f8e94/FFFFFF?text=FotoKetigaPolos',
      'https://via.placeholder.com/600x600/8f8e94/FFFFFF?text=FotoKeempatPolos',
      'https://via.placeholder.com/600x600/8f8e94/FFFFFF?text=FotoKelimaPolos',
    ],
    'Strip': [
      'https://via.placeholder.com/600x600/8f8e94/FFFFFF?text=FotoUtamaStrip',
      'https://via.placeholder.com/600x600/8f8e94/FFFFFF?text=FotoKeduaStrip',
      'https://via.placeholder.com/600x600/8f8e94/FFFFFF?text=FotoKetigaStrip',
      'https://via.placeholder.com/600x600/8f8e94/FFFFFF?text=FotoKeempatStrip',
      'https://via.placeholder.com/600x600/8f8e94/FFFFFF?text=FotoKelimaStrip',
    ],
    'Strap': [
      'https://via.placeholder.com/600x600/8f8e94/FFFFFF?text=FotoUtamaStrap',
      'https://via.placeholder.com/600x600/8f8e94/FFFFFF?text=FotoKeduaStrap',
      'https://via.placeholder.com/600x600/8f8e94/FFFFFF?text=FotoKetigaStrap',
      'https://via.placeholder.com/600x600/8f8e94/FFFFFF?text=FotoKeempatStrap',
      'https://via.placeholder.com/600x600/8f8e94/FFFFFF?text=FotoKelimaStrap',
    ],
  },
  marketplacesUrl: {
    shopee: `https://shopee.co.id/Fluffy-OJS-Baju-Panjang-Oblong-Rib-untuk-Anak-Bayi-Usia-6-12-bulan-1-pcs-i.277931002.5440958490`,
  },
  descriptions: [
    {
      summary: "Detail",
      details: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful."
    },
    {
      summary: "Ukuran",
      details: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish."
    },
    {
      summary: "Bahan dan Perawatan",
      details: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat"
    },
  ],
}, {
  merge: true
}).then(() => {
  console.log("success")
})
