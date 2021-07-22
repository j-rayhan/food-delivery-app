import * as React from 'react';
import {View, Text} from 'react-native';

const Restaurant: React.FC<{title: string}> = ({title}) => {
   return (
       <View>
           <Text>
             Edit {title}.tsx to change this screen.
           </Text>
       </View>
   );
};

export default Restaurant;