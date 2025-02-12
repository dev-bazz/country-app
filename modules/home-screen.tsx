import type { CountryType } from "@/types/countries";
import { useQuery } from "@tanstack/react-query";
import { Text, View } from "react-native";

const HomeScreenModule = () => {
  const { data, isLoading, isError, error } = useQuery( {
    queryKey: [ "countries" ],
    queryFn: async (): Promise<{ data: CountryType[]; } | undefined> => {
      try {
        const https = await fetch( "https://restfulcountries.com/api/v1/countries", {
          method: "GET", headers: {
            "Authorization": "Bearer 2162|sOmHg5d3D3uIN7uchugJtiBPXNHgXwyDNNCTRQB8   ",
            "Content-Type": "application/json"

          }
        } );
        console.log( 'response: ', https );
        return https.json();
      } catch ( error ) {
        console.log( 'error: ', error );
      }
    }

  } );
  return ( <View>
    <Text>Home</Text>
    { isLoading ? <Text>Loading</Text> : isError ? <Text>{ JSON.stringify( error ) }</Text> : <Text>{ JSON.stringify( data?.data ) }</Text> }
  </View> );
};

export default HomeScreenModule;
