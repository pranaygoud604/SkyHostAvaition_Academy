import React, { useState, useEffect } from 'react';
import { Menu, X, Search, Bell, Plus, ChevronDown, MoreHorizontal, Zap, BarChart3, Users, MessageSquare, Settings, LogOut, Home, TrendingUp, Phone, Mail, Calendar, Clock, CheckCircle, AlertCircle, ArrowRight, Filter, Download, Eye, Edit, Trash2, Send, Paperclip, Smile, Flame, MapPin, Briefcase } from 'lucide-react';

export default function PremiumSkyHostCRM() {
  const [currentUser, setCurrentUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeModule, setActiveModule] = useState('dashboard');
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [data, setData] = useState({
    employees: [],
    leads: [],
    messages: [],
    notes: []
  });

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = () => {
    const employees = [
      { id: 1, name: 'Rajesh Singh', email: 'rajesh@skyhost.com', role: 'Senior Sales Executive', avatar: '👨‍💼', conversions: 12, revenue: 180000, commission: 45000, performance: 85, status: 'active' },
      { id: 2, name: 'Priya Sharma', email: 'priya@skyhost.com', role: 'Sales Executive', avatar: '👩‍💼', conversions: 15, revenue: 225000, commission: 75000, performance: 92, status: 'active' },
      { id: 3, name: 'Amit Patel', email: 'amit@skyhost.com', role: 'Relationship Manager', avatar: '👨‍💼', conversions: 18, revenue: 270000, commission: 85000, performance: 95, status: 'active' },
    ];

    const leads = [
      { id: 1, name: 'Harsh Desai', phone: '9988776655', email: 'harsh@email.com', course: 'PPL', status: 'hot', stage: 'interested', assignedTo: 1, lastContact: '2min ago', priority: 'high', notes: 'Very interested in PPL' },
      { id: 2, name: 'Meena Joshi', phone: '9988776656', email: 'meena@email.com', course: 'CPL', status: 'warm', stage: 'contacted', assignedTo: 2, lastContact: '1h ago', priority: 'medium', notes: 'Schedule demo' },
      { id: 3, name: 'Karan Nair', phone: '9988776657', email: 'karan@email.com', course: 'ATPL', status: 'cold', stage: 'new', assignedTo: 3, lastContact: '2d ago', priority: 'low', notes: 'Initial inquiry' },
      { id: 4, name: 'Priya Singh', phone: '9988776658', email: 'priya.s@email.com', course: 'PPL', status: 'hot', stage: 'demo', assignedTo: 1, lastContact: 'today', priority: 'high', notes: 'Demo scheduled' },
    ];

    setData({ employees, leads, messages: [], notes: [] });
  };

  const handleLogin = (email) => {
    if (email === 'admin@skyhost.com') {
      setCurrentUser({ id: 0, name: 'Admin', email, role: 'Admin', avatar: '👨‍💼' });
    } else {
      const emp = data.employees.find(e => e.email === email);
      setCurrentUser(emp);
    }
    setShowLoginModal(false);
  };

  if (showLoginModal) {
    return <PremiumLoginPage employees={data.employees} onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} activeModule={activeModule} setActiveModule={setActiveModule} currentUser={currentUser} onLogout={() => { setCurrentUser(null); setShowLoginModal(true); }} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <TopNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} currentUser={currentUser} />

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8 max-w-7xl mx-auto">
            {activeModule === 'dashboard' && <DashboardPage data={data} currentUser={currentUser} />}
            {activeModule === 'leads' && <LeadsPage leads={data.leads} employees={data.employees} />}
            {activeModule === 'employees' && <EmployeesPage employees={data.employees} />}
            {activeModule === 'whatsapp' && <WhatsAppPage leads={data.leads} />}
            {activeModule === 'automations' && <AutomationsPage />}
            {activeModule === 'reports' && <ReportsPage data={data} />}
            {activeModule === 'settings' && <SettingsPage currentUser={currentUser} />}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ COMPONENTS ============

function Sidebar({ open, setOpen, activeModule, setActiveModule, currentUser, onLogout }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'leads', label: 'Leads', icon: TrendingUp },
    { id: 'employees', label: 'Employees', icon: Users },
    { id: 'whatsapp', label: 'Messages', icon: MessageSquare },
    { id: 'automations', label: 'Automations', icon: Zap },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className={`${open ? 'w-72' : 'w-20'} bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300 ease-out`}>
      {/* Logo */}
      <div className="h-20 flex items-center justify-center border-b border-slate-800">
        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
          {open ? '✈️ SkyHost' : '✈️'}
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border border-blue-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Icon size={20} className="flex-shrink-0" />
              {open && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-800">
        {open && (
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-3 mb-3 border border-slate-700">
            <p className="text-white font-semibold text-sm">{currentUser.name}</p>
            <p className="text-slate-400 text-xs mt-1">{currentUser.role}</p>
          </div>
        )}
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
        >
          <LogOut size={18} />
          {open && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </div>
  );
}

