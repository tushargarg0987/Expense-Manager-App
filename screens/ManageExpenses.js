import { Ionicons } from "@expo/vector-icons";
import { useContext, useLayoutEffect } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import ExpenseForm from "../components/ExpensesOutput/ManageExpense/ExpenseForm";
import Button from "../components/ExpensesOutput/UI/Button";
import IconButton from "../components/ExpensesOutput/UI/IconButton";
import { GlobalStyles } from "../constants/style";
import { ExpensesContext } from "../store/expenses-context";

function ManageExpenses({ route, navigation }) {
    const expensesCtx = useContext(ExpensesContext)
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;
    
    const selectedExpense = expensesCtx.expenses.find(expense => expense.id === editedExpenseId)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    },[navigation,isEditing])

    function deleteExpenseHandler() {
        // console.log("To Delete!!");
        expensesCtx.deleteExpense(editedExpenseId);
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }
    
    function confirmHandler(expenseData) {
        if (isEditing) {
            expensesCtx.updateExpense(
                editedExpenseId, expenseData);
        }
        else {
            expensesCtx.addExpense(expenseData);
        }
        navigation.goBack();
    }

    return (
        // <Text>ManageExpenses</Text>
        <View style={styles.container}>
            <ExpenseForm
                onCancel={cancelHandler}
                onSubmit={confirmHandler}
                isEditing={isEditing}
                defaultValues = {selectedExpense}
            />
            
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton
                    icon='trash'
                    color={GlobalStyles.colors.error500}
                    size={36}
                    onPress={deleteExpenseHandler} />
                </View>)}
        </View>
    )
}

export default ManageExpenses;

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopColor: GlobalStyles.colors.primary200,
        borderTopWidth: 2,
        alignItems: 'center'
    }
})