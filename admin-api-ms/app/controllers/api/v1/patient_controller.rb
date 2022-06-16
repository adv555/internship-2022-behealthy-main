class Api::V1::PatientController < ApplicationController
  def index
    patients = Patient.all
    render json: patients, status: :ok 
  end

  def show
    patient = Patient.find_by(id: [params[:id]])

    if patient
      render json: patient, status: :ok
    else
      render json: { error: "Patient not found" }, status: :not_found
    end
  end

  def show_by_user_id
    patient = Patient.find_by(user_id: [params[:user_id]])

    if patient
      render json: patient, status: :ok
    else
      render json: { error: "User not found" }, status: :not_found
    end
  end

  def create
    patient = Patient.create(patient_params)
    if patient.save
      render json: patient, status: :ok
    else
      render json: { error: "Creating failed" }, status: :bad_request
    end
  end

  def update
    patient = Patient.find_by(id: params[:id])

    if patient
      patient.update(patient_params)
      render json: patient, status: :ok
    else
      render json: { error: "Updating error" }, status: :bad_request
    end
  end

  def destroy
    patient = Patient.find_by(id: params[:id])

    unless patient
      render json: { error: "User not found" }, status: :not_found
    end

    if patient.destroy
      render json: { message: "Patient with the id #{params[:id]} was deleted" }, status: :ok
    else
      render json: { error: "Updating error" }, status: :bad_request 
    end
  end

  private
  def patient_params
    params.require(:patient).permit(
      :first_name,
      :last_name,
      :gender,
      :address,
      :phone,
      :birthdate,
      :user_id
    )
  end
end
