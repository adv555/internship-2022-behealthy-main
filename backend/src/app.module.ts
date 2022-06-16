import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseProvider } from './database.provider';
import { UserModule } from './user/user.module';
import { FamilyPractitionerModule } from './familyPractitioner/familyPractitioner.module';
import { EducationModule } from './education/education.module';
import { PatientModule } from './patient/patient.module';
import { MedicalInfoModule } from './medical_info/medical_info.module';
import { VaccinesModule } from './vaccines/vaccines.module';
import { InsuranceModule } from './insurance/insurance.module';
import { VisitModule } from './visit/visit.module';
import { ContactModule } from './contact/contact.module';
import { WorkExperienceModule } from './work_experience/work_experience.module';
import { RelativesModule } from './relatives/relatives.module';
import { DeclarationsModule } from './declarations/declarations.module';
import { DocumentModule } from './document/document.module';
import { MedicalReportModule } from './medical_report/medical_report.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailModule } from './email/email.module';

import { BmiInfoModule } from './bmi_info/bmi_info.module';

import { ChatModule } from './chat/chat.module';
import { ChatMessageModule } from './chat-message/chat-message.module';
import { NotificationSettings } from './notification_settings/notification_settings.module';
import { ChatGatewayModule } from './gateways/chatGateway.module';
import { PatientNotificationsModule } from './patient_notifications/patient_notifications.module';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env.dev',
    }),
    UserModule,
    EducationModule,
    PatientModule,
    VaccinesModule,
    MedicalInfoModule,
    InsuranceModule,
    VisitModule,
    ContactModule,
    WorkExperienceModule,
    RelativesModule,
    FamilyPractitionerModule,
    DeclarationsModule,
    DocumentModule,
    MedicalReportModule,
    AuthModule,
    ChatGatewayModule,
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 465,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
          },
        },
      }),
    }),
    EmailModule,
    BmiInfoModule,
    ChatModule,
    ChatMessageModule,
    NotificationSettings,
    PatientNotificationsModule,
    AppointmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService, databaseProvider],
  exports: [databaseProvider],
})
export class AppModule {}
