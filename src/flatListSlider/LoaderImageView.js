/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {Image, View, ActivityIndicator} from 'react-native';

export default class LoaderImageView extends Component {
  constructor(props) {
    super(props);
    this.state = {loaded: false};
  }

  render() {
    const {style, source} = this.props;
    return (
      <View style={style}>
        <Image
          source={source}
          resizeMode="contain"
          style={[
            style,
            {
              position: 'absolute',
              resizeMode: 'contain',
            },
          ]}
          onLoad={this._onLoad}
        />

        {!this.state.loaded && <ActivityIndicator size="large" />}
      </View>
    );
  }

  _onLoad = () => {
    this.setState(() => ({loaded: true}));
  };
}
