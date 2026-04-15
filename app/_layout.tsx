import {SplashScreen, Stack} from "expo-router";
import '@/global.css'
import {useFonts} from "expo-font";
import {useEffect} from "react";

export default function RootLayout() {

    const [fonstLoaded] =useFonts({
        'sans-regular': require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
        'sans-bold': require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
        'sans-medium': require('../assets/fonts/PlusJakartaSans-Medium.ttf'),
        'sans-semibold': require('../assets/fonts/PlusJakartaSans-SemiBold.ttf'),
        'sans-light':require('../assets/fonts/PlusJakartaSans-Light.ttf'),
        'sans-extrabold':require('../assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
    })

    useEffect(() => {
        if(fonstLoaded){
            SplashScreen.hideAsync()
        }
    }, [fonstLoaded]);
    if(!fonstLoaded) return null

  return <Stack screenOptions={{headerShown: false}} />;
}
