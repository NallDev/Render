import { ActivityIndicator } from "react-native";

const FooterLoading = ({ isLoading }: { isLoading: boolean }) => {
  return isLoading ? (
    <ActivityIndicator color={"#5265FF"} size="large" />
  ) : null;
};

export default FooterLoading;
