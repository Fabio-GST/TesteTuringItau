import React, { useState } from 'react';

const CriarTransferencia = ({ onSubmit, onClose, users, contaId }) => {
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('');
  const [id_receptor, setid_receptor] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!tipo || valor === 0 || !id_receptor) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    onSubmit(tipo, id_receptor, valor);
    onClose();
  };

  return (
    <div style={{ color: 'black', position: 'absolute', top: 0, left: 0, right: 0 , bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
        <h2>Realizar transferência</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="tipo">Tipo:</label>
          <select id="tipo" value={tipo} onChange={(event) => setTipo(event.target.value)} style={{ color: 'black' , width:'100%'}}>
            <option value="">Selecione o tipo de transferencia</option>
            <option value="PIX">PIX</option>
            <option value="TED">TED</option>
            <option value="DOC">DOC</option>
          </select>

          <label htmlFor="valor">Valor:</label>
          <input style={{ color: 'black', width:'100%'}} type="number" value={valor} onChange={(event) => setValor(event.target.value)} />

          <label htmlFor="receiver">Receptor:</label>
          <select id="receiver" value={id_receptor} onChange={(event) => setid_receptor(event.target.value)} style={{ color: 'black', width:'100%' }}>
            <option value="">Selecione o receptor</option>
            {users && users.map((user) => (
              <option
                key={user.id}
                value={user.id}
                disabled={user.id === contaId}
              >
                {user.nome}
              </option>
            ))}
          </select>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <button style={{ color: 'black' }} type="submit">Transferir</button>
            <button style={{ color: 'black' }} onClick={onClose}>Fechar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CriarTransferencia;