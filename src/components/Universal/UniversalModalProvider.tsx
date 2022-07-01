import React, {createContext, FC, useContext, useState} from 'react';
import {useSelector} from 'react-redux';
import {selectIsOfflineModalShowing} from 'redux/slices/uiSlice';
import {UniversalModalContextProps, UniversalModalProps} from 'types/modal.types';
import UniversalModal from './UniversalModal';

const contextDefaultValues: UniversalModalContextProps = {
  hideModal: () => {},
  showModal: () => {},
};

export const UniversalModalContext = createContext<UniversalModalContextProps>(
  contextDefaultValues,
);

const UniversalModalProvider: FC = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOptions, setModalOptions] = useState<UniversalModalProps>();

  const isOfflineModalShowing = useSelector(selectIsOfflineModalShowing);

  const showModal = React.useCallback(
    (options: UniversalModalProps) => {
      if (!isOfflineModalShowing) {
        setModalOptions(options);
        setIsOpen(true);
      }
    },
    [isOfflineModalShowing],
  );

  const hideModal = React.useCallback(() => {
    setModalOptions(undefined);
    setIsOpen(false);
  }, []);

  return (
    <UniversalModalContext.Provider
      value={{
        showModal,
        hideModal,
      }}>
      <UniversalModal visible={isOpen} {...modalOptions} />
      {children}
    </UniversalModalContext.Provider>
  );
};

export const useUniversalModal = () => useContext(UniversalModalContext);

export default UniversalModalProvider;
