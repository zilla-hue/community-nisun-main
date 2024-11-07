import { Calendar, PoundSterling } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Props {
  image: string;
  title: string;
  author?: string;
  price?: string;
  date?: string;
  buttonText: string;
}

const Card = ({ price, title, author, image, date, buttonText }: Props) => {
  return (
    <div className="p-4 m-2 bg-white rounded-lg bg-opacity-15 ">
      <Image src={`${image}`} alt={title} width={400} height={400} className="mx-auto rounded-lg" />
      <h1 className="mt-[1.5rem] dark:text-white text-[25px] ">{title}</h1>
      {author && <p className="mt-[0.2rem] text-[15px] text-slate-700 dark:text-yellow-300 ">@{author}</p>}
      <div className="mt-[1.5rem] flex items-center justify-between">
        <button className="px-6 py-3 bg-red-600 hover:bg-red-700 transition-all duration-150 text-white rounded-lg">{buttonText}</button>
        {date && (
          <p className="text-[18px] dark:text-white flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            {date}
          </p>
        )}
        {price && (
          <p className="text-[18px] dark:text-white flex items-center">
            <PoundSterling className="w-4 h-4" />
            {price}
          </p>
        )}
      </div>
    </div>
  );
};

export default Card;
