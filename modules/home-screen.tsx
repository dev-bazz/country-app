import { fetchDX } from "@/lib/advance-fetch";
import type { CountryType } from "@/types/countries";
import { useQuery } from "@tanstack/react-query";
import { Text, View } from "react-native";

const HomeScreenModule = () => {
  const { data, isLoading, isError, error } = useQuery( {
    queryKey: [ "countries" ],
    queryFn: async () => {
      const data = await fetchDX<{ data: CountryType[]; }>( {
        url: "/api/v1/countries", options: {
          method: "GET", headers: {
            Authorization: "Bearer 2162|sOmHg5d3D3uIN7uchugJtiBPXNHgXwyDNNCTRQB8",
            "Content-Type": "application/json"
          }
        },

      } );
      return data;
    },
    enabled: false
  } );
  // console.log( 'error: ', error );

  return ( <View>
    <Text>Home</Text>

  </View> );
};

export default HomeScreenModule;
