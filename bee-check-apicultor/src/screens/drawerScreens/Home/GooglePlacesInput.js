import React, { Component } from "react";
import { Platform } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default class GooglePlacesInput extends Component {
  state = {
    searchFocused: false
  };

  render() {
    const { searchFocused } = this.state;
    const { onLocationSelected } = this.props;

    return (
      <GooglePlacesAutocomplete
        placeholder={"Buscar endereço..."}
        placeholderTextColor={"#B8B8B8"}
        onPress={onLocationSelected}
        query={{
          key: "AIzaSyA3byNpUcao4ZQud-zGppXCjHSZVOaoygI",
          language: "pt-br"
        }}
        textInputProps={{
          onFocus: () => this.setState({ searchFocused: true }),
          onBlur: () => this.setState({ searchFocused: false }),
          autoCapitaliza: "nome",
          autoCorrect: false
        }}
        listViewDisplayed={searchFocused}
        fetchDetails
        enablePoweredByContainer={false}
        styles={{
          container: {
            position: "absolute",
            top: Platform.select({ ios: 60, android: "42%" }),
            width: "100%"
          },
          textInputContainer: {
            flex: 1,
            backgroundColor: "transparent",
            height: 44,
            marginHorizontal: 10,
            borderTopWidth: 0,
            borderBottomWidth: 0
          },
          textInput: {
            height: 54,
            margin: 0,
            borderRadius: 5,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 20,
            paddingRight: 20,
            marginTop: 0,
            marginLeft: 0,
            marginRight: 0,
            elevation: 5,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: { x: 0, y: 0 },
            shadowRadius: 15,
            borderWidth: 1,
            borderColor: "#DDD",
            fontSize: 18
          },
          listView: {
            borderWidth: 1,
            borderColor: "#DDD",
            backgroundColor: "#FFF",
            marginHorizontal: 10,
            elevation: 5,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: { x: 0, y: 0 },
            shadowRadius: 15,
            marginTop: 10
          },
          description: {
            fontSize: 16
          },
          row: {
            padding: 20,
            height: 58
          }
        }}
      />
    );
  }
}
