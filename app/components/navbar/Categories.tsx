"use client";
import React from "react";
import Container from "../Container";

import { FaSkiing, FaUmbrella } from "react-icons/fa";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { TbPool } from "react-icons/tb";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";

export const categories = [
  {
    label: "Plages",
    icon: FaUmbrella,
    description: "This property is close to the beach!",
  },
  {
    label: "Moulins à vent",
    icon: GiWindmill,
    description: "This property has windmills!",
  },
  {
    label: "Moderne",
    icon: MdOutlineVilla,
    description: "This property is modern!",
  },
  {
    label: "Campagne",
    icon: MdOutlineVilla,
    description: "This property is in the countryside!",
  },
  {
    label: "Piscines ",
    icon: TbPool,
    description: "This property has pool",
  },
  {
    label: "Iles",
    icon: GiIsland,
    description: "This property is on an island!",
  },
  {
    label: "Lac",
    icon: GiBoatFishing,
    description: "This property is close to a lake!",
  },
  {
    label: "Sky",
    icon: FaSkiing,
    description: "This property has skiing activities!",
  },
  {
    label: "Chateaux",
    icon: GiCastle,
    description: "This property is in a castle!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property has camping activities!",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property is in the arctic!",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is in a cave!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in the desert!",
  },
  {
    label: "Granges",
    icon: GiBarn,
    description: "This property is in a barn!",
  },
  {
    label: "Luxe",
    icon: IoDiamond,
    description: "This property is luxurious!",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";
  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};
export default Categories;
