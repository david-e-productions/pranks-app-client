import axios from "axios";
import { useEffect, useContext, useState } from "react";
import PrankCardList from "../components/PrankCardList";
import { AuthContext } from "../context/auth.context";

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
        );
        setPranks(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (user) {
      getData();
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <>
      {pranks &&
        pranks.map((prank) => {
          return (
            <div>
              <PrankCardList key={prank._id} {...prank} />
            </div>
          );
        })}
    </>
  );
}

export default MyPranksPage;
