import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { format, isBefore } from "date-fns";

import { globalStyles } from "../styles/global";
import { LABELS } from "../constants/label";

class ListItem extends React.Component {
    goTo(item) {
        this.props.navigation.navigate("Product", {
            product: item,
        });
    }

    render() {
        const purchaseDate =  new Date(this.props.item.purchaseDate)
        const expireDate = new Date(this.props.item.expireDate)
        const currentDate = new Date()
        return (
            <View style={styles.item}>
                <View style={styles.itemContainer}>
                    <Image
                        style={globalStyles.stretch}
                        source={{
                            uri: this.props.item.image,
                        }}
                    />
                    <View style={styles.contentItem}>
                        <TouchableOpacity
                            onPress={() => this.goTo(this.props.item)}
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Text style={globalStyles.itemListTitle}>
                                {this.props.item.name.toUpperCase()}
                            </Text>
                            <View
                                style={{
                                    backgroundColor:
                                        LABELS[this.props.item.label],
                                    width: 24,
                                    height: 12,
                                    borderRadius: 30,
                                }}
                            />
                        </TouchableOpacity>
                        <Text style={{...globalStyles.itemListRating, color: isBefore(expireDate, currentDate) ? 'red' : '#888'}}>
                            Time expiry:{" "}
                            {format(
                                purchaseDate,
                                "dd/MM/yyyy"
                            )}{" "}
                            {" - "}
                            {format(
                               expireDate,
                                "dd/MM/yyyy"
                            )}
                        </Text>
                        <Text style={globalStyles.itemListRating}>
                            Best before day:{" "}
                            {format(
                                new Date(this.props.item.bestBeforeDay),
                                "dd/MM/yyyy"
                            )}
                        </Text>
                        <Text style={globalStyles.itemListRating}>
                            Categories: {this.props.item.classification}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#1d1d1d",
    },
    itemContainer: {
        flexDirection: "row",
    },

    contentItem: {
        marginLeft: 16,
    },
});

export default ListItem;
