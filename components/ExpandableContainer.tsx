import { ReactNode, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

interface ExpandableContainerProps {
  title: string;
  children: ReactNode;
}

interface DescriptionProps {
  children: ReactNode;
}

const ExpandableContainer: React.FC<ExpandableContainerProps> & {
  Description: React.FC<DescriptionProps>;
} = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handlePress = () => {
    setIsOpen(!isOpen);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.header}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <AntDesign name={isOpen ? "up" : "down"} size={24} color="black" />
    </View>
      {isOpen && children}
    </TouchableOpacity>
  );
};

ExpandableContainer.Description = ({ children }: DescriptionProps) => (
  <Text>{children}</Text>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 16,
    fontWeight: "normal",
  },
  description: {
    fontSize: 14,
    color: "gray",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  titleContainer: {
    flex: 1,
    marginRight: 10,
  },
});

export default ExpandableContainer;
