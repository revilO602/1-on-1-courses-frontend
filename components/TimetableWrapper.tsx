import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Colors from "../constants/Colors";
import {WEEK_DAYS} from "../constants/Weekdays";
import TimeTableView, { genTimeBlock } from 'react-native-timetable';

export default function TimetableWrapper({onEventPress=null, events}){
  return (
        <TimeTableView
          onEventPress={onEventPress}
          events={events}
          pivotTime={0}
          pivotEndTime={24}
          numberOfDays={7}
          formatDateHeader="ddd"
          headerStyle = {styles.headerStyle}
          locale="en-US"/>
      );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: Colors.tabIconSelected
  },
})
