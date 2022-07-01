import React from 'react';
import CodePush from 'react-native-code-push';
import {Box, Button, Typography} from 'components/atoms';
import Modal, {ModalProps} from 'components/atoms/Modal';
import {ButtonProps} from 'components/atoms/Button';
import {Image, Linking, StyleSheet} from 'react-native';
import {ImageProps} from 'react-native';
import {GLOBAL_MODAL_TYPES} from '../Global';
import {useDispatch} from 'react-redux';
import {closeGlobalModal} from 'redux/slices/uiSlice';
import {navigate} from 'navigation/RootNavigation';
import {useGetGlobalConfig} from 'utils/hooks';

export enum ModalActions {
  'HIDE_MODAL' = 'HIDE_MODAL',
  'REGISTER_USER' = 'REGISTER_USER',
  'LOGIN_WHATSAPP' = 'LOGIN_WHATSAPP',
  'RESTART_APP' = 'RESTART_APP',
  'NAVIGATE_PHONE_NUMBER' = 'NAVIGATE_PHONE_NUMBER',
}

export enum bottomLinkActionNames {
  'CALL_CUSTOMER_SERVICE' = 'CALL_CUSTOMER_SERVICE',
  'NAVIGATE_PHONE_NUMBER' = 'NAVIGATE_PHONE_NUMBER',
  'HIDE_MODAL' = 'HIDE_MODAL',
}
interface UniversalProps extends ModalProps {
  imageFileName?: string;
  title?: string;
  description?: string;
  buttonProps?: Omit<ButtonProps, 'onPress'>;
  bottomLinkProps?: Omit<ButtonProps, 'onPress'>;
  imageProps?: ImageProps;
  actionName?: ModalActions;
  bottomLinkActionName?: bottomLinkActionNames;
  actionData?: {[key: string]: string};
}

export interface UniversalModalOptions {
  type: GLOBAL_MODAL_TYPES.UNIVERSAL;
  props: UniversalProps;
}

const UniversalModal: React.FC<UniversalProps> = ({
  title,
  description,
  buttonProps,
  bottomLinkProps,
  bottomLinkActionName,
  actionName,
  imageProps,
  actionData,
  ...props
}) => {
  const dispatch = useDispatch();
  const {supportNumber, whatsappMessage, whatsappNumber} = useGetGlobalConfig();

  const onPress = () => {
    switch (actionName) {
      case ModalActions.HIDE_MODAL:
        dispatch(closeGlobalModal());
        break;
      case ModalActions.REGISTER_USER:
        dispatch(closeGlobalModal());
        navigate('RegisterUser', actionData);
        break;
      case ModalActions.LOGIN_WHATSAPP:
        Linking.openURL(`whatsapp://send?phone=${whatsappNumber}&text=${whatsappMessage}`);
        dispatch(closeGlobalModal());
        break;
      case ModalActions.RESTART_APP:
        CodePush.restartApp();
        break;

      case ModalActions.NAVIGATE_PHONE_NUMBER:
        navigate('PhoneNumber');
        dispatch(closeGlobalModal());
        break;
    }
  };
  const bottomLinkOnPress = () => {
    switch (bottomLinkActionName) {
      case bottomLinkActionNames.HIDE_MODAL:
        dispatch(closeGlobalModal());
        break;
      case bottomLinkActionNames.CALL_CUSTOMER_SERVICE:
        Linking.openURL(`tel:${supportNumber}`);
        dispatch(closeGlobalModal());
        break;

      case bottomLinkActionNames.NAVIGATE_PHONE_NUMBER:
        navigate('PhoneNumber');
        dispatch(closeGlobalModal());
        break;
    }
  };
  return (
    <Modal {...props}>
      {imageProps && imageProps.source && (
        <Image style={[styles.imageStyle, imageProps.style]} {...imageProps} />
      )}
      {title && (
        <Box flexDirection="row" alignItems="center" justifyContent="center" width="100%">
          <Typography weight="medium" variant="h2" marginBottom={0}>
            {title}
          </Typography>
        </Box>
      )}
      <Box>
        {description && (
          <Typography
            textAlign="center"
            weight="light"
            variant="h3"
            paddingTop={7}
            paddingBottom={32}>
            {description}
          </Typography>
        )}
        {buttonProps && (
          <Box flexDirection="row" justifyContent="center">
            <Button testID="action-button" onPress={onPress} {...buttonProps} />
          </Box>
        )}
        {bottomLinkProps && (
          <Box flexDirection="row" justifyContent="center">
            <Button
              testID="bottom-button"
              variant="link"
              mb={3}
              mt={19}
              onPress={bottomLinkOnPress}
              {...bottomLinkProps}
            />
          </Box>
        )}
      </Box>
    </Modal>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    marginTop: 18,
    marginBottom: 20,
  },
});

export default UniversalModal;
