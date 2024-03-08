import Image from "next/image";

type Props = {
  image: string;
};

export default function Avatar({ image }: Props) {
  return (
    <div className="relative w-10 h-10">
      <Image alt="user-image" src={image} fill className="rounded-full" />;
    </div>
  );
}
