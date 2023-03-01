import { useState, useEffect } from "react";
import Extrato from "../components/extrato";
import axios from "axios";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdicionarSaldo from "../components/AdicionarSaldo";
import CriarTransferencia from "../components/CriarTransferencia";

export default function Home(props) {
    const [extrato, setExtrato] = useState([]);
    const [users, setusers] = useState([]);
    const [isAdicionarSaldoModalOpen, setIsAdicionarSaldoModalOpen] = useState(false);
    const [isTransferenciaOpen, setisTransferenciaOpen] = useState(false);

    useEffect(() => {
        if (props.user.id) {
            getUsuarios();
            getExtrato();
        } else {
            props.logout();
        }
    });

    const getExtrato = () => {
        const api = axios.create({
            baseURL: "http://localhost:8091/api/v1/",
        });
        api
            .get("/transacao/extrato/" + props.user.id)
            .then((response) => {
                setExtrato(response.data);
            })
            .catch((err) => alert(err.response.data.err));
    };

    const getUsuarios = () => {
        const api = axios.create({
            baseURL: "http://localhost:8091/api/v1/",
        });
        api
            .get("/usuario")
            .then((response) => {
                setusers(response.data);
            })
            .catch((err) => alert(err.response.data.err));
    };

    const getusuario = () => {
        const api = axios.create({
            baseURL: "http://localhost:8091/api/v1/",
        });

        api
            .get("/usuario/" + props.user.id)
            .then((response) => {
                props.setUser(response.data);
            })
            .catch((err) => alert(err.response.data.err));
    };

    const handleAddSaldo = (valor) => {
        const api = axios.create({
            baseURL: "http://localhost:8091/api/v1/",
        });

        api
            .post("/usuario/saldo", {
                id: props.user.id,
                valor: valor,
                operacao: "adicionar",
            })
            .then((response) => {
                getusuario();
                setIsAdicionarSaldoModalOpen(false);
            })
            .catch((err) => alert(err.response.data.err));
    };

    const handleTransferencia = (tipo,id_receptor, valor ) => {
        const api = axios.create({
            baseURL: "http://localhost:8091/api/v1/",
        });
        api.post('/transacao', {
            tipo: tipo,
            id_emissor: props.user.id,
            id_receptor: id_receptor,
            valor: valor,
    
        })
            .then((response) => {
                getusuario();
                getExtrato();
                setisTransferenciaOpen(false)
            })
            .catch((err) => alert(err.response.data.err));
    };

    return (
        <>
            <div
                style={{
                    fontFamily: "EB Garamond , serif",
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    height: "100vh",
                }}
            >
                <div
                    style={{
                        maxWidth: 1000,
                        width: "100%",
                        padding: 30,
                        border: "3px solid #ccc",
                        borderRadius: "20px",
                    }}
                >
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h1>Olá {props.user.nome}</h1>
                        <button onClick={props.logout}>Sair</button>
                    </div>
                    <div
                        style={{
                            fontSize: '1.5rem',
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            border: "3px solid white",
                            margin: "5px",
                        }}
                    >
                        <div>
                            Saldo: R$ {props.user.saldo}
                        </div>
                        <button
                            style={{ display: "flex", alignItems: "center", border: '0' }}
                            onClick={getExtrato}
                        >
                            &nbsp;
                            <FontAwesomeIcon icon={faSync} />
                        </button>
                    </div>

                    <div style={{
                        fontSize: '2rem',
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        margin: "50px",
                        marginBottom: '50px'
                    }}>
                        <button style={{ border: "3px solid white", }} onClick={() => setIsAdicionarSaldoModalOpen(true)}>
                            Depositar
                        </button>
                        <button style={{ border: "3px solid white", }} onClick={() => setisTransferenciaOpen(true)}>
                            Transferir
                        </button>
                    </div>
                    <Extrato contaId={props.user.id} transferencias={extrato} />
                </div>
            </div>
            {isAdicionarSaldoModalOpen && (
                <AdicionarSaldo
                    onSubmit={handleAddSaldo}
                    onClose={() => setIsAdicionarSaldoModalOpen(false)}
                />
            )}

            {isTransferenciaOpen && (
                <CriarTransferencia 
                    contaId={props.user.id}
                    onSubmit={handleTransferencia}
                    onClose={() => setisTransferenciaOpen(false)}
                    users={users}
                />
            )}
        </>
    );
}