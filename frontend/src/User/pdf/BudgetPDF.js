import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@mui/material";
import moment from "moment";
import logo from "./image.png";

const doc = new jsPDF({
  orientation: "landscape",
});

const exportPDF = (tableData) => {
    doc.addImage(logo, 'PNG', 0, 0, 200, 50);
    doc.setFontSize(13);
    doc.text("Budget Report", 15, 53);
    doc.text(`Report Generated ${moment().format("MMMM Do YYYY, h:mm:ss a")}`, 14, 59);
  
    if(!tableData) {
      console.log("No data");
      return;
    }
  
    const incomeData = tableData.map((budget) => [
      budget.income.map((item) => item.description).join('\n'),
      budget.income.map((item) => item.amount).join('\n'),
    ]);
  
    const expenseData = tableData.map((budget) => [
      budget.expenses.map((item) => item.description).join('\n'),
      budget.expenses.map((item) => item.amount).join('\n'),
    ]);
  
    const tableHeaders = ["Description", "Amount"];
    
    // Generate the income table
    doc.text("Income", doc.internal.pageSize.width / 2, 70, { align: "center" });
    autoTable(doc, {
      head: [tableHeaders],
      body: incomeData,
      styles: {
        cellWidth: "auto",
      },
      startY: 80,
    });
  
    // Add some space between the tables
    doc.addPage();
  
    // Generate the expense table
    doc.text("Expenses", doc.internal.pageSize.width / 2, 30, { align: "center" });
    autoTable(doc, {
      head: [tableHeaders],
      body: expenseData,
      styles: {
        cellWidth: "auto",
      },
      startY: 40,
    });
  
    doc.save("Budget.pdf");
  };

const BudgetPDF = ({ tableData }) => {
  return (
    // <div>
    //   <table id="my-table">
    //     <thead>
    //       <tr>
    //         <th>Income Description</th>
    //         <th>Income Amount</th>
    //         <th>Expense Description</th>
    //         <th>Expense Amount</th>
    //         <th>Total Income</th>
    //         <th>Total Expenses</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {tableData.map((budget, index) => (
    //         <tr key={index}>
    //           <td>{budget.income.map((item) => item.description).join(", ")}</td>
    //           <td>{budget.income.map((item) => item.amount).join(", ")}</td>
    //           <td>{budget.expenses.map((item) => item.description).join(", ")}</td>
    //           <td>{budget.expenses.map((item) => item.amount).join(", ")}</td>
    //           <td>{budget.totalIncome}</td>
    //           <td>{budget.totalExpenses}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
      <Button
        color="primary"
        onClick={() => {
          exportPDF(tableData);
        }}
        variant="contained"
      >
        Export as PDF
      </Button>
    // </div>
  );
};

export default BudgetPDF;