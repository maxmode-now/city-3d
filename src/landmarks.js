// Major Seoul landmarks — coordinates are [longitude, latitude]
// camera: view used by flyTo (bearing tuned per landmark for the best angle)
export const LANDMARKS = [
  {
    id: 'lotte-tower',
    name: 'Lotte World Tower',
    coords: [127.1025, 37.5126],
    camera: { zoom: 15.6, pitch: 65, bearing: -40 },
    chips: ['555 m', '123 floors', 'Completed 2017'],
    desc: 'The tallest building in South Korea and one of the tallest skyscrapers in the world. The centerpiece of the Jamsil skyline.',
  },
  {
    id: 'namsan-tower',
    name: 'N Seoul Tower',
    coords: [126.9883, 37.5512],
    camera: { zoom: 14.8, pitch: 68, bearing: 25 },
    chips: ['236 m tower', 'Mt. Namsan 262 m', 'Opened 1980'],
    desc: 'The iconic tower atop Mt. Namsan. Tower and mountain combined offer a panoramic view of Seoul from roughly 480 m above sea level.',
  },
  {
    id: 'sixty-three',
    name: '63 Building',
    coords: [126.9401, 37.5198],
    camera: { zoom: 15.4, pitch: 62, bearing: -25 },
    chips: ['249.6 m', '63 floors', 'Completed 1985'],
    desc: 'The golden landmark of Yeouido on the Han River. It was the tallest building in Asia at the time of its completion.',
  },
  {
    id: 'gyeongbokgung',
    name: 'Gyeongbokgung Palace',
    coords: [126.977, 37.5788],
    camera: { zoom: 15.8, pitch: 55, bearing: 0 },
    chips: ['Main royal palace', 'Founded 1395'],
    desc: 'The principal palace of the Joseon dynasty, set against Mt. Bugaksan and facing Gwanghwamun Square and the downtown skyline.',
  },
  {
    id: 'ddp',
    name: 'Dongdaemun Design Plaza',
    coords: [127.0095, 37.5665],
    camera: { zoom: 16.2, pitch: 58, bearing: 60 },
    chips: ['Zaha Hadid', 'Opened 2014'],
    desc: 'A neofuturistic landmark with flowing curved facades — one of the largest free-form buildings in the world.',
  },
  {
    id: 'assembly',
    name: 'National Assembly Building',
    coords: [126.914, 37.5319],
    camera: { zoom: 15.6, pitch: 60, bearing: -10 },
    chips: ['Yeouido', 'Completed 1975'],
    desc: 'The seat of the South Korean legislature at the western tip of Yeouido, its domed roof set against the Han River.',
  },
  {
    id: 'city-hall',
    name: 'Seoul City Hall & Gwanghwamun',
    coords: [126.978, 37.5665],
    camera: { zoom: 15.4, pitch: 60, bearing: -17 },
    chips: ['Downtown core'],
    desc: 'The heart of downtown Seoul — Deoksugung Palace, City Hall, Cheonggyecheon Stream, and Gwanghwamun Square.',
  },
];

// Initial camera: oblique view above City Hall
export const INITIAL_VIEW = {
  center: [126.978, 37.5665],
  zoom: 15.2,
  pitch: 60,
  bearing: -17,
};
