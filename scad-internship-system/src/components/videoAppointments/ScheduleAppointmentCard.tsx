
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, Clock } from 'lucide-react';
import { useVideoAppointment } from '@/contexts/VideoAppointmentContext';
import { toast } from 'sonner';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel 
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ScheduleFormValues {
  date: Date | undefined;
  time: string;
  participantId: string;
  reason: string;
}

const appointmentscheduled = () => {
    toast.success('Appointment Scheduled Successfully');
  };

const ScheduleAppointmentCard = () => {
  const { simulateAppointmentAccepted } = useVideoAppointment();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mock participants that can be scheduled with
  const availableParticipants = [
    { id: 'p1', name: 'Ahmed Al-Farsi', role: 'student' },
    { id: 'p2', name: 'Fatima Al-Balushi', role: 'student' },
    { id: 'p3', name: 'Omar Al-Habsi', role: 'student' },
    { id: 'p4', name: 'Dr. Aisha Al-Zaabi', role: 'scadOfficer' },
    { id: 'p5', name: 'Dr. Mohammed Al-Siyabi', role: 'scadOfficer' },
  ];
  
  // Available time slots
  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  ];

  const form = useForm<ScheduleFormValues>({
    defaultValues: {
      date: undefined,
      time: '',
      participantId: '',
      reason: '',
    },
  });

  const onSubmit = (data: ScheduleFormValues) => {
    setIsSubmitting(true);
    
    // In a real app, we would send this data to the backend
    console.log('Appointment scheduled:', data);
    
    // Find the participant details
    const participant = availableParticipants.find(p => p.id === data.participantId);
    
    // Simulate success after a short delay
    setTimeout(() => {
      setIsSubmitting(false);
      
      if (participant) {
        toast.success(
          `Appointment scheduled with ${participant.name} on ${format(data.date!, 'PPP')} at ${data.time}`
        );
        
        // Reset the form
        form.reset();
      }
    }, 1500);
  };

  return (
    <Card className="bg-white mt-6">
      <CardHeader>
        <CardTitle className="text-xl">Schedule New Appointment</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Date picker */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal bg-gray-50 border border-gray-300 hover:border-gray-400 text-gray-900",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50 text-gray-600" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 mt-3" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || // Disable past dates
                            date > new Date(new Date().setMonth(new Date().getMonth() + 3)) // Allow booking 3 months ahead
                          }
                          initialFocus
                          className="pointer-events-auto bg-white text-gray-900 border-gray-300 hover:border-gray-400"
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />

              {/* Time selector */}
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem className="relative top-[-10px]">
                    <FormLabel>Time</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time">
                            {field.value || (
                              <div className="flex items-center text-muted-foreground">
                                <Clock size={16} className="mr-2" />
                                <span>Select time</span>
                              </div>
                            )}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {/* Participant selector */}
              <FormField
                control={form.control}
                name="participantId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Participant</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select participant" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableParticipants.map((participant) => (
                          <SelectItem key={participant.id} value={participant.id}>
                            {participant.name} ({participant.role === 'student' ? 'Student' : 'SCAD Officer'})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {/* Reason for appointment */}
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g. Career Guidance, Internship Discussion"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full mt-4" 
              disabled={isSubmitting}
              onClick={appointmentscheduled}


            >
              {isSubmitting ? 'Scheduling...' : 'Schedule Appointment'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ScheduleAppointmentCard;
