import { useEffect, useState } from "react";
import "./App.css";
import { questions } from "./lib/questions";

function App() {
  const [numPergunta, setNumPergunta] = useState(1);
  const [respostas, setRespostas] = useState([]);
  const [pontuacao, setPontuacao] = useState(0);

  // Array com os índices corretos para cada pergunta
  const respostasCorretas = questions.map((q) =>
    q.answerOptions.findIndex((opt) => opt.isCorrect)
  );

  useEffect(() => {
    // Calcula a pontuação com base nas respostas corretas
    const novaPontuacao = respostas.reduce((total, resposta, index) => {
      if (resposta === respostasCorretas[index]) {
        return total + 1;
      }
      return total;
    }, 0);
    setPontuacao(novaPontuacao); // Atualiza o estado
  }, [respostas]);

  const handleSelected = (index) => {
    const novaResposta = [...respostas];
    novaResposta[numPergunta - 1] = index;
    setRespostas(novaResposta);
  };

  return (
    <div className="my-20">
      <div className="max-w-md mx-auto space-y-5 text-center">
        <div className="text-3xl font-bold">Quiz Interativo</div>

        <div>
          Pergunta {numPergunta} de {questions.length}
        </div>

        <div className="text-lg font-semibold">
          {questions[numPergunta - 1].questionText}
        </div>

        <div className="flex gap-2 items-center justify-center flex-wrap">
          {questions[numPergunta - 1].answerOptions.map(
            (respostaOpcao, index) => (
              <button
                key={index}
                onClick={() => handleSelected(index)}
                className={`px-4 py-2 rounded-full text-lg cursor-pointer transition-colors duration-200 ${
                  respostas[numPergunta - 1] === index
                    ? "bg-green-500 text-white"
                    : "bg-amber-200"
                }`}
              >
                {respostaOpcao.answerText}
              </button>
            )
          )}
        </div>

        <div className="flex gap-2 items-center justify-center mt-4">
          <button
            onClick={() => {
              if (numPergunta > 1) {
                setNumPergunta(numPergunta - 1);
              }
            }}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Anterior
          </button>
          <button
            onClick={() => {
              if (numPergunta < questions.length) {
                setNumPergunta(numPergunta + 1);
              }
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Seguinte
          </button>
        </div>

        {respostas.length === questions.length &&
          respostas.every((r) => r !== undefined) && (
            <div className="text-xl font-semibold mt-6">
              Pontuação: {pontuacao} / {questions.length}
            </div>
          )}
      </div>
    </div>
  );
}

export default App;
