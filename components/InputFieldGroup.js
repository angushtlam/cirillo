import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import Colors from '../constants/Colors'

const InputFieldGroup = ({
  children,
  color = Colors.grayscale.shade0,
  title,
  value,
}) => (
  <View style={styles.field}>
    <View style={styles.fieldHeader}>
      <Text style={{...styles.label, color}}>{title} </Text>
      <Text style={{color}}>{value}</Text>
    </View>
    {children}
  </View>
)

const styles = StyleSheet.create({
  field: {
    marginTop: 15,
  },
  fieldHeader: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  label: {
    fontWeight: '700',
  },
})

export default InputFieldGroup
