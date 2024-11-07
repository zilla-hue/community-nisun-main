import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
  // title: string;
}

const AuthHeader = ({
  // title,
  label,
}: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn("text-3xl font-semibold", font.className)}>
        <a href="/" title="Please click to navigate back to home">
          <Image src="/assets/images/NdiIgbo_Sunderland_transparent.png" width={128} height={38} alt="Ndiigbo logo" />
        </a>
      </h1>
    </div>
  );
};

export default AuthHeader;
