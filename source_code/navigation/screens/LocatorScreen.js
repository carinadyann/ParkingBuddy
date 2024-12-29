import * as React from 'react';
import { StyleSheet, ScrollView, View, Text, Image } from 'react-native';
import BoxContainer from '../BoxContainer';
import { styles } from '../style';

const campusData = {
  'Arizona State University': {
    zones: [
      {
        zoneName: 'Zone A (West)',
        spots: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10'],
      },
      {
        zoneName: 'Zone B (East)',
        spots: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10']
      },

      {
        zoneName: 'Zone C (South)',
        spots: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10']
      },
    ],
  },
  'California State Polytechnic University Pomona': {
    zones: [
      {
        zoneName: 'Zone A (South)',
        spots: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10'],
      },
      {
        zoneName: 'Zone B (',
        spots: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10']
      },

      {
        zoneName: 'Zone C',
        spots: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10']
      },
    ],
  },
  'California State University Dominguez Hills': {
    zones: [
      {
        zoneName: 'Zone A',
        spots: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10'],
      },
      {
        zoneName: 'Zone B',
        spots: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10']
      },

      {
        zoneName: 'Zone C',
        spots: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10']
      },
    ],
  },
  'California State University Fullerton': {
    zones: [
      {
        zoneName: 'Zone A',
        spots: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10'],
      },
      {
        zoneName: 'Zone B',
        spots: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10']
      },

      {
        zoneName: 'Zone C',
        spots: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10']
      },
    ],
  },
  'California State University Long Beach': {
    zones: [
      {
        zoneName: 'Zone A',
        spots: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10'],
      },
      {
        zoneName: 'Zone B',
        spots: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10']
      },

      {
        zoneName: 'Zone C',
        spots: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10']
      },
    ],
  },
  'California State University Los Angeles': {
    zones: [
      {
        zoneName: 'Zone A',
        spots: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10'],
      },
      {
        zoneName: 'Zone B',
        spots: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10']
      },

      {
        zoneName: 'Zone C',
        spots: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10']
      },
    ],
  },
  'California State University Northridge': {
    zones: [
      {
        zoneName: 'Zone A',
        spots: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10'],
      },
      {
        zoneName: 'Zone B',
        spots: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10']
      },

      {
        zoneName: 'Zone C',
        spots: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10']
      },
    ],
  },
  'California State University San Bernardino': {
    zones: [
      {
        zoneName: 'Zone A',
        spots: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10'],
      },
      {
        zoneName: 'Zone B',
        spots: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10']
      },

      {
        zoneName: 'Zone C',
        spots: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10']
      },
    ],
  },
  'San Diego State University': {
    zones: [
      {
        zoneName: 'Zone A',
        spots: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10'],
      },
      {
        zoneName: 'Zone B',
        spots: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10']
      },

      {
        zoneName: 'Zone C',
        spots: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10']
      },
    ],
  },
  'University of California Irvine': {
    zones: [
      {
        zoneName: 'Zone A',
        spots: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10'],
      },
      {
        zoneName: 'Zone B',
        spots: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10']
      },

      {
        zoneName: 'Zone C',
        spots: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10']
      },
    ],
  },
  'University of California Riverside': {
    zones: [
      {
        zoneName: 'Zone A',
        spots: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10'],
      },
      {
        zoneName: 'Zone B',
        spots: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10']
      },

      {
        zoneName: 'Zone C',
        spots: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10']
      },
    ],
  },
};

// Beginning of functional code
export default function LocatorScreen({ navigation, route }) {
  const { selectedSchool } = route.params || {};
  const campusInfo = campusData[selectedSchool];

  const [availability, setAvailability] = React.useState({});

  React.useEffect(() => {
    if (!campusInfo) return;
    const randomAvailability = {};
    campusInfo.zones.forEach(zone => {
      randomAvailability[zone.zoneName] = {};
      zone.spots.forEach(spotName => {
        randomAvailability[zone.zoneName][spotName] = Math.random() > 0.5; 
      });
    });
    setAvailability(randomAvailability);
  }, [campusInfo]);

  if (!campusInfo) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          No campus information available for "{selectedSchool}".
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logoCenter} />

      <BoxContainer style={styles.boxDark}>
        <Text style={styles.textT}>
          Showing Parking for {selectedSchool}
        </Text>
      </BoxContainer>

      {campusInfo.zones.map(zone => (
        <BoxContainer key={zone.zoneName} style={styles.boxLight}>
          <Text style={styles.textT}>{zone.zoneName}</Text>
          {zone.spots.map(spotName => {
            const isAvailable = availability[zone.zoneName]?.[spotName];
            return (
              <View
                key={spotName}
                style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}
              >
                <Text style={styles.text}>{spotName}</Text>
                <Text
                  style={[
                    styles.text,
                    { color: isAvailable ? 'green' : 'red' }
                  ]}
                >
                  {isAvailable ? 'Available' : 'Unavailable'}
                </Text>
              </View>
            );
          })}
        </BoxContainer>
      ))}

      <Text>{'\n'}{'\n'}{'\n'}</Text>
    </ScrollView>
  );
}
