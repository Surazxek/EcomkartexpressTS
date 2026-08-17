import { Outlet } from "react-router"
import Footer from "../components/footer/footer"
import Header from "../components/header"


const ClientLayout = () => {
    return (<div>
        {/* nav */}
        <div>
            <Header/>
        </div>
         
         {/* Dynamic section */}
        <div className="min-h-[80vh]">
            <Outlet />
        </div>
        
        {/* Footer */}
        <div>
            <Footer/>
        </div>
    </div>)
}

export default ClientLayout