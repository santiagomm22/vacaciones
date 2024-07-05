import { useMemo, useState, useEffect } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';

import Modal from 'react-modal';

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import es from 'date-fns/locale/es';
import { useCalendarStore, useUiStore } from '../../hooks';

registerLocale('es', es)

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

  const { isDateModalOpen, closeDateModal } = useUiStore()

  const [formSubmitted, setFormSubmitted] = useState(false)

  const [formValues, setFormValues] = useState({
    title: '',
    notes: 'datos adicionales',
    start: new Date(),
    end: addHours(new Date(), 2)
  })

  const titleClass = useMemo(() => {

    if (!formSubmitted) return ''

    return (formValues.title.length > 0)
      ? 'is-valid'
      : 'is-invalid'
  }, [formValues.title, formSubmitted])

  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const onDateChanged = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event
    })
  }

  const onCloseModal = () => {
    closeDateModal()
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true)

    const diferencia = differenceInSeconds(formValues.end, formValues.start)

    if (isNaN(diferencia) || diferencia <= 0) {
      Report.failure(
        'Ups',
        'La hora debe de ser mayor a la de la fecha inicial.',
        'Vale',
      );
      return;
    }

    if (formValues.title.length <= 0) return;

    console.log(formValues)


  }

  return (
    <Modal
        isOpen={ isDateModalOpen }
        onRequestClose={ onCloseModal }
        style={ customStyles }
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={ 200 }
    >
      <h1> Nueva solicitud </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>

        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <div>
          <DatePicker
            selected={formValues.start}
            onChange={(event) => onDateChanged(event, 'start')}
            className="form-control"
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
          </div>
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <div>
          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            onChange={(event) => onDateChanged(event, 'end')}
            className="form-control"
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
          </div>
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChanged}
          />
          <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChanged}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>

      </form>
    </Modal>
  )
}
