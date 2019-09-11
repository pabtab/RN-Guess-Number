import React, {useState, useRef, useEffect} from 'react'
import { View, Text, StyleSheet, Button, Alert, ScrollView, FlatList, Dimensions } from 'react-native'
import {ScreenOrientation} from 'expo';
import { Ionicons } from '@expo/vector-icons'
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <Text>#{listLength - itemData.index}</Text>
    <Text>{itemData.item}</Text>
  </View>
)

const GameScreen = (props) => {
  //ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)


  const initialGuess = generateRandomBetween(1, 100, props.userChoice)
  const [currentGuess, setCurrentGuess] = useState(initialGuess)
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const [rounds, setRounds] = useState(0)
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width)
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height)


  const currentLow = useRef(1);
  const currentHigh = useRef(500);

  const {userChoice, onGameOver} = props

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceHeight(Dimensions.get('window').height)
      setAvailableDeviceWidth(Dimensions.get('window').width)

    }

    Dimensions.addEventListener('change', updateLayout)
    return () => {
      Dimensions.removeEventListener('change', updateLayout)
    };
  })

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length)
    }
  }, [currentGuess, userChoice, onGameOver])

  const nextGuessHandler = direction => {
    if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
      Alert.alert('Dont lie', 'you know that this is wrong', [{text: 'Sorry!', style: 'cancel'}])
      return;
    }

    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess
    }
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)

    setCurrentGuess(nextNumber)
    //setRounds(currRounds => currRounds + 1)
    setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses])
  } 

  let listContainerStyle = styles.listContainer;

  if (availableDeviceWidth < 350) {
    listContainerStyle = styles.listContainerBig
  }

  if (availableDeviceHeight < 500) {
    return (<View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <View style={styles.controls}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <NumberContainer>
          {currentGuess}
        </NumberContainer>
        <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
          <Ionicons name="md-add" size={24} color="white" />          
        </MainButton>
      </View>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {
            pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))
          }
        </ScrollView> */}
        <FlatList
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>)
  }
  
  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>
        {currentGuess}
      </NumberContainer>
      <Card style={{
        ...styles.buttonContainer,
        marginTop: availableDeviceHeight > 600 ? 20 : 5
      }}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
          <Ionicons name="md-add" size={24} color="white" />          
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {
            pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))
          }
        </ScrollView> */}
        <FlatList
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    /* flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5, //20,
    width: 400,
    maxWidth: '90%' */
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 400,
    maxWidth: '90%'
  },
  listContainer: {
    flex: 1,
    width: Dimensions.get('window').width > 350 ? '60%' : '80%',
  },
  listContainerBig: {
    flex: 1,
    width: '80%'
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%'
  },
  list: {
    //alignItems: 'center',
    justifyContent: 'flex-end',
    flexGrow: 1
  },
  listItem: {
    borderColor: '#ccc',
    padding: 15,
    borderWidth: 1,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  }
})

export default GameScreen
