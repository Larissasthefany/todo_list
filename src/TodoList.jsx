import { useState, useEffect, useMemo, useCallback } from "react"
// import Imagem from './assets/todolist.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

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

            document.querySelector('.btn-add').classList.add('clicked');
            setTimeout(() => {
                document.querySelector('.btn-add').classList.remove('clicked');
            }, 1000);
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
        <div className="container">
            <div className="content">
                <h1 className="title">Todo List</h1>
                <ul className="minhaLista">
                    {tarefas.map((tarefa, index) => (
                        <li className="listaItem" key={index}>{tarefa}
                            <button
                                className="btn-delete" onClick={() => handleDelete(index)}>
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="add">
                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} />
                    <button type="button" className="btn-add" onClick={handleAdd}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
                <strong>Você tem {totalTarefas} tarefas!</strong>
            </div>
        </div>
    )
}

