import React from 'react';
import {render, cleanup, fireEvent} from '../../../../../test-utils';
import {UniversalModal} from '.';
import {act} from 'react-test-renderer';

afterEach(cleanup);

it('matches snapshot', () => {
  const {toJSON} = render(<UniversalModal />);
  expect(toJSON()).toMatchSnapshot();
});

it('calls action event-handler', async () => {
  const onAction = jest.fn();

  const {getByTestId} = render(<UniversalModal buttonProps={{title: 'Test'}} />);

  const actionButton = getByTestId('action-button');
  await act(async () => await fireEvent.press(actionButton));

  expect(onAction).toBeTruthy();
});
