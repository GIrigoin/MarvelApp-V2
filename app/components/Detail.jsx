import { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Information from "./Information";
import Comics from "./Comics";
import axios from "axios";
import apiParams from "../utils/config";
import { ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export default function Detail() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { ts, apikey, hash, baseURL } = apiParams;
  const route = useRoute();

  useEffect(() => {
    axios
      .get(`${baseURL}/v1/public/characters/${route.params.id}`, {
        params: {
          ts,
          apikey,
          hash,
        },
      })
      .then((response) => setData(response.data.data.results[0]))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Information"
      tabBarOptions={{
        activeTintColor: "darkred",
      }}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Information"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome size={28} name="address-card" color={color} />
          ),
        }}
        he
      >
        {() =>
          isLoading ? (
            <ActivityIndicator size="large" color="#00ff00" />
          ) : (
            <Information
              image={`${data?.thumbnail?.path}.${data?.thumbnail?.extension}`}
              name={data.name}
              description={data.description}
            />
          )
        }
      </Tab.Screen>
      <Tab.Screen
        name="Comics"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome size={28} name="newspaper-o" color={color} />
          ),
        }}
      >
        {() =>
          isLoading ? (
            <ActivityIndicator size="large" color="#00ff00" />
          ) : (
            <Comics listComics={data?.comics?.items} />
          )
        }
      </Tab.Screen>
    </Tab.Navigator>
  );
}
