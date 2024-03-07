import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface CodeSnippetProps {
  children: ReactNode;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.code}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  code: {
    fontFamily: 'monospace',
    fontSize: 14,
  },
});

export default CodeSnippet;