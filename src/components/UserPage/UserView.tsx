import React from 'react';

export default function UserView() {
  return (
    <div className="p-6 bg-card text-card-foreground border border-border rounded-xl shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-500/10 text-emerald-500 rounded-full border border-emerald-500/20">
            User Account
          </span>
          <h2 className="text-2xl font-bold mt-2">Welcome Back!</h2>
          <p className="text-sm text-muted-foreground">Here is an overview of your recent activity.</p>
        </div>
        <button className="px-4 py-2 bg-secondary text-secondary-foreground text-sm font-medium rounded-lg hover:bg-secondary/80 transition">
          Edit Profile
        </button>
      </div>

      {/* User Content */}
      <div className="p-4 bg-muted/50 rounded-lg border border-border space-y-2">
        <h3 className="text-sm font-semibold">Your Recent Orders / Activity</h3>
        <p className="text-xs text-muted-foreground">You have 2 pending tasks and 1 completed order this week.</p>
      </div>
    </div>
  );
}