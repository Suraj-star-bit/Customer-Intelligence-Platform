import { useEffect, useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from "recharts";

import api from "../services/api";


function SegmentChart(){

    const [segments,setSegments] = useState([]);


    useEffect(()=>{

        api.get("/analytics/segments")
        .then((response)=>{
            setSegments(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })

    },[]);


    return(

        <div>

            <h2>
                Customer Segments
            </h2>


            <PieChart width={400} height={300}>

                <Pie
                    data={segments}
                    dataKey="customers"
                    nameKey="Customer_Segment"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                >

                    {
                        segments.map((entry,index)=>(
                            <Cell key={index}/>
                        ))
                    }

                </Pie>


                <Tooltip />

                <Legend />

            </PieChart>


        </div>
    )
}


export default SegmentChart;