import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {StyleSheet, Text, View, Button, TextInput,} from 'react-native';

import {CheckBox, TouchableOpacity} from "react-native-web";

const Stack = createNativeStackNavigator();

const MyStack = () => {
    const [name,setName] = React.useState("")
    const [isSelected, setSelected] = React.useState(false);

    let mainProps = {
        name: name,
        isSelected: isSelected,
    }

    let aboutProps = {
        name: name,
        setName: setName,
    }

    let preferencesProps={
        isSelected: isSelected,
        setSelected: setSelected,
    };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main">
            {props => <HomeScreen {...props} props={mainProps} />}
        </Stack.Screen>

        <Stack.Screen name="About">
            {props => <About {...props} props={aboutProps} />}
        </Stack.Screen>

          <Stack.Screen name="Preferences">
              {props => <Preferences {...props} props={preferencesProps} />}
          </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};


const About = ({props}) => {
    const [editing,setEditing] = React.useState(false)

    let editView =
        <TextInput
            style={{fontSize:24}}
            placeholder="Enter your name here!"
            onChangeText={text => {props.setName(text)}}
        />

    return (
        <View style={styles.mainPage}>
        <View style= {{flexDirection:'column', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style= {{flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                <Text style={{fontSize:48, marginBottom: "30px"}}>My name is {props.name}</Text>
                {editing?editView:""}
                <Button title="edit" onPress={()=> setEditing(!editing)} />
            </View>
        </View>
        </View>
    );
}

const Preferences = ({props}) => {
    return (
            <>
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: '20px',
            marginBottom: '20px',
        }}>
                <CheckBox
                    value={props.isSelected}
                    onValueChange={props.setSelected}
                />
        </View>
    < Text style={{fontSize: 32, textAlign: 'center'}}>Is name displayed on the main page? {props.isSelected ? "👍" : "👎"}</Text>
            </>
);
}

const HomeScreen = ({ navigation, props }) => {
  return (
      <View style={styles.mainPage}>
          <Text style={styles.mainText}>
              Welcome to {props.isSelected ? props.name + "'s" : "my"} gallery!
          </Text>
          <View style={styles.mainViewer}>
              <TouchableOpacity
                  style={styles.navButton}
                  onPress={() =>
                      navigation.navigate('About')
                  }
              >
                  <Text style={{fontSize:32, color: 'white'}}>About</Text>
              </TouchableOpacity>

              <TouchableOpacity
                  style={styles.navButton}
                  onPress={() =>
                      navigation.navigate('Preferences')
                  }
              >
                  <Text style={{fontSize:32, color: 'white'}}>Preferences</Text>
              </TouchableOpacity>
          </View>
    </View>
  );
};

const styles = StyleSheet.create({
    mainPage: {
        flexDirection: 'column',
        margin:"25px",
        padding:'10px',
        justifyContent: 'space-around',
    },
    mainText: {
        textAlign: 'center',
        fontSize: 42,
        marginBottom: '30px',
    },
    mainViewer: {
        alignItems: 'center',
        marginBottom: "25px",
        fontSize: 42,
    },
    navButton: {
        height:50,
        backgroundColor:"coral",
        alignItems:'center',
        justifyContent:'center',
        padding: '30px',
        marginBottom: '30px',
    },
});

export default MyStack;
