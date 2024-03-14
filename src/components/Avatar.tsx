import Image from "next/image";

type Props = {
  image: string;
};

export default function Avatar({ image }: Props) {
  return (
    <div className="relative w-8 h-8">
      <Image alt="user-image" src={image} fill className="rounded-full" />
    </div>
  );
}
