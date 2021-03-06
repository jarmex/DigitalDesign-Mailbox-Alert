import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import {
  MessageViewContainer,
  MessageViewBorder,
  Container,
  FormatMessage,
  DateMessage,
} from './styl';
import HistoryResult from './HistoryResult';
import { useFirebase } from '../../hooks';

const CheckResultPage = () => {
  const [data, loading, pending] = useFirebase();
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Container>
      <MessageViewContainer>
        <MessageViewBorder>
          <FormatMessage>{pending.message}</FormatMessage>
          {pending.datemsg && <DateMessage>{pending.datemsg}</DateMessage>}
        </MessageViewBorder>
      </MessageViewContainer>
      <HistoryResult data={data} loading={loading} />
    </Container>
  );
};

CheckResultPage.navigationOptions = ({ navigation }) => ({
  title: 'Auto Mailbox Alert',
});

export default CheckResultPage;
