import { useEffect, useState } from 'react';
import { pingServer, type PingResponse } from './services/api';

function App() {
  const [resposta, setResposta] = useState<PingResponse | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    let ativo = true;
    pingServer()
      .then((dados) => { if (ativo) setResposta(dados); })
      .catch(() => { if (ativo) setErro(true); })
      .finally(() => { if (ativo) setCarregando(false); });
    return () => { ativo = false; };
  }, []);

  return (
    <main style={{ fontFamily: 'Arial, sans-serif', padding: '2rem', maxWidth: 600, margin: '0 auto' }}>
      <h1>📚 Trilha de Estudos</h1>
      <h2>Teste de Conexão Fullstack</h2>
      {carregando && <p>Carregando teste da API...</p>}
      {resposta && <section style={{ background: '#e6fffa', padding: '1rem' }}>
        <p><strong>Status:</strong> {resposta.status}</p>
        <p><strong>Mensagem:</strong> {resposta.mensagem}</p>
      </section>}
      {erro && <p role="alert">Não foi possível conectar ao backend na porta 3000.</p>}
    </main>
  );
}

export default App;
