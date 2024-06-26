import { useState, useEffect } from "react";
import { Text, View, ActivityIndicator, FlatList } from "react-native";
import { Searchbar } from "react-native-paper";
import CharacterCard from "./CharacterCard";
import axios from "axios";
import apiParams from "../utils/config";

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { ts, apikey, hash, baseURL } = apiParams;
  const [search, setSearch] = useState("");
  const offset = 20;
  const [page, setPage] = useState(0);

  useEffect(() => {
    axios
      .get(`${baseURL}/v1/public/characters`, {
        params: {
          ts,
          apikey,
          hash,
          limit: 20,
          offset: page * 20,
        },
      })
      .then((response) => {
        setData([...data, ...response.data.data.results]);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [page]);

  function searchCharacter() {
    if (search) {
      setLoading(true);
      axios
        .get(`${baseURL}/v1/public/characters`, {
          params: {
            ts,
            apikey,
            hash,
            nameStartsWith: search,
          },
        })
        .then((response) => setData(response.data.data.results))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }
  const handleReset = () => {
    setLoading(true);
    axios
      .get(`${baseURL}/v1/public/characters`, {
        params: {
          ts,
          apikey,
          hash,
          limit: 20,
          offset: 0,
        },
      })
      .then((response) => setData(response.data.data.results))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    setSearch("");
  };

  const handlePagination = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <View
          style={{
            flexDirection: "column",
            marginHorizontal: 5,
            paddingHorizontal: 5,
            height: "99%",
          }}
        >
          <Searchbar
            placeholder="Search for character..."
            onChangeText={(value) => setSearch(value)}
            value={search}
            onIconPress={searchCharacter}
            onSubmitEditing={searchCharacter}
            onClearIconPress={handleReset}
          />
          <FlatList
            contentContainerStyle={{
              flexDirection: "column",
              alignItems: "center",
            }}
            data={data}
            keyExtractor={({ id }) => id.toString()}
            renderItem={({ item }) => (
              <CharacterCard
                id={item.id}
                image={`${item?.thumbnail?.path}.${item?.thumbnail.extension}`}
                name={item.name}
              />
            )}
            onEndReachedThreshold={0.5}
            onEndReached={handlePagination}
          />
        </View>
      )}
    </View>
  );
}
