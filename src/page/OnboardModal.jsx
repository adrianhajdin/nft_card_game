/* eslint-disable react/jsx-no-bind */
import { useState, useEffect } from 'react';
import Modal from 'react-modal';

import styles from '../styles';
import { CustomButton } from '../components';
import { useGlobalContext } from '../context';
import { GetParams } from '../utils/Onboard.js';

const OnboardModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(-1);

  const { updateCurrentMetamaskAccount } = useGlobalContext();

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

  const generateStep = (st) => {
    switch (st) {
      case 1:
        return (
          <>
            <p className={styles.modalText}>You don't have metamask installed!</p>
            <CustomButton title="Download Metamask" handleClick={() => window.open('https://core.app/', '_blank')} />
          </>
        );

      case 2:
        return (
          <>
            <p className={styles.modalText}>You haven't connected your account to metamask!</p>
            <CustomButton title="Connect Account" handleClick={() => updateCurrentMetamaskAccount()} />
          </>
        );

      case 3:
        return (
          <>
            <p className={styles.modalText}>You're using different web3 network. <br /> Visit the following site and click on the button "Add Subnet to Metamask" </p>
            <CustomButton title="Switch to Fuji C-Chain" handleClick={() => window.open('https://faucet.avax.network/', '_blank')} />
          </>
        );

      case 4:
        return (
          <>
            <p className={styles.modalText}>Oops, you don't have Avax tokens in your account</p>
            <CustomButton title="Grab some test tokens" handleClick={() => window.open('https://faucet.avax.network/', '_blank')} />
          </>
        );

      default:
        return (
          <p className={styles.modalText}>Good to go!</p>
        );
    }
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        className={`absolute inset-0 ${styles.flexCenter} flex-col ${styles.glassEffect}`}
        overlayClassName="Overlay"
      >
        {generateStep(step)}
      </Modal>
    </div>
  );
};

export default OnboardModal;
