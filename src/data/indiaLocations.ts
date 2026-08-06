/** Indian states / UTs and major cities for franchise application filters. */

export const INDIAN_STATES = [
  'Andaman and Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Puducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
] as const

export type IndianState = (typeof INDIAN_STATES)[number]

type CityEntry = { name: string; aliases?: string[] }

const CITIES_BY_STATE: Record<string, CityEntry[]> = {
  'Andaman and Nicobar Islands': [{ name: 'Port Blair' }, { name: 'Havelock Island' }],
  'Andhra Pradesh': [
    { name: 'Visakhapatnam', aliases: ['Vizag'] },
    { name: 'Vijayawada' },
    { name: 'Guntur' },
    { name: 'Tirupati' },
    { name: 'Nellore' },
    { name: 'Kakinada' },
    { name: 'Rajahmundry' },
    { name: 'Anantapur' },
  ],
  'Arunachal Pradesh': [{ name: 'Itanagar' }, { name: 'Tawang' }, { name: 'Pasighat' }],
  Assam: [
    { name: 'Guwahati' },
    { name: 'Dibrugarh' },
    { name: 'Silchar' },
    { name: 'Jorhat' },
    { name: 'Tezpur' },
  ],
  Bihar: [
    { name: 'Patna' },
    { name: 'Gaya' },
    { name: 'Muzaffarpur' },
    { name: 'Bhagalpur' },
    { name: 'Darbhanga' },
  ],
  Chandigarh: [{ name: 'Chandigarh' }],
  Chhattisgarh: [
    { name: 'Raipur' },
    { name: 'Bhilai' },
    { name: 'Bilaspur' },
    { name: 'Durg' },
    { name: 'Korba' },
  ],
  'Dadra and Nagar Haveli and Daman and Diu': [
    { name: 'Silvassa' },
    { name: 'Daman' },
    { name: 'Diu' },
  ],
  Delhi: [
    { name: 'New Delhi' },
    { name: 'Delhi' },
    { name: 'Dwarka' },
    { name: 'Rohini' },
    { name: 'Saket' },
    { name: 'Connaught Place', aliases: ['CP'] },
  ],
  Goa: [
    { name: 'Panaji', aliases: ['Panjim'] },
    { name: 'Margao' },
    { name: 'Vasco da Gama', aliases: ['Vasco'] },
    { name: 'Mapusa' },
  ],
  Gujarat: [
    { name: 'Ahmedabad' },
    { name: 'Surat' },
    { name: 'Vadodara', aliases: ['Baroda'] },
    { name: 'Rajkot' },
    { name: 'Gandhinagar' },
    { name: 'Bhavnagar' },
    { name: 'Jamnagar' },
  ],
  Haryana: [
    { name: 'Gurugram', aliases: ['Gurgaon'] },
    { name: 'Faridabad' },
    { name: 'Chandigarh' },
    { name: 'Panipat' },
    { name: 'Ambala' },
    { name: 'Hisar' },
    { name: 'Karnal' },
    { name: 'Rohtak' },
  ],
  'Himachal Pradesh': [
    { name: 'Shimla' },
    { name: 'Dharamshala' },
    { name: 'Manali' },
    { name: 'Solan' },
    { name: 'Mandi' },
  ],
  'Jammu and Kashmir': [
    { name: 'Srinagar' },
    { name: 'Jammu' },
    { name: 'Anantnag' },
    { name: 'Baramulla' },
  ],
  Jharkhand: [
    { name: 'Ranchi' },
    { name: 'Jamshedpur' },
    { name: 'Dhanbad' },
    { name: 'Bokaro' },
    { name: 'Deoghar' },
  ],
  Karnataka: [
    { name: 'Bengaluru', aliases: ['Bangalore', 'Bengalore'] },
    { name: 'Mysuru', aliases: ['Mysore'] },
    { name: 'Mangaluru', aliases: ['Mangalore'] },
    { name: 'Hubballi', aliases: ['Hubli'] },
    { name: 'Belagavi', aliases: ['Belgaum'] },
    { name: 'Kalaburagi', aliases: ['Gulbarga'] },
    { name: 'Ballari', aliases: ['Bellary'] },
    { name: 'Udupi' },
    { name: 'Shivamogga', aliases: ['Shimoga'] },
  ],
  Kerala: [
    { name: 'Kochi', aliases: ['Cochin', 'Ernakulam'] },
    { name: 'Thiruvananthapuram', aliases: ['Trivandrum'] },
    { name: 'Kozhikode', aliases: ['Calicut'] },
    { name: 'Thrissur' },
    { name: 'Kannur' },
    { name: 'Kollam' },
    { name: 'Alappuzha', aliases: ['Alleppey'] },
  ],
  Ladakh: [{ name: 'Leh' }, { name: 'Kargil' }],
  Lakshadweep: [{ name: 'Kavaratti' }],
  'Madhya Pradesh': [
    { name: 'Bhopal' },
    { name: 'Indore' },
    { name: 'Gwalior' },
    { name: 'Jabalpur' },
    { name: 'Ujjain' },
    { name: 'Rewa' },
  ],
  Maharashtra: [
    { name: 'Mumbai', aliases: ['Bombay'] },
    { name: 'Pune' },
    { name: 'Nagpur' },
    { name: 'Nashik', aliases: ['Nasik'] },
    { name: 'Thane' },
    { name: 'Aurangabad', aliases: ['Chhatrapati Sambhajinagar'] },
    { name: 'Navi Mumbai' },
    { name: 'Kolhapur' },
    { name: 'Solapur' },
  ],
  Manipur: [{ name: 'Imphal' }],
  Meghalaya: [{ name: 'Shillong' }, { name: 'Tura' }],
  Mizoram: [{ name: 'Aizawl' }],
  Nagaland: [{ name: 'Kohima' }, { name: 'Dimapur' }],
  Odisha: [
    { name: 'Bhubaneswar' },
    { name: 'Cuttack' },
    { name: 'Rourkela' },
    { name: 'Puri' },
    { name: 'Sambalpur' },
  ],
  Puducherry: [
    { name: 'Puducherry', aliases: ['Pondicherry'] },
    { name: 'Karaikal' },
  ],
  Punjab: [
    { name: 'Ludhiana' },
    { name: 'Amritsar' },
    { name: 'Jalandhar' },
    { name: 'Mohali', aliases: ['SAS Nagar'] },
    { name: 'Patiala' },
    { name: 'Bathinda' },
  ],
  Rajasthan: [
    { name: 'Jaipur' },
    { name: 'Udaipur' },
    { name: 'Jodhpur' },
    { name: 'Kota' },
    { name: 'Ajmer' },
    { name: 'Bikaner' },
    { name: 'Alwar' },
  ],
  Sikkim: [{ name: 'Gangtok' }],
  'Tamil Nadu': [
    { name: 'Chennai', aliases: ['Madras'] },
    { name: 'Coimbatore' },
    { name: 'Madurai' },
    { name: 'Tiruchirappalli', aliases: ['Trichy'] },
    { name: 'Salem' },
    { name: 'Tirunelveli' },
    { name: 'Erode' },
    { name: 'Vellore' },
  ],
  Telangana: [
    { name: 'Hyderabad' },
    { name: 'Warangal' },
    { name: 'Nizamabad' },
    { name: 'Karimnagar' },
    { name: 'Khammam' },
  ],
  Tripura: [{ name: 'Agartala' }],
  'Uttar Pradesh': [
    { name: 'Lucknow' },
    { name: 'Noida' },
    { name: 'Ghaziabad' },
    { name: 'Kanpur' },
    { name: 'Varanasi', aliases: ['Banaras', 'Kashi'] },
    { name: 'Agra' },
    { name: 'Prayagraj', aliases: ['Allahabad'] },
    { name: 'Meerut' },
    { name: 'Greater Noida' },
  ],
  Uttarakhand: [
    { name: 'Dehradun' },
    { name: 'Haridwar' },
    { name: 'Rishikesh' },
    { name: 'Nainital' },
    { name: 'Haldwani' },
  ],
  'West Bengal': [
    { name: 'Kolkata', aliases: ['Calcutta'] },
    { name: 'Howrah' },
    { name: 'Durgapur' },
    { name: 'Siliguri' },
    { name: 'Asansol' },
  ],
}

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, ' ')
}

function matchesQuery(label: string, aliases: string[] | undefined, query: string) {
  const q = normalize(query)
  if (!q) return true
  const haystack = [label, ...(aliases ?? [])].map(normalize)
  return haystack.some((item) => item.startsWith(q) || item.includes(q))
}

export function filterStates(query: string) {
  return INDIAN_STATES.filter((state) => matchesQuery(state, undefined, query))
}

export function getCitiesForState(state: string) {
  return CITIES_BY_STATE[state] ?? []
}

export function filterCities(state: string, query: string) {
  return getCitiesForState(state)
    .filter((city) => matchesQuery(city.name, city.aliases, query))
    .map((city) => city.name)
}
