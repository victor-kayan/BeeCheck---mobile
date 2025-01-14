import React, { Component } from "react";
import { Image, TouchableOpacity } from "react-native";
import {
  Container,
  View,
  CardItem,
  Text,
  Row,
  Grid,
  Col,
  Textarea,
  Content
} from "native-base";
import { HeaderCustom, ButtonCustom } from "../../../componentes";

import { connect } from "react-redux";

import moment from "moment";
import "moment/locale/pt-br";
import { images } from "../../../../assets";

class DetalhesIntervencao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      concluindoIntervencao: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.state.concluindoIntervencao &&
      nextProps.concluirIntervencaoSuccess
    ) {
      const route = this.props.navigation.getParam(
        "routeOnSuccessConcluir",
        ""
      );

      this.setState({ concluindoIntervencao: false });
      this.props.navigation.navigate(route);
    }
  }

  render() {
    const intervencao = this.props.navigation.getParam("intervencao", "");
    const onConcluirIntervencao = this.props.navigation.getParam(
      "onConcluirIntervencao",
      ""
    );

    return (
      <Container>
        <HeaderCustom title="Detalhes" />
        <Content scrollEnabled>
          <CardItem style={{ borderBottomWidth: 2, borderColor: "#EDEDED" }}>
            <View style={{ flex: 1, flexDirection: "row", marginTop: 10 }}>
              <Image
                style={{
                  width: 80,
                  height: 80,
                  borderWidth: 1,
                  borderRadius: 6,
                  borderColor: "#CECDCD"
                }}
                source={{
                  uri:
                    intervencao &&
                    intervencao.tecnico &&
                    intervencao.tecnico.foto
                }}
              />
              <View>
                <Row>
                  <Text
                    style={{
                      marginHorizontal: 10,
                      fontSize: 17,
                      fontWeight: "bold"
                    }}
                  >
                    Data do cadastro:
                  </Text>
                </Row>
                <Row>
                  <Text
                    style={{
                      marginHorizontal: 14,
                      fontSize: 14,
                      color: "#766767"
                    }}
                  >
                    {moment(
                      intervencao &&
                        intervencao.created_at &&
                        intervencao.created_at
                    ).format("DD MMMM  YYYY")}
                  </Text>
                </Row>
                <Row>
                  <Text
                    style={{
                      marginHorizontal: 10,
                      fontSize: 17,
                      fontWeight: "bold"
                    }}
                  >
                    Técnico:
                  </Text>
                </Row>
                <Row>
                  <Text
                    style={{
                      marginHorizontal: 14,
                      fontSize: 14,
                      color: "#766767"
                    }}
                  >
                    {intervencao &&
                      intervencao.tecnico &&
                      intervencao.tecnico.name &&
                      intervencao.tecnico.name}
                  </Text>
                </Row>
              </View>
            </View>
          </CardItem>
          <CardItem>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold"
              }}
            >
              Data de aplicação:
            </Text>
          </CardItem>
          <CardItem>
            <Grid>
              <Col>
                <View style={{ flexDirection: "row" }}>
                  <Image source={images.icons.clock_success} />
                  <Text
                    style={{
                      color: "#578360",
                      fontSize: 14,
                      marginLeft: 5,
                      marginTop: 3
                    }}
                  >
                    {moment(
                      intervencao &&
                        intervencao.data_inicio &&
                        intervencao.data_inicio
                    ).format("DD MMMM  YYYY")}
                  </Text>
                </View>
              </Col>
              <Col>
                <View style={{ flexDirection: "row", marginLeft: 20 }}>
                  <Image source={images.icons.clock_danger} />
                  <Text
                    style={{
                      color: "#B3404A",
                      fontSize: 14,
                      marginLeft: 5,
                      marginTop: 3
                    }}
                  >
                    {moment(
                      intervencao &&
                        intervencao.data_fim &&
                        intervencao.data_fim
                    ).format("DD MMMM  YYYY")}
                  </Text>
                </View>
              </Col>
            </Grid>
          </CardItem>
          <CardItem>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold"
              }}
            >
              Prescrição:
            </Text>
          </CardItem>
          <CardItem>
            <Textarea
              rowSpan={8}
              value={
                intervencao && intervencao.descricao && intervencao.descricao
              }
              editable={false}
              style={{ width: "100%", borderRadius: 5 }}
              bordered
            />
          </CardItem>
          <CardItem>
            <View
              style={{
                alignItems: "flex-end",
                flexDirection: "column-reverse",
                flex: 1
              }}
            >
              <TouchableOpacity>
                <ButtonCustom
                  onPress={() => {
                    onConcluirIntervencao(intervencao);
                    this.setState({ concluindoIntervencao: true });
                  }}
                  iconRight="check"
                  typeIconRight="Entypo"
                  title="Marcar como concluida"
                />
              </TouchableOpacity>
            </View>
          </CardItem>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    concluirIntervencaoSuccess:
      state.intervencaoState.concluirIntervencaoSuccess
  };
}

export default connect(
  mapStateToProps,
  null
)(DetalhesIntervencao);
