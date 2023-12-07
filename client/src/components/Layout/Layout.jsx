import "./Layout.scss";

const Layout = ({ isLoading, children }) => {
  return (
    <main className={`layout ${isLoading && "layout--loading"}`}>
      {children}
    </main>
  );
};

export default Layout;
