class Api::V1::FamilyPractitionerController < ApplicationController
  def index
    practitioners = FamilyPractitioner.all
    render json: practitioners, status: :ok 
  end

  def show
    practitioner = FamilyPractitioner.find_by(id: params[:id])

    if practitioner
      render json: practitioner, status: :ok
    else
      render json: { error: "Patient not found" }, status: :not_found
    end
  end

  def show_by_user_id
    practitioner = FamilyPractitioner.find_by(user_id: [params[:user_id]])

    if practitioner
      render json: practitioner, status: :ok
    else
      render json: { error: "User not found" }, status: :not_found
    end
  end

  def create
    practitioner = FamilyPractitioner.create(practitioner_params)
    if practitioner.save
      render json: practitioner, status: :ok
    else
      render json: { error: "Creating failed" }, status: :bad_request
    end
  end

  def update
    practitioner = FamilyPractitioner.find_by(id: params[:id])

    if practitioner
      practitioner.update(practitioner_params)
      render json: practitioner, status: :ok
    else
      render json: { error: "Updating error" }, status: :bad_request
    end
  end

  def destroy
    practitioner = FamilyPractitioner.find_by(id: params[:id])

    unless practitioner
      render json: { error: "User not found" }, status: :not_found
    end

    if practitioner.destroy
      render json: { message: "FamilyPractitioner with the id #{params[:id]} was deleted" }, status: :ok
    else
      render json: { error: "Updating error" }, status: :bad_request 
    end
  end

  private
  def practitioner_params
    params.require(:family_practitioner).permit(
      :first_name,
      :last_name,
      :gender,
      :phone,
      :birthdate,
      :user_id
    )
  end
end
