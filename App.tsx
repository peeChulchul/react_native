import { useEffect, useState } from "react";
import uuid from "react-native-uuid";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList,
  Pressable,
  TouchableOpacity,
  Vibration,
  Animated,
} from "react-native";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import * as FileSystem from "expo-file-system";
import Swipeable from "react-native-gesture-handler/Swipeable";

interface ItoDoList {
  key: string;
  toDo: string;
}

const TODO_FILE = `${FileSystem.documentDirectory}todos.json`;

export default function App() {
  const [enteredToDoText, setenteredToDoText] = useState("");
  const [toDoList, setToDoList] = useState<ItoDoList[]>([]);

  useEffect(() => {
    loadToDos();
  }, []);

  function toDoInputHandler(enteredText: string) {
    setenteredToDoText(enteredText);
  }

  async function saveToDos(todos: any) {
    try {
      await FileSystem.writeAsStringAsync(TODO_FILE, JSON.stringify(todos));
    } catch (e) {
      console.error("Error", e);
    }
  }

  function deleteToDoHandler(key: string) {
    const updatedToDos = toDoList.filter((todo) => todo.key !== key);
    setToDoList(updatedToDos);
    saveToDos(updatedToDos);
  }
  async function loadToDos() {
    try {
      const content = await FileSystem.readAsStringAsync(TODO_FILE);
      setToDoList(JSON.parse(content));
    } catch (e) {
      console.log("not found", e);
    }
  }

  function addtoDoHandler() {
    const newToDos = [
      ...toDoList,
      { toDo: enteredToDoText, key: uuid.v4().toString() },
    ];
    setToDoList(newToDos);
    saveToDos(newToDos);
    setenteredToDoText("");
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          value={enteredToDoText}
          style={styles.textInput}
          placeholder="할일을 입력하세요"
          onChangeText={toDoInputHandler}
        />
        <Button title="추가하기" onPress={addtoDoHandler} />
      </View>
      <GestureHandlerRootView style={styles.toDosContainer}>
        <DraggableFlatList
          data={toDoList}
          onDragEnd={({ data }) => {
            setToDoList(data);
            saveToDos(data);
          }}
          keyExtractor={(item) => item.key}
          renderItem={({ item, drag, isActive }) => {
            return (
              <Swipeable
                key={item.key}
                rightThreshold={40}
                enableTrackpadTwoFingerGesture
                renderRightActions={(progress, dragX, key) => {
                  const trans = progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [128, 0],
                    extrapolate: "clamp",
                  });

                  return (
                    <Animated.View
                      style={[
                        styles.deleteButtonContainer,
                        { transform: [{ translateX: trans }] },
                      ]}
                    >
                      <Pressable onPress={() => deleteToDoHandler(item.key)}>
                        <Text>삭제</Text>
                      </Pressable>
                    </Animated.View>
                  );
                }}
              >
                <ScaleDecorator>
                  <Pressable
                    style={[styles.toDoItem, isActive && styles.activeToDoItem]}
                    delayLongPress={200}
                    onLongPress={() => {
                      Vibration.vibrate(50);
                      drag();
                    }}
                    disabled={isActive}
                  >
                    <Text style={{ color: "white" }}>{item.toDo}</Text>
                  </Pressable>
                </ScaleDecorator>
              </Swipeable>
            );
          }}
        />
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    marginRight: 8,
    padding: 8,
  },
  toDosContainer: {
    flex: 1,
  },
  deleteButtonContainer: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    borderRadius: 5,
  },

  toDoItem: {
    marginVertical: 2,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  activeToDoItem: {
    borderRadius: 6,
  },
  toDoText: {
    color: "white",
  },
});
