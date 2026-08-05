import React from 'react';

export default function AdminView() {
  return (
    <div className="p-6 bg-card text-card-foreground border border-border rounded-xl shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="px-2.5 py-1 text-xs font-semibold bg-indigo-500/10 text-indigo-500 rounded-full border border-indigo-500/20">
            Admin Access
          </span>
          <h2 className="text-2xl font-bold mt-2">Admin Dashboard</h2>
          <p className="text-sm text-muted-foreground">Manage your platform and system statistics.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition">
          + Add New User
        </button>
      </div>

      {/* Admin Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-muted/50 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground font-medium">Total Users</p>
          <p className="text-2xl font-bold mt-1">1,248</p>
        </div>
        <div className="p-4 bg-muted/50 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground font-medium">Monthly Revenue</p>
          <p className="text-2xl font-bold mt-1">$12,450</p>
        </div>
        <div className="p-4 bg-muted/50 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground font-medium">System Status</p>
          <p className="text-2xl font-bold text-emerald-500 mt-1">Operational</p>
        </div>
      </div>
    </div>
  );
}