import React from 'react';
import {storiesOf} from '@storybook/react-native';

import CenterView from '../../../../../storybook/stories/CenterView';
import {UniversalModal} from '.';

storiesOf('Molecules', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Universal Modal', () => <UniversalModal />);
