import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [memes, setMemes] = useState([]);
  const [meme, setMeme] = useState({
    top: "",
    bottom: "",
    imgCover: "",
  });


  console.log(meme);
  

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setMemes(data.data.memes));
  }, []);

  function getRandomMeme() {
    const random = Math.floor(Math.random() * memes.length);

    const newCoverImg = memes[random].url;

    setMeme({
      ...meme,
      imgCover: newCoverImg,
    });
  }

  function handleFormData(e) {
    const { value, name } = e.target;

    console.log(name);

    setMeme({
      ...meme,
      [name]: value,
    });
  }

  return (
    <>
      <header>
        <h2>Meme Generator</h2>

        <p>React project</p>
      </header>
      <div className="wrapper">
        <form>
          <div className="input-container">
            <input
              onChange={handleFormData}
              value={meme.top}
              name="top"
              type="text"
              placeholder="top"
              id=""
            />
            <input
              onChange={handleFormData}
              value={meme.bottom}
              name="bottom"
              type="text"
              placeholder="bottom"
              id=""
            />
          </div>
          <button type="button" onClick={getRandomMeme}>
            Get new meme
          </button>
        </form>
        <main className="container" style={{  backgroundImage: `url(${meme.imgCover})`}}>
          <div className="top">{meme.top}</div>
          <div className="bottom">{meme.bottom}</div>
        </main>
      </div>
    </>
  );
}

export default App;
