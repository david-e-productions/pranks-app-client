import axios from "axios";
import { useEffect, useContext, useState } from "react";
import PrankCardList from "../components/PrankCardList";
import { AuthContext } from "../context/auth.context";

// TO DO
// get the user info from the context

function MyPranksPage() {
  const { user } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");
  const [pranks, setPranks] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/mypranks/${user._id}`,
          { headers: { Authorization: `Bearer ${storedToken}` } }

          
        )
        // Do something with the response data
        setPranks(response.data);
        console.log(pranks)
      } catch (error) {
        console.error(error);
      }
    };
    if (user) {
      getData();
    }
  }, [user]);

  // const getMyPranks = () => {
  // add user info to the reqBody
  //   console.log(user.name)
  // console.log(user.name)
  // const userId = user._id;

  // axios.get(`${process.env.REACT_APP_API_URL}/mypranks/${user}`,
  // {headers: {Authorization: `Bearer ${storedToken}`}}
  // )
  // axios
  //   .get(`${process.env.REACT_APP_API_URL}/api/mypranks`, userId, {
  //     headers: { Authorization: `Bearer ${storedToken}` },
  //   })
  //   .then((res) => {
  //     // console.log(res.data)
  //     setPranks(res.data);
  //   });
  // };

  // useEffect(() => {

  //   console.log(user)
  //   getMyPranks();
  //   // eslint-disable-next-line
  // },[]);

  return (
    <>
      {/* <h1>All my pranks, user: {user.email}</h1> */}

      {pranks &&
        pranks.map((prank) => {
          return (
            <div>
              <PrankCardList {...prank} />
            </div>
          );
        })}
    </>
  );
}

export default MyPranksPage;
