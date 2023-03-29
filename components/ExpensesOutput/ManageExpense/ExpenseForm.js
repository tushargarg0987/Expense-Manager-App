import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";

function ExpenseForm({onCancel, onSubmit, isEditing,defaultValues}) {
    const [inputValue, setValue] = useState({
        amount: defaultValues ? defaultValues.amount.toString() : '',
        date: defaultValues ? defaultValues.date.toISOString().slice(0,10) : '',
        description: defaultValues ? defaultValues.description : '',
    });

    function submitHandler() {
        const expenseData = {
            amount: +inputValue.amount,
            date: new Date(inputValue.date),
            description: inputValue.description
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0

        if (!amountIsValid || !descriptionIsValid || !dateIsValid) {
            Alert.alert('Invalid Input', 'Please check your input values');
            return;
        } else {
            onSubmit(expenseData);
        }
        
    }

    function inputChangeHandler(identifier,enteredValue) {
        setValue((currentValue) => {
            return {
                ...currentValue,
                [identifier]: enteredValue
            }
        })
    }
    
    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Input label="Amount"
                    style={{flex:1}}
                    textInputConfig={{
                    keyboardType: 'decimal-pad',
                        onChangeText: inputChangeHandler.bind(this, 'amount'),
                    value: inputValue.amount
                }} />
                <Input label="Date"
                    style={{flex:1}}
                    textInputConfig={{
                    placeholder: "YYYY-MM-DD",
                    maxLength: 10,
                    onChangeText: inputChangeHandler.bind(this, 'date'),
                    value: inputValue.date
                }} />
            </View>
            <Input label="Description" textInputConfig={{
                multiline: true,
                onChangeText: inputChangeHandler.bind(this, 'description'),
                    value: inputValue.description
            }} />
            <View style={styles.buttons}>
                <Button style={styles.button} mode="flat" onPress={onCancel}>Cancel</Button>
                <Button style={styles.button} onPress={submitHandler}>{ isEditing ? 'Update' : 'Add'}</Button>
            </View>
        </View>
    )
}

export default ExpenseForm

const styles = StyleSheet.create({
    form: {
        marginTop: 40,
        paddingBottom: 20
    },
    title: {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 16
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
})