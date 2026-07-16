import imgAakash from '../assets/Aakash.png';
import imgAnil from '../assets/Anil.png';
import imgKuldeep from '../assets/Kuldeep Bhati.png';
import imgKunal from '../assets/Kunal.png';
import imgPawan from '../assets/Pawan.png';
import imgRohit from '../assets/Rohit.png';

export const unitOptions = [
  { id: 'unit-782', name: 'Unit 782/783' },
  { id: 'unit-94', name: 'Unit 94' },
  { id: 'unit-97', name: 'Unit 97' }
];

export const teamData = {
  'unit-782': {
    champion: { name: 'Mr. Kuldeep Bhati', role: 'Champion', image: imgKuldeep },
    coordinators: [
      { name: 'Mr. Pawan Kumar', role: 'Co-ordinator', image: imgPawan },
      { name: 'Dr. Akash Tanwar', role: 'Co-ordinator', image: imgAakash }
    ],
    dyCoordinators: [
      { name: 'Mr. Anil Sharma', role: 'Dy. Co-ordinator', reportsTo: 'Mr. Pawan Kumar', image: imgAnil },
      { name: 'Mr. Kunal Ranjan', role: 'Dy. Co-ordinator', reportsTo: 'Dr. Akash Tanwar', image: imgKunal }
    ],
    clusterOfficers: [
      { name: 'Mr. Rajender', role: 'Cluster Officer', reportsTo: 'Mr. Anil Sharma' },
      { name: 'Mr. Rohit', role: 'Cluster Officer', reportsTo: 'Mr. Kunal Ranjan' }
    ]
  },
  'unit-94': {
    champion: { name: 'Mr. Kuldeep Bhati', role: 'Champion', image: imgKuldeep },
    coordinators: [
      { name: 'Mr. Pawan Kumar', role: 'Co-ordinator', image: imgPawan },
      { name: 'Dr. Akash Tanwar', role: 'Co-ordinator', image: imgAakash }
    ],
    dyCoordinators: [
      { name: 'Mr. Anil Sharma', role: 'Dy. Co-ordinator', image: imgAnil },
      { name: 'Mr. Kunal Ranjan', role: 'Dy. Co-ordinator', image: imgKunal }
    ],
    clusterOfficers: [
      { name: 'Mr. Rajendra', role: 'Cluster Officer' },
      { name: 'Mr. Kamal', role: 'Cluster Officer' }
    ]
  },
  'unit-97': {
    champion: { name: 'Mr. Kuldeep Bhati', role: 'Champion', image: imgKuldeep },
    coordinators: [
      { name: 'Mr. Pawan Kumar', role: 'Co-ordinator', image: imgPawan },
      { name: 'Dr. Akash Tanwar', role: 'Co-ordinator', image: imgAakash }
    ],
    dyCoordinators: [
      { name: 'Mr. Kunal Ranjan', role: 'Dy. Co-ordinator', image: imgKunal },
      { name: 'Mr. Rohit Singh', role: 'Dy. Co-ordinator', image: imgRohit }
    ],
    clusterOfficers: [
      { name: 'Mr. Rajendra', role: 'Cluster Officer' },
      { name: 'Mr. Kamal', role: 'Cluster Officer' }
    ]
  }
};
