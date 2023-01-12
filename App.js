import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const getData = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const content = data?.map((item) => {
    return (
      <View key={item.id} style={{ width: "50%", height: 250, padding: 15 }}>
        <TouchableHighlight
          onPress={() =>
            navigation.push("Details", {
              itemId: item.id,
            })
          }
        >
          <>
            <Image
              source={{
                uri: item.image,
                width: "100%",
                height: 180,
              }}
            />
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={{ marginTop: 5, marginBottom: 5 }}
            >
              {item.title}
            </Text>
            <Text>${item.price}</Text>
          </>
        </TouchableHighlight>
      </View>
    );
  });
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.singleProduct}>
          {content}
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function DetailsScreen({ route, navigation }) {
  const { itemId } = route.params;
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await fetch(`https://fakestoreapi.com/products/${itemId}`);
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: data.image, width: "100%", height: 400 }} />
    </View>
  );
}
const Stack = createNativeStackNavigator();

export default function App() {
  // const [data, setData] = useState([]);
  // const getData = async () => {
  //   const response = await fetch("https://fakestoreapi.com/products");
  //   const data = await response.json();
  //   setData(data);
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  // const content = data?.map((item) => {
  //   return (
  //     <View key={item.id} style={{ width: "50%", height: 250, padding: 15 }}>
  //       <Image
  //         // style={{ width: 50, height: 50 }}
  //         source={{
  //           uri: item.image,
  //           width: "100%",
  //           height: 180,
  //         }}
  //       />
  //       <Text
  //         ellipsizeMode="tail"
  //         numberOfLines={1}
  //         style={{ marginTop: 5, marginBottom: 5 }}
  //       >
  //         {item.title}
  //       </Text>
  //       <Text>${item.price}</Text>
  //     </View>
  //   );
  // });

  return (
    // <SafeAreaView>
    //   <ScrollView>
    //     <View style={styles.singleProduct}>
    //       {content}
    //       <StatusBar style="auto" />
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  singleProduct: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    backgroundColor: "#fff",
  },
});