function TopNavbar({ sidebarOpen, setSidebarOpen, currentUser }) {
  return (
    <div className="h-16 bg-slate-900 border-b border-slate-800 px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-slate-800 rounded-lg transition-all">
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className="relative w-96">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search leads, employees..."
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-slate-800 rounded-lg transition-all">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg text-white font-medium transition-all">
          <Plus size={18} />
          Add Lead
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-slate-700">
          <div className="text-right">
            <p className="text-sm font-medium text-white">{currentUser.name}</p>
            <p className="text-xs text-slate-400">{currentUser.role}</p>
          </div>
          <div className="text-2xl">{currentUser.avatar}</div>
        </div>
      </div>
    </div>
  );
}

function PremiumLoginPage({ employees, onLogin }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-blue-900/20 to-slate-950">
      <div className="w-full max-w-md">
        <div className="backdrop-blur-xl bg-slate-900/40 border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">✈️</div>
            <h1 className="text-3xl font-bold text-white mb-2">SkyHost CRM</h1>
            <p className="text-slate-400">Premium Aviation Training Platform</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => onLogin('admin@skyhost.com')}
              className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg text-white font-semibold transition-all"
            >
              🔐 Admin Access
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full h-px bg-slate-700"></div></div>
              <div className="relative flex justify-center text-sm"><span className="px-2 bg-slate-900 text-slate-400">or choose employee</span></div>
            </div>

            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
              {employees.map((emp) => (
                <button
                  key={emp.id}
                  onClick={() => onLogin(emp.email)}
                  className="px-3 py-2 bg-slate-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 rounded-lg text-white text-sm font-medium transition-all group"
                >
                  <div className="text-lg mb-1">{emp.avatar}</div>
                  <div className="text-xs group-hover:text-white">{emp.name.split(' ')[0]}</div>
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-slate-500 text-xs mt-6 pt-6 border-t border-slate-700">
            Secure access to your aviation training CRM
          </p>
        </div>
      </div>
    </div>
  );
}

function DashboardPage({ data, currentUser }) {
  const { employees, leads } = data;

  // Calculate metrics
  const totalLeads = leads.length;
  const hotLeads = leads.filter(l => l.status === 'hot').length;
  const totalRevenue = employees.reduce((sum, emp) => sum + emp.revenue, 0);
  const conversionRate = ((employees.reduce((sum, emp) => sum + emp.conversions, 0) / (totalLeads || 1)) * 100).toFixed(1);
  const activeEmployees = employees.filter(e => e.status === 'active').length;
  const pendingFollowUps = leads.filter(l => l.stage !== 'converted').length;

  const kpis = [
    { label: 'Total Leads', value: totalLeads, trend: '+12%', icon: TrendingUp, color: 'from-blue-600 to-blue-700' },
    { label: 'Hot Leads 🔥', value: hotLeads, trend: '+24%', icon: Flame, color: 'from-red-600 to-red-700' },
    { label: 'Revenue', value: `₹${(totalRevenue/100000).toFixed(1)}L`, trend: '+18%', icon: BarChart3, color: 'from-emerald-600 to-emerald-700' },
    { label: 'Conversion Rate', value: `${conversionRate}%`, trend: '+8%', icon: CheckCircle, color: 'from-purple-600 to-purple-700' },
    { label: 'Active Employees', value: activeEmployees, trend: '+2', icon: Users, color: 'from-cyan-600 to-cyan-700' },
    { label: 'Pending Follow-ups', value: pendingFollowUps, trend: '-5%', icon: Clock, color: 'from-orange-600 to-orange-700' },
  ];

  const pipelineStages = [
    { stage: 'New', count: leads.filter(l => l.stage === 'new').length, color: 'bg-slate-700' },
    { stage: 'Contacted', count: leads.filter(l => l.stage === 'contacted').length, color: 'bg-blue-700' },
    { stage: 'Interested', count: leads.filter(l => l.stage === 'interested').length, color: 'bg-cyan-700' },
    { stage: 'Demo', count: leads.filter(l => l.stage === 'demo').length, color: 'bg-purple-700' },
    { stage: 'Converted', count: leads.filter(l => l.stage === 'converted').length, color: 'bg-emerald-700' },
  ];

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kpis.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <div
                key={idx}
                className="group backdrop-blur-lg bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-slate-600 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`bg-gradient-to-br ${kpi.color} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <span className="text-emerald-400 text-sm font-semibold">{kpi.trend}</span>
                </div>
                <p className="text-slate-400 text-sm mb-1">{kpi.label}</p>
                <p className="text-3xl font-bold text-white">{kpi.value}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pipeline & Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline */}
        <div className="lg:col-span-2 backdrop-blur-lg bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Lead Pipeline</h3>
          <div className="flex items-center justify-between gap-2">
            {pipelineStages.map((item, idx) => (
              <div key={idx} className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <span className="text-sm text-slate-400">{item.stage}</span>
                </div>
                <div className={`${item.color} h-12 rounded-lg flex items-center justify-center`}>
                  <span className="text-white font-semibold">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Employee */}
        <div className="backdrop-blur-lg bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Top Performer</h3>
          {employees && employees.length > 0 && employees[0] && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="text-4xl">{employees[0].avatar}</div>
                <div>
                  <p className="font-semibold text-white">{employees[0].name}</p>
                  <p className="text-xs text-slate-400">{employees[0].role}</p>
                </div>
              </div>
              <div className="space-y-2 pt-4 border-t border-slate-700">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Conversions</span>
                  <span className="text-white font-semibold">{employees[0].conversions}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Revenue</span>
                  <span className="text-emerald-400 font-semibold">₹{(employees[0].revenue/1000).toFixed(0)}K</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Leads */}
      <div className="backdrop-blur-lg bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Recent Leads</h3>
          <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-all">View All →</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Name</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Course</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Employee</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Last Contact</th>
              </tr>
            </thead>
            <tbody>
              {leads.slice(0, 5).map((lead) => {
                const emp = employees.find(e => e.id === lead.assignedTo);
                return (
                  <tr key={lead.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-all">
                    <td className="py-3 px-4 text-white font-medium">{lead.name}</td>
                    <td className="py-3 px-4 text-slate-300">{lead.course}</td>
                    <td className="py-3 px-4">{emp?.avatar} {emp?.name}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        lead.status === 'hot' ? 'bg-red-500/20 text-red-400' :
                        lead.status === 'warm' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-slate-700/50 text-slate-300'
                      }`}>
                        {lead.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400">{lead.lastContact}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function LeadsPage({ leads, employees }) {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const filteredLeads = filter === 'all' ? leads : leads.filter(l => l.status === filter);

  const statusBadgeColor = (status) => {
    switch(status) {
      case 'hot': return 'bg-red-500/20 text-red-400 border border-red-500/30';
      case 'warm': return 'bg-orange-500/20 text-orange-400 border border-orange-500/30';
      case 'cold': return 'bg-slate-700/50 text-slate-300 border border-slate-600/50';
      default: return 'bg-slate-700/50 text-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Leads</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg text-white font-medium transition-all">
          <Plus size={18} />
          New Lead
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        {['all', 'hot', 'warm', 'cold'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === f
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Leads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLeads.map((lead) => {
          const emp = employees.find(e => e.id === lead.assignedTo);
          return (
            <div
              key={lead.id}
              className="group backdrop-blur-lg bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-slate-600 rounded-xl p-6 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <h4 className="text-lg font-semibold text-white">{lead.name}</h4>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadgeColor(lead.status)}`}>
                  {lead.status === 'hot' ? '🔥' : ''} {lead.status.toUpperCase()}
                </span>
              </div>

              <div className="space-y-3 mb-4 pb-4 border-b border-slate-700/50">
                <div className="flex items-center gap-2 text-sm">
                  <Phone size={16} className="text-slate-500" />
                  <span className="text-slate-300">{lead.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase size={16} className="text-slate-500" />
                  <span className="text-slate-300">{lead.course}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-lg">{emp?.avatar}</div>
                  <span className="text-sm text-slate-300">{emp?.name}</span>
                </div>
                <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-all">
                  <MoreHorizontal size={18} className="text-slate-400" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EmployeesPage({ employees }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Team Members</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((emp) => (
          <div
            key={emp.id}
            className="backdrop-blur-lg bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6 hover:border-slate-600 transition-all"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="text-5xl">{emp.avatar}</div>
              <div className="flex-1">
                <p className="font-semibold text-white">{emp.name}</p>
                <p className="text-xs text-slate-400">{emp.role}</p>
                <span className="inline-block mt-2 px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full font-medium">
                  Active
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-700/50">
              <div>
                <p className="text-xs text-slate-400 mb-1">Conversions</p>
                <p className="text-2xl font-bold text-white">{emp.conversions}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Revenue</p>
                <p className="text-lg font-bold text-emerald-400">₹{(emp.revenue/1000).toFixed(0)}K</p>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-400">Performance</span>
                <span className="text-white font-semibold">{emp.performance}%</span>
              </div>
              <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{width: `${emp.performance}%`}}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WhatsAppPage({ leads }) {
  const [selectedLead, setSelectedLead] = useState(leads[0]?.id);

  return (
    <div className="grid grid-cols-4 gap-6 h-[calc(100vh-140px)]">
      {/* Conversation List */}
      <div className="col-span-1 backdrop-blur-lg bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-4 flex flex-col overflow-hidden">
        <h3 className="font-semibold text-white mb-4">Messages</h3>
        <div className="flex-1 space-y-2 overflow-y-auto">
          {leads.map((lead) => (
            <button
              key={lead.id}
              onClick={() => setSelectedLead(lead.id)}
              className={`w-full p-3 rounded-lg text-left transition-all ${
                selectedLead === lead.id
                  ? 'bg-blue-600/20 border border-blue-500/30 text-white'
                  : 'hover:bg-slate-700/50 text-slate-300'
              }`}
            >
              <p className="font-medium text-sm">{lead.name}</p>
              <p className="text-xs text-slate-400 mt-1 truncate">Last: {lead.lastContact}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="col-span-3 backdrop-blur-lg bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6 flex flex-col">
        {selectedLead ? (
          <>
            <div className="flex items-center justify-between pb-4 border-b border-slate-700/50 mb-4">
              <div>
                <p className="font-semibold text-white">{leads.find(l => l.id === selectedLead)?.name}</p>
                <p className="text-xs text-slate-400">Active now</p>
              </div>
              <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-all">
                <MoreHorizontal size={18} />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto mb-4">
              <div className="flex justify-end">
                <div className="max-w-xs bg-blue-600 rounded-lg px-4 py-2 text-white text-sm">Hi! Interested in PPL</div>
              </div>
              <div className="flex justify-start">
                <div className="max-w-xs bg-slate-700 rounded-lg px-4 py-2 text-slate-200 text-sm">Yes, can you send details?</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
              />
              <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-all text-slate-400 hover:text-slate-200">
                <Paperclip size={18} />
              </button>
              <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all text-white">
                <Send size={18} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400">
            <p>Select a conversation</p>
          </div>
        )}
      </div>
    </div>
  );
}

function AutomationsPage() {
  const automations = [
    { name: 'Daily Lead Import', trigger: 'Daily 8:00 AM', status: 'Active', success: 98 },
    { name: 'Hot Lead Alert', trigger: 'On Lead Created', status: 'Active', success: 100 },
    { name: 'Follow-up Reminder', trigger: 'After 24h Inactive', status: 'Active', success: 95 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Automations</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg text-white font-medium transition-all">
          <Plus size={18} />
          New Workflow
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {automations.map((auto, idx) => (
          <div
            key={idx}
            className="backdrop-blur-lg bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">{auto.name}</h4>
                <p className="text-sm text-slate-400">Trigger: {auto.trigger}</p>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm rounded-full font-semibold mb-2">
                  {auto.status}
                </span>
                <p className="text-sm text-slate-400">Success: {auto.success}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportsPage({ data }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Reports & Analytics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="backdrop-blur-lg bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6">
          <h3 className="font-semibold text-white mb-4">Revenue Trend</h3>
          <div className="h-40 bg-slate-700/20 rounded-lg flex items-end justify-around gap-2 p-4">
            {[45, 52, 48, 65, 72, 68, 81].map((val, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-blue-600 to-cyan-600 rounded-t-lg transition-all hover:from-blue-700 hover:to-cyan-700"
                style={{height: `${(val/100)*100}%`}}
                title={`₹${val}K`}
              ></div>
            ))}
          </div>
        </div>

        <div className="backdrop-blur-lg bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6">
          <h3 className="font-semibold text-white mb-4">Conversion Rate</h3>
          <div className="space-y-3">
            {[
              { stage: 'New', rate: 65, color: 'bg-blue-600' },
              { stage: 'Contacted', rate: 45, color: 'bg-cyan-600' },
              { stage: 'Interested', rate: 72, color: 'bg-purple-600' },
              { stage: 'Demo', rate: 88, color: 'bg-emerald-600' },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-300">{item.stage}</span>
                  <span className="text-white font-semibold">{item.rate}%</span>
                </div>
                <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color}`} style={{width: `${item.rate}%`}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsPage({ currentUser }) {
  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>

      <div className="backdrop-blur-lg bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Account Name</label>
          <input
            type="text"
            defaultValue={currentUser.name}
            className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
          <input
            type="email"
            defaultValue={currentUser.email}
            className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>

        <button className="w-full px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg text-white font-medium transition-all">
          Save Changes
        </button>
      </div>
    </div>
  );
}
