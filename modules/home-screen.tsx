import { PressButton } from "@/components/buttons";
import { fetchDX } from "@/lib/advance-fetch";
import type { CountryType } from "@/types/countries";
import { useQuery } from "@tanstack/react-query";
import { SafeAreaView, Text, View } from "react-native";

const HomeScreenModule = () => {
  const { data, isLoading, isError, error } = useQuery( {
    queryKey: [ "countries" ],
    queryFn: async () => {
      const data = await fetchDX<CountryType[]>( {
        url: "https://restcountries.com/v3.1/all", options: {
          method: "GET",
        },

      } );
      console.log( data );
      return data;
    },
    enabled: true
  } );
  // console.log( 'error: ', error );

  return ( <SafeAreaView>
    <Text>Home</Text>
    { isLoading ? <Text>Loading</Text> : <Text>{ JSON.stringify( data ) }</Text> }
    <PressButton>
      <Text>Press</Text>
    </PressButton>

  </SafeAreaView> );
};

export default HomeScreenModule;
