import Nav from "@/components/universal/nav/Nav";

const layoutHome = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-11/12 mx-auto">
      <Nav />
      {children}
    </div>
  );
};

export default layoutHome;
