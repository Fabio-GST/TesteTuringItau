import { useState, useEffect  } from "react";
import Extrato from "../components/extrato";
import axios from "axios";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home(props){
    const [extrato, setExtrato] = useState([]);

    useEffect(() => {
        if (props.user.id) {
            getExtrato();
        } else {
            props.logout();
        }
    }, [props.user]);

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
                            marginBottom:'50px'
                        }}
                    >
                        <div>
                            Saldo: R$ {props.user.saldo}
                        </div>
                        <button
                            style={{ display: "flex", alignItems: "center", border:'0'}}
                            onClick={getExtrato}
                        >
                            &nbsp;
                            <FontAwesomeIcon icon={faSync} />
                        </button>
                    </div>
                    <Extrato contaId={props.user.id} transferencias={extrato} />
                </div>
            </div>
        </>
    );
}