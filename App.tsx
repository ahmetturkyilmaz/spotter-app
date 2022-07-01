import React from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import store from './src/redux/store';
import {Provider as StoreProvider} from 'react-redux';
import {QueryClientProvider} from 'react-query';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <QueryClientProvider client={}>
        <StoreProvider store={store}></StoreProvider>
      </QueryClientProvider>
    </SafeAreaView>
  );
};

export default App;
