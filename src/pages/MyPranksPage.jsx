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
    <div
      className="lightblue-bg p-0"
      style={{
        height: "100vh",
        backgroundImage: "linear-gradient( #ed64b6, #018ff5 )",
      }}
    >
      <h1 className="p-0 m-b-20 p-t-10 t">My pranks</h1>
      {pranks &&
        pranks.map((prank) => {
          console.log(prank);
          return (
            <div>
              <PrankCardList key={prank._id} {...prank} />
            </div>
          );
        })}
    </div>
  );
}

export default MyPranksPage;
