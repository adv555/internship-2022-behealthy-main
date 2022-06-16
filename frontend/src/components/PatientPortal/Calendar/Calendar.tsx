import { useCallback, useState } from 'react';
import FullCalendar, {
  DateSelectArg,
  EventApi,
  EventClickArg,
  EventContentArg,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventInput } from '@fullcalendar/react';
import { Typography } from '../../common/Typography/Typography';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointmentsList } from 'store/appointments/appointments.selectors';

import { AppointmentsActionCreator } from 'store/appointments/appointments.reducer';
import { createEventId } from './event-utils';

interface EventDb {
  id: number;
  type: string;
  start_time: string;
  end_time: string;
  patient_name: string;
}

export const StyleWrapper = styled.div`
  .fc td {
    background: #fcfcfc;
  }
`;
interface AppointmentForm {
  declarationId: number;
  practitionerId: number;
  patientId: number;
  patientName: string;
  appointmentDuration: string;
  appointmentType: string;
  closeModal?: () => void;
  openModal: () => void;
}

export const ScheduleCalendar: React.FC<AppointmentForm> = ({
  openModal,
  declarationId,
  practitionerId,
  patientName,
  patientId,
  appointmentType,
  appointmentDuration,
}) => {
  const dispatch = useDispatch();
  const eventsFromDb = useSelector(getAppointmentsList);

  const INITIAL_EVENTS: EventInput[] = eventsFromDb.map((event: EventDb) => {
    const newEvent = {
      id: event.id,
      title: event.patient_name,
      start: event.start_time,
      end: event.end_time,
      type: event.type,
    };
    return newEvent;
  });

  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);

  const handleEvents = useCallback(
    (events: EventApi[]) => setCurrentEvents(events),
    [],
  );
  const handleDateSelect = useCallback(
    (selectInfo: DateSelectArg) => {
      let type = appointmentType;
      let title = patientName;

      let calendarApi = selectInfo.view.calendar;
      calendarApi.unselect();
      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          type,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
        });
      }

      const newEvent: any = {
        declaration_id: declarationId,
        family_practitioner_id: practitionerId,
        patient_id: patientId,
        patient_name: patientName,
        duration: appointmentDuration,
        type,
        start_time: selectInfo.startStr,
        end_time: selectInfo.endStr,
      };

      dispatch(AppointmentsActionCreator.postNewAppointment(newEvent));
      dispatch(AppointmentsActionCreator.getAppointments());
    },
    [appointmentDuration, appointmentType, dispatch],
  );
  const handleEventClick = useCallback(
    (clickInfo: EventClickArg) => {
      const eventId = clickInfo.event._def.publicId;

      if (
        window.confirm(`Would you like to delete ${clickInfo.event.title}?`)
      ) {
        clickInfo.event.remove();
      }
      dispatch(AppointmentsActionCreator.deleteAppointment(Number(eventId)));
      dispatch(AppointmentsActionCreator.getAppointments());
    },
    [dispatch],
  );

  const renderEvent = (e: EventContentArg) => {
    return (
      <div className=" w-[150px] flex flex-col bg-greyScaleWhite border rounded border-notificationColour p-2">
        <div className="">
          <Typography
            type={'Ag-13-medium'}
            children={e.event.title}
            className={'text-greyScaleMainBlack mb-6'}
          />
        </div>

        <div className="flex flex-row justify-between items-center gap-2">
          <div className="w-1/2">
            <Typography
              type={'Ag-12-medium'}
              children={`${e.event.start?.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}-${e.event.end?.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}`}
              className={' text-greyScaleGrey2 whitespace-nowrap mr-1'}
            />
          </div>
          <div
            className={`w-1/2 px-[10px] py-[2px]  border rounded ${
              e.event.extendedProps.type === 'Online'
                ? 'bg-notificationColour'
                : 'bg-flagBlue'
            }`}
          >
            <Typography
              type={'Ag-12-medium'}
              children={e.event.extendedProps.type}
              className={'text-white '}
            />
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="">
      <div className="">
        <StyleWrapper>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            timeZone="local"
            initialView="timeGridWeek"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            customButtons={{
              new: {
                text: 'new',
                click: () => console.log('new event'),
              },
            }}
            views={{
              timeGrid: {
                allDaySlot: false,
                slotLabelFormat: {
                  hour: 'numeric',
                  minute: '2-digit',
                  dayPeriod: 'short',
                },

                slotMinTime: '09:00:00',
                slotMaxTime: '18:00:00',
              },
              dayGridMonth: {
                titleFormat: { month: 'long', year: 'numeric' },
                expandRows: true,
              },
              timeGridWeek: {
                titleFormat: {
                  month: 'long',
                  day: 'numeric',
                },
                dayHeaderFormat: {
                  weekday: 'short',
                  day: 'numeric',
                },
                slotMinWidth: 150,
                expandRows: true,
              },
              timeGridDay: {
                titleFormat: {
                  month: 'long',
                  day: 'numeric',
                },
                expandRows: true,
              },
            }}
            selectable={true}
            editable={true}
            initialEvents={INITIAL_EVENTS}
            eventContent={renderEvent}
            eventBackgroundColor="transparent"
            eventBorderColor="transparent"
            locale="ua"
            eventsSet={handleEvents}
            select={handleDateSelect}
            eventClick={handleEventClick}
          />
        </StyleWrapper>
      </div>
    </div>
  );
};
