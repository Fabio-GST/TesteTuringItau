import React, { useState, useEffect } from "react";

function LoginModal() {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const modalShown = localStorage.getItem("modalShown");
        if (!modalShown) {
            setShowModal(true);
            localStorage.setItem("modalShown", true);
        }
    }, []);

    return (
        <>
            {showModal && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 9999,
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "white",
                            padding: "20px",
                            maxWidth: "500px",
                            width: "100%",
                            borderRadius: "10px",
                            color: 'black',
                            fontSize:'1rem',
                            textAlign:'justify'
                        }}
                    >
                        <h2>Olá!</h2>
                        <p >

                            Este projeto que você está acessando foi desenvolvido por <a href="https://github.com/Fabio-GST">Fabio gustavo</a> como parte do processo seletivo para o programa de estágio do Turing Itaú. O projeto foi feito utilizando Typescript, NodeJS e Express para a API, além de ter a aplicação web desenvolvida em ReactJS. <br />

                            Trata-se de uma aplicação que realiza operações de autenticação e transferência bancária seguindo critérios definidos de autenticação, depois disso, pode realizar transferências entre emissores e receptores, utilizando os tipos de transferência disponíveis: PIX, TED e DOC. <br />

                            Espero que tenha gostado do projeto e que ele possa ser útil para suas necessidades. Qualquer dúvida ou sugestão, estou à disposição!</p>
                        <button onClick={() => setShowModal(false)} style={{ color: 'black' }}>Fechar</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default LoginModal;