import { useState } from 'react';

const AdicionarSaldo = ({ onSubmit, onClose }) => {
  const [valor, setValor] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(parseFloat(valor));
    onClose();
  };

  return (
    <div style={{ color: 'black', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
        <h2>Adicionar saldo</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Valor:
            <input style={{ color: 'black'}} type="number" value={valor} onChange={(event) => setValor(event.target.value)} />
          </label>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <button style={{ color: 'black'}} type="submit">Adicionar</button>
            <button style={{ color: 'black'}} onClick={onClose}>Fechar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdicionarSaldo;