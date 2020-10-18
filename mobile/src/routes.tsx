import React from 'react'

import { NavigationContainer }from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const { Navigator, Screen } = createStackNavigator()

import OrphanagesMap from './pages/orphanages-map/OrphanagesMap'
import OrphanageDetails from './pages/ophanage-details/OrphanageDetails'
import OrphanageData from './pages/orphanage-create/OrphanageData'
import SelectMapPosition from './pages/orphanage-create/SelectMapPosition'

import { RoutesConstants } from './routes-constants'
import Header from './components/Header'

export default function Routes(){
    return (
        <NavigationContainer>
            <Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: '#f2f3f5'}}}>
                <Screen 
                    name={RoutesConstants.ROUTE_ORPHANAGES_MAP} 
                    component={OrphanagesMap}
                />
                <Screen 
                    name={RoutesConstants.ROUTE_ORPHANAGE_DETAILS} 
                    component={OrphanageDetails}
                    options={{
                        headerShown: true,
                        header: () => <Header showCancel={false} title='Orfanato'/>
                    }}
                />
                <Screen 
                    name={RoutesConstants.ROUTE_SELECT_MAP_POSITION} 
                    component={SelectMapPosition}
                    options={{
                        headerShown: true,
                        header: () => <Header title='Selecione no mapa'/>
                    }}
                />
                <Screen 
                    name={RoutesConstants.ROUTE_ORPHANAGE_DATA} 
                    component={OrphanageData}
                    options={{
                        headerShown: true,
                        header: () => <Header title='Informe os dados'/>
                    }}
                />
            </Navigator>
        </NavigationContainer>
    )
}