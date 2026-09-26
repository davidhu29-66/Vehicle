/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { InspectionRecord } from './types/inspection';
import { getInspections, saveInspections, initializeStorage } from './utils/storage';
import BASIXLogo from './components/BASIXLogo';
import CompletedList from './components/CompletedList';
import InspectionForm from './components/InspectionForm';
import PrintInspection from './components/PrintInspection';
import ManageVehiclesAndDrivers from './components/ManageVehiclesAndDrivers';
import { ClipboardCheck, Truck, Users, Settings, LogOut, ShieldAlert, Award } from 'lucide-react';

export default function App() {
  const [records, setRecords] = useState<InspectionRecord[]>([]);
  const [currentView, setCurrentView] = useState<'dashboard' | 'fleet' | 'inspect' | 'print'>('dashboard');
  const [selectedRecord, setSelectedRecord] = useState<InspectionRecord | null>(null);

  // Load initial data
  useEffect(() => {
    initializeStorage();
    setRecords(getInspections());
  }, []);

  const handleCreateRecord = (newRecord: InspectionRecord) => {
    const updated = [newRecord, ...records];
    setRecords(updated);
    saveInspections(updated);
    setSelectedRecord(newRecord);
    setCurrentView('inspect');
  };

  const handleSaveInspect = (updatedRecord: InspectionRecord) => {
    const updated = records.map((r) => (r.id === updatedRecord.id ? updatedRecord : r));
    setRecords(updated);
    saveInspections(updated);
    setCurrentView('dashboard');
    setSelectedRecord(null);
  };

  const handleDeleteRecord = (id: string) => {
    if (confirm('Are you sure you want to permanently delete this inspection record?')) {
      const updated = records.filter((r) => r.id !== id);
      setRecords(updated);
      saveInspections(updated);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-800">
      
      {/* Print mode overlay - hides all background layout when printing */}
      {currentView === 'print' && selectedRecord ? (
        <PrintInspection
          record={selectedRecord}
          onClose={() => {
            setCurrentView('dashboard');
            setSelectedRecord(null);
          }}
        />
      ) : (
        <div className="flex flex-1 flex-col md:flex-row">
          
          {/* SIDEBAR NAVIGATION - 260px wide */}
          <aside className="w-full md:w-64 bg-white border-r border-slate-200 shrink-0 flex flex-col justify-between">
            <div>
              {/* Header block with BASIX Logo */}
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <BASIXLogo className="h-9" />
              </div>

              {/* Navigation Items */}
              <nav className="p-4 space-y-1">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold rounded-lg transition-all text-left ${
                    currentView === 'dashboard'
                      ? 'bg-slate-100 text-[#1E3A8A]'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <ClipboardCheck className="w-4.5 h-4.5" />
                  Inspection Log
                </button>

                <button
                  onClick={() => setCurrentView('fleet')}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold rounded-lg transition-all text-left ${
                    currentView === 'fleet'
                      ? 'bg-slate-100 text-[#1E3A8A]'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Truck className="w-4.5 h-4.5" />
                  Fleet &amp; Drivers
                </button>
              </nav>
            </div>

            {/* Sidebar bottom info */}
            <div className="p-6 border-t border-slate-200">
              <div className="bg-slate-900 text-white rounded-lg p-3.5 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-indigo-400 uppercase tracking-wider font-mono border border-slate-700">
                  MC
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-extrabold block truncate leading-none">David Hughes</span>
                  <span className="text-[8px] text-slate-400 block mt-1 tracking-wider uppercase">Vehicle Driver</span>
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN VIEWPORT PORT */}
          <main className="flex-1 bg-slate-50 px-6 py-6 overflow-y-auto">
            {currentView === 'dashboard' && (
              <CompletedList
                records={records}
                onSelectRecord={(rec) => {
                  setSelectedRecord(rec);
                  setCurrentView('inspect');
                }}
                onPrintRecord={(rec) => {
                  setSelectedRecord(rec);
                  setCurrentView('print');
                }}
                onDeleteRecord={handleDeleteRecord}
                onCreateRecord={handleCreateRecord}
              />
            )}

            {currentView === 'fleet' && <ManageVehiclesAndDrivers />}

            {currentView === 'inspect' && selectedRecord && (
              <InspectionForm
                record={selectedRecord}
                onSave={handleSaveInspect}
                onCancel={() => {
                  setCurrentView('dashboard');
                  setSelectedRecord(null);
                }}
              />
            )}
          </main>

        </div>
      )}

    </div>
  );
}
