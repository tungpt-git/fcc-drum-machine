import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef, useState } from "react";

const SOUNDS = [
  {
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    trigger: "Q",
    name: "Heater 1",
  },
  {
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    trigger: "W",
    name: "Heater 2",
  },
  {
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    trigger: "E",
    name: "Heater 3",
  },
  {
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    trigger: "A",
    name: "Heater 4",
  },
  {
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    trigger: "S",
    name: "Clap",
  },
  {
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    trigger: "D",
    name: "Open-HH",
  },
  {
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    trigger: "Z",
    name: "Kick-n'-Hat",
  },
  {
    audio: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    trigger: "X",
    name: "Kick",
  },
  {
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    trigger: "C",
    name: "Closed-HH",
  },
];

const Button = (props) => {
  return (
    <button
      style={{
        padding: "10px 32px",
        fontSize: "16px",
        outline: "none",
        fontWeight: 600,
        backgroundColor: "grey",
        marginTop: "10px",
        boxShadow: "black 3px 3px 5px",
      }}
      {...props}
    />
  );
};

const DrumPad = ({ audio, trigger, name, emitSound }) => {
  const audioRef = useRef();

  function playSound() {
    emitSound(name);
    audioRef.current?.play();
  }

  useEffect(() => {
    const handleKeydown = (evt) => {
      if (evt.key.toUpperCase() === trigger.toUpperCase()) {
        playSound();
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  return (
    <Button
      className="drum-pad"
      id={`chord-${trigger}`}
      onClick={() => {
        playSound();
      }}
    >
      {trigger}
      <audio hidden id={trigger} src={audio} className="clip" ref={audioRef} />
    </Button>
  );
};

const DrumMachine = () => {
  const [display, setDisplay] = useState("");
  return (
    <div
      id="drum-machine"
      style={{
        display: "flex",
        width: 650,
        height: 250,
        padding: "20px",
        outline: " 5px solid orange",
        position: "relative",
        textAlign: "center",
        backgroundColor: "#b3b3b3",
      }}
    >
      <div
        className="drum-machine__buttons"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridGap: "20px",
        }}
      >
        {SOUNDS.map((btn, idx) => (
          <DrumPad
            key={idx}
            {...btn}
            emitSound={(name) => {
              setDisplay(name);
            }}
          />
        ))}
      </div>

      <div
        className="drum-machine__settings"
        style={{
          flex: 1,
        }}
      >
        <div
          id="display"
          className="drum-machine__display"
          style={{
            width: "200px",
            backgroundColor: "gray",
            margin: "10px auto",
            padding: "15px",
            boxSizing: "border-box",
            fontWeight: 600,
          }}
        >
          {display}
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main
        style={{
          padding: "100px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <DrumMachine />
      </main>
    </div>
  );
}

export default App;
