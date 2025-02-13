import { SectionHeader, UIText } from '@/components/text';
import { useAppContext } from '@/context';
import { fetchDX } from '@/lib/advance-fetch';
import type { CountryType } from '@/types/countries';
import { useQuery } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { Link } from "expo-router";
import {
  ActivityIndicator,
  SafeAreaView,
  SectionList,
  Text,
  View,
} from 'react-native';

const HomeScreenModule = () => {
  const { theme } = useAppContext();
  const { data, isLoading, isError, error } = useQuery( {
    queryKey: [ 'countries' ],
    queryFn: async () => {
      const data = await fetchDX<CountryType[]>( {
        url: 'https://restcountries.com/v3.1/all',
        options: {
          method: 'GET',
        },
      } );
      const arrageAlphabetically = data.reduce(
        ( acc: { data: CountryType[]; type: string; }[], curre ) => {
          const firstLetter = curre.name.common.charAt( 0 );
          if ( !acc.find( ( item ) => item.type === firstLetter ) ) {
            acc.push( {
              type: firstLetter,
              data: [ curre ],
            } );
          } else {
            acc.find( ( item ) => item.type === firstLetter )?.data.push( curre );
          }
          return acc;
        },
        [],
      );
      console.log( 'arrageAlphabetically: ', arrageAlphabetically );

      return (
        arrageAlphabetically.sort( ( a, b ) =>
          a.type.localeCompare( b.type ),
        ) ?? []
      );
    },
    enabled: true,
  } );
  // console.log( 'error: ', error );

  return (
    <SafeAreaView>

      { isLoading ? (
        <ActivityIndicator
          size={ 'large' }
          color={ 'red' }
        />
      ) : (
        data && (
          <SectionList
            stickySectionHeadersEnabled
            ItemSeparatorComponent={ () => <View style={ { height: 16 } } /> }
            contentContainerStyle={ { paddingInline: 24, paddingBottom: 24, backgroundColor: theme === 'dark' ? 'hsla(216, 99%, 7%, 1)' : 'white' } }
            ListHeaderComponent={ <Text>Header</Text> }
            renderSectionHeader={ ( { section } ) => (
              <SectionHeader colorType={ theme }>

                <UIText
                  fontSize={ '16px' }
                  colorType={ theme }>
                  { section.type }
                </UIText>
              </SectionHeader>
            ) }
            sections={ data }
            renderItem={ ( { item } ) => (
              <Link href={ { pathname: "/country/[name]", params: { name: item.name.common } } }
              >
                <View style={ {
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 16,
                } }>
                  <View>
                    <Image
                      source={ `${ item.flags.png }` }
                      style={ { width: 50, height: 50, aspectRatio: "1", objectFit: "fill", borderRadius: 50 } }
                    />
                  </View>
                  <View>
                    <UIText
                      fontSize={ '16px' }
                      colorType={ theme }>
                      { item.name.common }
                    </UIText>
                  </View>
                </View>
              </Link>
            ) }
          />
        )
      ) }
    </SafeAreaView>
  );
};

export default HomeScreenModule;
