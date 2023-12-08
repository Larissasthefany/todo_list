import { useState, useEffect, useMemo, useCallback } from "react"
import './TodoList.css'

export default function TodoList() {
    const [tarefas, setTarefas] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        try {
            const tarefasStorage = localStorage.getItem('tarefas');
            console.log('Tarefas recuperadas:', tarefasStorage);

            if (tarefasStorage) {
                setTarefas(JSON.parse(tarefasStorage));
            }
        } catch (error) {
            console.error('Erro ao recuperar tarefas do Local Storage:', error);
        }
    }, []);

    useEffect(() => {
        console.log('Tarefas atualizadas:', tarefas);

        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }, [tarefas]);


    const handleAdd = useCallback(() => {
        if (input.trim() !== '') {
            setTarefas([...tarefas, input]);
            setInput('');
        }
    }, [tarefas, input]);

    function handleDelete(index) {
        const novasTarefas = [...tarefas];
        novasTarefas.splice(index, 1)
        setTarefas(novasTarefas)
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            handleAdd()
        }
    }

    const totalTarefas = useMemo(() => {
        return tarefas.length
    }, [tarefas])

    return (
        <div>
            <h1>To do List</h1>
            <ul>
                {tarefas.map((tarefa, index) => (
                    <li key={index}>{tarefa}
                        <button
                            onClick={() => handleDelete(index)}>Excluir
                        </button>
                    </li>
                ))}
            </ul>

            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} />
            <button type="button" onClick={handleAdd}>Adicionar</button>
            <br />
            <strong>Você tem {totalTarefas} tarefas!</strong>
        </div>
    )
}

