import tourImg01 from "../images/tour-img01.jpg";
import tourImg02 from "../images/tour-img02.jpg";
import tourImg03 from "../images/tour-img03.jpg";
import tourImg04 from "../images/tour-img04.jpg";
import tourImg05 from "../images/tour-img05.jpg";
import tourImg06 from "../images/tour-img06.jpg";
import tourImg07 from "../images/tour-img07.jpg";
import tourImg08 from "../images/tour-img08.jpg";

const tours = [
  {
    
    title: "Taj Mahal",
    city: "Agra",
    address:"India",
    price: 1100,
    maxGroupSize: 10,
    desc: "Majestically located on the banks of Yamuna River, this wonder of the world was built by the Mughal Emperor Shah Jahan as a memorial for his beloved wife Mumtaz Mahal.",
    reviews: [
      {
        name: "Lokesh",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg01,
    featured: true,
  },
  {
    id: "02",
    title: "Red Fort (Lal Quila)",
    city: "Delhi",
    address:"India",
    price: 500,
    maxGroupSize: 8,
    desc: "Located in Chandni Chowk Old Delhi, this red sandstone structure was constructed under the reign of Mughal emperor Shah Jahan for protection against invaders. It is known for its intricate Mughal architecture and floral designs.",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg02,
    featured: true,
  },
  {
    id: "03",
    title: "Golden Temple, Amristar",
    city: "Amristar",
    address:"India",
    price: 1100,
    maxGroupSize: 8,
    desc: "Also known as Sri Harmandir Sahib, Golden Temple is considered to be the most important pilgrimage site amongst Sikhs and will leave you in awe with its jaw-dropping gold and marble edifice.",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg03,
    featured: true,
  },
  {
    id: "04",
    title: "Amber Fort",
    city: "Jaipur",
    address:"India",
    price: 900,
    maxGroupSize: 8,
    desc: "Perched atop a hill and overlooking the Maota Lake, the red sandstone fort is now a UNESCO World Heritage Site and showcases a beautiful fusion of Mughal and Rajput architecture.",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
    ],
    featured: true,
  },
  {
    id: "05",
    title: "Hawa Mahal",
    city: "Jaipur",
    address:"India",
    price: 700,
    maxGroupSize: 8,
    desc: "An iconic landmark of the city, the honeycomb-shaped palace features beautiful jharokhas and windows. This five-storey building has been built without a foundation and is known for its exceptional ventilation, which is also the reason behind its name, Hawa Mahal, which literally translates to ‘Palace of the Winds’. The palace was mainly constructed to enable the ladies of the royal family to see the busy streets from the palace jharokhas.",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
    ],
    featured: false,
  },
  {
    id: "06",
    title: "Mysore Palace",
    city: "Mysore",
    address:"India",
    price: 1200,
    maxGroupSize: 8,
    desc: "The official residence of the erstwhile royal family of Mysore, Mysore Palace is an architectural masterpiece showcasing a blend of Hindu, Muslim, Rajput and Gothic styles.",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
      {
        name: "jhon doe",
        rating: 5,
      },
      {
        name: "jhon doe",
        rating: 4.8,
      },
    ],
    avgRating: 4.5,
    photo: tourImg06,
    featured: false,
  },
  {
    id: "07",
    title: "Aguada Fort",
    city: "Goa",
    address:"India",
    price: 600,
    maxGroupSize: 8,
    desc: "The fort overlooks the confluence of Mandovi River and the Arabian Sea. This beautiful red-brown fort houses the Central Jail and a 19th century lighthouse.",
    reviews: [],
    avgRating: 4.5,
    photo: tourImg07,
    featured: false,
  },
  {
    id: "08",
    title: "Gateway Of India Mumbai",
    city: "Mumbai",
    address:"India",
    price: 400,
    maxGroupSize: 8,
    desc: "Located on the waterfront in Colaba, South Mumbai, this arch monument is Mumbai’s prime landmark. It was built by the British to welcome King George V and Queen Mary during a royal visit in 1911.",
    reviews: [],
    avgRating: 4.5,
    photo: tourImg08,
    featured: false,
  },
];

export default tours;
