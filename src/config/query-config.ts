import {AppState, AppStateStatus} from 'react-native';
import {QueryClient, focusManager, onlineManager} from 'react-query';
import NetInfo from '@react-native-community/netinfo';

// TODO: might need to manualy set queryclient config once the store has been initialized.
export const queryClient = new QueryClient();

onlineManager.setEventListener(setOnline => {
  return NetInfo.addEventListener(state => {
    if (state.isInternetReachable) {
      setOnline(state.isInternetReachable);
    }
  });
});

focusManager.setEventListener(handleFocus => {
  const handler = (state: AppStateStatus) => handleFocus(state === 'active');
  const subscription = AppState.addEventListener('change', handler);

  return () => {
    subscription.remove();
  };
});
