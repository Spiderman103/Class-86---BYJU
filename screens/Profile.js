import React, { Component } from "react";
import { StyleSheet, Text, View,Switch } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      isEnabled: false,
      light_theme: true,
      profile_image: "",
      name: ""
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }
    async fetchUser (){
     let  theme,name,image;
     await firebase
      .database()
    
        .ref("/users/" + firebase.auth().currentUser.uid)
        .on("value", function(snapshot){
          theme = snapshot.val().current_theme;
          name = '${snapshot.val().first_name}${snapshot.val().last_name}';
          image = snapshot.val().profile_picture;
        })
          this.setState = ({
            light_theme: theme === "light"? true: false,
            isEnabled: theme === "light"? false: true,
            name: name,
            profile_image: image
          })
        
    } 
  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />
    } else {
      return (
        <View style={styles.container}>
            <SafeAreaView style = {styles.AndroidSafeArea}/>
            <View style = {styles.appTitle}>
              <View style = {styles.appIcon}>
                <Image source = {require("../assets/logo.png")}
                  style = {styles.iconImage}
                ></Image>
              </View>

              <View style = {styles.appTitleTextContainer}>
                <Text style = {styles.appTitleText}> Story Telling App</Text>
                
              </View>
            </View>
              <View style = {styles.screenContainer}>
                  <View style = {styles.profileImageContainer}>
                    <Image source = {{uri: this.state_profile_image}}
                        style = {styles.profileImage}></Image>
                    <Text style = {styles.nameText}> {this.state.name}</Text>
                  </View>

                    <View style = {styles.themeContainer}>
                        <Text style = {styles.themeText}> Dark Theme</Text>
                    </View>
                    <Switch
                      style = {{
                        transform: [{scaleX: 1.3}, {scaleY: 1.3}]
                      }}
                      trackColor = {{false: "#767577", true: "white"}}
                      thumbColor={this.state.isEnabled? "#ee8249" :"#f4f3f4"}
                      ios_backgroundColor = "#3e3e3e" 
                      onValueChange = {() => {
                        this.toggleSwitch()
                      }}>
                        
                      </Switch>
                      
                </View>  
          
            
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  AndroidSafeArea: {
    flex: 1,
  },
  appTitle: {
    fontSize: 30,
    fontWeight: "bold"
  },
  appIcon: {
    marginTop: 50,
    marginLeft: 50
  },
  iconImage: {
    marginTop: 10,
    marginLeft: 10
  },
  appTitleTextContainer: {
    flex: 1,
  },
  appTitleText: {
    fontSize: 35,
    fontWeight: "bold"
  },
  screenContainer: {
    flex: 1,
  },
  profieImageContainer: {
    flex: 1,
  },
  profieImage: {
    marginTop: 10,
    marginLeft: 10
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  themeContainer: {
    flex: 1,
  },
  themeText: {
    fontSize: 10,
    fontWeight: "bold"
  }
});
