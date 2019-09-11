import React from 'react'
import { View, Platform, StyleSheet } from 'react-native'
import Colors from '../constants/colors';
import TitleText from './TitleText';
import colors from '../constants/colors';

const Header = ({title}) => {
  return (
    <View style={{
        ...styles.header,
        ...Platform.select({
          ios: styles.headerIos,
          android: styles.headerAndroid
          })
        }}>
      <TitleText style={styles.headerTitle}>{title}</TitleText>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIos: {
    backgroundColor:'white',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  headerAndroid: {
    backgroundColor: Colors.primary,
  },
  headerTitle: {
    color: Platform.OS === 'ios' ? colors.primary : 'black',
    fontSize: 18
  }
})

export default Header
