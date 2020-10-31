import React, { useCallback, useEffect, useState } from "react";
import {
Datepicker,
Icon,
Input,
Text,
Button,
Modal,
Card,
} from "@ui-kitten/components";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../core/rootReducer";
import { Profile } from "../data/model";
import { setProfileData } from "../data/actions";
import { PedometrScreen } from "./pedometrSreen";
import { THEME } from "../data/constants";

const CalendarIcon = (props: any) => <Icon {...props} name="calendar" />;

export const ProfileScreen = () => {
const dispatch = useDispatch();

const [model, setModel] = useState<Profile>();
const [show, setShow] = useState(false);
const [showModal, setShowModal] = useState(false);

const profile = useSelector((state: StoreType) => state.data.profile);

useEffect(() => setModel(profile), [profile]);

const onChange = useCallback(() => {
  if (model) {
    dispatch(setProfileData(model));
    setShow(true);
  }
}, [dispatch, model]);

return showModal ? (
  <PedometrScreen onClose={()=> setShowModal(false)} />
  ) : (
<View style={styles.container}>
  <Text category="h4" style={styles.label}>
    Профиль
  </Text>
  <Text category="s1" style={styles.statistics} onPress={() => setShowModal(true)}>
    Посмотреть статистику
  </Text>
    <Input
    value={model?.lastName}
    label="Фамилия"
    onChangeText={(lastName) =>
    setModel(model ? { ...model, lastName } : model)
    }
    />
    <Input
    value={model?.firstName}
    label="Имя"
    onChangeText={(firstName) =>
    setModel(model ? { ...model, firstName } : model)
    }
    style={styles.field}
    />
    <Input
    value={model?.patronymic}
    label="Отчество"
    onChangeText={(patronymic) =>
    setModel(model ? { ...model, patronymic } : model)
    }
    style={styles.field}
    />
    <Input
    value={model?.specialty}
    label="Специальность"
    onChangeText={(specialty) =>
    setModel(model ? { ...model, specialty } : model)
    }
    style={styles.field}
    />
    <Input
    value={model?.inn}
    label="ИНН"
    onChangeText={(inn) =>
    setModel(model ? { ...model, inn } : model)
    }
    style={styles.field}
    />
    <Input
    value={model?.snils}
    label="СНИЛС"
    onChangeText={(snils) =>
    setModel(model ? { ...model, snils } : model)
    }
    style={styles.field}
    />
    <Datepicker
    label="Дата рождения"
    date={model?.birthday}
    onSelect={(birthday) =>
    setModel(model ? { ...model, birthday } : model)
    }
    accessoryRight={CalendarIcon}
    style={styles.datePicker}
    min={new Date(1970, 0, 1)}
    max={new Date(2020, 0, 1)}
    />
    <Button style={styles.saveButton} onPress={onChange}>
      Сохранить
    </Button>
  <Modal visible={show} backdropStyle={styles.backdrop}>
    <Card disabled={true}>
    <Text style={styles.modalText}>Данные успешно сохранены</Text>
    <Button onPress={() => setShow(false)}>Отлично!</Button>
    </Card>
  </Modal>
</View>
);
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 20,
  },
  datePicker: {
    width: "100%",
    marginTop: 5,
  },
  field: {
    marginTop: 2,
  },
  label: {
    alignSelf: "flex-start",
    marginTop: 15,
    marginBottom: 5,
  },
  saveButton: {
    alignSelf: "flex-end",
    width: "40%",
    marginTop: 10,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalText: {
    marginTop: 5,
    marginBottom: 20,
  },
  statistics: {
    marginBottom: 10,
    color: THEME.PRIMARY_COLOR
  }
});