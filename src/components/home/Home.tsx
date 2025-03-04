import { useEffect, useState } from 'react';
import axiosInstance from '../../services/axios';
import NavBar from '../../common/Navbar';
import { Toaster, toast } from 'sonner';


interface Task {
    id: string;
    title: string;
    description: string;
    status: 'To Do' | 'In Progress' | 'Done';
}

const Home = () => {
    const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({
        'To Do': [],
        'In Progress': [],
        Done: [],
    });
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [isNewTask, setIsNewTask] = useState(false);

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = async () => {
        try {
            const response = await axiosInstance.get('/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error al obtener las tareas', error);
        }
    };

    const handleEdit = (task: Task) => {
        setSelectedTask(task);
        setIsNewTask(false);
        setModalOpen(true);
    };

    const handleNewTask = () => {
        setSelectedTask({ id: '', title: '', description: '', status: 'To Do' });
        setIsNewTask(true);
        setModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        try {
            await axiosInstance.delete(`/tasks/${id}`);
            getTasks();
            toast('Task deleted!')
        } catch (error) {
            console.error('Error al eliminar la tarea', error);
            toast('Error deleting task!')
        }
    };

    const handleSaveTask = async () => {
        if (!selectedTask) return;
        try {
            if (isNewTask) {
                await axiosInstance.post(`/tasks`, selectedTask);
            } else {
                await axiosInstance.put(`/tasks/${selectedTask.id}`, selectedTask);
            }
            setModalOpen(false);
            // isNewTask ? toast('New task created!') : toast('Task edited!')
            getTasks();
        } catch (error) {
            console.error('Error al guardar la tarea', error);
            toast('Error creating task!')
        }
    };

    const hasTasks = Object.values(tasks).some((taskList) => taskList.length > 0);

    return (
        <div className='flex flex-col items-center justify-center p-4'>
          <Toaster/>
            <NavBar />
            <button onClick={handleNewTask} className='p-2 mb-4 bg-green-500 text-white rounded'>
                New Task
            </button>
            <div className='grid grid-cols-3 gap-4 w-full max-w-4xl'>
                {hasTasks ? (
                    Object.keys(tasks).map((status) => (
                        <div key={status} className='p-4 border rounded bg-gray-100 min-h-[300px]'>
                            <h2 className='text-xl font-bold mb-2'>{status}</h2>
                            {tasks[status].map((task) => (
                                <div key={task.id} className='p-4 mb-2 bg-white border rounded shadow'>
                                    <h3 className='text-lg font-bold'>{task.title}</h3>
                                    <p className='text-sm text-gray-600'>{task.description}</p>
                                    <div className='flex gap-2 mt-2'>
                                        <button
                                            onClick={() => handleEdit(task)}
                                            className='p-2 bg-yellow-500 text-white rounded w-1/2'
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(task.id)}
                                            className='p-2 bg-red-500 text-white rounded w-1/2'
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <p className='text-lg text-gray-600'>No tienes tareas aún.</p>
                )}
            </div>
            {modalOpen && selectedTask && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                    <div className='bg-white p-6 rounded shadow-md w-96'>
                        <h2 className='text-xl font-bold mb-4'>{isNewTask ? 'Nueva Tarea' : 'Editar Tarea'}</h2>
                        <input
                            type='text'
                            className='p-2 border rounded w-full mb-3'
                            value={selectedTask.title}
                            onChange={(e) => setSelectedTask({ ...selectedTask, title: e.target.value })}
                        />
                        <textarea
                            className='p-2 border rounded w-full mb-3'
                            value={selectedTask.description}
                            onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })}
                        />
                        <select
                            className='p-2 border rounded w-full mb-3'
                            value={selectedTask.status}
                            onChange={(e) =>
                                setSelectedTask({ ...selectedTask, status: e.target.value as Task['status'] })
                            }
                        >
                            <option value='To Do'>To Do</option>
                            <option value='In Progress'>In Progress</option>
                            <option value='Done'>Done</option>
                        </select>
                        <div className='flex gap-2'>
                            <button onClick={handleSaveTask} className='p-2 bg-blue-500 text-white rounded w-1/2'>
                                Guardar
                            </button>
                            <button
                                onClick={() => setModalOpen(false)}
                                className='p-2 bg-gray-500 text-white rounded w-1/2'
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
