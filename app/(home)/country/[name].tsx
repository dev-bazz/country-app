import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const ViewCountryDetails = () => {
  const { name } = useLocalSearchParams();
  return ( <View>
    <Text>  View Community | { name }</Text>
  </View> );
};

export default ViewCountryDetails;
