import EmptyText from "@/components/EmptyText";
import Story from "@/components/Story";
import { useGetStoriesQuery } from "@/services/story";
import { showToast } from "@/utils/toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { type StackNavigation } from "@/navigation/AppNavigator";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FooterLoading from "@/components/FooterLoading";
import { ListStory } from "@/model/StoriesModel";

const HomeScreen = () => {
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const { data, isFetching, refetch } = useGetStoriesQuery({
    page: page,
    size: 10,
  });
  const [listStory, setListStory] = useState<ListStory[]>([]);
  const [username, setUsername] = useState("");
  const { navigate, reset } = useNavigation<StackNavigation>();

  const loadMore = () => {
    if (!isFetching && data?.listStory?.length) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    page === 1 ? refetch() : setPage(1);
    setRefreshing(false);
  };

  const logout = async () => {
    try {
      await AsyncStorage.clear();
      reset({
        index: 0,
        routes: [{ name: "LoginScreen" }],
      });
    } catch (err: any) {
      showToast(err.toString());
    }
  };

  const navigateToPickImage = () => navigate("PickImageScreen");

  useEffect(() => {
    const getUsernameLocal = async () => {
      const username = await AsyncStorage.getItem("username");
      setUsername(username ? username : "Who am i?");
    };
    getUsernameLocal();
    handleRefresh();
  }, []);

  useEffect(() => {
    if (data?.listStory) {
      if (page === 1) {
        setListStory([]);
        setListStory(data.listStory);
      } else {
        setListStory((prevList) => {
          const filteredNewData = data.listStory.filter(
            (newItem) => !prevList.some((item) => item.id === newItem.id)
          );

          return [...prevList, ...filteredNewData];
        });
      }
    }
  }, [data]);

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <Image
            style={styles.headerImage}
            source={require("@/assets/images/person-icon.png")}
          />
          <Text
            style={styles.headerText}
            ellipsizeMode={"tail"}
            numberOfLines={1}
          >
            {username}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={[styles.headerButton, { backgroundColor: "#E9EBFE" }]}
          >
            <Image
              style={styles.headerButtonIcon}
              source={require("@/assets/images/location-icon.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.headerButton, { backgroundColor: "#FAEAEE" }]}
            onPress={logout}
          >
            <Image
              style={styles.headerButtonIcon}
              source={require("@/assets/images/logout-icon.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={listStory}
        renderItem={({ item }) => (
          <Story
            name={item.name}
            description={item.description}
            photoUrl={item.photoUrl}
          />
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        contentContainerStyle={styles.contentContainerSeparator}
        ListFooterComponent={<FooterLoading isLoading={isFetching} />}
        onEndReachedThreshold={0.5}
        onEndReached={loadMore}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
      {listStory.length === 0 && !isFetching && (
        <EmptyText text="No Content Availbale" />
      )}

      <TouchableOpacity style={styles.fab} onPress={navigateToPickImage}>
        <Image
          style={{ height: 20, resizeMode: "contain" }}
          source={require("@/assets/images/camera-icon.png")}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 24,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  headerImage: {
    width: 48,
    height: 48,
    resizeMode: "cover",
  },
  headerButton: {
    height: 48,
    width: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    marginStart: 12,
  },
  headerText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#090D20",
    marginStart: 16,
  },
  headerButtonIcon: {
    height: 24,
    width: 24,
  },
  content: {
    flex: 1,
  },
  itemSeparator: {
    height: 16,
  },
  contentContainerSeparator: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  fab: {
    position: "absolute",
    bottom: 0,
    end: 0,
    marginBottom: 24,
    marginEnd: 24,
    width: 48,
    height: 48,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FE7474",
    elevation: 8,
  },
});

export default HomeScreen;
