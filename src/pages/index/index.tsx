import React, { Component } from 'react';
import { View, Text } from '@tarojs/components';
import { Button } from '@antmjs/vantui';

import './index.less';

export default class Index extends Component {
  // componentWillMount() {}

  componentDidMount() {}

  // componentWillUnmount() {}

  // componentDidShow() {}

  // componentDidHide() {}

  render() {
    return (
      <View className="index">
        <Text>
          Taro
          模版框架，基于Taro+@antmjs/vantui的项目基础模版库，包含eslint，stylelint等基础配置，快速搭建开箱即用
        </Text>
        <View className="index-btn">
          <Button type="primary">开始新的一天</Button>
        </View>
      </View>
    );
  }
}
