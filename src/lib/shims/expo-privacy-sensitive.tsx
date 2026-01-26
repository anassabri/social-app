import React from 'react'
import {View, ViewProps} from 'react-native'

export function PrivacySensitive({children, style, ...props}: ViewProps) {
  return <View style={style} {...props}>{children}</View>
}
