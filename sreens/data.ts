import { BuildingSite } from "../data/model";

export const buildingSites: BuildingSite[] = [
{ id: 0, address: "ул. Мира, 3", lat: 56, lon: 44, title: 'Технострой', image: require('../assets/img1.png') },
  { id: 1, address: "пл. Ленина, 1a", lat: 56, lon: 44, title: 'НН-Строй', image: require('../assets/img2.png')  },
  { id: 2, address: "пл. Горького, 9", lat: 56, lon: 44, title: 'ГСК', image: require('../assets/img3.png')  },
  { id: 3, address: "ул. Родионова, 126", lat: 56, lon: 44, title: 'АСП Дом', image: require('../assets/img4.png')  },
  { id: 4, address: "ул. Карла Маркса, 35", lat: 56, lon: 44, title: 'Строй Холдинг', image: require('../assets/img1.png')  },
  { id: 5, address: "ул. Львовская, 1в", lat: 56.31633, lon: 44.0617, title: 'АСЭ', image: require('../assets/img2.png')  },
  { id: 6, address: "ул. Максима Горького, 78", lat: 56.3163336, lon: 44.0617215, title: 'Триум-строй', image: require('../assets/img3.png')  },

];

export const steps = [
  { date: "26/10", value: 1040, time: 8.2 },
  { date: "27/10", value: 2303, time: 12.2 },
  { date: "28/10", value: 4351, time: 9 },
  { date: "29/10", value: 3041, time: 8.4 },
  { date: "30/10", value: 1402, time: 12.4 }
];
