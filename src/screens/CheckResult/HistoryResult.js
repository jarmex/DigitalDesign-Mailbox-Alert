import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const HistoryPickupView = styled.View`
  margin: 20px;
`;
const LastDateText = styled.Text`
  text-align: center;
`;

// show the last pick update
const HistoryResult = ({ data }) => {
  const formatdate = (datedata) => {
    if (Array.isArray(datedata) && datedata.length > 0) {
      const { date } = datedata[0];
      if (date) {
        const dateformatted = moment(date).format('dddd, MMMM Do YYYY, h:mm:ss');
        return dateformatted;
      }
    }
    return '-';
  };

  return (
    <HistoryPickupView>
      <LastDateText>{formatdate(data)}</LastDateText>
    </HistoryPickupView>
  );
};

export default HistoryResult;
