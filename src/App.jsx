import { useState } from "react";
import "./App.css";

import { questions } from "./lib/questions";

function App() {
  const [contador, setContador] = useState(1);
  const [resposta, setResposta] = useState([]);

  const handleSelected = (index) => {
    alert(index);
    const novaResposta = [...resposta];
    novaResposta[contador - 1] = index; // salva a resposta da pergunta atual
    setResposta(novaResposta);
    console.log(novaResposta);
  };

  return (
    <>
      <div className="my-20">
        <div className="max-w-md mx-auto space-y-5 text-center">
          <div className="text-3xl">Quiz Interativo</div>
          <div>
            Pergunta {contador} de {questions.length}
          </div>

          <div className="text-lg">{questions[contador - 1].questionText}</div>

          <div className="flex gap-2 items-center justify-center">
            {questions[contador - 1].answerOptions.map((resposta, index) => (
              <div key={index}>
                <button
                  onClick={() => handleSelected(index)}
                  className="bg-amber-200 px-4 py-2 rounded-full text-lg cursor-pointer"
                >
                  {resposta.answerText}
                </button>
              </div>
            ))}
          </div>
          <div>
            {questions[0].answerOptions
              ? questions[0].answerOptions[0].answerText
              : "nao existe"}
          </div>
          <div className="flex gap-2 items-center justify-center">
            <button
              onClick={() => {
                if (contador <= 1) {
                  return;
                }

                setContador(contador - 1);
              }}
            >
              prev
            </button>
            <button
              onClick={() => {
                if (contador >= questions.length) {
                  return;
                }

                setContador(contador + 1);
              }}
            >
              next
            </button>
          </div>
          <div>Pontuação</div>
        </div>
      </div>
    </>
  );
}

export default App;
