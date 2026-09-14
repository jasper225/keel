import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useParams } from "react-router-dom";
import { useBudgetProgress } from '../../hooks/useBudgets';

export default function BudgetProgressBar() {
    const { id } = useParams();
    const { data: progress } = useBudgetProgress(id);

    return (
        <div>

        </div>
    )
}