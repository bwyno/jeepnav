import React from 'react';
import { View, Text, Button, Modal, ScrollView } from 'react-native';
import { DISCLAIMER_CONTENT } from '../../constants';
import { styles } from '../../style';

interface Article {
  TITLE: string;
  CONTENT: string;
}

const Disclaimer = ({ isVisible, onClose }: any) => {
  const handleAgree = () => {
    onClose();
  };
  return (
    <Modal visible={isVisible} onRequestClose={onClose} transparent={true}>
      <View style={styles.disclaimerContainer}>
        <ScrollView style={styles.disclaimerScrollView}>
          <Text style={styles.header}>{DISCLAIMER_CONTENT.HEADER}</Text>
          <Text style={styles.subHeader}>{DISCLAIMER_CONTENT.SUB_HEADER}</Text>
          {Object.values(DISCLAIMER_CONTENT.BODY).map(
            (article: Article, index: number) => (
              <View key={index} style={styles.articleContainer}>
                <Text style={styles.articleTitle}>{article.TITLE}</Text>
                <Text style={styles.articleContent}>{article.CONTENT}</Text>
              </View>
            ),
          )}
          <Text style={styles.closing}>{DISCLAIMER_CONTENT.CLOSING}</Text>
          <View style={styles.agreeButtonContainer}>
            <Button title="I Agree" onPress={handleAgree} />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default Disclaimer;
