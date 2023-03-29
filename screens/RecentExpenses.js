import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";

function RecentExpenses() {
    const expensesCtx = useContext(ExpensesContext);

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7daysAgo = getDateMinusDays(today, 7);
        return expense.date > date7daysAgo;
    })

    return (
        <ExpensesOutput expenses={recentExpenses} periodName="Last 7 days" fallbackText="No expenses in last 7 days" />
    )
}

export default RecentExpenses;