import React, { useEffect, useRef } from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onToggle, onDelete, onUpdate }) {
    // Zmieniamy nazwę tutaj, żeby pasowała do reszty kodu
    const lastTaskRef = useRef(null); 

    useEffect(() => {
        // Teraz lastTaskRef jest już zdefiniowany
        if (lastTaskRef.current) {
            lastTaskRef.current.scrollIntoView({
                behavior: 'smooth', 
                block: 'nearest' 
            });
        }
    }, [tasks.length]);

    if (!tasks || tasks.length === 0) {
        return <p>Brak zadań do wyświetlenia</p>;
    }

    return (
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            <ul className="task-list">
                {tasks.map((task, index) => {
                    const isLast = index === tasks.length - 1;
                    
                    return (
                        <li 
                            key={task.id} 
                            // Używamy poprawnej nazwy: lastTaskRef
                            ref={isLast ? lastTaskRef : null} 
                            className="task-item-wrapper"
                        >
                            <TaskItem
                                id={task.id}
                                title={task.title}
                                completed={task.completed}
                                priority={task.priority}
                                category={task.category}
                                onToggle={onToggle}
                                onDelete={onDelete}
                                onUpdate={onUpdate}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default TaskList;