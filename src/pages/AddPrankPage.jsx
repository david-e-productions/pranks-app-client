import React, { useState } from "react";

function EventForm() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [prankee, setPrankee] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, time, place, prankee, description);
    // handle form submission here
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <br />
      <label>
        Time:
        <input
          type="date"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </label>
      <br />
      <label>
        Place:
        <input
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
      </label>
      <br />
      <label>
        Prankee:
        <input
          type="text"
          value={prankee}
          onChange={(e) => setPrankee(e.target.value)}
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default EventForm;


// import { useEffect } from "react";

// function AddPrankPage() {
//     const [title,setTitle] = useEffect()

//   return (
//     <>
//       <h1>Add a Prank</h1>
//       <form>
//         <label>Title</label>
//         <input type='text' name='title' value={title}></input>
//         <label>Time</label>
//         <input type='date' name='date' value={date}></input>
//       </form>
//     </>
//   );
// }

// export default AddPrankPage;
