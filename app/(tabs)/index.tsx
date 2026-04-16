import "@/global.css"
import {FlatList, Text, View} from "react-native";
import {Link} from "expo-router";
import {styled} from "nativewind";
import {SafeAreaView as RNSafeAreaView} from 'react-native-safe-area-context';
import images from "@/constants/images";
import {Image} from "react-native";
import {HOME_USER, HOME_BALANCE, UPCOMING_SUBSCRIPTIONS, HOME_SUBSCRIPTIONS} from "@/constants/data";
import {icons} from "@/constants/icons";
import {formatCurrency} from "@/lib/utils";
import dayjs from "dayjs";
import Listheading from "@/components/ListHeading";
import UpcomingSubscriptionCard from "@/components/UpcomingSubscriptionCard";
import SubscriptionCard from "@/components/SubscriptionCard";
import {useEffect, useState} from "react";

const SafeAreaView = styled(RNSafeAreaView);

export default function App() {
    const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<string | null>(null);
    return (
        <SafeAreaView className="flex-1 bg-background p-5">

                <FlatList
                    ListHeaderComponent={()=>(
                        <>
                            <View className="home-header">
                                <View className="home-user">
                                    <Image source={images.avatar} className="home-avatar"/>
                                    <Text className="home-user-name">{HOME_USER.name}</Text>
                                </View>
                                <Image source={icons.add} className="home-add-icon"/>
                            </View>
                            <View className="home-balance-card">
                                <Text className="home-balance-label">Balance</Text>

                                <View className="home-balance-row">
                                    <Text className="home-balance-amount">{formatCurrency(HOME_BALANCE.amount)}
                                    </Text>
                                    <Text className="home-balance-date">
                                        {dayjs(HOME_BALANCE.nextRenewalDate).format('MM/DD')}
                                    </Text>
                                </View>

                            </View>

                            <View className="mb-5">
                                <Listheading title="Upcoming"/>

                                <FlatList //upcomingsubscriptioncard components wrap in flatlist to show multiple data
                                    data={UPCOMING_SUBSCRIPTIONS}
                                    renderItem={({item}) => (
                                        <UpcomingSubscriptionCard {...item}/>
                                    )}
                                    keyExtractor={(item)=>item.id}
                                    horizontal //switch the list horizontal
                                    showsHorizontalScrollIndicator={false}
                                    ListEmptyComponent={<Text className="home-empty-state">No Upcoming renewals yet.</Text>}
                                />
                            </View>
                            <Listheading title="All Subscriptions"/>
                        </>

                    )}
                    data={HOME_SUBSCRIPTIONS}
                    keyExtractor={(item)=>item.id}
                    renderItem={({item})=>(
                        <SubscriptionCard
                            {...item}
                            expanded={expandedSubscriptionId === item.id}
                            onPress={()=> setExpandedSubscriptionId((currentId)=>
                                (currentId === item.id ? null : item.id))}
                          />)}

                          extraData={expandedSubscriptionId}
                          ItemSeparatorComponent={()=> <View className="h-4" />}
                          showsVerticalScrollIndicator={false}
                          ListEmptyComponent={<Text className="home-empty-state">No subscription yet.</Text> }
                    contentContainerClassName="pb-20"
                />

        </SafeAreaView>
    );
}