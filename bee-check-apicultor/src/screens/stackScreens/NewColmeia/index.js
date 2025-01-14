import React, { Component } from "react";
import { Image } from "react-native";
import {
  Container,
  Content,
  CardItem,
  Body,
  Button,
  Text,
  Input,
  Icon,
  Item,
  Toast,
  Root,
  View
} from "native-base";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createColemia } from "../../../redux/actions/colmeiaActions";
import ImagePicker from "react-native-image-picker";
import { colors, images } from "../../../../assets";
import styles from "./styles";
import {
  HeaderCustom,
  ButtonCustom,
  SpinnerCustom
} from "../../../componentes";

const options = {
  title: "Imagem da colmeia",
  takePhotoButtonTitle: "Tirar uma nova foto",
  chooseFromLibraryButtonTitle: "Selecionar foto na galeria",
  quality: 0.5
};

class NewColmeia extends Component {
  state = {
    colmeia: {
      descricao: "",
      nome: ""
    },
    foto: {},
    foto_uri: null
  };

  onAddColmeia = () => {
    const { colmeia, foto } = this.state;
    const { createColemia } = this.props;

    if (colmeia.nome == "" || colmeia.descricao == "") {
      Toast.show({
        text: "Preencha todos os campos!",
        textStyle: { marginLeft: 40 },
        position: "bottom",
        type: "danger"
      });
    } else {
      createColemia({
        descricao: colmeia.descricao,
        nome: colmeia.nome,
        foto,
        apiario_id: this.props.navigation.getParam("apiario_id", "")
      });
      this.clearInputs();
      // this.props.navigation.navigate(routes.ColmeiaHome);
    }
  };

  clearInputs = () => {
    this.setState({ foto: {}, foto_uri: null });
    this.setState({ colmeia: { descricao: "", nome: "" } });
  };

  slectPhoto = () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        const source = { uri: response.uri };
        this.setState({ foto: response, foto_uri: source });
      }
    });
  };

  render() {
    const { loading } = this.props;
    const { colmeia, foto_uri } = this.state;
    return (
      <Root>
        <Container>
          <HeaderCustom title="Cadastro" />
          <Content padder>
            <SpinnerCustom visible={loading} />

            <CardItem>
              <Body>
                <Item style={{ marginTop: 20 }}>
                  <Icon
                    style={{
                      color: colors.colorIcons
                    }}
                    active
                    type="AntDesign"
                    name="idcard"
                  />
                  <Input
                    value={colmeia.nome}
                    placeholder="Nome(Indentificador) da colmeia"
                    onChangeText={nome =>
                      this.setState({
                        colmeia: { ...colmeia, nome }
                      })
                    }
                  />
                </Item>
                <Item style={{ marginTop: 20 }}>
                  <Icon
                    active
                    style={{
                      color: colors.colorIcons
                    }}
                    type="FontAwesome"
                    name="pencil"
                  />
                  <Input
                    value={colmeia.descricao}
                    placeholder="descrição da colmeia"
                    onChangeText={descricao =>
                      this.setState({
                        colmeia: { ...colmeia, descricao }
                      })
                    }
                  />
                </Item>

                <Button
                  iconRight
                  full
                  rounded
                  onPress={this.slectPhoto.bind(this)}
                  style={{
                    backgroundColor: colors.theme_second,
                    marginTop: 20
                  }}
                >
                  <Text style={{ color: colors.black }}>Tirar Foto</Text>
                  <Icon
                    type="EvilIcons"
                    name="camera"
                    active
                    style={{
                      color: colors.colorIcons,
                      marginLeft: 15
                    }}
                  />
                </Button>
                <Item
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%"
                  }}
                >
                  {foto_uri ? (
                    <Image style={styles.imageFormColmeia} source={foto_uri} />
                  ) : (
                    <View style={{justifyContent: "center",
                    alignItems: "center",}}>
                      <Icon
                        type="EvilIcons"
                        name="camera"
                        active
                        style={{
                          fontSize: 50,
                          paddingTop: 55,
                          color: "#B8B8B8"
                        }}
                      />
                      <Text  style={{ color: "#B8B8B8", paddingBottom: 55 }}>Sem Imagem</Text>
                    </View>
                  )}
                </Item>
                <ButtonCustom
                  onPress={() => this.onAddColmeia()}
                  iconLeft="save"
                  typeIconLeft="FontAwesome"
                  title="Salvar Colmeia"
                  style={{
                    alignSelf: "flex-end",
                    marginEnd: 10,
                    marginTop: 20
                  }}
                />
              </Body>
            </CardItem>
          </Content>
        </Container>
      </Root>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    loading: state.apiarioState.loading || state.colmeiaState.loading
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createColemia }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewColmeia);
