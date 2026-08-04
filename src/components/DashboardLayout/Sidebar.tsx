import React from 'react'

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        <div className="border-b border-sidebar-border p-4 h-16">
            <h2 className="text-lg font-semibold">Sidebar</h2>
        </div>
    </div>
  )
}

export default Sidebar