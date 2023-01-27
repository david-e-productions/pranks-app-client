import axios from "axios";
import { useEffect, useContext } from "react";
import PrankCard from "../components/PrankCard";
import { AuthContext } from "../context/auth.context";


// TO DO
// get the user info from the context

function MyPranksPage() {
    const { user } = useContext(AuthContext);
    console.log(user)

//   const getMyPranks = () => {
    
//     // add user info to the reqBody
//     axios.get(`${process.env.REACT_APP_API_URL}/api/mypranks`).then((res) =>
//       res.map((prank) => {
//         return <div>
//             <PrankCard element={prank}/>
//         </div>;
//       })
//     );
//   };

//   useEffect(() => {
//     getMyPranks();
//     // eslint-disable-next-line
//   }, [prankId]);

  return (<h1>All my pranks, user: {user.email}</h1>)
}

export default MyPranksPage;
