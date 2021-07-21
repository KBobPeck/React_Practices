import React from 'react'
import { useGlobalContext } from './context'

const Modal = () => {
  const {modalOpen, correct, questions, closeModal} = useGlobalContext();
  return <div className={`modal-container ${modalOpen && 'isOpen'}`}>
    <div className="modal-content">
      <h2>Congrats!</h2>
      {/* could also do a percentage if you want */}
      <p>You answered {correct} of {questions.length} correctly</p>
      <button className="close-btn" onClick={closeModal}> Play Again</button>
    </div>
  </div>
}

export default Modal
