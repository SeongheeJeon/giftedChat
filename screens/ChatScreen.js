import React, {
  useCallback,
  useEffect,
  useState,
  useLayoutEffect,
} from "react";
import { View, TouchableOpacity } from "react-native";
import { Avatar, Button } from "react-native-elements";
import { auth, db } from "../firebase";
import { GiftedChat } from "react-native-gifted-chat";

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: "Hello developer",
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: "React Sative",
  //         avater: "https://placeimg.com/140/140/any",
  //       },
  //     },
  //   ]);
  // }, []);

  useEffect(() => {
    // if (messages.length != 0) {
    // const { _id, createdAt, text, user } = messages[0];
    // db.collection("chats").add({
    //   _id,
    //   createdAt,
    //   text,
    //   user,
    // });
    // }
  }, [messages]);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    const { _id, createdAt, text, user } = messages[0];

    db.collection("chats").add({
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        navigation.replace("Login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <Avatar
            rounded
            source={{ uri: auth?.currentUser?.photoURL }}
          ></Avatar>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
        >
          {/* <LogoutOutlined /> */}
          {/* <AntDesign name="logout" size={24} color="black" /> */}
          <Button
            icon={{ name: "logout", size: 24, color: "black" }}
            type="clear"
            iconRight
            onPress={signOut}
          />
          {/* <Icon name="logout" size={24} color="black" /> */}
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          }))
        )
      );

    return unsubscribe;
  }, [GiftedChat]);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName,
        avatar: auth?.currentUser?.photoURL,
      }}
    />
  );
};

export default ChatScreen;
