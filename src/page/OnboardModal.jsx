/* eslint-disable react/jsx-no-bind */
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../styles/modal.css';

import { GetParams } from '../utils/Onboard.js';

const OnboardModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(-1);

  async function resetParams() {
    const currentStep = await GetParams();
    setStep(currentStep.step);
    setIsOpen(currentStep.step !== -1);
  }

  useEffect(() => {
    resetParams();
    window?.ethereum?.on('chainChanged', () => {
      resetParams();
    });
    window?.ethereum?.on('accountsChanged', () => {
      resetParams();
    });
  }, []);

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        className="Content scrollbar"
        overlayClassName="Overlay"
      >
        {
          step === 0
            ? 'Download Metamask'
            : step === 1
              ? 'Connect Account'
              : step === 2
                ? 'Switch to Fuji C-Chain'
                : step === 3
                  ? 'Grab some test tokens'
                  : 'Good to go'
        }
      </Modal>
    </div>
  );
};

export default OnboardModal;
