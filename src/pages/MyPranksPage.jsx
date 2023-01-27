import axios from "axios";
import { useEffect, useContext, useState } from "react";
import PrankCard from "../components/PrankCard";
import { AuthContext } from "../context/auth.context";

// TO DO
// get the user info from the context

function MyPranksPage() {
  const { user } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");
  const [pranks, setPranks] = useState();

  const getMyPranks = () => {
    // add user info to the reqBody
    //   console.log(user.name)
    // const userId = user.name;

    // axios
    //   .get(`${process.env.REACT_APP_API_URL}/api/mypranks`, userId, {
    //     headers: { Authorization: `Bearer ${storedToken}` },
    //   })
    //   .then((res) => {
    //     // console.log(res.data)
    //     setPranks(res.data);
    //   });
  };

  useEffect(() => {
    console.log(user)
    getMyPranks();
    // eslint-disable-next-line
  },);

  return (
    <>
      {/* <h1>All my pranks, user: {user.email}</h1> */}

      {pranks &&
        pranks.map((prank) => {
          return (
            <div>
              <PrankCard element={prank} />
            </div>
          );
        })}
    </>
  );
}

export default MyPranksPage;
