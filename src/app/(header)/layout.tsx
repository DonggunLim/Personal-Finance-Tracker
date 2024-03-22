import Header from "@/components/Header";

type Props = {
  children: React.ReactNode;
};
export default function HeaderLayout({ children }: Props) {
  return (
    <section>
      <Header />
      {children}
    </section>
  );
}
