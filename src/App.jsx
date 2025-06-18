import { useEffect, useState } from "react";
import "./App.css";

import { questions } from "./lib/questions";

function App() {
  const [contador, setContador] = useState(1);
  const [resposta, setResposta] = useState([]);
  const [pontuacao, setPontuacao] = useState(0);

  const [respostaSelecionada, setRespostaSelecionada] = useState(null);

  const [respostasCorretas, setRespostasCorretas] = useState([]);

  const handleSelected = (index) => {
    // Atualiza a resposta selecionada visualmente (se ainda for útil para UI)
    setRespostaSelecionada(index);

    // Atualiza a lista de respostas
    const novaResposta = [...resposta];
    novaResposta[contador - 1] = index;
    setResposta(novaResposta);

    console.log(resposta);

    // Verifica se a resposta é correta
    const isCorrect = questions[contador - 1].answerOptions[index].isCorrect;

    if (isCorrect) {
      // Evita pontuar duas vezes se o user voltar e clicar de novo
      // Só pontua se ainda não tinha respondido corretamente essa pergunta
      if (!respostasCorretas.includes(contador - 1)) {
        setPontuacao(pontuacao + 1);
        setRespostasCorretas([...respostasCorretas, contador - 1]);
        console.log("pontuaçao: ", pontuacao);
      }
    } else {
      // Se o user mudar de certa para errada, remove a pontuação
      if (respostasCorretas.includes(contador - 1)) {
        setPontuacao(pontuacao - 1);
        setRespostasCorretas(
          respostasCorretas.filter((i) => i !== contador - 1)
        );
      }
    }
  };

  useEffect(() => {
    // Quando muda de pergunta, recupera a resposta anterior, se existir
    setRespostaSelecionada(resposta[contador - 1] ?? null);
  }, [contador]);

  for (let i = 0; i < questions.length; i++) {
    questions[i].answerOptions.filter((resposta) => {
      resposta.isCorrect === true;
    });
  }

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
                  className={`px-4 py-2 rounded-full text-lg cursor-pointer ${
                    respostaSelecionada === index
                      ? "bg-green-500"
                      : "bg-amber-200"
                  }`}
                >
                  {resposta.answerText}
                </button>
              </div>
            ))}
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
