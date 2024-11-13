import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const TemplateModal = ({textbody, handleClose  , show}) => {

    const navigate = useNavigate();
    const handleYes = () => {
        handleClose();
        
        localStorage.clear();
        document.cookie.split(";").forEach((c) => {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
        navigate('/login');

    }

    return (<>
        
        <Modal
            show={show}
            onHide={handleClose} 
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>LogOut</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {textbody}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    No
                </Button>
                <Button variant="primary" onClick={handleYes}>Yes</Button>
            </Modal.Footer>
        </Modal>
    </>);
}

export default TemplateModal;