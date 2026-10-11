import PropTypes from 'prop-types';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import './ConfirmDialog.css';

function ConfirmDialog({
    title,
    message,
    confirmLabel = 'Удалить',
    busy = false,
    error,
    onConfirm,
    onCancel,
}) {
    return (
        <Modal title={title} onClose={onCancel}>
            <p className="confirm-message">{message}</p>

            {error && <p className="admin-form-error confirm-error">{error}</p>}

            <div className="confirm-actions">
                <Button variant="secondary" onClick={onCancel} disabled={busy}>
                    Отмена
                </Button>
                <Button variant="danger" onClick={onConfirm} disabled={busy}>
                    {busy ? 'Удаление…' : confirmLabel}
                </Button>
            </div>
        </Modal>
    );
}

ConfirmDialog.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    confirmLabel: PropTypes.string,
    busy: PropTypes.bool,
    error: PropTypes.string,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default ConfirmDialog;
