import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Building2, Layers, DoorOpen, ChevronDown } from 'lucide-react';

interface Props {
  onComplete: (apartment: any) => void;
}

export default function ApartmentSetupScreen({ onComplete }: Props) {
  const [apartment, setApartment] = useState({
    name: '',
    block: '',
    floor: '',
    door: ''
  });

  const isComplete = apartment.name && apartment.block && apartment.floor && apartment.door;

  return (
    <div className="h-full w-full bg-app-bg px-8 pt-16 flex flex-col">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Set Your Apartment</h1>
      <p className="text-slate-500 mb-8">Help us find your exact door for delivery</p>

      <div className="premium-card p-2 mb-8 overflow-hidden">
        <div className="h-32 bg-slate-100 rounded-lg relative">
          <img 
            src="https://picsum.photos/seed/map/600/300" 
            alt="Map Preview" 
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
              <MapPin size={20} />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-12">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <Building2 size={20} />
          </div>
          <select 
            className="w-full pl-12 pr-10 py-4 bg-white border border-slate-100 rounded-xl appearance-none outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-slate-700"
            value={apartment.name}
            onChange={(e) => setApartment({...apartment, name: e.target.value})}
          >
            <option value="">Select Apartment Name</option>
            <option value="Skyline Heights">Skyline Heights</option>
            <option value="Green Valley">Green Valley</option>
            <option value="Royal Palms">Royal Palms</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <ChevronDown size={20} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Layers size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Block"
              value={apartment.block}
              onChange={(e) => setApartment({...apartment, block: e.target.value})}
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-slate-700"
            />
          </div>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Layers size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Floor"
              value={apartment.floor}
              onChange={(e) => setApartment({...apartment, floor: e.target.value})}
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-slate-700"
            />
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <DoorOpen size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Door Number"
            value={apartment.door}
            onChange={(e) => setApartment({...apartment, door: e.target.value})}
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-slate-700"
          />
        </div>
      </div>

      <button
        onClick={() => isComplete && onComplete(apartment)}
        disabled={!isComplete}
        className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
      >
        Confirm Address
      </button>
    </div>
  );
}
