import Footer from "./Footer";
import NavBar from "./Navbar";

const Layout = ({children}) => {
    return ( 
        <div id="layout">
            <NavBar />
            <main>{children}</main>
            <Footer/>            
        </div>
     );
}
 
export default Layout;