import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Extrato = ({ contaId, transferencias }) => {
    return (
      <div style={{ maxHeight: "600px",overflowY: "scroll",  border: "3px solid white",}}>
        {transferencias.map((transferencia) => {
          const isoDateString = transferencia.data;
          const date = new Date(isoDateString);
          const dateString = date.toLocaleDateString("pt-BR");
          const timeString = date.toLocaleTimeString("pt-BR");
          return (
            <div
              key={transferencia.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginLeft: '30px',
                marginRight: '50px',
                border: '3px solid white',
                margin: '5px',
                padding: '15px',
                fontSize:'1.2rem'
              }}
            >
              <p>
                <span style={{ color: transferencia.id_emissor === contaId ? 'red' : 'green' }}>
                  {transferencia.id_emissor === contaId && transferencia.valor > 0 ? (
                    <FontAwesomeIcon icon={faArrowRight} />
                  ) : (
                    <FontAwesomeIcon icon={faArrowLeft} />
                  )}
                  {Math.abs(transferencia.valor)}
                </span>
              </p>
              <p>Tipo: {transferencia.tipo}</p>
              <div>{`${dateString} ${timeString}`}</div>
            </div>
          );
        })}
      </div>
    );
  };

export default Extrato;