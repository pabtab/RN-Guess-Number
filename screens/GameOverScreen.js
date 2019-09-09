import React from 'react'
import { View, Image, StyleSheet, Button, Text } from 'react-native'
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <TitleText>The game is over</TitleText>
      <View style={styles.imageContainer}>
        <Image 
          //source={{uri: 'url'}}
          source={require('../assets/success.jpg')}
          style={styles.image}
        />
      </View>
      <BodyText>Number of rounds: <Text style={styles.highlight}>{props.roundsNumber}</Text></BodyText>
      <BodyText>Number was: <Text style={styles.highlight}>{props.userNumber}</Text></BodyText>
      <MainButton onPress={props.onRestart}>
        NEW GAME
      </MainButton>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    borderRadius: 200,
    borderWidth: 3,
    borderColor: 'black',
    width: 300,
    height: 300,
    overflow: 'hidden',
    marginVertical: 30,

  },
  highlight: {
    color: colors.primary,
    fontFamily: 'open-sans-bold'
  }
})

export default GameOverScreen
