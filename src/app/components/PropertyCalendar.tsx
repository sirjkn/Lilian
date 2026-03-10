import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, startOfWeek, endOfWeek } from 'date-fns';

interface BookedDate {
  date: Date;
  type: 'skyway' | 'airbnb';
  checkIn?: string;
  checkOut?: string;
}

interface PropertyCalendarProps {
  propertyId: string;
  skywayBookings: Array<{ checkIn: string; checkOut: string }>;
  airbnbBookings: Array<{ checkIn: string; checkOut: string }>;
}

export function PropertyCalendar({ propertyId, skywayBookings, airbnbBookings }: PropertyCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [bookedDates, setBookedDates] = useState<BookedDate[]>([]);

  useEffect(() => {
    // Process all bookings to create booked dates array
    const dates: BookedDate[] = [];

    // Process Skyway bookings
    skywayBookings.forEach(booking => {
      const checkIn = new Date(booking.checkIn);
      const checkOut = new Date(booking.checkOut);
      const daysInRange = eachDayOfInterval({ start: checkIn, end: checkOut });
      
      daysInRange.forEach(date => {
        dates.push({
          date,
          type: 'skyway',
          checkIn: booking.checkIn,
          checkOut: booking.checkOut,
        });
      });
    });

    // Process Airbnb bookings
    airbnbBookings.forEach(booking => {
      const checkIn = new Date(booking.checkIn);
      const checkOut = new Date(booking.checkOut);
      const daysInRange = eachDayOfInterval({ start: checkIn, end: checkOut });
      
      daysInRange.forEach(date => {
        // Only add if not already booked by Skyway (Skyway takes priority)
        const alreadyBooked = dates.some(d => 
          isSameDay(d.date, date) && d.type === 'skyway'
        );
        
        if (!alreadyBooked) {
          dates.push({
            date,
            type: 'airbnb',
            checkIn: booking.checkIn,
            checkOut: booking.checkOut,
          });
        }
      });
    });

    setBookedDates(dates);
  }, [skywayBookings, airbnbBookings]);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const getDateStatus = (date: Date): 'skyway' | 'airbnb' | 'available' => {
    const booking = bookedDates.find(b => isSameDay(b.date, date));
    if (booking) {
      return booking.type;
    }
    return 'available';
  };

  const getDayClassName = (date: Date): string => {
    const status = getDateStatus(date);
    const isCurrentMonth = isSameMonth(date, currentMonth);
    const isToday = isSameDay(date, new Date());
    
    let baseClasses = 'relative h-10 w-10 flex items-center justify-center text-sm rounded-md transition-colors';
    
    if (!isCurrentMonth) {
      baseClasses += ' text-gray-400';
    }
    
    if (isToday) {
      baseClasses += ' ring-2 ring-[#6B7C3C] ring-offset-2';
    }
    
    if (status === 'skyway') {
      baseClasses += ' bg-red-500 text-white font-semibold hover:bg-red-600';
    } else if (status === 'airbnb') {
      baseClasses += ' bg-amber-500 text-white font-semibold hover:bg-amber-600';
    } else {
      baseClasses += ' hover:bg-gray-100';
    }
    
    return baseClasses;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-[#6B7C3C]" />
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-gray-600">Skyway Suites Bookings</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-amber-500 rounded"></div>
          <span className="text-gray-600">Airbnb Bookings</span>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Day headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="h-10 flex items-center justify-center text-xs font-semibold text-gray-600">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {calendarDays.map((day, index) => (
          <div key={index} className={getDayClassName(day)}>
            {format(day, 'd')}
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-gray-600 text-xs">Skyway Bookings</div>
          <div className="font-semibold text-red-600">
            {bookedDates.filter(d => d.type === 'skyway').length} days
          </div>
        </div>
        <div>
          <div className="text-gray-600 text-xs">Airbnb Bookings</div>
          <div className="font-semibold text-amber-600">
            {bookedDates.filter(d => d.type === 'airbnb').length} days
          </div>
        </div>
      </div>
    </div>
  );
}
