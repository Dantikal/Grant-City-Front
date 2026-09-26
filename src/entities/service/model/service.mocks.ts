import type { Department, Service } from "./service.types";

/** The company's four lines of work. Displayed copy is translated under
 *  `svc.<id>.*`; the English fields here back the admin table. */
export const SERVICES: Service[] = [
  {
    id: "land",
    no: "01",
    slug: "land",
    title: "Land plot sales",
    body: "Buying and selling land plots.",
    longBody: "We handle the purchase and sale of land plots from search to closing.",
    points: ["Buying and selling land plots"],
  },
  {
    id: "business-plans",
    no: "02",
    slug: "business-plans",
    title: "Business plans & intangible asset valuation",
    body: "Business plans for land development and for growing a business; business and intangible asset valuation.",
    longBody:
      "We prepare business plans for land development and for growing a business, and value businesses and intangible assets.",
    points: [
      "Business plans for land plot development",
      "Business plans for business development",
      "Business and intangible asset valuation",
    ],
  },
  {
    id: "valuation",
    no: "03",
    slug: "valuation",
    title: "Valuation of all types of property and intangible assets",
    body: "Real estate, machinery, vehicles, property complexes, businesses and shares, mineral deposits and intangible assets.",
    longBody: "Independent valuation of every type of property and of intangible assets.",
    points: [
      "Real estate valuation",
      "Machinery and equipment",
      "Motor vehicles",
      "Property complexes",
      "Business and shares",
      "Mineral deposits",
      "Intangible assets",
    ],
  },
  {
    id: "sales",
    no: "04",
    slug: "sales",
    title: "Real estate sales",
    body: "Sales of new-build (apartments, commercial, Issyk-Kul) and resale real estate.",
    longBody: "We sell new-build and resale real estate.",
    points: ["Primary market: apartments, commercial, Issyk-Kul", "Secondary market"],
  },
];

/** Company departments and the services each one runs. */
export const DEPARTMENTS: Department[] = [
  { id: "valuation", services: ["valuation"] },
  { id: "planning", services: ["business-plans"] },
  { id: "sales", services: ["land", "sales"] },
];
