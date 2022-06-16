import { Sequelize } from 'sequelize-typescript';
import { Education } from './education/entities/education.entity';
import { MedicalInfo } from './medical_info/entities/medical_info.entity';
import { Insurance } from './insurance/entities/insurance.entity';
import { Patient } from './patient/entities/patient.entity';
import { User } from './user/entities/user.entity';
import { FamilyPractitioner } from './familyPractitioner/entities/familyPractitioner';
import { Vaccines } from './vaccines/entities/vaccines.entity';
import { Visit } from './visit/entities/visit.entity';
import { Contact } from './contact/entities/contact.entity';
import { WorkExperience } from './work_experience/entities/work_experience.entity';
import { Relatives } from './relatives/entities/relatives.entity';
import { Declarations } from 'src/declarations/entities/declarations.entity';
import { Documents } from './document/entities/documents.entity';
import { MedicalReport } from './medical_report/entities/medical_report.entity';

import { BmiInfo } from './bmi_info/entities/bmi_info.entity';

import { Chat } from './chat/entities/chat.entity';
import { ChatMessage } from './chat-message/entities/chat-message.entity';
import { NotificationSettings } from './notification_settings/entities/notification_settings.entity';
import { PatientNotifications } from './patient_notifications/entities/patient_notifications.entity';
import { Appointment } from './appointments/entities/appointments.entity';

export const databaseProvider = {
  provide: 'SEQUELIZE',
  useFactory: async () => {
    const sequelize = new Sequelize({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    });
    sequelize.addModels([
      User,
      Education,
      Patient,
      Vaccines,
      Insurance,
      MedicalInfo,
      Visit,
      Contact,
      WorkExperience,
      Relatives,
      FamilyPractitioner,
      Declarations,
      Documents,
      MedicalReport,
      Appointment,
      BmiInfo,
      Chat,
      ChatMessage,
      NotificationSettings,
      PatientNotifications,
    ]);
    await sequelize.sync();
    return sequelize;
  },
};
