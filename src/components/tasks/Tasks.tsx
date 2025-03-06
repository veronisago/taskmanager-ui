import useTasks from '../../hooks/useTasks';
import NavBar from '../../common/Navbar';
import Modal from '../../common/Modal';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Task } from '../../types';
import Button from '../../common/Button';
import Loader from '../../common/Loader';

const Tasks = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const {
        tasks,
        selectedTask,
        modalOpen,
        isNewTask,
        setModalOpen,
        handleEdit,
        handleNewTask,
        handleDelete,
        handleSaveTask,
        setSelectedTask,
        loading,
    } = useTasks();

    const statusStyles: { [key: string]: { bgColor: string; borderColor: string; icon: string } } = {
        'To Do': { bgColor: 'bg-cyan-600/20', borderColor: 'border-cyan-600', icon: 'fa-solid fa-list' },
        'In Progress': { bgColor: 'bg-amber-600/20', borderColor: 'border-amber-600', icon: 'fa-solid fa-spinner' },
        Done: { bgColor: 'bg-green-600/20', borderColor: 'border-green-600', icon: 'fa-solid fa-check-circle' },
    };

    const hasTasks = Object.values(tasks).some((taskList) => taskList.length > 0);

    return (
        <div className='flex flex-col items-center justify-center p-4 gap-4 pt-20 min-h-screen h-auto'>
            <NavBar />
            <div className='flex flex-col gap-3 rounded-xl p-4 bg-white h-full'>
                <div className='flex flex-row justify-between items-center'>
                    <div className='flex flex-col item-center justify-start'>
                        <p className='font-sora text-xl font-semibold'>{`Hello, ${user ? user.name : 'User'}`}</p>
                        <p className='font-inter text-sm'>here are your tasks</p>
                    </div>
                    <Button
                        onClick={handleNewTask}
                        className='flex flex-row items-center gap-2 mb-4 bg-blue-500 hover:bg-blue-600'
                    >
                        <p>Add task</p>
                        <i className='fa fa-solid fa-plus' />
                    </Button>
                </div>
                {hasTasks ? (
                    <div className='grid grid-cols-3 gap-4 w-full max-w-4xl'>
                        {Object.keys(tasks).map((status) => (
                            <div
                                key={status}
                                className={`p-4 border ${statusStyles[status].bgColor} ${statusStyles[status].borderColor} rounded-xl min-h-[300px]`}
                            >
                                <div className='flex flex-row gap-2 items-center mb-2'>
                                    <i className={`fa ${statusStyles[status].icon} text-center`} />
                                    <p className='text-base font-semibold font-sora text-center'>{status}</p>
                                </div>
                                {tasks[status].map((task) => (
                                    <div
                                        key={task.id}
                                        className='flex flex-col gap-2 p-4 mb-2 bg-white border border-gray-600/50 rounded-xl shadow'
                                    >
                                        <div className='flex flex-row justify-between items-center'>
                                            <p className='text-sm font-semibold font-inter'>{task.title}</p>
                                            <div className='flex flex-row gap-2'>
                                                <i
                                                    className='fa fa-regular fa-edit text-gray-600/50 cursor-pointer text-xs'
                                                    onClick={() => handleEdit(task)}
                                                />
                                                <i
                                                    className='fa fa-solid fa-trash text-gray-600/50 cursor-pointer text-xs'
                                                    onClick={() => handleDelete(task.id)}
                                                />
                                            </div>
                                        </div>
                                        <p className='text-xs font-inter text-gray-600'>{task.description}</p>
                                        <p className='text-xs text-gray-700 font-inter'>
                                            Created: {new Date(task.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center h-full w-full min-w-4xl'>
                        <i className='fa fa-regular fa-folder-open text-gray-600 text-3xl' />
                        <p className='text-sm text-gray-500 font-inter'>You have no tasks yet.</p>
                    </div>
                )}
            </div>
            <Modal isOpen={modalOpen} title={isNewTask ? 'New Task' : 'Edit Task'} onClose={() => setModalOpen(false)}>
                <p className='text-sm font-sora'>Title</p>
                <input
                    type='text'
                    className='p-2 border rounded w-full mb-3'
                    value={selectedTask?.title || ''}
                    onChange={(e) => setSelectedTask({ ...selectedTask!, title: e.target.value })}
                />
                <p className='text-sm font-sora'>Description</p>
                <textarea
                    className='p-2 border rounded w-full mb-3'
                    value={selectedTask?.description || ''}
                    onChange={(e) => setSelectedTask({ ...selectedTask!, description: e.target.value })}
                />
                <p className='text-sm font-sora'>Status</p>
                <select
                    className='p-2 border rounded w-full mb-3'
                    value={selectedTask?.status || 'To Do'}
                    onChange={(e) => setSelectedTask({ ...selectedTask!, status: e.target.value as Task['status'] })}
                >
                    <option value='To Do'>To Do</option>
                    <option value='In Progress'>In Progress</option>
                    <option value='Done'>Done</option>
                </select>
                {loading ? (
                    <Loader />
                ) : (
                    <div className='flex gap-2'>
                        <Button onClick={handleSaveTask} className='bg-blue-500 hover:bg-blue-600 w-1/2'>
                            Save
                        </Button>
                        <Button onClick={() => setModalOpen(false)} className='w-1/2 bg-gray-500 hover:bg-gray-600'>
                            Cancel
                        </Button>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Tasks;
