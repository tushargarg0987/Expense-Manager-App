import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { GlobalStyles } from "../../../constants/style";

function ExpenseForm({onCancel, onSubmit, isEditing,defaultValues}) {
    const [inputValue, setValue] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '', isValid: true
        },
        date: {
            value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : new Date().toISOString().slice(0,10)
            , isValid: true
        },
        description: { value: defaultValues ? defaultValues.description : '', isValid: true },
        
    });

    function submitHandler() {
        const expenseData = {
            amount: +inputValue.amount.value,
            date: new Date(inputValue.date.value),
            description: inputValue.description.value
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0

        if (!amountIsValid || !descriptionIsValid || !dateIsValid) {
            // Alert.alert('Invalid Input', 'Please check your input values');
            setValue((currInputs) => {
                return {
                    amount: { value: currInputs.amount.value, isValid: amountIsValid },
                    date: { value: currInputs.date.value, isValid: dateIsValid },
                    description: {value: currInputs.description.value, isValid: descriptionIsValid},
                }
            })
        } else {
            onSubmit(expenseData);
        }
        
    }

    function inputChangeHandler(identifier,enteredValue) {
        setValue((currentValue) => {
            return {
                ...currentValue,
                [identifier]: {value : enteredValue,isValid : true}
            }
        })
    }

    const formIsInvalid = !inputValue.amount.isValid || !inputValue.date.isValid || !inputValue.description.isValid;
    
    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Input label="Amount"
                    style={{ flex: 1 }}
                    invalid={inputValue.amount.isValid}
                    textInputConfig={{
                    keyboardType: 'decimal-pad',
                        onChangeText: inputChangeHandler.bind(this, 'amount'),
                    value: inputValue.amount.value
                }} />
                <Input label="Date"
                    style={{ flex: 1 }}
                    invalid={inputValue.date.isValid}
                    textInputConfig={{
                    placeholder: "YYYY-MM-DD",
                    maxLength: 10,
                    onChangeText: inputChangeHandler.bind(this, 'date'),
                    value: inputValue.date.value
                }} />
            </View>
            <Input label="Description"
                invalid={inputValue.description.isValid}
                textInputConfig={{
                multiline: true,
                onChangeText: inputChangeHandler.bind(this, 'description'),
                    value: inputValue.description.value
            }} />
            {formIsInvalid && <Text style={styles.errorText}>Invalid input please check the data</Text>}
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
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8
    }
})