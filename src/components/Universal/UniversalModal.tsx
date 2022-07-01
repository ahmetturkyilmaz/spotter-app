import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Box, Button, Modal, Icon, Typography} from 'components/atoms';
import {UniversalModalProps} from 'types/modal.types';
import {useUniversalModal} from './UniversalModalProvider';

const UniversalModal: React.FC<UniversalModalProps> = ({
  title,
  description,
  buttonProps,
  bottomLinkProps,
  imageProps,
  startFontIcon,
  ...props
}) => {
  const {hideModal} = useUniversalModal();

  return (
    <Modal onRequestClose={hideModal} {...props}>
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
          <Typography textAlign="center" weight="light" variant="h4" mt={10} mb={12}>
            {description}
          </Typography>
        )}
        {buttonProps && (
          <Box flexDirection="row" justifyContent="center">
            <Button
              testID="action-button"
              startIcon={
                startFontIcon && <Icon name={startFontIcon} color="white" paddingRight={20} />
              }
              onPress={hideModal}
              {...buttonProps}
            />
          </Box>
        )}
        {bottomLinkProps && (
          <Box flexDirection="row" justifyContent="center">
            <Button
              testID="bottom-button"
              variant="link"
              mb={3}
              mt={10}
              onPress={hideModal}
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
