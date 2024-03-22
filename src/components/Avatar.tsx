import Image from "next/image";

type Props = {
  image: string;
};

export default function Avatar({ image }: Props) {
  return (
    <Image
      alt="user-image"
      src={image}
      width={32}
      height={32}
      className="rounded-full object-contain"
    />
  );
}
