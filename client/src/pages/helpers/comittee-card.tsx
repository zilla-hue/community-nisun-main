import { PoundSterling } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Props {
  user: string;
  position: string;
  image: string;
}

const ComitteeCard = ({ image, position, user }: Props) => {
  return (
    <div className="text-center">
      <div>
        <Image src={`${image}`} alt={user} width={200} height={200} className="mx-auto" />
      </div>
      <h1 className="text-[25px] dark:text-white mt-[1.5rem] ">{user}</h1>

      <p className="text-[18px] dark:text-white items-center">({position})</p>
    </div>
  );
};

export default ComitteeCard;
