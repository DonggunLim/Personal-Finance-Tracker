type Props = {
  children: React.ReactNode;
};

export default function SignInLayout({ children }: Props) {
  return (
    <section className="h-full flex justify-center items-center">
      {children}
    </section>
  );
}
