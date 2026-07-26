import { useEffect, useState } from "react";
import API from "../api/axios";


function Dashboard(){

    const [customers,setCustomers] = useState(0);

    useEffect(()=>{

        API.get("/analytics/customer-count")
        .then(res=>{
            setCustomers(res.data.total_customers);
        })

    },[])


    return(
        <div>

            

            <h2>
                Total Customers: {customers}
            </h2>

        </div>
    )
}

export default Dashboard;