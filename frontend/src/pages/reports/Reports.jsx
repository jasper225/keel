import IncomeVsExpense from '../reports/IncomeVsExpense';
import SpendByCategory from '../reports/SpendByCategory';

export default function Reports() {
    
    if (loading) return <div style={{ padding: '2rem' }}> Loading</div>
    if (error) return <div style={{ padding: '2rem', color: 'red' }}>{error}</div>
    
    return (
        <div className="report-page">
            <div>
            <IncomeVsExpense />
            </div>
            <div>
            <SpendByCategory />
            </div>
        </div>
    );
}