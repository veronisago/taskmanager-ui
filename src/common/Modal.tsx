import { ReactNode } from "react";

interface ModalProps {
    isOpen: boolean;
    title: string;
    onClose: () => void;
    children: ReactNode;
}

const Modal = ({ isOpen, title, onClose, children }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded-xl shadow-md w-96">
                <div className="flex justify-between items-center mb-4">
                    <p className="text-xl font-bold font-sora">{title}</p>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 cursor-pointer">
                        <i className="fa fa-solid fa-times" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;
