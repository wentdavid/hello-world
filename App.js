import React from 'react'

import Navigation from './components/Navigation';

import 'react-native-gesture-handler';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

render() {
  return (
    <Navigation></Navigation>
  );
}
}