import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GalaxyLayout from "../components/GalaxyLayout";
import Navbar from "../components/Navbar";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Trash2, Plus, RotateCcw } from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  type: "income" | "spending";
  amount: number;
  description: string;
}

const STORAGE_KEY = "jasmin-transactions";

const loadTransactions = (): Transaction[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch { return []; }
};
const saveTransactions = (t: Transaction[]) => localStorage.setItem(STORAGE_KEY, JSON.stringify(t));

const Dashboard = () => {
  const [income, setIncome] = useState("");
  const [spending, setSpending] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>(loadTransactions);
  const [newTxDate, setNewTxDate] = useState(new Date().toISOString().slice(0, 10));
  const [newTxType, setNewTxType] = useState<"income" | "spending">("income");
  const [newTxAmount, setNewTxAmount] = useState("");
  const [newTxDesc, setNewTxDesc] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [now, setNow] = useState(new Date());

  useEffect(() => { saveTransactions(transactions); }, [transactions]);
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const incomeVal = parseFloat(income) || 0;
  const spendingVal = parseFloat(spending) || 0;
  const profit = incomeVal - spendingVal;

  const addTransaction = () => {
    if (!newTxAmount || parseFloat(newTxAmount) <= 0) return;
    setTransactions((prev) => [
      ...prev,
      { id: Date.now().toString(), date: newTxDate, type: newTxType, amount: parseFloat(newTxAmount), description: newTxDesc || (newTxType === "income" ? "Income" : "Spending") },
    ]);
    setNewTxAmount("");
    setNewTxDesc("");
  };

  const deleteTransaction = (id: string) => setTransactions((prev) => prev.filter((t) => t.id !== id));

  const filteredTransactions = searchDate ? transactions.filter((t) => t.date === searchDate) : transactions;

  // Monthly chart data
  const monthlyData = useMemo(() => {
    const months: Record<string, { income: number; spending: number }> = {};
    transactions.forEach((t) => {
      const m = t.date.slice(0, 7);
      if (!months[m]) months[m] = { income: 0, spending: 0 };
      months[m][t.type] += t.amount;
    });
    return Object.entries(months).sort().slice(-6).map(([month, d]) => ({
      month: month.slice(5),
      income: d.income,
      spending: d.spending,
      profit: d.income - d.spending,
    }));
  }, [transactions]);

  // Varshan analysis
  const analyzeRange = (days: number) => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    const recent = transactions.filter((t) => new Date(t.date) >= cutoff);
    const inc = recent.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const sp = recent.filter((t) => t.type === "spending").reduce((s, t) => s + t.amount, 0);
    return { income: inc, spending: sp, profit: inc - sp };
  };

  const v10 = analyzeRange(10);
  const v30 = analyzeRange(30);

  // AI prediction
  const prediction = useMemo(() => {
    if (monthlyData.length < 2) return "Add more transaction data for AI predictions.";
    const last = monthlyData[monthlyData.length - 1];
    const prev = monthlyData[monthlyData.length - 2];
    if (last.profit > prev.profit) return "📈 Business performance likely to grow next month. Positive trend detected.";
    if (last.profit < prev.profit) return "📉 Caution: Declining trend detected. Consider reviewing spending.";
    return "📊 Business performance is stable. Maintain current strategies.";
  }, [monthlyData]);

  const reset = () => {
    setIncome("");
    setSpending("");
  };

  const inputClass = "w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground font-heading text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all";

  return (
    <GalaxyLayout>
      <Navbar />
      <div className="pt-20 pb-12 px-4 container mx-auto max-w-6xl">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-display text-3xl md:text-4xl gold-gradient-text text-center mb-10">
          Business Calculator
        </motion.h1>

        {/* Clock */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="glass-card p-4 mb-8 text-center">
          <div className="font-display text-2xl md:text-3xl gold-gradient-text gold-glow tracking-widest">
            {now.toLocaleTimeString()}
          </div>
          <div className="text-muted-foreground text-sm font-heading mt-1">{now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
        </motion.div>

        {/* Main Calculator */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
            <label className="text-sm text-muted-foreground font-heading mb-2 block">Income</label>
            <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} placeholder="0.00" className={`${inputClass} ${income ? "text-profit profit-glow" : ""}`} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6">
            <label className="text-sm text-muted-foreground font-heading mb-2 block">Spending</label>
            <input type="number" value={spending} onChange={(e) => setSpending(e.target.value)} placeholder="0.00" className={`${inputClass} ${spending ? "text-loss loss-glow" : ""}`} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-6 flex flex-col items-center justify-center">
            <span className="text-sm text-muted-foreground font-heading mb-2">{profit >= 0 ? "Profit" : "Loss"}</span>
            <motion.span key={profit} initial={{ scale: 0.5 }} animate={{ scale: 1 }} className={`font-display text-3xl font-bold ${profit >= 0 ? "profit-glow" : "loss-glow"}`}>
              {profit >= 0 ? "+" : ""}{profit.toLocaleString("en", { minimumFractionDigits: 2 })}
            </motion.span>
            <button onClick={reset} className="mt-4 flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors font-heading">
              <RotateCcw size={14} /> Reset
            </button>
          </motion.div>
        </div>

        {/* AI Prediction */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="glass-card p-6 mb-8 border-primary/20">
          <h3 className="font-heading font-semibold text-primary mb-2 text-sm tracking-wide">AI BUSINESS PREDICTION</h3>
          <p className="text-foreground font-body">{prediction}</p>
        </motion.div>

        {/* Charts */}
        {monthlyData.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="glass-card p-6">
              <h3 className="font-heading text-sm text-muted-foreground mb-4">Monthly Income & Spending</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(222,30%,18%)" />
                  <XAxis dataKey="month" stroke="hsl(215,20%,60%)" fontSize={12} />
                  <YAxis stroke="hsl(215,20%,60%)" fontSize={12} />
                  <Tooltip contentStyle={{ background: "hsl(222,47%,10%)", border: "1px solid hsl(222,30%,18%)", borderRadius: 8 }} />
                  <Bar dataKey="income" fill="hsl(142,70%,50%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="spending" fill="hsl(0,84%,60%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="glass-card p-6">
              <h3 className="font-heading text-sm text-muted-foreground mb-4">Profit Trend</h3>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(222,30%,18%)" />
                  <XAxis dataKey="month" stroke="hsl(215,20%,60%)" fontSize={12} />
                  <YAxis stroke="hsl(215,20%,60%)" fontSize={12} />
                  <Tooltip contentStyle={{ background: "hsl(222,47%,10%)", border: "1px solid hsl(222,30%,18%)", borderRadius: 8 }} />
                  <Line type="monotone" dataKey="profit" stroke="hsl(42,80%,55%)" strokeWidth={2} dot={{ fill: "hsl(42,80%,55%)" }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        )}

        {/* Varshan Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {[{ label: "Varshan-10", data: v10, desc: "10-Day Analysis" }, { label: "Varshan-30", data: v30, desc: "30-Day Analysis" }].map((v) => (
            <motion.div key={v.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-6">
              <h3 className="font-display text-lg gold-gradient-text mb-1">{v.label}</h3>
              <p className="text-xs text-muted-foreground mb-4 font-heading">{v.desc}</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div><div className="text-xs text-muted-foreground">Income</div><div className="font-heading font-bold profit-glow">{v.data.income.toFixed(0)}</div></div>
                <div><div className="text-xs text-muted-foreground">Spending</div><div className="font-heading font-bold loss-glow">{v.data.spending.toFixed(0)}</div></div>
                <div><div className="text-xs text-muted-foreground">Profit</div><div className={`font-heading font-bold ${v.data.profit >= 0 ? "profit-glow" : "loss-glow"}`}>{v.data.profit.toFixed(0)}</div></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Transaction */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="glass-card p-6 mb-8">
          <h3 className="font-heading font-semibold text-foreground mb-4">Add Transaction</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <input type="date" value={newTxDate} onChange={(e) => setNewTxDate(e.target.value)} className={inputClass} />
            <select value={newTxType} onChange={(e) => setNewTxType(e.target.value as "income" | "spending")} className={inputClass}>
              <option value="income">Income</option>
              <option value="spending">Spending</option>
            </select>
            <input type="number" placeholder="Amount" value={newTxAmount} onChange={(e) => setNewTxAmount(e.target.value)} className={inputClass} />
            <input type="text" placeholder="Description" value={newTxDesc} onChange={(e) => setNewTxDesc(e.target.value)} className={inputClass} />
            <button onClick={addTransaction} className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-heading text-sm font-semibold hover:bg-primary/90 transition-colors">
              <Plus size={16} /> Add
            </button>
          </div>
        </motion.div>

        {/* Transaction History */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="glass-card p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <h3 className="font-heading font-semibold text-foreground">Transaction History</h3>
            <input type="date" value={searchDate} onChange={(e) => setSearchDate(e.target.value)} placeholder="Search by date" className={`${inputClass} max-w-[200px]`} />
          </div>
          {filteredTransactions.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-8">No transactions found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50 text-muted-foreground font-heading">
                    <th className="text-left py-3 px-2">Date</th>
                    <th className="text-left py-3 px-2">Type</th>
                    <th className="text-left py-3 px-2">Description</th>
                    <th className="text-right py-3 px-2">Amount</th>
                    <th className="text-right py-3 px-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredTransactions.slice().reverse().map((t) => (
                      <motion.tr key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="border-b border-border/20">
                        <td className="py-3 px-2 text-muted-foreground">{t.date}</td>
                        <td className="py-3 px-2">
                          <span className={`text-xs font-heading font-semibold px-2 py-1 rounded ${t.type === "income" ? "bg-profit/10 text-profit" : "bg-loss/10 text-loss"}`}>
                            {t.type}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-foreground">{t.description}</td>
                        <td className={`py-3 px-2 text-right font-heading font-bold ${t.type === "income" ? "text-profit" : "text-loss"}`}>
                          {t.type === "income" ? "+" : "-"}{t.amount.toFixed(2)}
                        </td>
                        <td className="py-3 px-2 text-right">
                          <button onClick={() => deleteTransaction(t.id)} className="text-muted-foreground hover:text-loss transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </GalaxyLayout>
  );
};

export default Dashboard;
