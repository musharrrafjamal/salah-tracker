import Nav from "@/components/universal/nav/Nav";

const layoutCOmmunity = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Nav />
      {children}
    </>
  );
};

export default layoutCOmmunity;
