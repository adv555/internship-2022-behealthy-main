require 'date'

class DeclarationPdf < Prawn::Document
  def initialize(declaration)
    super()
    @declaration = declaration
    @patient = Patient.find_by(id: declaration.patient_id)
    @patient_user = User.find_by(id: @patient.user_id)
    @practitioner = FamilyPractitioner.find_by(id: declaration.family_practitioner_id)
    @practitioner_user = User.find_by(id: @practitioner.user_id)

    declaration_content
  end

  def formated_date(date_str)
    created_date = date_str
    parsed_date = Date.strptime(created_date.to_s)
    formated_date = parsed_date.strftime("%d.%m.%Y")
  end

  def declaration_content
    image "#{Rails.root}/app/pdf/logo.png", width: 120
    text_box "Createad at: #{formated_date @declaration.createdAt}", align: :right
    move_down 50
    text "DECLARATION", color: '175676', size: 20, width: 120, style: :bold, align: :center
    text "about choosing a family practitioner", width: 120, align: :center
    move_down 40
    text "Number of declaration: #{@declaration.id}", width: 120
    move_down 20
    text "PATIENT", size: 15, style: :bold
    move_down 5
    text "Full name: #{@patient.first_name} #{@patient.last_name}"
    text "Gender: #{@patient.gender}"
    text "Address: #{@patient.address}"
    text "Phone: #{@patient.phone}"
    text "Email: #{@patient_user.email}"
    text "Birthdate: #{formated_date @patient.birthdate}"
    move_down 20
    text "PRACTITIONER", size: 15, style: :bold
    move_down 5
    text "Full name: #{@practitioner.first_name} #{@practitioner.last_name}"
    text "Gender: #{@practitioner.gender}" 
    text "Phone: #{@practitioner.phone}"
    text "Email: #{@practitioner_user.email}"
    text "Birthdate: #{formated_date @practitioner.birthdate}"
    move_down 50
    text "Patient sign"
    stroke_rectangle [0, 245], 150, 30
  end
end