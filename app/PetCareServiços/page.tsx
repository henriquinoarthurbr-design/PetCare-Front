"use client";

import { useState } from "react";

export default function Home() {
    const [servicos, setServicos] = useState<any[]>([]);
    const [nome, setNome] = useState("");
    const [valor, setValor] = useState("");

    async function carregarServicos() {
        const resposta = await fetch("http://localhost:3002/servicos");
        const dados = await resposta.json();
        setServicos(dados);
    }

    async function cadastrarServico() {
        await fetch("http://localhost:3002/servicos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: nome,
                valor: Number(valor)
            })
        });

        setNome("");
        setValor("");
    }

    return (
        <main>
            <h1>PetCare</h1>

            <button onClick={carregarServicos}>
                Carregar Serviços
            </button>

            <h2>Cadastrar Serviço</h2>

            <input
                type="text"
                placeholder="Nome do serviço"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />

            <input
                type="number"
                placeholder="Valor"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
            />

            <button onClick={cadastrarServico}>
                Cadastrar Serviço
            </button>

            <h2>Serviços</h2>

            {servicos.map((servico) => (
                <div key={servico.id}>
                    <p>Nome: {servico.nome}</p>
                    <p>Valor: R$ {servico.valor}</p>
                </div>
            ))}
        </main>
    );
}