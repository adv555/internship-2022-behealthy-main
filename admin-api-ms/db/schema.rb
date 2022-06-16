# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_06_10_113822) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "Declarations", force: :cascade do |t|
    t.string "status", default: "REQUESTED", null: false
    t.integer "patient_id", null: false
    t.integer "family_practitioner_id", null: false
    t.timestamptz "createdAt", null: false
    t.timestamptz "updatedAt", null: false
    t.string "pdf"
  end

  create_table "Documents", id: :serial, force: :cascade do |t|
    t.text "scan", null: false
    t.string "type", limit: 50, null: false
    t.integer "user_id", null: false
    t.timestamptz "createdAt", null: false
    t.timestamptz "updatedAt", null: false
  end

  create_table "Education", id: :serial, force: :cascade do |t|
    t.string "country", limit: 50
    t.string "university", limit: 75
    t.string "speciality", limit: 50
    t.date "date_from"
    t.date "date_to"
    t.integer "family_practitioners_id", null: false
    t.timestamptz "createdAt", null: false
    t.timestamptz "updatedAt", null: false
  end

  create_table "Insurance", id: :serial, force: :cascade do |t|
    t.integer "patients_id", null: false
    t.integer "number_of_insurance"
    t.string "insurance_company", limit: 50
    t.string "name_program", limit: 50
    t.integer "duration"
    t.timestamptz "date_of_signing"
    t.string "contact_center_phone", limit: 50
    t.text "files"
    t.timestamptz "createdAt", null: false
    t.timestamptz "updatedAt", null: false
  end

  create_table "Relatives", id: :serial, force: :cascade do |t|
    t.string "first_name", limit: 50, null: false
    t.string "last_name", limit: 50, null: false
    t.string "gender", limit: 50, null: false
    t.timestamptz "birth_date", null: false
    t.string "birth_date_certificate", limit: 50, null: false
    t.enum "relative_type", null: false, enum_type: ""enum_Relatives_relative_type""
    t.integer "patient_id", null: false
    t.timestamptz "createdAt", null: false
    t.timestamptz "updatedAt", null: false
  end

  create_table "Users", id: :serial, force: :cascade do |t|
    t.string "email", limit: 255, null: false
    t.string "password", limit: 255, null: false
    t.string "role", limit: 255, null: false
    t.text "avatar"
    t.string "google_id", limit: 255
    t.boolean "isActivated", default: false, null: false
    t.text "activationLink", null: false
    t.timestamptz "createdAt", null: false
    t.timestamptz "updatedAt", null: false
    t.index ["activationLink"], name: "Users_activationLink_key", unique: true
    t.index ["email"], name: "Users_email_key", unique: true
    t.index ["email"], name: "index_Users_on_email", unique: true
  end

  create_table "Vaccines", id: :serial, force: :cascade do |t|
    t.string "vaccine_name", limit: 50, null: false
    t.text "description", null: false
    t.integer "patient_id", null: false
    t.timestamptz "createdAt", null: false
    t.timestamptz "updatedAt", null: false
  end

  create_table "Visit", id: :serial, force: :cascade do |t|
    t.timestamptz "visit_date", null: false
    t.string "status", limit: 50, null: false
    t.text "reason", null: false
    t.string "type", limit: 50, null: false
    t.text "file", null: false
    t.time "time", null: false
    t.integer "duration", null: false
    t.integer "declaration_id", null: false
    t.timestamptz "createdAt", null: false
    t.timestamptz "updatedAt", null: false
  end

  create_table "Work_experience", id: :serial, force: :cascade do |t|
    t.string "country", limit: 50, null: false
    t.date "date_from", null: false
    t.date "date_to"
    t.string "clinic_name", limit: 50, null: false
    t.string "clinic_type", limit: 50, null: false
    t.string "clinic_address", limit: 50, null: false
    t.string "phone", limit: 50
    t.string "position", limit: 50, null: false
    t.integer "family_practitioner_id", null: false
    t.timestamptz "createdAt", null: false
    t.timestamptz "updatedAt", null: false
  end

  create_table "admins", force: :cascade do |t|
    t.string "email", null: false
    t.string "password"
    t.string "password_digest", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_admins_on_email", unique: true
  end

  create_table "family_practitioners", force: :cascade do |t|
    t.string "first_name", limit: 64, null: false
    t.string "last_name", limit: 64, null: false
    t.string "gender", null: false
    t.string "phone", limit: 50, null: false
    t.datetime "birthdate", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "medical_info", id: :serial, force: :cascade do |t|
    t.enum "blood_type", enum_type: "enum_medical_info_blood_type"
    t.string "injuries", limit: 1000
    t.string "cardio", limit: 1000
    t.enum "diabetes", enum_type: "enum_medical_info_diabetes"
    t.enum "asthma", enum_type: "enum_medical_info_asthma"
    t.enum "viral_hepatitis", enum_type: "enum_medical_info_viral_hepatitis"
    t.string "allergies", limit: 1000
    t.string "drug_intolerance", limit: 1000
    t.enum "aids", enum_type: "enum_medical_info_aids"
    t.integer "patient_id", null: false
    t.timestamptz "createdAt", null: false
    t.timestamptz "updatedAt", null: false
  end

  create_table "medical_reports", id: :serial, force: :cascade do |t|
    t.integer "height"
    t.integer "weight"
    t.string "complaint", limit: 1000
    t.string "recommendation", limit: 1000
    t.string "conclusion", limit: 1000
    t.string "file", limit: 1000, null: false
    t.integer "visit_id", null: false
    t.timestamptz "createdAt", null: false
    t.timestamptz "updatedAt", null: false
  end

  create_table "notification_settings", id: :serial, force: :cascade do |t|
    t.boolean "upcoming_visits", default: true
    t.boolean "cancel_declaration", default: true
    t.integer "user_id", null: false
    t.timestamptz "createdAt", null: false
    t.timestamptz "updatedAt", null: false
    t.index ["user_id"], name: "notification_settings_user_id_key", unique: true
  end

  create_table "patient_notifications", id: :serial, force: :cascade do |t|
    t.boolean "visits", default: true
    t.boolean "recommendations", default: true
    t.boolean "reminders", default: true
    t.boolean "propositions", default: true
    t.integer "patient_id", null: false
    t.timestamptz "createdAt", null: false
    t.timestamptz "updatedAt", null: false
    t.index ["patient_id"], name: "patient_notifications_patient_id_key", unique: true
  end

  create_table "patients", id: :serial, force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "first_name", limit: 64, null: false
    t.string "last_name", limit: 64, null: false
    t.string "gender", null: false
    t.string "address", null: false
    t.string "phone", limit: 50, null: false
    t.datetime "birthdate", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_patients_on_user_id", unique: true
  end

  add_foreign_key "Chat", "family_practitioners", name: "Chat_family_practitioner_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "Chat", "patients", name: "Chat_patient_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "ChatMessages", "\"Chat\"", column: "chat_id", name: "ChatMessages_chat_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "Declarations", "family_practitioners", name: "Declarations_family_practitioner_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "Declarations", "family_practitioners", on_delete: :cascade
  add_foreign_key "Declarations", "patients", on_delete: :cascade
  add_foreign_key "Documents", "\"Users\"", column: "user_id", name: "Documents_user_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "Education", "family_practitioners", column: "family_practitioners_id", name: "Education_family_practitioners_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "Relatives", "patients", name: "Relatives_patient_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "Vaccines", "patients", name: "Vaccines_patient_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "Visit", "\"Declarations\"", column: "declaration_id", name: "Visit_declaration_id_fkey", on_update: :cascade
  add_foreign_key "Work_experience", "family_practitioners", name: "Work_experience_family_practitioner_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "bmi_info", "patients", name: "bmi_info_patient_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "contacts", "patients", name: "contacts_patient_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "family_practitioners", "\"Users\"", column: "user_id", name: "family_practitioners_user_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "family_practitioners", "\"Users\"", column: "user_id", on_delete: :cascade
  add_foreign_key "medical_info", "patients", name: "medical_info_patient_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "medical_reports", "\"Visit\"", column: "visit_id", name: "medical_reports_visit_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "notification_settings", "\"Users\"", column: "user_id", name: "notification_settings_user_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "patient_notifications", "patients", name: "patient_notifications_patient_id_fkey", on_update: :cascade
  add_foreign_key "patients", "\"Users\"", column: "user_id", name: "patients_user_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "patients", "\"Users\"", column: "user_id", on_delete: :cascade
end
