import Styles from "/styles/scss/dashboard/Page.module.scss";
const APage = ({ children, color }) => {
  return (
    <div style={{ background: color }} id="wrapper" className={Styles.page}>
      {children}
    </div>
  );
};

export default APage;
