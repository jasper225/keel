import Input from "../../components/ui/Input";
import { formatDate } from "../../utils/formatDate";

export default function SpendByCategory({ spendByCategory, dateRange, onDateRangeChange }) {
    if(!spendByCategory) return null;
    const { categoryId, total_spent } = spendByCategory;
}