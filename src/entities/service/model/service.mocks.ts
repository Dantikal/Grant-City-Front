import type { Service } from "./service.types";

export const SERVICES: Service[] = [
  {
    id: "buying",
    no: "01",
    slug: "buying",
    title: "Buying",
    body: "We learn what actually matters to you, then filter ruthlessly — including off-market homes you won't find on the portals.",
    longBody:
      "Buying with us starts with a real conversation, not a portal search. We get to the bottom of what you actually need, then do the legwork — including knocking on doors and working our network for homes that never hit the open market. We're with you at every viewing and we'll talk you out of the wrong house as readily as into the right one.",
    points: [
      "Off-market access",
      "Honest second opinions",
      "Negotiation on your side",
      "Survey & legal coordination",
    ],
  },
  {
    id: "selling",
    no: "02",
    slug: "selling",
    title: "Selling",
    body: "Honest pricing from day one, careful staging, and photography that flatters without lying. We hold out for the right buyer.",
    longBody:
      "We price your home where it will actually sell, not where it wins us the instruction. Then we stage it carefully, photograph it properly, and market it to the buyers most likely to fall for it. One named agent runs your sale from first viewing to completion.",
    points: [
      "Straight pricing",
      "Staging & photography",
      "Targeted marketing",
      "One agent, start to finish",
    ],
  },
  {
    id: "letting",
    no: "03",
    slug: "letting",
    title: "Letting",
    body: "Finding tenants who'll treat your place like their own, with vetting and paperwork handled so you never chase a reference.",
    longBody:
      "We find tenants who'll look after your property and stay a while, handling referencing, contracts and deposit protection so you never have to. Clear, compliant, and calm.",
    points: [
      "Thorough referencing",
      "Compliant paperwork",
      "Deposit protection",
      "Tenant matching",
    ],
  },
  {
    id: "management",
    no: "04",
    slug: "management",
    title: "Management",
    body: "Ongoing care for your rental — maintenance, inspections, and rent collection — so it never becomes a second job.",
    longBody:
      "Full management for owners who'd rather not field 2am phone calls. We handle maintenance, periodic inspections, rent collection and the steady drip of small things, with a trusted book of local trades behind us.",
    points: [
      "Maintenance & trades",
      "Periodic inspections",
      "Rent collection",
      "Single point of contact",
    ],
  },
];
